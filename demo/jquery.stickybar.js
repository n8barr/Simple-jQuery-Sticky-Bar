(function($) {
	$.fn.simpleStickyBar = function() {
		return this.each(function() {
			var stuck = false, $body = $('body'), $this = $(this), $parent, height, margin = 0, nowTop, offset;
			offset = $this.offset() && $this.offset().top;

			$(window).on('scroll', function() {
				//reset div, parent jquery objects if first time or if they no longer exists
				$parent = $parent || $this.parent();

				//get the current body position and settings
				nowTop = $body.scrollTop();
				height = $this.height();

				//adjust styling for stickybar according to position
				if (!stuck && nowTop > offset) {
					margin = parseInt($this.css('margin-top').replace(/[^\d]*/g, ''), 10) || 0;
					$this.css({
						'position': 'fixed',
						'top': 0,
						'z-index': 1000
					});
					$parent.css({
						'margin-top': margin + height
					});
					stuck = true;
				} else if (stuck && nowTop <= offset) {
					$this.css({
						'position': 'inherit',
						'top': 'inherit',
						'z-index': 'inherint'
					});
					$parent.css({
						'margin-top': margin
					});
					stuck = false;
				}
			});
		});
	};
}(jQuery));