<form class="form-horizontal" id="dataform">
    <div class="alert alert-error hide" id="genMsg"></div>
    <fieldset>
      <legend>Metro Form</legend>
      <div class="control-group">
        <label class="control-label" for="input01">Text input</label>
        <div class="controls">
          <input type="text" req="true" valsection="main" class="input-xlarge" id="input01">
          <p class="help-block">In addition to freeform text, any HTML5 text-based input appears like so.</p>
        </div>
      </div>
      <div class="control-group">
        <label class="control-label" for="optionsCheckbox">Checkbox</label>
        <div class="controls">
          <label class="checkbox">
            <input type="checkbox" id="optionsCheckbox" value="option1">
            Option one is this and that—be sure to include why it's great
          </label>
        </div>
      </div>
      <div class="control-group">
        <label class="control-label" for="select01">Select list</label>
        <div class="controls">
          <select id="select01">
            <option>something</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>
      <div class="control-group">
        <label class="control-label" for="multiSelect">Multicon-select</label>
        <div class="controls">
          <select multiple="multiple" id="multiSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>
      <div class="control-group">
        <label class="control-label" for="fileInput">File input</label>
        <div class="controls">
          <input class="input-file" id="fileInput" type="file">
        </div>
      </div>
      <div class="control-group">
        <label class="control-label" for="textarea">Textarea</label>
        <div class="controls">
          <textarea class="input-xlarge" id="textarea" rows="3"></textarea>
        </div>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Save changes</button>
        <button type="button" id="hideSideBar" class="btn">Cancel</button>
      </div>
    </fieldset>
  </form>
  <script src="<?php echo base_url(); ?>assets/js/jquery.dataTables.min.js"></script>
  <script src="<?php echo base_url(); ?>assets/js/bootstrap-validate.js"></script>
  <script src="<?php echo base_url(); ?>assets/js/jquery.form.js"></script>
  <script src="<?php echo base_url(); ?>assets/js/script.js"></script>
  <script type="text/javascript">
  	$('#hideSideBar').click(function(){
	    console.log($('#metroSidebar'));
	    $('#metroSidebar').animate({'left':$(document).width()},'fast').empty().removeData('whoOpenedIt');
	});
  </script>