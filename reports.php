<?php

include "../php_api/mysqli-dbconn.php";

if (isset($_POST["password"]) && ($_POST["password"] == "wasd!xk8D")) {

?>

<?php

function get_users_for_month($conn, $yyyymm) {
  $stmt = $stmt = mysqli_stmt_init($conn);
  $year = substr($yyyymm, 0, 4);
  $month = substr($yyyymm, 5, 2);
  if ($month == "12") {
    $nextyear = strval(intval($year) + 1);
    $nextmonth = "01";
  } else {
    $nextyear = $year;
    $nextmonth = strval(intval($month) + 1);
  }
  $query = "select count(*) from people where created_at < '" . $nextyear . "-" . $nextmonth . "-01 00:00:00' and created_at > '" . $year . "-" . $month . "-01 00:00:00'";
  $res = mysqli_query($conn, $query);
  $row = mysqli_fetch_row($res);
  return $row[0];
}

function get_reviews_for_month($conn, $yyyymm) {
  $stmt = $stmt = mysqli_stmt_init($conn);
  $year = substr($yyyymm, 0, 4);
  $month = substr($yyyymm, 5, 2);
  if ($month == "12") {
    $nextyear = strval(intval($year) + 1);
    $nextmonth = "01";
  } else {
    $nextyear = $year;
    $nextmonth = strval(intval($month) + 1);
  }
  $query = "select count(*) from reports where created_at < '" . $nextyear . "-" . $nextmonth . "-01 00:00:00' and created_at > '" . $year . "-" . $month . "-01 00:00:00'";
  $res = mysqli_query($conn, $query);
  $row = mysqli_fetch_row($res);
  return $row[0];
}

function get_reviewers_for_month($conn, $yyyymm) {
  $stmt = $stmt = mysqli_stmt_init($conn);
  $year = substr($yyyymm, 0, 4);
  $month = substr($yyyymm, 5, 2);
  if ($month == "12") {
    $nextyear = strval(intval($year) + 1);
    $nextmonth = "01";
  } else {
    $nextyear = $year;
    $nextmonth = strval(intval($month) + 1);
  }
  $query = "select count(distinct person_id) from reports where created_at < '" . $nextyear . "-" . $nextmonth . "-01 00:00:00' and created_at > '" . $year . "-" . $month . "-01 00:00:00'";
  $res = mysqli_query($conn, $query);
  $row = mysqli_fetch_row($res);
  return $row[0];
}

?>

<html>
<body style="font-family: monospace">
<p>New users by month</p>
<table>
  <tr>
    <td>2009-11&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td>
      <?php echo get_users_for_month($conn, "2009-11"); ?>
    </td>
  </tr>
  <tr>
    <td>2009-12</td>
    <td>
      <?php echo get_users_for_month($conn, "2009-12"); ?>
    </td>
  </tr>
  <?php for ($year = 2010; $year <= 2019; $year++) { ?>
    <?php for ($month = 1; $month <= 12; $month++) { ?>
      <?php if (!(($year == 2019) && ($month > 9))) { ?>
        <tr>
          <?php $yyyymm = strval($year) . "-" . str_pad(strval($month), 2, '0', STR_PAD_LEFT); ?>
          <td><?php echo $yyyymm; ?></td>
          <td><?php echo get_users_for_month($conn, $yyyymm); ?>
        </tr>
      <?php } ?>
    <?php } ?>
  <?php } ?>
</table>
<p>&nbsp;</p>
<p>New reviews by month</p>
<table>
  <tr>
    <td>2009-11&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td>
      <?php echo get_reviews_for_month($conn, "2009-11"); ?>
    </td>
  </tr>
  <tr>
    <td>2009-12</td>
    <td>
      <?php echo get_reviews_for_month($conn, "2009-12"); ?>
    </td>
  </tr>
  <?php for ($year = 2010; $year <= 2019; $year++) { ?>
    <?php for ($month = 1; $month <= 12; $month++) { ?>
      <?php if (!(($year == 2019) && ($month > 9))) { ?>
        <tr>
          <?php $yyyymm = strval($year) . "-" . str_pad(strval($month), 2, '0', STR_PAD_LEFT); ?>
          <td><?php echo $yyyymm; ?></td>
          <td><?php echo get_reviews_for_month($conn, $yyyymm); ?>
        </tr>
      <?php } ?>
    <?php } ?>
  <?php } ?>
</table>
<p>&nbsp;</p>
<p>Reviewers by month</p>
<table>
  <tr>
    <td>2009-11&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td>
      <?php echo get_reviewers_for_month($conn, "2009-11"); ?>
    </td>
  </tr>
  <tr>
    <td>2009-12</td>
    <td>
      <?php echo get_reviewers_for_month($conn, "2009-12"); ?>
    </td>
  </tr>
  <?php for ($year = 2010; $year <= 2019; $year++) { ?>
    <?php for ($month = 1; $month <= 12; $month++) { ?>
      <?php if (!(($year == 2019) && ($month > 9))) { ?>
        <tr>
          <?php $yyyymm = strval($year) . "-" . str_pad(strval($month), 2, '0', STR_PAD_LEFT); ?>
          <td><?php echo $yyyymm; ?></td>
          <td><?php echo get_reviewers_for_month($conn, $yyyymm); ?>
        </tr>
      <?php } ?>
    <?php } ?>
  <?php } ?>
</table>
<p>&nbsp;</p>
<p>Review/reviewer concentration by month (# reviews / # reviewers)</p>
<table>
  <tr>
    <td>2009-11&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td>
      <?php echo get_reviewers_for_month($conn, "2009-11"); ?>
    </td>
  </tr>
  <tr>
    <td>2009-12</td>
    <td>
      <?php echo get_reviewers_for_month($conn, "2009-12"); ?>
    </td>
  </tr>
  <?php for ($year = 2010; $year <= 2019; $year++) { ?>
    <?php for ($month = 1; $month <= 12; $month++) { ?>
      <?php if (!(($year == 2019) && ($month > 9))) { ?>
        <tr>
          <?php $yyyymm = strval($year) . "-" . str_pad(strval($month), 2, '0', STR_PAD_LEFT); ?>
          <td><?php echo $yyyymm; ?></td>
          <?php
            $nrevs = (float) get_reviews_for_month($conn, $yyyymm);
            $nreviewers = (float) get_reviewers_for_month($conn, $yyyymm);
            $conc = $nrevs / $nreviewers;
          ?>
          <td><?php echo round($conc, 2); ?>
        </tr>
      <?php } ?>
    <?php } ?>
  <?php } ?>
</table>
</body>
</html>

<?php

} else {

?>

<html>
<body>
<form action="reports.php" method="post">
<input type="password" name="password" /><br/>
<input type="submit" value="Submit" />
</form>
</body>
</html>

<?php } ?>