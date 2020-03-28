<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Christopher J. Molitor</title>
<meta name="viewport" content="initial-scale=1.0,width=device-width" />
<link rel="stylesheet" href="css/style.css" type="text/css" media="screen" />
<link rel="stylesheet" href="css/prettyPhoto.css" type="text/css" media="screen" />
<link rel="stylesheet" href="css/print.css" type="text/css" media="print" />
</head>
<body>

<!--STICKER-->
<div id="sticker"></div>

<div id="wrapper">
<?php 
//THE FOLLOWING SECTIONS ARE
//BROKEN UP INTO SEPARATE FILES
//YOU CAN REARRANGE THEM HERE
include('sections/bio.php');
include('sections/skills.php');
include('sections/experience.php');
include('sections/education.php');
include('sections/honors_awards.php');
include('sections/as_seen_on.php');
include('sections/recommendations.php');
include('sections/contact.php');
?>
</div><!--end wrapper-->

<!--COPYRIGHT-->
<div id="copyright">&copy; <?php echo date('Y');?> - Designed and developed by THE MOLITOR</div>

<!--SCRIPTS-->
<script src="js/jquery.js"></script>
<script src="js/prettyPhoto.js"></script>
<script src="js/backPosition.js"></script>
<script src="js/custom.js"></script>

</body>
</html>