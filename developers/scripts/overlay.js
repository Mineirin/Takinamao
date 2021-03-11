var watchEscape = false;
function DialogOverlayImagePreload(){
    var imageUrls = ['/images/loading2.gif',
                     '/images/close-button.png',
                     '/images/front/light-blue-box.png'
                     ];
    var images = [];
    for(var i=0;i<imageUrls.length;i++){
         var image = new Image();
         image.src = imageUrls[i];
         images.push(image);
   }
}
function DialogOverlay(content, hideClose) {
	this.content = content;
	this.overlay = $('<div>').hide().css({'background-color':'black','opacity':'0'}).addClass('popupOverlay');
	this.dialog = $('<div>').prop('id', 'DialogContainer').addClass('popupDialog');

	//!! Hide the overlay when clicked. Ignore clicks on the dialog.
	$(this.overlay).click(overlayHide);
	
	// Insert the elements into the DOM
	if(!hideClose){
		this.dialog.append('<a href="#" id="close" onclick="overlay.hide();overlay=false;return false"><span>Close</span></a>');
	} else {
		this.disableHide = true;
	}
	this.dialog.append(this.content);
	this.dialog.hide();
	if ($('#page-content-container').length) {
		$('#page-content-container').append(this.overlay).append(this.dialog);
		if ($(window).height() < $('#page-content-container').height()) {
			$('#page-content-container').css({height:'auto'});
		}
	} else if ($('#wrapper').length) {
		$('#wrapper').append(this.overlay).append(this.dialog);
		if(!$('#resultsBody').length &&  ($(window).height() < $('#content').height())){
			$('#wrapper').css({height:'auto'});
		}
	} else {
		$(document.body).append(this.overlay);
		$(document.body).append(this.dialog);
	}

	// Content may have been hidden if it is embedded in the page
	this.center();
	this.content.show();
};

DialogOverlay.prototype.disableHide = false;

function overlayHide(){
	overlay.hide();
}

DialogOverlay.prototype.center = function() {
	this.popupHeight = $(this.dialog).height() + 30;
	if(this.topSpace && $(document.body).height() < 800){
		this.dialog.css({top:'0px'});
	} else {
		this.moveTo = $(document.body).height() - this.popupHeight;
		this.dialog.css({height:'auto'});
		this.moveTo = Math.round(this.moveTo/2);
		this.dialog.css({top:this.moveTo+'px'});
	}
	this.popupWidth = $(this.dialog).width();
	this.dialog.css({left:Math.round(($(document.body).width() - this.popupWidth)/2)+'px'});
};

DialogOverlay.prototype.resize = function(topPadding) {
	this.dialog.css({position:'absolute'});
	this.topSpace = 'minimal';
};

DialogOverlay.prototype.show = function() {
	watchEscape = true;
	$(this.overlay).show().animate({opacity:0.5},500);
	this.dialog.show();
};

DialogOverlay.prototype.forceHide = function(event) {
	this.disableHide = false;
	this.hide();
};

DialogOverlay.prototype.hide = function(event) {
	if(!this.disableHide){
		watchEscape = false;
		if((this.dialog != false) && $(this.dialog).length){
			$(this.dialog).remove();
		}
		if(this.overlay && $(this.overlay).length){
			$(this.overlay).remove();
		}
		if($('#wrapper').length){
			$('#wrapper').css({height:'100%'});
		}
	}
};

DialogOverlay.prototype.loadedHide = function() {
	watchEscape = false;
	if((this.dialog != false) && $(this.dialog) && $(this.dialog).remove){
		$(this.dialog).remove();
	}
	if(this.overlay && $(this.overlay)){
		$(this.overlay).remove();
	}
	if($('#wrapper').length){
		$('#wrapper').css({height:'100%'});
	}
};

$(document).keypress( function(e){
	if(watchEscape && e.keyCode == 27)
		overlay.hide();
});

var overlay = false;

function showOverlay(content, hash){
	var dialog = $('<div>');
	$(dialog).append('<div style="width:64px;margin:15px auto 5px auto"><img style="" src="/images/loading2.gif"/></div><div id="searchBoxBottom"></div>');
	overlay = new DialogOverlay(dialog);
	overlay.show();
	
	url = '/overlays/'+content+'.php';
	if(typeof(hash) != 'undefined'){
		url+='?hash='+hash;
	}
	$.ajax({
		url:url,
		success: function(data) {
			dialog.html(data + '<div id="searchBoxBottom"></div>');
			overlay.center();
		}
	});
};

function loadingReportOverlay(){
	var dialog = $('<div>');
	$(dialog).append('<div style="width:64px;margin:15px auto 5px auto;position:relative;z-index:100"><img src="/images/loading2.gif"/></div><h2 style="color:#000;float:none;text-align:center;" id="reportProgress">Please wait while we generate your report&#8230;</h2><div id="searchBoxBottom"></div>');
	overlay = new DialogOverlay(dialog, true);
	overlay.show();
	overlay.center();
};

var reportProgress = false, countdownTime = false;
function updateReportProgress(reportKey, onFinishFunction){
	if (reportKey.length != 8) {
		alert("Server returned an invalid response. Please contact technical support.\n\n"+reportKey);
		overlay.forceHide();
	}
	$('#reportProgress').html('<span style="font-weight:normal">Querying current report status...</span>');
	$.ajax({
		type:'POST',
		url:'/includes/report-status.php',
		data:"id="+reportKey,
		success: function(data) {
			if (typeof data != 'object') {
				alert("Server returned an invalid response. Please contact technical support.");
				overlay.forceHide();
				if (onFinishFunction) {
					onFinishFunction();
				}
				return;
			} else if (data.status == 'success' || data.status == 'failure') {
				if ($('#report-submit-button').length) {
					$('#report-submit-button').attr('disabled', false);
				}
				$('#report_display div').html(data.details);
				overlay.forceHide();
				$('#report_display').show();
				var new_position = $('#report_display').offset();
			    window.scrollTo(new_position.left,new_position.top);
				if (onFinishFunction) {
					onFinishFunction();
				}
				return;
			}
			//To show that we're actually getting a status, don't report the status too quickly
			setTimeout(function(){
				countdownTime = 5;
				$('#reportProgress').html('<span style="font-weight:normal">Current report status: <strong>'+data.status+'</strong>. Checking again in <strong id="statusCountdown">'+countdownTime+'</strong>...</span>');
				reportProgress = setInterval(
					function(){
						if (countdownTime == 0) {
							updateReportProgress(reportKey, onFinishFunction);
							clearInterval(reportProgress);
						} else {
							$('#statusCountdown').html(--countdownTime);
						}
					},
					1000
				);
			}, 2000);
		}
	});
}

function processingRequestOverlay(){
	var dialog = $('<div>');
	$(dialog).append('<div style="width:64px;margin:15px auto 5px auto"><img src="/images/loading2.gif"/></div><h1 style="display: block; text-align: center;">Please wait while we process your request</h1><div id="searchBoxBottom"></div>');
	overlay = new DialogOverlay(dialog, true);
	overlay.show();
	overlay.center();
	overlay;
};

function alertOverlay(msg){
	var dialog = $('<div>');
	$(dialog).append('<div style="width:64px;margin:15px auto 5px auto"></div><h2 style="display: block; text-align: center; width: 95%">'+msg+'</h2><div id="searchBoxBottom"></div>');
	overlay = new DialogOverlay(dialog);
	overlay.show();
	overlay.center();
};

$(document).resize(function() {
	if(overlay != false && overlay.center){
		overlay.center();
	}
});