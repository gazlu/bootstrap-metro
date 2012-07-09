var _genMsg = $('#genMsg');

function subCommonForm(frmVal, valsection){
	var setBool = "1";
	var fTEle = null;
	var fSEle = null;
	var arVal = null;
	var errMsg = null;
	var errorElement = null;
	_genMsg.hide();

	for (var i = 0; i < document.forms[frmVal].elements.length; i++){
		var _currentFormElement = document.forms[frmVal].elements[i]; //cache for Form Element (Html Form)

		if((_currentFormElement.getAttribute("req")=="true" || _currentFormElement.getAttribute("req")=="valid") && !_currentFormElement.disabled && _currentFormElement.getAttribute("valsection")==valsection){
			var currentElement = $(document.forms[frmVal].elements[i]); //cache for Current Form Element
			var _controlDiv = currentElement.parent().parent(); //cache for Control Div
			var _helpElement = currentElement.next(); //cache for Help Span
			
			if (_currentFormElement.type == "text" || _currentFormElement.type == "password") {
				var cntValue = new String(_currentFormElement.value);
				_currentFormElement.value = stringTrim(cntValue);
                
                if(stringTrim(cntValue) != ""){
					_controlDiv.removeClass('error');
				}else{					
					
					if(fTEle==null){
						fTEle=i;
						errMsg = 'Please enter ' + _helpElement.html();
					}
					setBool = "0";		        	
				}
			}if (_currentFormElement.type == "hidden") {
				if(_currentFormElement.value != ""){
					_controlDiv.removeClass('error');
				}else{
					if(fTEle==null){
						fTEle=i;
						errMsg = currentElement.attr("errmsg");
					}
					setBool = "0";		        	
				}		    	
			}else if (_currentFormElement.type == "select-one") {
				var selOptValue = new String(_currentFormElement.value);
				if(selOptValue != '0' && selOptValue.length != 0){
					_controlDiv.removeClass('error');
				}else{
					if(fTEle==null){
						fTEle=i;
						errMsg = 'Please select ' + _helpElement.html();
					}
					setBool = "0";
				}
			}else if (_currentFormElement.type == "select-multiple") {
				var isMulti = _currentFormElement.getAttribute("multiple");
				if(isMulti){
					if(_currentFormElement.length>0){						
						_controlDiv.removeClass('error');
					}else{
						
						if(fTEle==null){
							fTEle=i;
						}
						setBool = "0";
					}
				}
			}else if (_currentFormElement.type == "textarea") {
                if(_currentFormElement.value != ""){
					_controlDiv.removeClass('error');
				}else{
					if(fTEle==null){
						fTEle=i;
						errMsg = 'Please enter ' + _helpElement.html();
					}
					setBool = "0";
				}
			}else if (_currentFormElement.type == "radio") {
				if(_currentFormElement.value != ""){
					_controlDiv.removeClass('error');
				}else{
					if(fTEle==null){
						fTEle=i;
					}
					setBool = "0";
				}
			}
		}
	}
	if(setBool == "0"){
		if(fTEle!=null){
			if (document.forms[frmVal].elements[fTEle].type != "hidden") {
				document.forms[frmVal].elements[fTEle].focus();
				errorElement = $(document.forms[frmVal].elements[fTEle]);
				errorElement.parent().parent().addClass('error');
			}
			if(errMsg==null || errMsg==''){
				_genMsg.html("Please fill all required Fields.");
				_genMsg.fadeIn('slow');
			}else{
				_genMsg.html(errMsg);
				_genMsg.fadeIn('slow');
				errMsg='';
			}
			return false;
		}
		
		if(AllValidData(frmVal)){
			return true;
		}else{
			return false;
		}			
	}else{
		if(AllValidData(frmVal)){
			return true;
		}else{
			return false;
		}
	}		
}

