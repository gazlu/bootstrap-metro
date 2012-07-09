/**********************************************************************************

	Project Name: liveCRM
	Project Description: A clean simple CRM
	File Name: script.js
	Author: Adi Purdila
	Author URI: http://www.livelihood.in
	Version: 1.0.0
	
**********************************************************************************/

function validate(formData, jqForm, options) {
    return subCommonForm($('form').length-1, 'main');
}

function RefreshDataTable(key, columns) {
    var _intTableSection = 0;
    var oTable = $('#datatable').dataTable();
    var _url = _baseUrl+'common/datarecords';
    $.ajax({
        "type":"POST",
        "url":_url,
        "data":"key="+key+"&columns="+columns+"&customButtons="+_customButtons,
        "dataType":"html",
        "success":function(data){
            oTable.fnDestroy();
            document.getElementById('datatable').tBodies[0].innerHTML = data;
            $('#datatable').dataTable({
                "sPaginationType": "full_numbers",
				"bStateSave": false,
				"bScrollCollapse": false,
				"bJQueryUI": false,
            });
        }
    });
	
	$('.error-box').hide();
}

function EditRecord(ID){
    var _url = _baseUrl+'common/readrecord';
    $.ajax({
        "type":"POST",
        "url":_url,
        "data":"ID="+ID+"&key="+_recordKey,
        "dataType":"xml",
        "success":function(data){
			$(data)
                .find('Table')
                .children()
                .each(function() {
                    var _element = this.nodeName;
					var node = $(this);
                    if($('#'+_element)!=null){
                        if($('#'+_element).type == "checkbox"){
                            if(node.text()=='true')
                                $('#'+_element).checked = true; 
                        }
                        $('#'+_element).each(
                            function(i){ 
                                $(this).val(node.text());
                            }
                        );
                    }
                });
                //RefreshDataTable(_recordKey, _recordColumns);
            }
    });
}

function EditRecordCustom(fkey,ID){
    var _url = _baseUrl+'common/readcustomrecord';
    $.ajax({
        "type":"POST",
        "url":_url,
        "data":"ID="+ID+"&key="+_recordKey+"&fkey="+fkey,
        "dataType":"xml",
        "success":function(data){
            $(data)
                .find('Table')
                .children()
                .each(function() {
                    var _element = this.nodeName;
                    var node = $(this);
                    if($('#'+_element)!=null){
                        if($('#'+_element).type == "checkbox"){
                            if(node.text()=='true')
                                $('#'+_element).checked = true; 
                        }
                        $('#'+_element).val(node.text());
                    }
                });
                //RefreshDataTable(_recordKey, _recordColumns);
            }
    });
}

$(document).ready(function() {

	//Content boxes expand/collapse
	$(".initial-expand").hide();

	$("div.content-module-heading").click(function(){
		$(this).next("div.content-module-main").slideToggle();

		$(this).children(".expand-collapse-text").toggle();
	});

    if($("#duetime").length>0){
        $('#duetime').calendricalTime({isoTime:true, timeInterval:15, });
    }
    
    $('#genMsg').click(function () {
        $(this).fadeOut();
    });

    $('#dataform').ajaxForm({
		beforeSubmit: validate,
        dataType: 'json',
        success: function (data) {
            var _genMsg = $('#genMsg');
            _genMsg.attr('class', 'information-box round');
			
            data.code == 0
                ? _genMsg.attr('class', 'confirmation-box round')
                : _genMsg.attr('class', 'error-box round');

            _genMsg.html(data.message);
            _genMsg.fadeIn();
            $('#ID').val(0);
            RefreshDataTable(_recordKey, _recordColumns);
        }
    });
	
	$('#datatable').dataTable({
        "sPaginationType": "full_numbers",
        "bStateSave": false,
        "bScrollCollapse": false,
		"bJQueryUI": false,
    });
	
	$('#newrow').click(function(){
		var _table = $('#'+$(this).data('table'));
		var _length = _table.children().children().length;
		_table.append('<tr>'+_table.children().children()[_length-1].innerHTML+'</tr>');
	});

    if($(".iframe").length>0){
        $(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
    }

    if(dateBoxes!='[]'){
        for (var i = dateBoxes.length - 1; i >= 0; i--) {
            $( "#"+dateBoxes[i] ).datepicker({
                numberOfMonths: 1,
                changeMonth: true,
                changeYear: true,
                dateFormat: 'dd/mm/yy'
            });
        };
    }
});

var loadSettings = function(_url, _container){
    $('#genMsg').hide();
    $container = $('#'+_container);
    $.ajax({
        url: _url,
        dataType: 'html',
        type: 'POST',
        success:function( response ){
            $container.html(response);
        }
    });
};

var submitForm = function(_formId){
    var _genMsg = $('#genMsg');
    _submitForm = $('form').index($('#'+_formId));

    if(subCommonForm(_submitForm, 'main')){
        _genMsg.attr('class', 'information-box round');
        _genMsg.html('Saving...');
        $('#'+_formId).ajaxForm({
            dataType: 'json',
            success: function (data) {
                _genMsg.attr('class', 'information-box round');
                
                data.code == 0
                    ? _genMsg.attr('class', 'confirmation-box round')
                    : _genMsg.attr('class', 'error-box round');

                _genMsg.html(data.message);
                _genMsg.fadeIn();
                $('#ID').val(0);
                RefreshDataTable(_recordKey, _recordColumns);
            }
        });

        $('#'+_formId).submit();
    }
};

var toggleSales = function(pipe){
    $('#mainPageContent').slideToggle();
    $('#pipeline').slideToggle();
    if (pipe!=0) {
        var _url = _baseUrl+'dashboard/pipeline/'+pipe;
        $.ajax({
            "type":"POST",
            "url":_url,
            "dataType":"html",
            "success":function(data){
                $('#pipeline').html(data);
            }
        });
    };
}

var closeTask = function(task,e){
    var _url = _baseUrl+'task/close/';
    var _comment = prompt("Please enter closing comments:", 'Task Finished!');
    $(e).parent().fadeOut();
    $.ajax({
        "type":"POST",
        "url":_url,
        "data":"ID="+task+"&comment="+_comment,
        "dataType":"html",
        "success":function(data){
            
        }
    });
}