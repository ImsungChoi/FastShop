(function($) {
	var defaults = {
		interval: 1400,
		duration: 400,
		autoStart: true
	};
	
	$.fn.carousel = function(options) {
		// defaults + options
		options = $.extend({}, defaults, options);
		
		// Carousel
		var $carousel = this, index = 0, interval = options.interval;
		var $prev = $carousel.find('.prev'), $next = $carousel.find('.next');
		var $first = $carousel.find('ul li:first-child');
		
		$carousel.find('ul').append($carousel.find('li'));
		$carousel.find('ul').append($first.clone());
		
		// $carousel.on('focusin', function(event) {
		// 	if($(this).has(event.relatedTarget).length === 0) {
		// 		$(this).tri
		// 	}
		// })
		
		$next.on('click', function(event) {
			event.preventDefault();
			if ($first.is(':animated')) return;
			var len = $carousel.find('li').length;
			index = (index + 1) % len;
			
			$first.animate(
				{'margin-left' : (-100*index) + '%'}, 
				options.duration,
				function() {
					if (index === len - 1) {
						index = 0;
						$first.css('margin-left', 0 );
					}
				}
			);
		});
		
		$prev.on('click', function(event) {
			event.preventDefault();
			if ($first.is(':animated')) return;
			var len = $carousel.find('li').length;
			
			if (index === 0) {
				index = len - 1;
				$first.css('margin-left', (-100*index)+'%');
			}
			
			index = (index - 1) % len;
			if (index < 0) index = len - 1;
			$first.animate(
				{'margin-left' : (-100*index) + '%'},
				options.duration
			);
		});
		
		var intervalID;
		
		$carousel
			.on('mouseenter', function() {
				$(this).addClass('hover');
				clearInterval(intervalID);
			})
			.on('mouseleave', function() {
				$(this).removeClass('hover');
				intervalID = setInterval(function() {
					$next.trigger('click')
					}, interval + options.duration);
			})
			.on('focusin', function(event) {
				if($(this).has(event.realtedTarget).length === 0) {
					$(this).trigger('mouseenter');
				}
			})
			.on('focusout', function(event) {
				if($(this).has(event.realtedTarget).length === 0) {
					$(this).trigger('mouseleave');
				}
			});
			
		if (options.autoStart) {
			$carousel.trigger('mouseleave');	
		}
		
		return this;
	};
})(window.jQuery);	
