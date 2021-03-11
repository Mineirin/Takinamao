var Takinamao_Autocomplete = function() {
	last_category = '';
}

// bind account bar
$(document).ready(function() {
	function set_dropdown_height() {
		if(typeof set_dropdown_height.final_height == 'undefined') {
			set_dropdown_height.final_height = $('#accountbar-username-dropdown > ul').height();
		}
		$('#accountbar-username-dropdown').height(set_dropdown_height.final_height);
	}

	$('.accountbar-username, .accountbar-search-history, .accountbar-saved-jobs, .accountbar-job-alerts').on('click', function(e) {
		var activate = true;
		if($(this).hasClass('active')) {
			activate = false;
		}
		e.preventDefault();
		e.stopPropagation();
		$('#accountbar-username-dropdown').width($('#accountbar-username-container').width()-2);
		$('#accountbar-username, #accountbar-search-history, #accountbar-saved-jobs, #accountbar-job-alerts').removeClass('active');
		$('#accountbar-username-dropdown, #accountbar-search-history-dropdown, #accountbar-saved-jobs-dropdown, #accountbar-job-alerts-dropdown').removeClass('active').css('display', 'none');

		var dropdown_id = '#' + $(this).attr('id') + '-dropdown';

		if(activate) {
			$(this).addClass('active');
			$(dropdown_id).css('display', 'block');
		}
		else {
			$(this).removeClass('active');
			$(dropdown_id).css('display', 'none');
		}
	});

	$(document).on('click', function(e) {
	    var container = $('.dropdown-link');

	    if (!container.is(e.target) && container.has(e.target).length === 0) {
			$('.account-dropdown').hide();
			$('.accountbar-link').removeClass('active');
	    }
	});

	set_dropdown_height();
	$('#accountbar-username-dropdown, #accountbar-search-history-dropdown, #accountbar-saved-jobs-dropdown, #accountbar-job-alerts-dropdown').removeClass('init').css('display','none');




	// Start Autocomplete code
    jQuery.fn.extend({
        propAttr: $.fn.prop || $.fn.attr
    });

	if ( $( "#q" ).length > 0) {
		$( "#q" ).autocomplete({
			minLength: 1,
			source: function (request, callback) {
				//pass request to server  
				$.getJSON("/autocomplete-search.php?q=" + encodeURIComponent(request.term), function (responseData) {

					//create array for response objects  
					var suggestions = [];

					//process response  
					$.each(responseData, function (i, val) {
						suggestions.push(val);
					});

					callback(suggestions);
				});            
			},
			focus: function( event, ui ) {
				$( "#q" ).val( ui.item.s );
				return false;
			},
			select: function( event, ui ) {
				$( "#q" ).val( ui.item.s );
				return false;
			}
		}).on('keyup', function (e) {
			if(e.which === 13) {
				$("#q").autocomplete('close');
			}
		})
		.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
			return $( "<li></li>" ).append( "<a>" + item.i.s + "</a>" ).appendTo( ul );
		};
	}

	if ( $( "#l" ).length > 0) {
		$( "#l" ).autocomplete({
			minLength: 1,
			source: function (request, callback) {
				//pass request to server  
				$.getJSON("/autocomplete-search.php?l=" + request.term, function (responseData) {

					//create array for response objects  
					var suggestions = [];

					//process response  
					$.each(responseData, function (i, val) {
						suggestions.push(val);
					});

					callback(suggestions);
				});            
			},
			focus: function( event, ui ) {
				$( "#l" ).val( ui.item.s );
				return false;
			},
			select: function( event, ui ) {
				$( "#l" ).val( ui.item.s );
				return false;
			}
		}).on('keyup', function (e) {
			if(e.which === 13) {
				$("#l").autocomplete('close');
			}
		})
		.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
			return $( "<li></li>" )
			.append( "<a>" + item.i + "</a>" )
			.appendTo( ul );
		};
	}
	// End of Autocomplete code

	// Attach handler for Secure Browsing checkbox on the Account Settings page
	$('#secure-browsing-checkbox').off('click').on('click', function() {
		var v = document.getElementById('secure-browsing-checkbox').checked ? 'enable' : 'disable';
		$.ajax({
			url:'/account/edit-profile.php?stage=secureBrowsing&setting='+v+'&ajax=true',
			type: 'get',
			dataType: 'text'
		});
	});

	attachAccountbarClickHandlers();
	attachIconStarHandler();

	if(document.URL.match(/\/job\/[0-9a-f]{36}\//i)) {
		attachModalWindow();
	}

	// If the escape key is pressed, hide any modal windows
	$(document).bind('keydown', function(e) { 
        if (e.which == 27) {
            hideModalWindows();
        }
    });

	$('.icon-star.disabled:not(.expired)').on('click', function() {
		showRegistrationModal();
	});

	// If the "Email new jobs that match this search" box exists, animate its opening
	if($('#top-email-alerts').length) {
		$('#top-email-alerts div.alert-form-box').delay(1000).slideDown();
	}

	$('.select-all').on('click', function () {
		$('#unsubscribe-form').find(':checkbox').prop('checked', true);
	});

	$('.deselect-all').on('click', function () {
		$('#unsubscribe-form').find(':checkbox').prop('checked', false);
	});
});

function hideModalWindows() {
	hideEmailJobToAFriend();
	hideRegistrationModal();
}

function attachModalWindow() {
	// Create the screen and modal window
	$('body').prepend('<div id="screen"></div><div id="overlay"><div id="modal-window"><div id="modal-overlay"><div id="modal-overlay-content"></div></div><form id="email-job"><div><p><h2>Email This Job to a Friend</h2></p><p>To<br><input type="email" id="email-job-to" placeholder="friend@example.com" value="" /></p><p>From<br><input type="email" id="email-job-from" placeholder="you@example.com" value="" /></p><p>Message<br><input type="text" id="email-job-message" /></p><input type="button" class="cancel-button" value="Cancel" /><input type="submit" class="send-button" value="Send" /></div></form></div></div>');
	// Set the from attribute if the user is logged in
	if($('#accountbar-username span').text().length > 0) {
		$('#email-job-from').attr('value', $('#accountbar-username span').text());
	}
	// Set the default job message
	$('#email-job-message').attr('value', 'Check out this ' + $('.job-header h1').attr('title')+' job with ' + $('#company-name').text()+'!');

	$('.sprite.sprite-mail-grey.header-link').on('click', function() {
		showEmailJobToAFriend();
	});
}

function attachIconStarHandler() {
	var hash = document.URL.match(/\/job\/([^/]+)/);
	if(hash == null) {
		return false;
	}
	hash = hash[1];

	$('.icon-star:not(.disabled):not(.saved)').off('click').on('click', function() {
		$.ajax({
			url:'/overlays/settings.ajax.php',
			data: "addToSavedJobs=" + hash,
			type: 'get',
			success: function(response){
				if(response === 'success') {
					$('.icon-star:not(.disabled):not(.saved)').attr('title','Remove this from your saved jobs').addClass('saved');
					attachIconStarHandler();
				}
			}
		});
	});

	$('.icon-star.saved:not(.disabled)').off('click').on('click', function() {
		$.ajax({
			url:'/overlays/settings.ajax.php',
			data: "removeFromSavedJobs=" + hash,
			type: 'get',
			success: function(response){
				if(response === 'success') {
					$('.icon-star.saved:not(.disabled)').attr('title','Save this job').removeClass('saved');
					attachIconStarHandler();
				}
			}
		});
	});
}

