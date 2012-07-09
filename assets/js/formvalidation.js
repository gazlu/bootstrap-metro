function resetTextBox(frmVal){
	for (var i = 0; i < _form.elements.length; i++) {
		if (_currentElement.type == "text") {
			if(_currentElement.value != ""){
				_currentElement.style.border = "#339900 1px solid";
			}		    	
		}
	}
}

function stringTrim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function subCommonForm(frmVal, valsection){
	var setBool = "1";
	var fTEle = null;
	var fSEle = null;
	var arVal = null;
	var errMsg = null;
	$('#genMsg').fadeOut();
	var _form = $('form')[frmVal];
	for (var i = 0; i < _form.elements.length; i++){
		var _currentElement = _form.elements[i];
		if((_currentElement.getAttribute("req")=="true" || _currentElement.getAttribute("req")=="valid") && !_currentElement.disabled && _currentElement.getAttribute("valsection")==valsection){
			if (_currentElement.type == "text" || _currentElement.type == "password") {
				var cntValue = new String(_currentElement.value);
				_currentElement.value = stringTrim(cntValue);
                if(stringTrim(cntValue) != ""){
					_currentElement.style.border = "#339900 1px solid";					
				}else{					
					_currentElement.style.border = "red 1px solid";
					if(fTEle==null){
						fTEle=i;
						errMsg = _currentElement.getAttribute("errmsg");
						errMsg = 'Please enter ' + $('#' + _currentElement.id).next().html();
					}
					setBool = "0";		        	
				}
			}if (_currentElement.type == "hidden") {
				if(_currentElement.value != ""){
					_currentElement.style.border = "#339900 1px solid";					
				}else{
					_currentElement.style.border = "red 1px solid";					
					if(fTEle==null){
						fTEle=i;
						errMsg = _currentElement.getAttribute("errmsg");
					}
					setBool = "0";		        	
				}		    	
			}else if (_currentElement.type == "select-one") {
				var selOptValue = new String(_currentElement.value);
				//alert(selOptValue.length);
                if(selOptValue != '0' && selOptValue.length != 0){
					_currentElement.style.border = "#339900 1px solid";
				}else{
					_currentElement.style.border = "red 1px solid";
					if(fTEle==null){
						fTEle=i;
						errMsg = _currentElement.getAttribute("errmsg");
						errMsg = 'Please select ' + $('#' + _currentElement.id).next().html();
					}
					setBool = "0";
				}
			}else if (_currentElement.type == "select-multiple") {
				var isMulti = _currentElement.getAttribute("multiple");
				
				//alert(_currentElement.length);
				
				if(isMulti){
					if(_currentElement.length>0){						
						_currentElement.style.border = "#339900 1px solid";
					}else{
						_currentElement.style.border = "red 1px solid";
						if(fTEle==null){
							fTEle=i;
							errMsg = _currentElement.getAttribute("errmsg");
						}
						setBool = "0";
					}
				}
			}else if (_currentElement.type == "hidden") {
				if(_currentElement.value != ""){
					_currentElement.style.border = "#339900 1px solid";
				}else{
					_currentElement.style.border = "red 1px solid";
					if(fTEle==null){
						fTEle=i;
						errMsg = _currentElement.getAttribute("errmsg");
					}
					setBool = "0";
				}
			}else if (_currentElement.type == "textarea") {
                if(_currentElement.value != ""){
					_currentElement.style.border = "#339900 1px solid";
				}else{
					_currentElement.style.border = "red 1px solid";
					if(fTEle==null){
						fTEle=i;
						errMsg = _currentElement.getAttribute("errmsg");
						if(errMsg==''){
							errMsg = 'Please enter ' + $('#' + _currentElement.id).next().html();
						}
					}
					setBool = "0";
				}
			}else if (_currentElement.type == "radio") {
				//alert(_currentElement.value);
				if(_currentElement.value != ""){
					_currentElement.style.border = "#339900 1px solid";
				}else{
					_currentElement.style.border = "red 1px solid";
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
			if (_form.elements[fTEle].type != "hidden") {
				_form.elements[fTEle].focus();
			}
			if(errMsg==null || errMsg==''){
				document.getElementById("genMsg").innerHTML = "Please fill all required Fields.";
				$('#genMsg').fadeIn('slow');
			}else{
				document.getElementById("genMsg").innerHTML = errMsg;
				$('#genMsg').fadeIn('slow');
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
	var _form = $('form')[frmVal];
	document.getElementById("genMsg").innerHTML = "&nbsp;";
	for (var i = 0; i < _form.elements.length; i++){
		_currentElement = _form.elements[i];
		var swCase = _currentElement.getAttribute("valdata");
		var iEle = _form.elements[i];
		/*
		if(swCase==null && _currentElement.getAttribute("Validators")!=null){
			swCase = "date";
		}
		alert($(_form.elements[i]).attr('name')+'\n'+$(_form.elements[i]).attr('valdata'));
		*/
		if(swCase!=null && !iEle.disabled && iEle!=null){
			switch(swCase){ 
				case "alnum": 
				case "alphanumeric": { 
					var charpos = iEle.value.search("[^A-Za-z0-9 ]"); 
					if(iEle.value.length > 0 &&  charpos >= 0) { 
						if(!strError || strError.length ==0) { 
						  strError = " Only alpha-numeric characters allowed "; 
						}//if 
						document.getElementById("genMsg").innerHTML = strError;// + " " + eval(charpos+1)+"]"; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
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
						document.getElementById("genMsg").innerHTML = strError ; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
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
												
						document.getElementById("genMsg").innerHTML = strError;// + "" + eval(charpos+1)+"]"; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
						iEle.focus();
						return false; 
					}
					
					if(iEle.value.length > 0 &&  charpos >= 0) { 
						if(!strError || strError.length ==0) { 
							strError = " Only float values allowed "; 
						}//if               
						document.getElementById("genMsg").innerHTML = strError;// + "" + eval(charpos+1)+"]"; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
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
												
						document.getElementById("genMsg").innerHTML = strError;// + "" + eval(charpos+1)+"]"; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
						iEle.focus();
						return false; 
					}
					
					if(iEle.value.length > 0 &&  charpos >= 0) { 
						if(!strError || strError.length ==0) { 
							strError = " Only digits allowed "; 
						}//if
												
						document.getElementById("genMsg").innerHTML = strError;// + "" + eval(charpos+1)+"]"; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
						iEle.focus();
						return false; 
					}//if
					
					if(parseInt(iEle.value)>100){
						strError = "Percentage value can not exceed 100"; 
						
						document.getElementById("genMsg").innerHTML = strError;
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
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
						
						document.getElementById("genMsg").innerHTML = strError;// + "" + eval(charpos+1)+"]"; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
						iEle.focus();
						return false; 
					}//if

					if(controlValue.charAt(0)==' '){
						if(!strError || strError.length ==0) { 
							strError = "Leading spaces are not allowed."; 
						}//if
						
						document.getElementById("genMsg").innerHTML = strError;// + "" + eval(charpos+1)+"]"; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
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
						document.getElementById("genMsg").innerHTML = strError;// + " " + eval(charpos+1)+"]"; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
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
						document.getElementById("genMsg").innerHTML = strError; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
						iEle.focus();
						return false;
					}//if
					break; 
				}//case email 
				case "lt": 
				case "lessthan": { 
					if(isNaN(iEle.value)) { 
						document.getElementById("genMsg").innerHTML = " Should be a number "; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
						iEle.focus();
						return false; 
					}//if 
					if(eval(iEle.value) >=  eval(cmdvalue)) { 
						if(!strError || strError.length ==0) { 
							strError = "  value should be less than "+ cmdvalue; 
						}//if               
						document.getElementById("genMsg").innerHTML = strError; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
						iEle.focus();
						return false;                 
					}//if
					break; 
				}//case lessthan 
				case "gt": 
				case "greaterthan": { 
					if(isNaN(iEle.value)) { 
						document.getElementById("genMsg").innerHTML = " Should be a number "; 
						iEle.style.border = "red 1px solid"; 
						$('#genMsg').fadeIn();
						iEle.focus();
						return false; 
					}//if 
					if(eval(iEle.value) <=  eval(cmdvalue)) { 
						if(!strError || strError.length ==0) { 
							strError = " value should be greater than "+ cmdvalue; 
						}//if               
						document.getElementById("genMsg").innerHTML = strError; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
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
							document.getElementById("genMsg").innerHTML = strError; 
							iEle.style.border = "red 1px solid";
							$('#genMsg').fadeIn();
							iEle.focus();
						return false;                   
						}//if 
					}
					break; 
				}//case regexp 
				case "dontselect": { 
					if(iEle.selectedIndex == null) { 
						document.getElementById("genMsg").innerHTML = "BUG: dontselect command for non-select Item"; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
						iEle.focus();
						return false; 
					} 
					if(iEle.selectedIndex == eval(cmdvalue)) { 
						if(!strError || strError.length ==0) { 
							strError = " Please Select one option "; 
						}//if                                
						document.getElementById("genMsg").innerHTML = strError; 
						iEle.style.border = "red 1px solid";
						$('#genMsg').fadeIn();
						iEle.focus();
						return false;
					}
					break; 
				}//case Date
				case "date": { 
					if(iEle.value.length < 8) { 
						iEle.style.border = "red 1px solid";
						strError = " Invalid Date.";
						document.getElementById("genMsg").innerHTML = strError; 
						iEle.focus();
						return false;
					}else{
						if(iEle.value.indexOf('/') < 0) {							
							iEle.style.border = "red 1px solid";
							strError = " Invalid Date.";
							document.getElementById("genMsg").innerHTML = strError; 
							$('#genMsg').fadeIn();
							iEle.focus();
							return false;
						}else{
							if(iEle.value.indexOf('/') < 0) {
								strError = " Invalid Date.";
								iEle.style.border = "red 1px solid";
								document.getElementById("genMsg").innerHTML = strError; 
								$('#genMsg').fadeIn();
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
	
	document.getElementById("genMsg").innerHTML = '';
	if(txtDate.value != '' && !txtDate.value.match(re)) { 
		document.getElementById("genMsg").innerHTML = errmsg;
		txtDate.value = '';
		txtDate.focus(); 
		return false;
	}
	
	return true; 
}

function refreshParent(){
	window.parent.location.href=window.parent.location.href;
}