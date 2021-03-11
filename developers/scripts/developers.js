function developerSignUp(){
	if(!validateEmail($("#email").val())){
		return triggerAlert("email", "Please enter a valid email address.");
	}
	if($("#password").val() != $("#password_validate").val()){
		var alertArray = new Array;
		alertArray[0] = "password";
		alertArray[1] = "password_validate";
		return triggerAlert(alertArray, "Your passwords do not match.");
	} 
	if($("#password").val().length < 6){
		return triggerAlert("password", "Your password is too short - it must be at least 6 characters.");
	}
	if($("#first_name").val() == ""){
		return triggerAlert("first_name", "Please enter a first name.");
	}
	if($("#last_name").val() == ""){
		return triggerAlert("last_name", "Please enter a last name.");
	}
	if($("#phone_number").val() == ""){
		return triggerAlert("phone_number", "Please enter a phone number.");
	}	
	if($("#url").val().substring(0,4) != "http"){
		return triggerAlert("url", "Please enter a website, starting with http://");
	}	
	if($("#address").val() == ""){
		return triggerAlert("address", "Please enter an address.");
	}
	if($("#city").val() == ""){
		return triggerAlert("city", "Please enter a city name.");
	}
	if($("#zip").val().length < 5){
		return triggerAlert("zip", "Please enter a valid postal code.");
	}
	if($("#why").val() == ""){
		return triggerAlert("why", "Please provide the reason for requesting access.");
	}
	if($("#recaptcha_response_field").val() == ""){
		return triggerAlert("recaptcha_response_field", "Human verification field is required.");
	}

	return true;
}

function developerLogin(){
	if(!validateEmail($("#email_login").val())){
		return triggerAlert("email_login", "Please enter a valid email address");
	}
	if($("#password_login").val().length < 6){
		return triggerAlert("password_login", "Your password is too short.  It must be 6 characters or longer");
	}
	return true;
}

function triggerAlert(id, alertText){
	if (id instanceof Array) {
		if(alertText != ""){
			alert(alertText);
		}
		
		$('html,body').animate({scrollTop: $('#'+id[0]).offset().top}, 250, function(){
			for(i = 0; i < id.length; i++){
				if(typeof $('#'+id[i]).effect != "undefined"){
					$('#'+id[i]).effect('highlight');
				}
			}
			$('#'+id[0]).focus();
		});
		return false;
	} else {
		if(alertText != ""){
			alert(alertText);
		}
		$('html,body').animate({scrollTop: $('#'+id).offset().top}, 250, function(){
			if(typeof $('#'+id).effect != "undefined"){
				$('#'+id).effect('highlight');
			}
			$('#'+id).focus();
		});
		return false;
	}
	return false;
}

function showStep(id){
	if($('#step'+id).length && !$('#step'+id).is(':visible')){
		$('#step'+id).slideDown(500);
	}
	return true;
}
function hideStep(id){
	if($('#step'+id).length && !$('#step'+id).is('visible')){
		if(id <= 3){
			$('#site option:first').prop('selected', true);
			if(id <= 2){
				$('#ad_size option:first').prop('selected', true);			
			}
		}
		new $('#step'+id).slideUp(500);
	}
	$('#Get_Banner_Code').hide();
	return true;
}
function getSearchBoxCode(swt){
	var checkBoxes = $("#searchBoxCodeForm").find('[type="radio"]');
	var tested = false;
	var multiSelect = false;
	checkBoxes.each(function(i, item){
		if($(item).is(':checked')){
			if(tested == false){
				tested = true;
			} else {
				multiSelect = true;
			}	
		}
	});
	if(multiSelect){
		alertArray = new Array;
		alertArray[0] = "keywordSearchBoxDiv";
		alertArray[1] = "keywordLocationSearchBoxWideDiv";
		alertArray[2] = "keywordLocationSearchBoxTallDiv";
		return triggerAlert(alertArray,"Select only 1 search box type");
	}
	if(!tested){
		alertArray = new Array;
		alertArray[0] = "keywordSearchBoxDiv";
		alertArray[1] = "keywordLocationSearchBoxWideDiv";
		alertArray[2] = "keywordLocationSearchBoxTallDiv";
		return triggerAlert(alertArray,"Select a search box above");
	}
	
	if($('#site').val()==''){
		return triggerAlert("site","Please select a site");
	}	
	
	var param = $("#searchBoxCodeForm").serialize();
	
	$("#searchBoxCodeForm :input").prop("disabled", true);
	
	if(swt == "update"){
		var url = '/developers/modify-search-box.ajax.php';
	} else {
		var url = '/developers/create-search-box.ajax.php';
	}
	
	$.ajax({
		url: url, 
		data:   param,
		type:       'post',
		dataType:  	  'text', 
	    success:    function(data){
			if(swt != "update"){
    			$('#codeResponse').html("<code><textarea class='code-block'>" + data + "</textarea></code>");
    			$('#codeResponse').slideDown(500);
			} else {
				alertOverlay("Your search box has been saved successfully");
			}
			$("#step4").slideUp(500);
    		$("#step3").css({"marginBottom":"15px"});
		},
	    error: function(r,e){
			$("#searchBoxCodeForm :input").prop('disabled', false);
			$('#preview-banner').html("");
			$('#codeBlock').html("");
			$('#codeBlock').append("<code>There was an error processing your request.  Contact <a href=\"mailto:support@linkup.com\">support@linkup.com</a> if you continue to recieve this error.</code>");
			$('#codeBlock').slideDown(500);
	    }
	});
	return false;
}


