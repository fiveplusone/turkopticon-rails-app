<?php

/* 
   reviews.php
   accepts review ids (ids), requester ids (rids), and date (start/end)

   Six Silberman
   23 Jul 2018 22:04
*/

include '../../php_api/mysqli-dbconn.php';
include '../../php_api/access-tokens.php';

if (!$conn) {
   die('Could Not Connect: (' . mysqli_connect_error() . ') ');
}

$tokens = array_values($access_tokens);

if (($_GET['access_token']) && (in_array($_GET['access_token'], $tokens))) {

$user = array_search($_GET['access_token'], $access_tokens);

if ($_GET['ids']) {
  $ids = explode(",", $_GET['ids']);
  $num_ids = count($ids);
  $i = 0;

  echo "{";

  $logfile = '../../php_api/log/reviews.php.log';
  $time = date('Y-m-j H:i:s');
  $ip = $_SERVER['REMOTE_ADDR'];
  file_put_contents($logfile, "\n[reviews.php v2018.07.23.2204] ", FILE_APPEND);
  file_put_contents($logfile, "[" . $time . "] ", FILE_APPEND);
  file_put_contents($logfile, "[" . $ip . "] [" . $user . "]\n", FILE_APPEND);
  file_put_contents($logfile, "REVIEW IDs: ", FILE_APPEND);
  file_put_contents($logfile, $_GET['ids'], FILE_APPEND);
  file_put_contents($logfile, "\n", FILE_APPEND);

  foreach ($ids as $id) {

    echo "\"". $id . "\":";

    if ($from_cache = apc_fetch("review_" . $id)) {

      file_put_contents($logfile, "    " . $id . ": from the APC\n", FILE_APPEND);
      echo $from_cache;

    } else {

      $stmt = mysqli_stmt_init($conn);
      $query = "SELECT id, person_id, requester_id, description, created_at, updated_at, fair, fast, pay, comm, is_flagged, is_hidden, tos_viol, amzn_requester_id, flag_count, comment_count FROM reports WHERE id=?";
      if (mysqli_stmt_prepare($stmt, $query)) {
        mysqli_stmt_bind_param($stmt, "s", $id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $review = mysqli_fetch_assoc($result);
        $review_out = json_encode($review);
        apc_add("review_" . $id, $review_out, 86400);
        file_put_contents($logfile, "    " . $id . ": from the DB\n", FILE_APPEND);
        echo $review_out;
        mysqli_stmt_close($stmt);
      }

    }

    if ( ++$i < $num_ids ) { echo ","; }

  }

  echo "}";
  mysqli_close($conn);

} elseif ($_GET['rids']) {

  echo "{";
  $rids = explode(",", $_GET['rids']);
  $num_rids = count($rids);
  $j = 0;

  $logfile = '../../php_api/log/reviews.php.log';
  $time = date('Y-m-j H:i:s');
  $ip = $_SERVER['REMOTE_ADDR'];
  file_put_contents($logfile, "\n[reviews.php v2018.07.23.2204] ", FILE_APPEND);
  file_put_contents($logfile, "[" . $time . "] ", FILE_APPEND);
  file_put_contents($logfile, "[" . $ip . "] [" . $user . "]\n", FILE_APPEND);
  file_put_contents($logfile, "MTURK REQUESTER IDs: ", FILE_APPEND);
  file_put_contents($logfile, $_GET['rids'], FILE_APPEND);
  file_put_contents($logfile, "\n", FILE_APPEND);

  foreach ($rids as $rid) {

    echo "\"" . $rid . "\":";

    if ($from_cache = apc_fetch("reviews_for_req_" . $rid)) {

      file_put_contents($logfile, "    " . $rid . ": from the APC\n", FILE_APPEND);
      echo $from_cache;

    } else {

      $stmt = mysqli_stmt_init($conn);
      $query = "SELECT id, person_id, requester_id, description, created_at, updated_at, fair, fast, pay, comm, is_flagged, is_hidden, tos_viol, amzn_requester_id, flag_count, comment_count FROM reports WHERE amzn_requester_id=?";
      if (mysqli_stmt_prepare($stmt, $query)) {
        mysqli_stmt_bind_param($stmt, "s", $rid);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $num_revs = mysqli_num_rows($result);
        $i = 0;
        if ($num_revs > 0) {
          $revs = "{";
          while($row = mysqli_fetch_assoc($result)) {
            $revs .= "\"" . $row["id"] . "\":";
            $rev_out = json_encode($row);
            $revs .= $rev_out;
            if (++$i < $num_revs) { $revs .= ","; }
          }
          $revs .= "}";
        }
        mysqli_stmt_close($stmt);
        apc_add("reviews_for_req_" . $rid, $revs, 86400);
        file_put_contents($logfile, "    " . $rid . ": from DB\n", FILE_APPEND);
        echo $revs;
      }

    }

    if (++$j < $num_rids) { echo ","; }
  }

  echo "}";
  mysqli_close($conn);

} elseif (($_GET['start']) && ($_GET['end'])) {

  $logfile = '../../php_api/log/reviews.php.log';
  $time = date('Y-m-j H:i:s');
  $ip = $_SERVER['REMOTE_ADDR'];
  file_put_contents($logfile, "\n[reviews.php v2018.07.23.2204] ", FILE_APPEND);
  file_put_contents($logfile, "[" . $time . "] ", FILE_APPEND);
  file_put_contents($logfile, "[" . $ip . "] [" . $user . "]\n", FILE_APPEND);
  file_put_contents($logfile, "START " . $_GET['start'], FILE_APPEND);
  file_put_contents($logfile, " END " . $_GET['end'], FILE_APPEND);
  file_put_contents($logfile, "\n", FILE_APPEND);

  $stmt = mysqli_stmt_init($conn);
  $query = "SELECT id, person_id, requester_id, description, created_at, updated_at, fair, fast, pay, comm, is_flagged, is_hidden, tos_viol, amzn_requester_id, flag_count, comment_count FROM reports WHERE created_at >= ? AND created_at <= ?";
  if (mysqli_stmt_prepare($stmt, $query)) {
    $end = $_GET['end'] . ' 23:59:59';
    mysqli_stmt_bind_param($stmt, "ss", $_GET['start'], $end);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $num_revs = mysqli_num_rows($result);
    $i = 0;
    if ($num_revs > 0) {
      echo "{";
      while($row = mysqli_fetch_assoc($result)) {
        echo "\"" . $row["id"] . "\":";
        $rev_out = json_encode($row);
        echo $rev_out;
        if (++$i < $num_revs) { echo ","; }
      }
      echo "}";
    }
    mysqli_stmt_close($stmt);
  }

  mysqli_close($conn);

} else {

  echo "Provide a value for parameter 'ids' (TO review IDs, comma separated), 'rids' (MTurk requester IDs, comma separated), or 'start' and 'end' (date range for reviews, YYYY-MM-DD).";

}

} else {

  $logfile = '../../php_api/log/reviews.php.log';
  $time = date('Y-m-j H:i:s');
  $ip = $_SERVER['REMOTE_ADDR'];
  file_put_contents($logfile, "[reviews.php v2018.07.23.2204] ", FILE_APPEND);
  file_put_contents($logfile, "[" . $time . "] ", FILE_APPEND);
  file_put_contents($logfile, "[" . $ip . "] FAILED ACCESS ATTEMPT\n", FILE_APPEND);

  echo "Access token missing or apparently invalid. Please pass your access token as the parameter 'access_token'. If you think this message is in error, it might be! Please contact Six.";

}
