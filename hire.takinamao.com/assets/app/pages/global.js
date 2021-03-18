(function($){

	var initGlobalSearch = function(){
        var timeout;
		$('#global-search').typeahead({
			source: function(query, process) {
                if (timeout) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(function() {
                    return $.get('/api/graph/search/autocomplete?name=' + query + '&result_list_type=simple')
                        .then(function(data) {
                            return process(data);
                        });
                }, 300);

			},

			displayText: function(item) {
				return item.qualified_name;
			},

			afterSelect: function(item) {
				if (isExternal) {
					window.location.assign("/external/graph/read/" + item.type + "/" + item.graph_id + "/");
				} else {
					window.location.assign("/graph/read/" + item.type + "/" + item.graph_id + "/");
				}
			},

			items: 25
		});
	};

	var init = function(){
		initGlobalSearch();
	};

	$(document).ready(function(){
		init();
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});

		$('#main').on('blur', 'input.salesforceId', function() {
			console.log($(this));

			if ($(this).val() == "") {
				$(this).parent().addClass('has-error');
			} else {
				$(this).parent().removeClass('has-error');
			}
		});

		$("#main").on('keyup', 'input.salesforceId', function() {
			if ($(this).val() == "") {
				$(this).closest('.salesForceParent').find('.salesForceSubmit').prop('disabled', true);
				console.log($(this).closest('.salesForceParent').find('.salesForceSubmit'));
			} else {
				$(this).closest('.salesForceParent').find('.salesForceSubmit').prop('disabled', false);
				console.log($(this).closest('.salesForceParent').find('.salesForceSubmit'));
			}
		});

		toastr.options = {
			"closeButton": true,
			"debug": false,
			"progressBar": true,
			"preventDuplicates": false,
			"positionClass": "toast-top-right",
			"onclick": null,
			"showDuration": "40000",
			"hideDuration": "1000",
			"timeOut": "7000",
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		};

		Ladda.bind('.ladda-button');

		/*if (typeof alertInterval === 'undefined') {
			if (localStorage.getItem('newAlerts') != null) {
				$('.alert-notification').removeClass('hidden');
				$('.alert-notification').text(localStorage.getItem('newAlerts'));
			}
			setInterval(function() {
				$.ajax({
					method: "GET",
					url: '/api/alerts/',
					success: function(data) {
						var currentAlerts = localStorage.getItem('alerts');
						var currentNewAlerts = localStorage.getItem('newAlerts');
						if (currentAlerts == null || data.length < currentAlerts) {
							localStorage.setItem('alerts', data.length);
						} else if (data.length > currentAlerts) {
							if (currentNewAlerts == null) {
								var newAlerts = data.length - currentAlerts;
							} else {
								var newAlerts = (data.length - currentAlerts) + parseInt(currentNewAlerts);
							}
							localStorage.setItem('newAlerts', newAlerts);
							localStorage.setItem('alerts', data.length);

							$('.alert-notification').removeClass('hidden');
							$('.alert-notification').text(localStorage.getItem('newAlerts'));
						}
					}
				})
			}, 1000);
		}*/
	});

})(jQuery);