function previewBanner(){
	$('.js-banner-code').hide();

	//validate necessary information
	if($('.js-ad-size').val()==''){
		return triggerAlert('ad_size', 'Select an ad size before you continue');
	}

	if($('.js-criteria-id').val()==''){
		return triggerAlert('criteria_id', 'Select search criteria before you continue');
	}

	if($('.js-site').val()==''){
		return triggerAlert('site', 'Select a site before you continue');
	}

	//show the loading icon
	$('.js-preview-banner').html('<img src="/images/loading.gif"/>');

	//serialize the form parameters
	var params = $('#bannerAd').serialize();

	if($('.js-ad-search').is(':checked')){
		params = params + '&ad_search=1';
	}

	params += "&output=html";

	$.ajax({
		url: '/developers/create-banner-preview.ajax.php',
		data: params,
		type: 'get',
		success:	function(data){
			$('.js-preview-banner').html(data);
			if(/\<table/i.test(data)){
				$('.js-banner-code').show();
			}
		},
	    error: function(r,e){
	    $("#bannerAd :input").prop('disabled', false);
			$('.js-preview-banner').html("");
			$('.js-code-block').html("");
			$('.js-code-block').append("<code>There was an error processing your request.  Contact <a href=\"mailto:support@linkup.com\">support@linkup.com</a> if you continue to recieve this error.</code>");
			$('.js-code-block').slideDown(500);
	    }
	});
}

function saveBanner(swt){
	var params = $("#bannerAd").serialize();
	
	if($('.js-ad-search').is(':checked')){
		params = params + '&ad_search=1';
	}
	
	$("#bannerAd :input").prop("disabled", true);
	$('.js-ad-search').prop("disabled", true);
	
	$(".js-preview-btn").slideUp(300);
	
	if(swt == "update"){
		var url = '/developers/modify-banner.ajax.php';
	} else {
		var url = '/developers/create_banner.ajax.php';
	}
	$.ajax({
		url: url,
		data: params,
		type: 'post',
		dataType: 'text', 
	    success:    function(data){
    		if(swt != 'update'){
    			$('.js-code-block').append("<code>" + data+ "</code>");
    			$('.js-code-block').slideDown(500);
    		} else {
    			alertOverlay("Your banner ad has been saved successfully");
    		}
    		$("#step4").slideUp(500);
    		$("#step3").css({"marginBottom":"15px"});
	    },
	    error: function(r,e){
	    	$("#bannerAd :input").prop('disabled', false);
			$('.js-code-block').html("");
			$('.js-code-block').append("<code>There was an error processing your request.  Contact <a href=\"mailto:support@linkup.com\">support@linkup.com</a> if you continue to recieve this error.</code>");
			$('.js-code-block').slideDown(500);
	    }
	});
	return false;
}

