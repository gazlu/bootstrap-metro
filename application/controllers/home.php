<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	/*function __construct() {
        parent::Controller();
        $this->parts[head] = $this->load->view("frontend/global/header.php", null, true);
        $this->scripts = array("JQuery/jquery-1.4.2.min", "JQuery/form", "Core", "Frontend");
        $this->styles = array("style");
        $this->title = "Blah blah";
    }*/

	public function index()
	{
		$this->load->view('home/index.php');
	}

        public function search()
        {
                $this->load->view('home/search.php');
        }
}