function AllValidData(frmVal){
	var strError = "";
	_genMsg.html("&nbsp;");
	for (var i = 0; i < document.forms[frmVal].elements.length; i++){
		var iEle = document.forms[frmVal].elements[i];
		var currentElement = $(iEle);
		var swCase = currentElement.attr("valdata");
		var minLen = currentElement.attr("minlen");
		var _controlDiv = currentElement.parent().parent(); //cache for Control Div
		_controlDiv.removeClass('error');
		
		if(!isNaN(minLen)){
			if(iEle.value.length < minLen){
				if(!strError || strError.length ==0) { 
					strError = "Field should have atleast "+minLen+" charactors"; 
				}               
				_genMsg.html(strError); 
				_controlDiv.addClass('error');
				_genMsg.fadeIn();
				iEle.focus();
				return false; 
			}
		}
		if(swCase!=null && !iEle.disabled && iEle!=null){
			switch(swCase){ 
				case "alnum": 
				case "alphanumeric": { 
					var charpos = iEle.value.search("[^A-Za-z0-9 ]"); 
					if(iEle.value.length > 0 &&  charpos >= 0) { 
						if(!strError || strError.length ==0) { 
						  strError = " Only alpha-numeric characters allowed "; 
						}//if 
						_genMsg.html(strError);
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false; 
					}
					break;
				}//case alphanumeric 
				case "num": 
				case "numeric": { 
					var charpos = iEle.value.search("[^0-9]"); 
					if(iEle.value.length > 0 &&  charpos >= 0) { 
						
						if(!strError || strError.length ==0) { 
							strError = " Only digits allowed "; 
						}//if               
						_genMsg.html(strError); 
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false; 
					}//if 
					break;
				}//numeric 
				case "float": { 
					var charpos = iEle.value.search("[^0-9 .]"); 
					if(isNaN(iEle.value)){ 
						if(!strError || strError.length ==0) { 
							strError = " Only float values allowed "; 
						}//if
												
						_genMsg.html(strError);// + "" + eval(charpos+1)+"]"; 
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false; 
					}
					
					if(iEle.value.length > 0 &&  charpos >= 0) { 
						if(!strError || strError.length ==0) { 
							strError = " Only float values allowed "; 
						}//if               
						_genMsg.html(strError);// + "" + eval(charpos+1)+"]"; 
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false; 
					}//if 
					break;
				}//Float
				case "per": 
				case "percent": { 
					var charpos = iEle.value.search("[^0-9 .]"); 
					if(isNaN(iEle.value)){ 
						if(!strError || strError.length ==0) { 
							strError = " Only digits allowed "; 
						}//if
												
						_genMsg.html(strError);// + "" + eval(charpos+1)+"]"; 
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false; 
					}
					
					if(iEle.value.length > 0 &&  charpos >= 0) { 
						if(!strError || strError.length ==0) { 
							strError = " Only digits allowed "; 
						}//if
												
						_genMsg.html(strError);// + "" + eval(charpos+1)+"]"; 
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false; 
					}//if
					
					if(parseInt(iEle.value)>100){
						strError = "Percentage value can not exceed 100"; 
						
						_genMsg.html(strError);
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false; 
					}
					break;
				}//Percentage
				case "alphabetic": 
				case "alpha": { 
					var controlValue = new String(iEle.value);
					var charpos = iEle.value.search("[^A-Za-z\ ]"); 
					if(iEle.value.length > 0 &&  charpos >= 0) { 
						if(!strError || strError.length ==0) { 
							strError = " Only alphabetic characters allowed "; 
						}//if
						
						_genMsg.html(strError);// + "" + eval(charpos+1)+"]"; 
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false; 
					}//if

					if(controlValue.charAt(0)==' '){
						if(!strError || strError.length ==0) { 
							strError = "Leading spaces are not allowed."; 
						}//if
						
						_genMsg.html(strError);// + "" + eval(charpos+1)+"]"; 
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false; 
					}//if
					break; 
				}//alpha 
				case "alnumhyphen":{
					var charpos = iEle.value.search("[^A-Za-z0-9\-_\]"); 
					if(iEle.value.length > 0 &&  charpos >= 0){ 
						if(!strError || strError.length ==0) { 
							strError = " characters allowed are A-Z,a-z,0-9,- and _"; 
						}//if                             
						_genMsg.html(strError);// + " " + eval(charpos+1)+"]"; 
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false; 
					}//if
					break;
				}
				case "email": { 
					if(!validateEmailv2(iEle.value)) { 
						if(!strError || strError.length ==0) { 
							strError = " Enter a valid Email address "; 
						}//if                                               
						_genMsg.html(strError); 
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false;
					}//if
					break; 
				}//case email 
				case "lt": 
				case "lessthan": { 
					if(isNaN(iEle.value)) { 
						_genMsg.innerHTML = " Should be a number "; 
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false; 
					}//if 
					if(eval(iEle.value) >=  eval(cmdvalue)) { 
						if(!strError || strError.length ==0) { 
							strError = "  value should be less than "+ cmdvalue; 
						}//if               
						_genMsg.html(strError); 
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false;                 
					}//if
					break; 
				}//case lessthan 
				case "gt": 
				case "greaterthan": { 
					if(isNaN(iEle.value)) { 
						_genMsg.innerHTML = " Should be a number "; 
						_controlDiv.addClass('error'); 
						_genMsg.fadeIn();
						iEle.focus();
						return false; 
					}//if 
					if(eval(iEle.value) <=  eval(cmdvalue)) { 
						if(!strError || strError.length ==0) { 
							strError = " value should be greater than "+ cmdvalue; 
						}//if               
						_genMsg.html(strError); 
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false;                 
					}//if
					break; 
				}//case greaterthan 
				case "regexp":{ 
					if(iEle.value.length > 0){
						if(!iEle.value.match(cmdvalue)){ 
							if(!strError || strError.length ==0){ 
								strError = " Invalid characters found "; 
							}//if                                                               
							_genMsg.html(strError); 
							_controlDiv.addClass('error');
							_genMsg.fadeIn();
							iEle.focus();
						return false;                   
						}//if 
					}
					break; 
				}//case regexp 
				case "dontselect": { 
					if(iEle.selectedIndex == null) { 
						_genMsg.innerHTML = "BUG: dontselect command for non-select Item"; 
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false; 
					} 
					if(iEle.selectedIndex == eval(cmdvalue)) { 
						if(!strError || strError.length ==0) { 
							strError = " Please Select one option "; 
						}//if                                
						_genMsg.html(strError); 
						_controlDiv.addClass('error');
						_genMsg.fadeIn();
						iEle.focus();
						return false;
					}
					break; 
				}//case Date
				case "date": { 
					if(iEle.value.length < 8) { 
						_controlDiv.addClass('error');
						strError = " Invalid Date.";
						_genMsg.html(strError); 
						iEle.focus();
						return false;
					}else{
						if(iEle.value.indexOf('/') < 0) {							
							_controlDiv.addClass('error');
							strError = " Invalid Date.";
							_genMsg.html(strError); 
							_genMsg.fadeIn();
							iEle.focus();
							return false;
						}else{
							if(iEle.value.indexOf('/') < 0) {
								strError = " Invalid Date.";
								_controlDiv.addClass('error');
								_genMsg.html(strError); 
								_genMsg.fadeIn();
								iEle.focus();
								return false;
							}
						}
					}
					break; 
				}//case Date 
			}//switch 			
		}
	}
	return true;
}

function validateEmailv2(email){
	if(email.length <= 0){
		return true;
	}
	
	var splitted = email.match("^(.+)@(.+)$");
	if(splitted == null) return false;
	
	if(splitted[1] != null ){
		var regexp_user=/^\"?[\w-_\.]*\"?$/;
		if(splitted[1].match(regexp_user) == null) return false;
	}
	
	if(splitted[2] != null){
		var regexp_domain=/^[\w-\.]*\.[A-Za-z]{2,4}$/;
		if(splitted[2].match(regexp_domain) == null) {
			var regexp_ip =/^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
			if(splitted[2].match(regexp_ip) == null) return false;
		}// if
		return true;
	}
	return false;
}

function validateDate(txtDate, errmsg){
	re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
	
	_genMsg.html('');
	if(txtDate.value != '' && !txtDate.value.match(re)) { 
		_genMsg.innerHTML = errmsg;
		txtDate.value = '';
		txtDate.focus(); 
		return false;
	}
	
	return true; 
}

function stringTrim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}