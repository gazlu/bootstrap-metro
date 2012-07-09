jQuery(document).ready(function($){

	var drag = location.href.substr(location.href.indexOf('?drag=')+6,2)=='on';

	$('a','#center section').metro( drag )

	
	// dummy links in the main section
	$('a[href=#]').live('click',function(){ return false })


	// dummy search form
	$('#searchForm').live('submit',function(){
		$('#searchForm').find('output').load('randomcontent.php?con=searchResult&string='+$(this).find('input[type=search]').val())
		return false
	})


	// changing the background color from the Settings bar
	$('#bgColor','#settingsForm').live('change',function(){
		var newColor = $(this).find(':selected').val(),
			settingsBtn = $('a[href^="randomcontent.php?con=settings"]');

		$('body') .removeClass() .addClass(newColor)

		settingsBtn.attr('href', settingsBtn.attr('href').substr( 0, settingsBtn.attr('href').indexOf('defCol=')+7 )+newColor)
	})

	// reload page with draggable&droppable mode on
	$('#dragg','#settingsForm').live('click',function(){
		window.location = drag ? location.href.substr(0,location.href.indexOf('?')):'?drag=on'
		return false
	})


})