function emailJobToAFriend() {
	var to		= $('#email-job-to').val();
	var from	= $('#email-job-from').val();
	var message	= $('#email-job-message').val();

	if(!validateEmail(to)) {
		alert("The 'To' email does not appear to be valid.");
		$('#email-job-to').focus();
		return false;
	}

	if(!validateEmail(from)) {
		alert("The 'From' email does not appear to be valid.");
		$('#email-job-from').focus();
		return false;
	}

	$('#modal-overlay').css('display', 'block').css('background-color', '#ffffff');

	$('#modal-overlay-content').html('<p></p><h1>Sending Email...</h1><p></p><div class="ajax-spinner"></div>');

	$('#overlay').animate({
		'margin-top':	'-30px'
	}, 400);

	$('#modal-window').animate({
		'height':	'60px'
	}, 400);

	$('#overlay,#email-job div .cancel-button').off('click');

	$.ajax({
		url: '/overlays/sendtofriend.php',
		type: 'post',
		data: {
			'to-email':		to,
			'from-email':	from,
			'message':		message,
			'cmd':			'submit',
			'hash':			document.URL.match(/job\/..([0-9a-f]{32})..\//i)[1]
		}
	})
	.done(function(data) {
		trackEmailJobToAFriend(); // Defined in job-seekers.js

		var str;

		if(data == 'success') {
			str = '<h1 class="inverted">Email sent!</h1><p class="checkmark">&#10003;</p>';
		}
		else {
			str = '<h1 class="inverted">Error sending message</h1><p class="checkmark">&#10007;</p>';
		}
		$('#modal-overlay-content').animate({
			'opacity':		0
		},
		400, function() {
			$('#modal-overlay').animate({
				'background-color':		'#3A6E8F'
			}, 400);
			$('#modal-overlay-content').html(str).animate({
				'opacity':	1.0
			}, 400);
			setTimeout( function() {  hideEmailJobToAFriend(); }, 1500);
		});
	});		
}

function showRegistrationModal() {
	$('#email-job').css('display', 'none');

	$('#modal-overlay-content').html('<h1>Register to Save This Job</h1><p class="text-left">Getting an account on Takinamao is quick and easy. When you register, you will be able to access your past searches, bookmark your favorite jobs, and manage job alerts that are sent straight to your inbox!</p><p><a href="https://www.Takinamao.com/account/"><strong>Sign Up on Takinamao</strong></a></p><p><a class="cancel" href="#">Not now, thanks</a></p>');
	$('#modal-window').height(188);

	$('#modal-overlay').css('background-color','#ffffff').css('display', 'block');
	$('#screen').stop().css('opacity', '0').css('display', 'block').animate({
		opacity: 0.7
	}, 200, function() {

	});

	$('#overlay').stop().css('margin-top', '-94px').css('opacity', '0').css('display', 'block').animate({
		opacity: 1
	}, 200, function() {
		$('#overlay a').off('click');
		$('#overlay,#email-job div .cancel-button,a.cancel').on('click', function() {
			hideModalWindows();
		});
		$('#modal-overlay-content a:not(.cancel)').on('click', function() {
			window.location = $(this).attr('href');
			return true;
		});
	});
}

function hideRegistrationModal() {
	$('#screen').stop().animate({
		opacity: 0
	}, 200, function() {
		$('#screen').css('display', 'none');
	});

	$('#overlay').stop().animate({
		opacity: 0
	}, 200, function() {
		$('#overlay').css('display', 'none');
		$('#modal-overlay-content').html('');
		$('#email-job').css('display', 'block');
		$('#modal-overlay').css('display', 'none');
	}).off('click');
}

function showEmailJobToAFriend() {
	$('#modal-window').height(280);

	$('#modal-overlay').css('display', 'none');
	$('#screen').stop().css('opacity', '0').css('display', 'block').animate({
		opacity: 0.7
	}, 200, function() {

	});

	$('#overlay').stop().css('margin-top', '-150px').css('opacity', '0').css('display', 'block').animate({
		opacity: 1
	}, 200, function() {
		$('#email-job-to').focus();
		$('#overlay,#email-job div .cancel-button').on('click', function() {
			hideEmailJobToAFriend();
		}).children().click(function(e) {
			// Make sure click event doesn't bubble past backing div
  			return false;
		});

		$('.send-button').on('click', function() {
			emailJobToAFriend();
		});
	});

	$('#email-job').css('display', 'block').on('submit', function(e) {
		e.preventDefault();
		emailJobToAFriend();
	});
}

function hideEmailJobToAFriend() {
	$('#screen').stop().animate({
		opacity: 0
	}, 200, function() {
		$('#screen').css('display', 'none');
	});

	$('#overlay').stop().animate({
		opacity: 0
	}, 200, function() {
		$('#overlay').css('display', 'none');
	}).off('click');

	$('.send-button').off('click');

	$('#email-job').off('submit');
}

// Add job alert for the current user
function addJobAlert(query) {
	$.ajax({
		url:'/job-alert/jobPassThru.php',
		data: {
			url:		window.location.protocol + '//' + window.location.host + '/results.php?' + query,
			email:		$('#accountbar-username').text(),
			source:		6,
			newAlert:	false,
			json:		true
		},
		type: 'get',
		dataType: 'text',
		success: function(response) {
			renderJobs(response, 'jobalerts');
		}
	});

	return false;
}

function addJobByHash(hash) {
	$.ajax({
		url:'/overlays/settings.ajax.php',
		data: "addToSavedJobs=" + hash,
		type: 'get',
		success: function(response){
			if(response === 'success') {
				$.ajax({
					url:'/overlays/settings.ajax.php',
					data: 'getSavedJobs=1',
					success: function(response) {
						renderJobs(response, 'savedjobs');
					}
				});
			}
		}
	});
}

function undeleteSearchHistoryByHash(hash) {
	$.ajax({
		type: "GET",
		dataType: 'text',
		url: "/account/search-history.php?undelete="+hash+"&json=true",
		success: function(response){
			renderJobs(response, 'searchhistory');
		}
	});
}

// Attaches onclick events to items in the dropdown menu
function attachAccountbarClickHandlers() {
	// Search History
	$("#accountbar-search-history-dropdown .remove-item").off('click').on('click', function(e) {
		var text = $(this).prev().text();
		var hash = $(this).attr('href').match(/#(.+)$/)[1];
		var target=$(this);

		target.next().removeClass('highlight').addClass('hidden');
		target.parent().removeAttr('onclick').addClass('inactive');
		target.prev().removeAttr('href').parent().addClass('removing');
		target.html('<img src="/images/account/spinner.gif" />').removeAttr('href');

		target.parent().parent().removeAttr('onclick');

		$.ajax({
			type: "GET",
			dataType: 'text',
			url: "/account/search-history.php?record="+hash+"&json=true"
		}).success(function(response) {
			// Update the Search History dropdown
//			renderJobs(response, 'searchhistory');
			target.parent().removeClass('removing').addClass('removed');
			target.addClass('undo').text('Undo').off('click').on('click', function(e) {
				// Add the job, automatically updates the interface when it's finished
				undeleteSearchHistoryByHash(hash);
				// Bring back our Ajax spinner
				target.html('<img src="/images/account/spinner.gif" />');

				e.stopPropagation();
			});
		});
		e.stopPropagation();
	});

	// Saved Jobs
	// Detach the href from the link and append it to the whole box
	$('#accountbar-saved-jobs-dropdown .dropdown-link').each(function() {
		var t = $('a:not(.view-all)', this);
		var h = t.attr('href');
		if(typeof h == 'string' && ! $(this).hasClass('inactive')) {
			$(this).parent().off('click').on('click', function(e) {
				window.location=h;
				e.stopPropagation();
			});
//			t.removeAttr('href');
		}
	});
	// Add the click handler to the Remove button for every item
	$("#accountbar-saved-jobs-dropdown .remove-item").off('click').on('click', function(e) {
		var text = $(this).prev().text();
		var hash = $(this).attr('href').match(/#(.+)$/)[1];
		var target=$(this);

		target.next().removeClass('highlight').addClass('hidden');
		target.parent().removeAttr('onclick').addClass('inactive');
		target.parent().parent().removeAttr('onclick');
		target.prev().removeAttr('href').parent().addClass('removing');
		target.html('<img src="/images/account/spinner.gif" />').removeAttr('href');

		target.parent().find('a:not(.remove-item)').off('click').on('click', function(e) {
			e.stopPropagation();
			return false;
		});
		target.parent().off('click').on('click', function(e) {
			e.stopPropagation();
			return false;
		});

		$.ajax({
			type: "GET",
			dataType: 'text',
			url: "/account/saved-jobs.php?removeFromSavedJobs="+hash+"&json=true"
		}).success(function(response) {
			target.parent().removeClass('removing').addClass('removed');
			target.addClass('undo').text('Undo').off('click').on('click', function(e) {
				// Add the job, automatically updates the interface when it's finished
				addJobByHash(hash);
				// Bring back our Ajax spinner
				target.html('<img src="/images/account/spinner.gif" />');
				e.stopPropagation();
			});
		});
		e.stopPropagation();
	});

	// Job Alerts
	$("#accountbar-job-alerts-dropdown .remove-item").off('click').on('click', function(e) {
		var text = $(this).prev().text();
		var hash = $(this).attr('href').match(/#(.+)$/)[1];
		var query= $(this).prev().attr('href').match(/\?(.+)$/)[1];
		var target=$(this);
		var email= $('#accountbar-username').text();

		target.next().removeClass('highlight').addClass('hidden');
		target.parent().removeAttr('onclick').addClass('inactive');
		target.prev().removeAttr('href').parent().addClass('removing');
		target.html('<img src="/images/account/spinner.gif" />').removeAttr('href');

		target.parent().find('a:not(.remove-item):not(.view-all)').off('click').on('click', function(e) {
			e.stopPropagation();
			return false;
		});
		target.parent().off('click').on('click', function(e) {
			e.stopPropagation();
			return false;
		});

		$.ajax({
			type: "GET",
			dataType: 'text',
			url: "/account/job-alerts.php?removeAlert="+hash+"&json=true"
		}).success(function(response) {
			target.parent().removeClass('removing').addClass('removed');
			target.addClass('undo').text('Undo').off('click').on('click', function() {
				// Add the job, automatically updates the interface when it's finished
				addJobAlert(query);
				// Bring back our Ajax spinner
				target.html('<img src="/images/account/spinner.gif" />');
			});
		});
		e.stopPropagation();
	});
	// Stop parent from firing if link is clicked
	$("#accountbar-job-alerts-dropdown a:not(.remove-item):not(.view-all)").off('click').on('click', function(e) {
		window.location($(this).attr('href'));
		e.stopPropagation();
		return false;
	});

	// toggle() won't work here
	$('.remove-item').hover(function() {
		$(this).next().addClass('highlight');
	},
	function() {
		$(this).next().removeClass('highlight');	
	});
}

function renderJobs(jobs, target) {
	jobs = $.parseJSON(jobs);
	if(typeof jobs != 'object') {
		console.log("Error: renderJobs() was not passed a valid JSON string");
		return false;
	}
	jobs = {'jobs': $.map(jobs, function(v, i){return v;})};

	var dropdown_id;

	target = target.toLowerCase().replace(/-/g, '');

	switch(target) {
		case 'searchhistory':
			dropdown_id = 'search-history';
		break;

		case 'savedjobs':
			if($('#savedjobs-template').length) {
				var ctemplate = Mustache.render($('#savedjobs-template').html(), jobs);
				$('.js-saved-jobs').html(ctemplate);
			}
			dropdown_id = 'saved-jobs';
		break;

		case 'jobalerts':
			dropdown_id = 'job-alerts';
		break;

		default:
			return false;
	}

	// Update the dropdown contents
	jobs = jobs['jobs'];
	var str = '<ul>';	// String for dropdown menu items
	var add_str = '';	// String for any other UI items, assuming they exist on the page and are related to the current menu section

	for(var j in jobs) {
		str += '<li><span class="dropdown-link">';
		switch(target) {
			// Search History
			case 'searchhistory':
				str += '<a href="'+jobs[j]['url']+'">'	+ jobs[j]['title'] + '</a>';
				// If the search history panel exists on the page, prepare to update it
				if($('#search-history-display').length) {
					add_str += '<div class="job-history-item"><a href="'+jobs[j]['url']+'" title="'+jobs[j]['title']+'">'+jobs[j]['title']+'</a></div>';
				}
			break;

			// Saved Jobs
			case 'savedjobs':
				str += '<a href="'+jobs[j]['url']+'">'	+ jobs[j]['job_title']+' at '+jobs[j]['co_name'] + '</a>';
				// If the saved jobs panel exists on the page, prepare to update it
				if($('#saved-jobs-display').length) {
					add_str += '<li class="savedjobs-item" data-hash="'+jobs[j]['hash']+'"><a href="'+jobs[j]['url']+'" title="'+jobs[j]['job_title']+'">'+jobs[j]['job_title']+' at '+jobs[j]['co_name']+'</a></li>';
				}
			break;

			// Job Alerts
			case 'jobalerts':
				str += '<a href="'+window.location.protocol + '//' + window.location.host + '/results.php?' +jobs[j]['url']+'">'	+ jobs[j]['description'] + '</a>';
			break;
		}
		str += ' <a class="remove-item" href="#'+jobs[j]['hash']+'">×</a><span class="remove-text">Remove</span></span></li>';
	}
	str += '<li><a class="dropdown-link view-all" href="/account/'+dropdown_id+'.php">View All</a></li></ul>';
	$("#accountbar-"+dropdown_id+"-dropdown").html(str);



	// Finish updating the search history right side panel if it exists
	if(target == 'searchhistory' && $('#search-history-display').length) {
		if(add_str == '') {
			add_str = '<p>You currently have no search history. Searches are saved each time you perform a search while logged in.</p><p>Create a new saved search by <a href="/advanced-search.php">searching now</a>.</p>';
		}
		else {
			add_str += '<div class="view-more-link"><a href="/job-seeker-tools/search-history.php">View more and edit</a></div><div class="clearer"></div>';
		}
		$('#search-history-display').html(add_str);
	}
	// Finish updating the saved jobs right side panel if it exists
	else if(target == 'savedjobs' && $('#saved-jobs-display').length) {
		if(add_str == '') {
			add_str = '<li>There are currently no jobs in your Saved Jobs</li>';
		}
		$('#saved-jobs-display').html('<ul class="js-saved-jobs saved-jobs">' + add_str + '</ul>');
	}

	attachAccountbarClickHandlers();
}

function placeholderFix(){
	if (typeof Modernizr != 'undefined' && !Modernizr.input.placeholder){
		$('input').each(function(i){
		if(!$(this).attr('placeholder')){
			return;
		}

		if(!$(this).val()){
			$(this).val($(this).attr('placeholder'));
			$(this).css('color', '#aaa');
		}

			$(this).focus(function(e){
				if ($(this).val() === $(this).attr('placeholder')) {
					$(this).val('');
					$(this).css('color', '#000');
				}
			});

			$(this).blur(function(e){
				if ($(this).val() === '') {
				$(this).css('color', '#aaa');
					$(this).val($(this).attr('placeholder'));
				}
			});
		});

		$('form').submit(function(e){
			$(this).find('input').each(function(i){
				if ($(this).val() === $(this).attr('placeholder')) {
					$(this).val('');
				}
			});
		});
	}
}

//Make sure that indexOf is available to IE7
if (!Array.indexOf) {
	Array.prototype.indexOf = function (obj, start) {
		for (var i = (start || 0); i < this.length; i++) {
			if (this[i] == obj)
				return i;
		}
		return -1;
	};
}

function submitSearchForm(formName,returnVal){
	var hash;
	formName = '#'+formName;
	//Disabling blank elements lets us reduce the size of the hash
	$(formName).find('input,select').each(function(i, item){
		if($(item).val() === '' || $(item).val() == $(item).data('default')){
			$(item).prop('disabled', true);
		}
	});
	hash = $(formName).serialize();

	$(formName).find('input,select').each(function(i, item){
		$(item).prop('disabled', false);
	});
	if(!returnVal){
		window.location='/results.php?'+hash;
		return false;
	} else {
		return hash;
	}
}

function checkSearch(){
	//If c exists, then we're submitting from a form that has more values
	if($('#c')){
		if(
			$('#c').val() === '' &&
			($("#q").val() == $('#q').data('default') || $("#q").val() === "") &&
			($("#l").val() == $('#l').data('default') || $("#l").val() === "") &&
			tagsChecked === 0
		){
			alert("You must provide at least one search term to continue.");
			return false;
		}
	} else {
		if(($("#q").val() == $('#q').data('default') || $("#q").val() === "") &&
			($("#l").val() == $('#l').data('default') || $("#l").val() === "")
		){
			alert("You must provide at least one search term to continue.");
			return false;
		}
	}
	if($("#q").val() == $('#q').data('default')){
		$("#q").val("");
	}
	if($("#l").val() == $('#l').data('default')){
		$("#l").val("");
	}
	return true;
}

function validateEmail(string) {

	// test for empty string
	if (string === "") {
		return false;
	}

	// test for proper form (very liberally)
    var emailFilter = /^([A-Za-z0-9_\+\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!(emailFilter.test(string))) {
			return false;
    }

	//test for illegal characters
	var illegalChars= /[\(\)<>\,\;\:\\\"\[\]]/;
	if (string.match(illegalChars)) {
		return false;
	}

	return true;
}

function validatePassword(string) {

	// test for empty string
	if (string === "") {
		return false;
	}

	// test for strength (very liberally: six or more of any non-space characters)
    var passwordFilter=/^\S{6,}$/;
    if (!(passwordFilter.test(string))) {
			return false;
    }
	
	return true;
}

function validateNumber(field, min, max) {
	if (!min) { min = 0; }
	if (!max) { max = 255; }

	if (isNaN(field.value) || field.value.length < min || field.value.length > max){
		return false;
	}
	return true;
}

function validateString(field, min, max) {
	if (!min) { min = 1; }
	if (!max) { max = 65535; }

	if (!field.value || field.value.length < min || field.value.max > max) {
		return false;
	}
	return true;
}

function launchNewWindow(jobUrl){
	newJobWindow = window.open(jobUrl,'job'+Math.round(Math.random()*1000),'width=800,height=800,toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes');
	if(window.focus) {
		newJobWindow.focus();
	}
	return false;
}


if(typeof(tagsChecked)=='undefined'){
	var tagsChecked = 0;
}

function checked(id){
	id = '#'+id;
	if($(id) && $(id).prop("checked") === true){
		return 0;
	} else if($(id)) {
		$(id).prop("checked", true);
		return 1;
	}
	return;
}

function stripslashes( str ) {
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +      fixed by: Mick@el
    // +   improved by: marrtins
    // +   bugfixed by: Onno Marsman
    // +   improved by: rezna
    // +   input by: Rick Waldron
    // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: stripslashes('Kevin\'s code');
    // *     returns 1: "Kevin's code"
    // *     example 2: stripslashes('Kevin\\\'s code');
    // *     returns 2: "Kevin\'s code"
    return (str+'').replace(/\\(.?)/g, function (s, n1) {
        switch(n1) {
            case '\\':
                return '\\';
            case '0':
                return '\0';
            case '':
                return '';
            default:
                return n1;
        }
    });
}

//Taken from http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
function loadScript(url, callback){
    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
							if(typeof callback == 'function'){
								callback();
							}
            }
        };
    } else {  //Others
			if(typeof callback == 'function'){
				script.onload = function(){
					callback();
				};
			}
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

var Cookie = {
		set : function(name, value, daysToExpire, cookiePath, cookieDomain) {
			var expire = '', path = '', domain = '';
			if (daysToExpire !== undefined && daysToExpire !== false) {
				var d = new Date();
				d.setTime(d.getTime() + (86400000 * parseFloat(daysToExpire)));
				expire = '; expires=' + d.toGMTString();
			}
			if (cookiePath !== undefined) {
				path = '; path=' + cookiePath;
			}
			if (cookieDomain !== undefined) {
				domain = '; domain=' + cookieDomain;
			}
			return (document.cookie = escape(name) + '=' + escape(value || '') + expire + path + domain);
		},
		get : function(name) {
			var cookie = document.cookie.match(new RegExp(
					'(^|;)\\s*' + escape(name) + '=([^;\\s]*)'));
			return (cookie ? unescape(cookie[2]) : null);
		},
		erase : function(name) {
			var cookie = Cookie.get(name) || true;
			Cookie.set(name, '', -1);
			return cookie;
		},
		accept : function() {
			if (typeof navigator.cookieEnabled == 'boolean') {
				return navigator.cookieEnabled;
			}
			Cookie.set('_test', '1');
			return (Cookie.erase('_test') === '1');
		}
	};

function number_format (number, decimals, dec_point, thousands_sep) {
    // Formats a number with grouped thousands
    //
    // version: 906.1806
    // discuss at: http://phpjs.org/functions/number_format
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://getsprink.com)
    // +     bugfix by: Benjamin Lupton
    // +     bugfix by: Allan Jensen (http://www.winternet.no)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +     bugfix by: Howard Yeend
    // +    revised by: Luke Smith (http://lucassmith.name)
    // +     bugfix by: Diogo Resende
    // +     bugfix by: Rival
    // +     input by: Kheang Hok Chin (http://www.distantia.ca/)
    // +     improved by: davook
    // +     improved by: Brett Zamir (http://brett-zamir.me)
    // +     input by: Jay Klehr
    // +     improved by: Brett Zamir (http://brett-zamir.me)
    // +     input by: Amir Habibi (http://www.residence-mixte.com/)
    // +     bugfix by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: number_format(1234.56);
    // *     returns 1: '1,235'
    // *     example 2: number_format(1234.56, 2, ',', ' ');
    // *     returns 2: '1 234,56'
    // *     example 3: number_format(1234.5678, 2, '.', '');
    // *     returns 3: '1234.57'
    // *     example 4: number_format(67, 2, ',', '.');
    // *     returns 4: '67,00'
    // *     example 5: number_format(1000);
    // *     returns 5: '1,000'
    // *     example 6: number_format(67.311, 2);
    // *     returns 6: '67.31'
    // *     example 7: number_format(1000.55, 1);
    // *     returns 7: '1,000.6'
    // *     example 8: number_format(67000, 5, ',', '.');
    // *     returns 8: '67.000,00000'
    // *     example 9: number_format(0.9, 0);
    // *     returns 9: '1'
    // *     example 10: number_format('1.20', 2);
    // *     returns 10: '1.20'
    // *     example 11: number_format('1.20', 4);
    // *     returns 11: '1.2000'
    // *     example 12: number_format('1.2000', 3);
    // *     returns 12: '1.200'
    var n = number, prec = decimals;

    var toFixedFix = function (n,prec) {
        var k = Math.pow(10,prec);
        return (Math.round(n*k)/k).toString();
    };

    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
    var sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
    var dec = (typeof dec_point === 'undefined') ? '.' : dec_point;

    var s = (prec > 0) ? toFixedFix(n, prec) : toFixedFix(Math.round(n), prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

    var abs = toFixedFix(Math.abs(n), prec);
    var _, i;

    if (abs >= 1000) {
        _ = abs.split(/\D/);
        i = _[0].length % 3 || 3;

        _[0] = s.slice(0,i + (n < 0)) +
              _[0].slice(i).replace(/(\d{3})/g, sep+'$1');
        s = _.join(dec);
    } else {
        s = s.replace('.', dec);
    }

    var decPos = s.indexOf(dec);
    if (prec >= 1 && decPos !== -1 && (s.length-decPos-1) < prec) {
        s += new Array(prec-(s.length-decPos-1)).join(0)+'0';
    }
    else if (prec >= 1 && decPos === -1) {
        s += dec+new Array(prec).join(0)+'0';
    }
    return s;
}

mylogger = {};
mylogger.log = function(msg) {
	return false;
};

function localBeacon(page) {
	var d = {c1:2,c2:7190390,c3:"",c4:"",c5:"",c6:"",c15:""};
	var e = document, h = e.location.href;
	if(page){
		h = 'http://www.Takinamao.com'+page;
	}
	var a = 1.7, g = 512, c = function(i, j) {
		if (i === null) {
			return "";
		}
		i = (encodeURIComponent || escape)(i);
		if (j) {
			i = i.substr(0, j);
		}
		return i;
	}, f = [ (e.location.protocol == "https:" ? "https://sb" : "http://b"),
			".scorecardresearch.com/b?", "c1=", c(d.c1), "&c2=", c(d.c2),
			"&rn=", Math.random(), "&c7=", c(h.href, g), "&c3=", c(d.c3),
			"&c4=", c(d.c4, g), "&c5=", c(d.c5), "&c6=", c(d.c6), "&c10=",
			c(d.c10), "&c15=", c(d.c15), "&c16=", c(d.c16), "&c8=", c(e.title),
			"&c9=", c(e.referrer, g), "&cv=", a, d.r ? "&r=" + c(d.r, g) : "" ]
			.join("");
	f = f.length > 2080 ? f.substr(0, 2075) + "&ct=1" : f;
	var b = new Image();
	b.onload = function() {
	};
	b.src = f;
	return f;
};

// moment.js
// version : 1.7.2
// author : Tim Wood
// license : MIT
// momentjs.com
(function(a){function E(a,b,c,d){var e=c.lang();return e[a].call?e[a](c,d):e[a][b]}function F(a,b){return function(c){return K(a.call(this,c),b)}}function G(a){return function(b){var c=a.call(this,b);return c+this.lang().ordinal(c)}}function H(a,b,c){this._d=a,this._isUTC=!!b,this._a=a._a||null,this._lang=c||!1}function I(a){var b=this._data={},c=a.years||a.y||0,d=a.months||a.M||0,e=a.weeks||a.w||0,f=a.days||a.d||0,g=a.hours||a.h||0,h=a.minutes||a.m||0,i=a.seconds||a.s||0,j=a.milliseconds||a.ms||0;this._milliseconds=j+i*1e3+h*6e4+g*36e5,this._days=f+e*7,this._months=d+c*12,b.milliseconds=j%1e3,i+=J(j/1e3),b.seconds=i%60,h+=J(i/60),b.minutes=h%60,g+=J(h/60),b.hours=g%24,f+=J(g/24),f+=e*7,b.days=f%30,d+=J(f/30),b.months=d%12,c+=J(d/12),b.years=c,this._lang=!1}function J(a){return a<0?Math.ceil(a):Math.floor(a)}function K(a,b){var c=a+"";while(c.length<b)c="0"+c;return c}function L(a,b,c){var d=b._milliseconds,e=b._days,f=b._months,g;d&&a._d.setTime(+a+d*c),e&&a.date(a.date()+e*c),f&&(g=a.date(),a.date(1).month(a.month()+f*c).date(Math.min(g,a.daysInMonth())))}function M(a){return Object.prototype.toString.call(a)==="[object Array]"}function N(a,b){var c=Math.min(a.length,b.length),d=Math.abs(a.length-b.length),e=0,f;for(f=0;f<c;f++)~~a[f]!==~~b[f]&&e++;return e+d}function O(a,b,c,d){var e,f,g=[];for(e=0;e<7;e++)g[e]=a[e]=a[e]==null?e===2?1:0:a[e];return a[7]=g[7]=b,a[8]!=null&&(g[8]=a[8]),a[3]+=c||0,a[4]+=d||0,f=new Date(0),b?(f.setUTCFullYear(a[0],a[1],a[2]),f.setUTCHours(a[3],a[4],a[5],a[6])):(f.setFullYear(a[0],a[1],a[2]),f.setHours(a[3],a[4],a[5],a[6])),f._a=g,f}function P(a,c){var d,e,g=[];!c&&h&&(c=require("./lang/"+a));for(d=0;d<i.length;d++)c[i[d]]=c[i[d]]||f.en[i[d]];for(d=0;d<12;d++)e=b([2e3,d]),g[d]=new RegExp("^"+(c.months[d]||c.months(e,""))+"|^"+(c.monthsShort[d]||c.monthsShort(e,"")).replace(".",""),"i");return c.monthsParse=c.monthsParse||g,f[a]=c,c}function Q(a){var c=typeof a=="string"&&a||a&&a._lang||null;return c?f[c]||P(c):b}function R(a){return a.match(/\[.*\]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function S(a){var b=a.match(k),c,d;for(c=0,d=b.length;c<d;c++)D[b[c]]?b[c]=D[b[c]]:b[c]=R(b[c]);return function(e){var f="";for(c=0;c<d;c++)f+=typeof b[c].call=="function"?b[c].call(e,a):b[c];return f}}function T(a,b){function d(b){return a.lang().longDateFormat[b]||b}var c=5;while(c--&&l.test(b))b=b.replace(l,d);return A[b]||(A[b]=S(b)),A[b](a)}function U(a){switch(a){case"DDDD":return p;case"YYYY":return q;case"S":case"SS":case"SSS":case"DDD":return o;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":case"a":case"A":return r;case"Z":case"ZZ":return s;case"T":return t;case"MM":case"DD":case"YY":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":return n;default:return new RegExp(a.replace("\\",""))}}function V(a,b,c,d){var e,f;switch(a){case"M":case"MM":c[1]=b==null?0:~~b-1;break;case"MMM":case"MMMM":for(e=0;e<12;e++)if(Q().monthsParse[e].test(b)){c[1]=e,f=!0;break}f||(c[8]=!1);break;case"D":case"DD":case"DDD":case"DDDD":b!=null&&(c[2]=~~b);break;case"YY":c[0]=~~b+(~~b>70?1900:2e3);break;case"YYYY":c[0]=~~Math.abs(b);break;case"a":case"A":d.isPm=(b+"").toLowerCase()==="pm";break;case"H":case"HH":case"h":case"hh":c[3]=~~b;break;case"m":case"mm":c[4]=~~b;break;case"s":case"ss":c[5]=~~b;break;case"S":case"SS":case"SSS":c[6]=~~(("0."+b)*1e3);break;case"Z":case"ZZ":d.isUTC=!0,e=(b+"").match(x),e&&e[1]&&(d.tzh=~~e[1]),e&&e[2]&&(d.tzm=~~e[2]),e&&e[0]==="+"&&(d.tzh=-d.tzh,d.tzm=-d.tzm)}b==null&&(c[8]=!1)}function W(a,b){var c=[0,0,1,0,0,0,0],d={tzh:0,tzm:0},e=b.match(k),f,g;for(f=0;f<e.length;f++)g=(U(e[f]).exec(a)||[])[0],g&&(a=a.slice(a.indexOf(g)+g.length)),D[e[f]]&&V(e[f],g,c,d);return d.isPm&&c[3]<12&&(c[3]+=12),d.isPm===!1&&c[3]===12&&(c[3]=0),O(c,d.isUTC,d.tzh,d.tzm)}function X(a,b){var c,d=a.match(m)||[],e,f=99,g,h,i;for(g=0;g<b.length;g++)h=W(a,b[g]),e=T(new H(h),b[g]).match(m)||[],i=N(d,e),i<f&&(f=i,c=h);return c}function Y(a){var b="YYYY-MM-DDT",c;if(u.exec(a)){for(c=0;c<4;c++)if(w[c][1].exec(a)){b+=w[c][0];break}return s.exec(a)?W(a,b+" Z"):W(a,b)}return new Date(a)}function Z(a,b,c,d,e){var f=e.relativeTime[a];return typeof f=="function"?f(b||1,!!c,a,d):f.replace(/%d/i,b||1)}function $(a,b,c){var e=d(Math.abs(a)/1e3),f=d(e/60),g=d(f/60),h=d(g/24),i=d(h/365),j=e<45&&["s",e]||f===1&&["m"]||f<45&&["mm",f]||g===1&&["h"]||g<22&&["hh",g]||h===1&&["d"]||h<=25&&["dd",h]||h<=45&&["M"]||h<345&&["MM",d(h/30)]||i===1&&["y"]||["yy",i];return j[2]=b,j[3]=a>0,j[4]=c,Z.apply({},j)}function _(a,c){b.fn[a]=function(a){var b=this._isUTC?"UTC":"";return a!=null?(this._d["set"+b+c](a),this):this._d["get"+b+c]()}}function ab(a){b.duration.fn[a]=function(){return this._data[a]}}function bb(a,c){b.duration.fn["as"+a]=function(){return+this/c}}var b,c="1.7.2",d=Math.round,e,f={},g="en",h=typeof module!="undefined"&&module.exports,i="months|monthsShort|weekdays|weekdaysShort|weekdaysMin|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"),j=/^\/?Date\((\-?\d+)/i,k=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|.)/g,l=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?)/g,m=/([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,n=/\d\d?/,o=/\d{1,3}/,p=/\d{3}/,q=/\d{1,4}/,r=/[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i,s=/Z|[\+\-]\d\d:?\d\d/i,t=/T/i,u=/^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,v="YYYY-MM-DDTHH:mm:ssZ",w=[["HH:mm:ss.S",/T\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/T\d\d:\d\d:\d\d/],["HH:mm",/T\d\d:\d\d/],["HH",/T\d\d/]],x=/([\+\-]|\d\d)/gi,y="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),z={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},A={},B="DDD w M D d".split(" "),C="M D H h m s w".split(" "),D={M:function(){return this.month()+1},MMM:function(a){return E("monthsShort",this.month(),this,a)},MMMM:function(a){return E("months",this.month(),this,a)},D:function(){return this.date()},DDD:function(){var a=new Date(this.year(),this.month(),this.date()),b=new Date(this.year(),0,1);return~~((a-b)/864e5+1.5)},d:function(){return this.day()},dd:function(a){return E("weekdaysMin",this.day(),this,a)},ddd:function(a){return E("weekdaysShort",this.day(),this,a)},dddd:function(a){return E("weekdays",this.day(),this,a)},w:function(){var a=new Date(this.year(),this.month(),this.date()-this.day()+5),b=new Date(a.getFullYear(),0,4);return~~((a-b)/864e5/7+1.5)},YY:function(){return K(this.year()%100,2)},YYYY:function(){return K(this.year(),4)},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return~~(this.milliseconds()/100)},SS:function(){return K(~~(this.milliseconds()/10),2)},SSS:function(){return K(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return a<0&&(a=-a,b="-"),b+K(~~(a/60),2)+":"+K(~~a%60,2)},ZZ:function(){var a=-this.zone(),b="+";return a<0&&(a=-a,b="-"),b+K(~~(10*a/6),4)}};while(B.length)e=B.pop(),D[e+"o"]=G(D[e]);while(C.length)e=C.pop(),D[e+e]=F(D[e],2);D.DDDD=F(D.DDD,3),b=function(c,d){if(c===null||c==="")return null;var e,f;return b.isMoment(c)?new H(new Date(+c._d),c._isUTC,c._lang):(d?M(d)?e=X(c,d):e=W(c,d):(f=j.exec(c),e=c===a?new Date:f?new Date(+f[1]):c instanceof Date?c:M(c)?O(c):typeof c=="string"?Y(c):new Date(c)),new H(e))},b.utc=function(a,c){return M(a)?new H(O(a,!0),!0):(typeof a=="string"&&!s.exec(a)&&(a+=" +0000",c&&(c+=" Z")),b(a,c).utc())},b.unix=function(a){return b(a*1e3)},b.duration=function(a,c){var d=b.isDuration(a),e=typeof a=="number",f=d?a._data:e?{}:a,g;return e&&(c?f[c]=a:f.milliseconds=a),g=new I(f),d&&(g._lang=a._lang),g},b.humanizeDuration=function(a,c,d){return b.duration(a,c===!0?null:c).humanize(c===!0?!0:d)},b.version=c,b.defaultFormat=v,b.lang=function(a,c){var d;if(!a)return g;(c||!f[a])&&P(a,c);if(f[a]){for(d=0;d<i.length;d++)b[i[d]]=f[a][i[d]];b.monthsParse=f[a].monthsParse,g=a}},b.langData=Q,b.isMoment=function(a){return a instanceof H},b.isDuration=function(a){return a instanceof I},b.lang("en",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(a){var b=a%10;return~~(a%100/10)===1?"th":b===1?"st":b===2?"nd":b===3?"rd":"th"}}),b.fn=H.prototype={clone:function(){return b(this)},valueOf:function(){return+this._d},unix:function(){return Math.floor(+this._d/1e3)},toString:function(){return this._d.toString()},toDate:function(){return this._d},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds(),!!this._isUTC]},isValid:function(){return this._a?this._a[8]!=null?!!this._a[8]:!N(this._a,(this._a[7]?b.utc(this._a):b(this._a)).toArray()):!isNaN(this._d.getTime())},utc:function(){return this._isUTC=!0,this},local:function(){return this._isUTC=!1,this},format:function(a){return T(this,a?a:b.defaultFormat)},add:function(a,c){var d=c?b.duration(+c,a):b.duration(a);return L(this,d,1),this},subtract:function(a,c){var d=c?b.duration(+c,a):b.duration(a);return L(this,d,-1),this},diff:function(a,c,e){var f=this._isUTC?b(a).utc():b(a).local(),g=(this.zone()-f.zone())*6e4,h=this._d-f._d-g,i=this.year()-f.year(),j=this.month()-f.month(),k=this.date()-f.date(),l;return c==="months"?l=i*12+j+k/30:c==="years"?l=i+(j+k/30)/12:l=c==="seconds"?h/1e3:c==="minutes"?h/6e4:c==="hours"?h/36e5:c==="days"?h/864e5:c==="weeks"?h/6048e5:h,e?l:d(l)},from:function(a,c){return b.duration(this.diff(a)).lang(this._lang).humanize(!c)},fromNow:function(a){return this.from(b(),a)},calendar:function(){var a=this.diff(b().sod(),"days",!0),c=this.lang().calendar,d=c.sameElse,e=a<-6?d:a<-1?c.lastWeek:a<0?c.lastDay:a<1?c.sameDay:a<2?c.nextDay:a<7?c.nextWeek:d;return this.format(typeof e=="function"?e.apply(this):e)},isLeapYear:function(){var a=this.year();return a%4===0&&a%100!==0||a%400===0},isDST:function(){return this.zone()<b([this.year()]).zone()||this.zone()<b([this.year(),5]).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return a==null?b:this.add({d:a-b})},startOf:function(a){switch(a.replace(/s$/,"")){case"year":this.month(0);case"month":this.date(1);case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return this},endOf:function(a){return this.startOf(a).add(a.replace(/s?$/,"s"),1).subtract("ms",1)},sod:function(){return this.clone().startOf("day")},eod:function(){return this.clone().endOf("day")},zone:function(){return this._isUTC?0:this._d.getTimezoneOffset()},daysInMonth:function(){return b.utc([this.year(),this.month()+1,0]).date()},lang:function(b){return b===a?Q(this):(this._lang=b,this)}};for(e=0;e<y.length;e++)_(y[e].toLowerCase(),y[e]);_("year","FullYear"),b.duration.fn=I.prototype={weeks:function(){return J(this.days()/7)},valueOf:function(){return this._milliseconds+this._days*864e5+this._months*2592e6},humanize:function(a){var b=+this,c=this.lang().relativeTime,d=$(b,!a,this.lang()),e=b<=0?c.past:c.future;return a&&(typeof e=="function"?d=e(d):d=e.replace(/%s/i,d)),d},lang:b.fn.lang};for(e in z)z.hasOwnProperty(e)&&(bb(e,z[e]),ab(e.toLowerCase()));bb("Weeks",6048e5),h&&(module.exports=b),typeof ender=="undefined"&&(this.moment=b),typeof define=="function"&&define.amd&&define("moment",[],function(){return b})}).call(this);

/*! (As of 2012-09-24): https://github.com/janl/mustache.js/blob/master/mustache.js */
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

var Mustache;

(function (exports) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = exports; // CommonJS
  } else if (typeof define === "function") {
    define(exports); // AMD
  } else {
    Mustache = exports; // <script>
  }
}((function () {

  var exports = {};

  exports.name = "mustache.js";
  exports.version = "0.7.0";
  exports.tags = ["{{", "}}"];

  exports.Scanner = Scanner;
  exports.Context = Context;
  exports.Writer = Writer;

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  function testRe(re, string) {
    return RegExp.prototype.test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRe(nonSpaceRe, string);
  }

  var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };

  function escapeRe(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  exports.escape = escapeHtml;

  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      this.tail = this.tail.substring(match[0].length);
      this.pos += match[0].length;
      return match[0];
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var match, pos = this.tail.search(re);

    switch (pos) {
    case -1:
      match = this.tail;
      this.pos += this.tail.length;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, pos);
      this.tail = this.tail.substring(pos);
      this.pos += pos;
    }

    return match;
  };

  function Context(view, parent) {
    this.view = view;
    this.parent = parent;
    this.clearCache();
  }

  Context.make = function (view) {
    return (view instanceof Context) ? view : new Context(view);
  };

  Context.prototype.clearCache = function () {
    this._cache = {};
  };

  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  Context.prototype.lookup = function (name) {
    var value = this._cache[name];

    if (!value) {
      if (name === ".") {
        value = this.view;
      } else {
        var context = this;

        while (context) {
          if (name.indexOf(".") > 0) {
            var names = name.split("."), i = 0;

            value = context.view;

            while (value && i < names.length) {
              value = value[names[i++]];
            }
          } else {
            value = context.view[name];
          }

          if (value != null) {
            break;
          }

          context = context.parent;
        }
      }

      this._cache[name] = value;
    }

    if (typeof value === "function") {
      value = value.call(this.view);
    }

    return value;
  };

  function Writer() {
    this.clearCache();
  }

  Writer.prototype.clearCache = function () {
    this._cache = {};
    this._partialCache = {};
  };

  Writer.prototype.compile = function (template, tags) {
    var fn = this._cache[template];

    if (!fn) {
      var tokens = exports.parse(template, tags);
      fn = this._cache[template] = this.compileTokens(tokens, template);
    }

    return fn;
  };

  Writer.prototype.compilePartial = function (name, template, tags) {
    var fn = this.compile(template, tags);
    this._partialCache[name] = fn;
    return fn;
  };

  Writer.prototype.compileTokens = function (tokens, template) {
    var fn = compileTokens(tokens);
    var self = this;

    return function (view, partials) {
      if (partials) {
        if (typeof partials === "function") {
          self._loadPartial = partials;
        } else {
          for (var name in partials) {
            self.compilePartial(name, partials[name]);
          }
        }
      }

      return fn(self, Context.make(view), template);
    };
  };

  Writer.prototype.render = function (template, view, partials) {
    return this.compile(template)(view, partials);
  };

  Writer.prototype._section = function (name, context, text, callback) {
    var value = context.lookup(name);

    switch (typeof value) {
    case "object":
      if (isArray(value)) {
        var buffer = "";

        for (var i = 0, len = value.length; i < len; ++i) {
          buffer += callback(this, context.push(value[i]));
        }

        return buffer;
      }

      return value ? callback(this, context.push(value)) : "";
    case "function":
      var self = this;
      var scopedRender = function (template) {
        return self.render(template, context);
      };

      return value.call(context.view, text, scopedRender) || "";
    default:
      if (value) {
        return callback(this, context);
      }
    }

    return "";
  };

  Writer.prototype._inverted = function (name, context, callback) {
    var value = context.lookup(name);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0)) {
      return callback(this, context);
    }

    return "";
  };

  Writer.prototype._partial = function (name, context) {
    if (!(name in this._partialCache) && this._loadPartial) {
      this.compilePartial(name, this._loadPartial(name));
    }

    var fn = this._partialCache[name];

    return fn ? fn(context) : "";
  };

  Writer.prototype._name = function (name, context) {
    var value = context.lookup(name);

    if (typeof value === "function") {
      value = value.call(context.view);
    }

    return (value == null) ? "" : String(value);
  };

  Writer.prototype._escaped = function (name, context) {
    return exports.escape(this._name(name, context));
  };

  /**
   * Calculates the bounds of the section represented by the given `token` in
   * the original template by drilling down into nested sections to find the
   * last token that is part of that section. Returns an array of [start, end].
   */
  function sectionBounds(token) {
    var start = token[3];
    var end = start;

    var tokens;
    while ((tokens = token[4]) && tokens.length) {
      token = tokens[tokens.length - 1];
      end = token[3];
    }

    return [start, end];
  }

  /**
   * Low-level function that compiles the given `tokens` into a function
   * that accepts three arguments: a Writer, a Context, and the template.
   */
  function compileTokens(tokens) {
    var subRenders = {};

    function subRender(i, tokens, template) {
      if (!subRenders[i]) {
        var fn = compileTokens(tokens);
        subRenders[i] = function (writer, context) {
          return fn(writer, context, template);
        };
      }

      return subRenders[i];
    }

    return function (writer, context, template) {
      var buffer = "";
      var token, sectionText;

      for (var i = 0, len = tokens.length; i < len; ++i) {
        token = tokens[i];

        switch (token[0]) {
        case "#":
          sectionText = template.slice.apply(template, sectionBounds(token));
          buffer += writer._section(token[1], context, sectionText, subRender(i, token[4], template));
          break;
        case "^":
          buffer += writer._inverted(token[1], context, subRender(i, token[4], template));
          break;
        case ">":
          buffer += writer._partial(token[1], context);
          break;
        case "&":
          buffer += writer._name(token[1], context);
          break;
        case "name":
          buffer += writer._escaped(token[1], context);
          break;
        case "text":
          buffer += token[1];
          break;
        }
      }

      return buffer;
    };
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have a fifth item: an array that contains
   * all tokens in that section.
   */
  function nestTokens(tokens) {
    var tree = [];
    var collector = tree;
    var sections = [];
    var token, section;

    for (var i = 0; i < tokens.length; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case "#":
      case "^":
        token[4] = [];
        sections.push(token);
        collector.push(token);
        collector = token[4];
        break;
      case "/":
        if (sections.length === 0) {
          throw new Error("Unopened section: " + token[1]);
        }

        section = sections.pop();

        if (section[1] !== token[1]) {
          throw new Error("Unclosed section: " + section[1]);
        }

        if (sections.length > 0) {
          collector = sections[sections.length - 1][4];
        } else {
          collector = tree;
        }
        break;
      default:
        collector.push(token);
      }
    }

    // Make sure there were no open sections when we're done.
    section = sections.pop();

    if (section) {
      throw new Error("Unclosed section: " + section[1]);
    }

    return tree;
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var token, lastToken;

    for (var i = 0; i < tokens.length; ++i) {
      token = tokens[i];

      if (lastToken && lastToken[0] === "text" && token[0] === "text") {
        lastToken[1] += token[1];
        lastToken[3] = token[3];
        tokens.splice(i--, 1); // Remove this token from the array.
      } else {
        lastToken = token;
      }
    }
  }

  function escapeTags(tags) {
    if (tags.length !== 2) {
      throw new Error("Invalid tags: " + tags.join(" "));
    }

    return [
      new RegExp(escapeRe(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRe(tags[1]))
    ];
  }

  /**
   * Breaks up the given `template` string into a tree of token objects. If
   * `tags` is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
   * course, the default is to use mustaches (i.e. Mustache.tags).
   */
  exports.parse = function (template, tags) {
    tags = tags || exports.tags;

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var tokens = [],      // Buffer to hold the tokens
        spaces = [],      // Indices of whitespace tokens on the current line
        hasTag = false,   // Is there a {{tag}} on the current line?
        nonSpace = false; // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          tokens.splice(spaces.pop(), 1);
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr;

    while (!scanner.eos()) {
      start = scanner.pos;
      value = scanner.scanUntil(tagRes[0]);

      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(["text", chr, start, start + 1]);
          start += 1;

          if (chr === "\n") {
            stripSpace(); // Check for whitespace on the current line.
          }
        }
      }

      start = scanner.pos;

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) {
        break;
      }

      hasTag = true;
      type = scanner.scan(tagRe) || "name";

      // Skip any whitespace between tag and value.
      scanner.scan(whiteRe);

      // Extract the tag value.
      if (type === "=") {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === "{") {
        var closeRe = new RegExp("\\s*" + escapeRe("}" + tags[1]));
        value = scanner.scanUntil(closeRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = "&";
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error("Unclosed tag at " + scanner.pos);
      }

      tokens.push([type, value, start, scanner.pos]);

      if (type === "name" || type === "{" || type === "&") {
        nonSpace = true;
      }

      // Set the tags for the next time around.
      if (type === "=") {
        tags = value.split(spaceRe);
        tagRes = escapeTags(tags);
      }
    }

    squashTokens(tokens);

    return nestTokens(tokens);
  };

  // The high-level clearCache, compile, compilePartial, and render functions
  // use this default writer.
  var _writer = new Writer();

  /**
   * Clears all cached templates and partials in the default writer.
   */
  exports.clearCache = function () {
    return _writer.clearCache();
  };

  /**
   * Compiles the given `template` to a reusable function using the default
   * writer.
   */
  exports.compile = function (template, tags) {
    return _writer.compile(template, tags);
  };

  /**
   * Compiles the partial with the given `name` and `template` to a reusable
   * function using the default writer.
   */
  exports.compilePartial = function (name, template, tags) {
    return _writer.compilePartial(name, template, tags);
  };

  /**
   * Compiles the given array of tokens (the output of a parse) to a reusable
   * function using the default writer.
   */
  exports.compileTokens = function (tokens, template) {
    return _writer.compileTokens(tokens, template);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  exports.render = function (template, view, partials) {
    return _writer.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  exports.to_html = function (template, view, partials, send) {
    var result = exports.render(template, view, partials);

    if (typeof send === "function") {
      send(result);
    } else {
      return result;
    }
  };

  return exports;

}())));
