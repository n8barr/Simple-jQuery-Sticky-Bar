(function($) {
	$.fn.simpleStickyBar = function(options) {
		return this.each(function() {
			var stuck = false, $body = $('body'), $this = $(this), width, totalWidth, css, $parent, height, margin = 0, nowTop, offset;
			var cssVal = function(property) {
				return parseInt($this.css(property).replace(/[^\d]*/g, ''), 10) || 0;
			};
			options = options || {};
			if (!options.hasOwnProperty('maintainHeight')) options.maintainHeight = false;
			if (!options.hasOwnProperty('maintainWidth')) options.maintainWidth = false;
			if (!options.hasOwnProperty('checkFullWidth')) options.checkFullWidth = false;

			//get starting values
			offset = $this.offset() && $this.offset().top;
			if (options.maintainWidth) {
				//set the current width of the div, if it is full width -> set to 100%
				totalWidth = $this.width() + cssVal('margin-left') + cssVal('border-left-width') + cssVal('padding-left') + cssVal('padding-right') + cssVal('border-right-width') + cssVal('margin-right');
				width = options.checkFullWidth && $this.parent().width() == totalWidth ? '100%' : $this.width();
			}

			//bind scroll event handler
			$(window).on('scroll', function() {
				//reset div, parent jquery objects if first time or if they no longer exists
				$parent = $parent || $this.parent();

				//get the current body position and settings
				nowTop = $body.scrollTop();
				height = $this.height();

				//adjust styling for stickybar according to position
				if (!stuck && nowTop > offset) {
					margin = cssVal('margin-top');
					css = {
						'position': 'fixed',
						'top': 0,
						'z-index': 1000
					};
					if (options.maintainWidth) css.width = width;
					$this.css(css);
					$parent.css({
						'margin-top': options.maintainHeight ? margin + offset + height : margin + offset
					});
					stuck = true;
				} else if (stuck && nowTop <= offset) {
					css = {
						'position': 'inherit',
						'top': 'inherit',
						'z-index': 'inherint'
					};
					if (options.maintainWidth) css.width = 'inherit';
					$this.css(css);
					$parent.css({
						'margin-top': margin
					});
					stuck = false;
				}
			});
		});
	};
}(jQuery));