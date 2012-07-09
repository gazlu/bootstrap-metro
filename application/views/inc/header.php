<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Bootstrap, from Twitter</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <!--<link rel="stylesheet/less" type="text/css" href="<?php //echo base_url(); ?>assets/less/metro.less" />-->
    <!-- Le styles -->
    <link href="<?php echo base_url(); ?>assets/css/bootstrap-black.css" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 60px;
        padding-bottom: 40px;
      }
      .sidebar-nav {
        padding: 9px 0;
      }
    </style>
    <link href="<?php echo base_url(); ?>assets/css/bootstrap-responsive.css" rel="stylesheet">
    <script type="text/javascript">
      var _baseUrl = '<?php echo base_url(); ?>';
      var dateBoxes = new Array();
    </script>
    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="<?php echo base_url(); ?>assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo base_url(); ?>assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo base_url(); ?>assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo base_url(); ?>assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="<?php echo base_url(); ?>assets/ico/apple-touch-icon-57-precomposed.png">
  </head>
    <body>
      <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container-fluid">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <form id="loginForm" action="auth/login" class="well form-inline hide">
            <div id="loginBox">
              <input type="text" class="input-medium" placeholder="Email/Username">
              <input type="password" class="input-medium" placeholder="Password">
              <label class="checkbox">
                <input type="checkbox"> Remember me
              </label>
              <button type="submit" class="btn">Sign in</button>
              <button type="button" onclick="$('#loginForm').slideToggle();" class="btn">cancel</button>
              <a onclick="$('#loginBox').slideToggle();$('#forgotBox').slideToggle();" href="javascript:;">Forgot Password?</a>
            </div>
            <div id="forgotBox" class="hide">
              <input type="text" class="input-xlarge" placeholder="Email">
              <button type="submit" class="btn">Give me my password</button>
              <button type="button" onclick="$('#forgotBox').slideToggle();$('#loginBox').slideToggle();" class="btn">Back to login</button>
            </div>
          </form>
          <a class="brand" href="#">Bootstrap Metro</a>
          <div class="btn-group pull-right">
            <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
              <i class="icon-user"></i> Username
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a data-toggle="modal" href="#myModal">Profile</a></li>
              <li class="divider"></li>
              <li><a href="#">Sign Out</a></li>
            </ul>
          </div>
          <div class="nav-collapse">
            <ul class="nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a onclick="$('#loginForm').slideToggle();" href="javascript:;">Login</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>