function getSearchKey(){
	if($('#name').val()==''){
		return triggerAlert('name', 'Please provide a name for this request');
	}
	if($('#site').val()==''){
		return triggerAlert('site', 'Select a site before you continue');
	}
	if($('#format').prop('selectedIndex') == 0){
		return triggerAlert('format', 'Select a format before you continue');
	}
	
	var params = $("#embedded-search").serialize();
	
	$("#embedded-search :input").prop("disabled", true);
	$('#get_the_key').addClass('submitButtonDisabled');
	$.ajax({
		url: '/developers/create-direct-access.ajax.php', 
		data:   params,
		type:       'post',
		dataType:	'text', 
	    success:    function(data){
	    	$('#codeBlock').html("<code>" + data + "</code>");
	    	$('#codeBlock').slideDown(500);
	    },
	    error: function(r,e){
	    	$("#embedded-search :input").prop('disabled', false);
			$('#get_the_key').removeClass('submitButtonDisabled');
			
			$('#codeBlock').html("");
			$('#codeBlock').append("<code>There was an error processing your request.  Contact <a href=\"mailto:support@linkup.com\">support@linkup.com</a> if you continue to recieve this error.</code>");
			$('#codeBlock').slideDown(500);
	    }
	});
	return false;
}

function getEmbeddedSearchKey(swt){
	if($('#no-criteria').is(':checked')){
	} else {
		if($('#criteria_id').prop('selectedIndex') == 0){
			return triggerAlert('criteria_id', 'Either select default search criteria or check no default criteria');
		}
	}
	if($('#site').val()==''){
		return triggerAlert('site', 'Select a site before you continue');
	}
	
	var params = $("#embedded-search").serialize();
	
	$("#embedded-search :input").prop('disabled', true);
	
	if(swt == 'update'){
		var url = '/developers/modify-embedded-search.ajax.php';
	} else {
		var url = '/developers/create-embedded-search.ajax.php';
	}
	$.ajax({
		url: url, 
		data:   params,
		type:       'post',
		dataType:  	  'text', 
	    success:    function(data){
    		if(swt != 'update'){
    			$('#codeBlock').html("<code>" + data + "</code>");
    			$('#codeBlock').slideDown(500);
    		} else {
    			alertOverlay("Your embedded search has been saved successfully");
    		}
    		$("#step3").slideUp(500);
    		$("#step2").css({"marginBottom":"15px"});
	    },
	    error: function(r,e){
	    	$("#embedded-search :input").prop('disabled', false);
			$('#codeBlock').html("");
			$('#codeBlock').append("<code>There was an error processing your request.  Contact <a href=\"mailto:support@linkup.com\">support@linkup.com</a> if you continue to recieve this error.</code>");
			$('#codeBlock').slideDown(500);
	    }
	});
	return false;
}

function addSite(){
	var sitename = prompt('Enter site name:');
	
	if(sitename==null){
		return;
	}
	
	if($('#'+sitename) != undefined && $('#'+sitename).parent().prop('id')=='site'){
		alert('Duplicate site name');
		return;
	}
	
	$('<option id="' + sitename + '">' + sitename + '</option>').insertBefore('#add-site-option');
	$('#site').prop('selectedIndex', $('#site').find('option').length-2);
	
	$.ajax({
		url: '/developers/create-site.ajax.php?name='+sitename,
		success: function(data){
			$('#'+sitename).val(data);
			
			if(typeof afterSiteAdd == 'function') { 
				afterSiteAdd(sitename);
			}
		},
	    error: function(r,e){
			$('#'+sitename).remove();
			
			$('#codeBlock').html("");
			$('#codeBlock').append("<code>There was an error processing your request.  Contact <a href=\"mailto:support@linkup.com\">support@linkup.com</a> if you continue to recieve this error.</code>");
			$('#codeBlock').slideDown(500);
	    }
	});
}

function processRequest(id, params, newMsg){
	$.ajax({
		url: path, 
		type: "post",
		data: params,
		success: function(data){
			if(data != "error"){
				if(newMsg){
					$('#topicContainer').append(data);
				} else {
					$("#message"+id).html(data);
				}
				if(typeof $("#message"+id).effect != "undefined"){
					$("#message"+id).effect('highlight');
				}
			} else {
				
			}
		}
	});
}