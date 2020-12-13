<?php
  
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   multi-attrs.php
   ===============
   Jay Tolentino and Six Silberman and Sim Singh
   5 Feb 2014 17:33
   ===============
   Last updated 28 Jul 2020 09:46
   Last updated 24 Aug 2020 19:56
   Last updated 26 Aug 2020 14:26 PDT
   Last updated 28 Aug 2020 10:06 PDT
   Last updated 28 Aug 2020 11:58 PDT
   ===============
   This file requires the package php5-mysqlnd!
   Before using this API, run:
     $ sudo apt-get install php5-mysqlnd
   ===============
   Returns information for one or more AMT task requesters
   * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  if ($recent = apc_fetch($_SERVER['REMOTE_ADDR'])) {
  $denylog = '../../php_api/log/multi-attrs.php.denied.log';
    $time = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'];
    file_put_contents($denylog, "[API v2020.09.11.1108] ", FILE_APPEND);
    file_put_contents($denylog, "[" . $time . "] ", FILE_APPEND);
    file_put_contents($denylog, "[" . $ip . "] ", FILE_APPEND);
    file_put_contents($denylog, "REJECTED (LAST REQUEST LESS THAN 60 SEC AGO) \n", FILE_APPEND);
    /* file_put_contents($denylog, $_GET["ids"] . "\n", FILE_APPEND); */
    die("Please don't call the API more than once per 60 seconds.");
  } else {
    apc_add($_SERVER['REMOTE_ADDR'], "1", 60);
  }

  header("Access-Control-Allow-Origin: *");

  /*
    FUNCTION: gather_requester_stats( $query_result )
    USAGE: Uses $query_result to create array of info about specific requester
  */
  function gather_requester_stats( $query_result ) {
    $row = mysqli_fetch_array($query_result, MYSQLI_BOTH);
    $stats_result = array();

    $stats_result['name'] = $row['amzn_requester_name'];
    $stats_result['attrs'] = array(
        'comm' => $row['av_comm'],
         'pay' => $row['av_pay'],
        'fair' => $row['av_fair'],
        'fast' => $row['av_fast'],
      );
    $stats_result['pay_buckets'] = json_decode($row['av_pay_bucket']);
    $stats_result['reviews'] = $row['nrs'];
    $stats_result['tos_flags'] = $row['tos_flags'];

    return $stats_result;
  }

  if(($_GET['ids']) && (preg_match('/^[A-Z0-9,]+$/', $_GET['ids']))){
    $ids = explode(",", $_GET[ 'ids' ]);

    // Use $num_ids and $i to check if current ID is not the last ID
    $num_ids = count($ids);
    $i = 0;
    echo "{";

    $logfile = '../../php_api/log/multi-attrs.php.log';
    $time = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'];
    file_put_contents($logfile, "[API v2020.08.28.1006] ", FILE_APPEND);
    file_put_contents($logfile, "[" . $time . "] ", FILE_APPEND);
    file_put_contents($logfile, "[" . $ip . "] ", FILE_APPEND);
    file_put_contents($logfile, $_GET['ids'] . "\n", FILE_APPEND);

    foreach ($ids as $id) {
      if ($id !== "") {
        echo "\"". $id . "\":";
        if ( $from_cache = apc_fetch( $id ) ) {
          file_put_contents($logfile, "    " . $id . ": from the APC\n", FILE_APPEND);
          echo $from_cache;
        } else {
          include_once '../../php_api/mysqli-dbconn.php';
          if (!$conn) { die('Could Not Connect: (' . mysqli_connect_error() . ') '); }
          $stmt = mysqli_stmt_init( $conn );
        
          // Create and execute a prepared statment to protect from SQL injection
          if ( mysqli_stmt_prepare($stmt, 'SELECT * FROM requesters WHERE amzn_requester_id=?') ) {
            mysqli_stmt_bind_param( $stmt, "s", $id );
            mysqli_stmt_execute( $stmt );
            $result = mysqli_stmt_get_result( $stmt );

            if (mysqli_num_rows($result) == 0) {

              $to_cache = "\"\"";
              echo $to_cache;

              apc_add($id, $to_cache, 2400);    // third parameter is time to live
              file_put_contents($logfile, "    " . $id . ": from DB: no reports\n", FILE_APPEND);

            } else { /* assume mysqli_num_rows($result) not empty */

              $requester_stats = gather_requester_stats( $result );
              $to_cache = json_encode( $requester_stats );
              echo $to_cache;

              apc_add($id, $to_cache, 1200);    // third parameter is time to live
              file_put_contents($logfile, "    " . $id . ": from DB\n", FILE_APPEND);

	    }

            mysqli_stmt_close( $stmt );

          } 
        }

        if ( ++$i < $num_ids ) {
          echo ",";
        }
      }
    }
    echo "}";
  } else {
    echo "To get data, call this URL with an 'ids' parameter. The 'ids' parameter must be a string made up of requester IDs separated by commas.";
  }
  mysqli_close($conn);
?>

