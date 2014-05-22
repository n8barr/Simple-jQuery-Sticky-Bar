(function (factory) {
if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module depending on jQuery.
    define(['jquery'], factory);
} else {
    // No AMD. Register plugin with global jQuery object.
    factory(jQuery);
}
}(function($) {
	$.fn.simpleStickyBar = function(options) {
		//function to add style rules to head
		var addStyles = function() {
			$('#jqsbStyle').remove();
			$('<style type="text/css" id="jqsbStyle">.jqsb-stuck-nav {position: fixed; top: 0; z-index:1000;}</style>').appendTo($('head'));
		};

		//build plugin
		return this.each(function() {
			var stuck = false, $body = $('body'), $this = $(this), width, totalWidth, $parent, height, margin = 0, newMargin, nowTop, offset;
			
			//function to parse pixel values
			var cssVal = function(property, that) {
				that = that || $this;
				return parseInt(that.css(property).replace(/[^\d]*/g, ''), 10) || 0;
			};

			//set default options
			options = options || {};
			if (!options.hasOwnProperty('maintainHeight')) options.maintainHeight = false;
			if (!options.hasOwnProperty('maintainWidth')) options.maintainWidth = false;
			if (!options.hasOwnProperty('checkFullWidth')) options.checkFullWidth = false;
			if (!options.hasOwnProperty('maintainMargin')) options.maintainMargin = false;
			if (!options.hasOwnProperty('navbarInline')) options.navbarInline = false;

			//attach necessary styles to head
			addStyles();

			//get starting values
			offset = $this.offset() && $this.offset().top - cssVal('margin-top');
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
					if (options.maintainWidth) $this.css({width: width});
					$this.addClass('jqsb-stuck-nav');
					newMargin = options.maintainHeight ? margin + height : margin;
					newMargin += cssVal(('margin-top'), $parent);
					if (!options.navbarInline) {
						newMargin += offset;
					}
					if (options.maintainMargin) {
						$parent.css({
							'margin-top': newMargin
						});
					}
					stuck = true;
				} else if (stuck && nowTop <= offset) {
					if (options.maintainWidth) $this.css({width: ''});
					$this.removeClass('jqsb-stuck-nav');
					if (options.maintainMargin) {
						$parent.css({
							'margin-top': margin
						});
					}
					stuck = false;
				}
			});
		});
	};
}));