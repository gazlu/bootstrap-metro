<?php $this->load->view('inc/header.php'); ?>

<link rel="stylesheet" href="<?php echo base_url(); ?>assets/layout/_import.css">
    <div class="container-fluid">
      <div class="row-fluid">

        <div class="span3">
          <?php $this->load->view('inc/leftnav.php'); ?>
        </div><!--/span-->
        <div class="span9 well">
          <div class="row-fluid">
          	<div id="center">
          		<h1 class="sidebar">Start</h1>
				<section>
					<a href="#" class="normal">
						<span>blahblah</span>
					</a>
					<a href="#" class="fulltext">
						<span>random</span><br>
						Lorem Ipsum is simply dummy text of the printing industry.
					</a>
					<a href="#" class="icon">
						<img src="<?php echo base_url(); ?>assets/layout/images/ie.png" alt="explorer" width="148" height="148">
					</a>
					<a href="<?php echo base_url(); ?>index.php/home/search" class="search sidebar">
						<img src="<?php echo base_url(); ?>assets/layout/images/searchIcon.png" alt="Search" width="148" height="148">
					</a>
					<a href="http://google.com" class="preview">
						Back to my site
					</a>
					<a href="randomcontent.php?con=numbers" class="numbers sidebar">
						<span>09</span>
						Readme
					</a>
					<a href="randomcontent.php?con=twitter" class="twitter sidebar">
						<img src="<?php echo base_url(); ?>assets/layout/images/small.png" alt="twitter_avatar" width="80" height="80">
						<span>@sushskulkarni</span><br>
					</a>
						<a href="randomcontent.php?con=settings<?php //echo dad() ? '&drag=on':''; ?>&defCol=violet" class="icon sidebar">
						<img src="<?php echo base_url(); ?>assets/layout/images/gear_icon.png" alt="explorer" width="148" height="148">
					</a>
					<a href="#" class="image">
						<span>random</span><br>
						Lorem Ipsum is simply dummy text of the printing industry.
					</a>
				</section>
			</div>
          </div><!--/row-->
        </div><!--/span-->
      </div><!--/row-->

      <hr>

      <footer>
        <p>&copy; Company 2012</p>
      </footer>

    </div><!--/.fluid-container-->

<?php $this->load->view('inc/footer.php'); ?>