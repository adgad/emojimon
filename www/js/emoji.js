angular.module('starter.directives', ['ngAnimate'])
.directive('emoji', function($timeout, $animate, Emoji) {
	var windowWidth = window.innerWidth;
	var emojiSize = 32;
	var clickEvent = ('ontransitionend' in window) ? 'touchdown mousedown' : 'click';
	

	function getRandomIntegerBetween(start, end) {
		return Math.floor(Math.random() * end) + start;
	};
	function getRandomFloatBetween(start, end) {
		return (Math.random() * end) + start;
	};
	return {
		scope: {
			'handleClick': '&',
			'handleFallen': '&'
		},
		link: function(scope, element, attr) {
			var props = Emoji[attr.type];
      element.css({
	       left: getRandomIntegerBetween(emojiSize, (windowWidth - (2*emojiSize))) + 'px',
	       backgroundImage: 'url("img/emoji/' + attr.type + '.svg")',
 	      	webkitTransitionDuration: getRandomFloatBetween(props.fallDuration.min, props.fallDuration.max) + 's',
 	      	transitionDuration: getRandomFloatBetween(props.fallDuration.min, props.fallDuration.max) + 's'

      });

      element.attr('will-change', 'transform');

			element.on(clickEvent, function(e) {
				e.preventDefault();
				

				element.off('transitionEnd');
				element.off('webkitTransitionEnd');
				scope.handleClick(element.attr('type'));

				element.css(props.endTransition(element))

				element.one('webkitTransitionEnd transitionEnd', function() {
					element.remove();
      		scope.$destroy();
      	});
			});
    	setTimeout(function() {
	      element.css({
	      	webkitTransform: 'translate3d(0,' + (window.innerHeight + 50) + 'px, 0)',
	      	transform: 'translate3d(0,' + (window.innerHeight + 50) + 'px,0)'
	      }).one('webkitTransitionEnd transitionEnd', function() {
	      	scope.handleFallen(element.attr('type'));
	      	element.remove();
      		scope.$destroy();
	      });
    	}, 1000);


	}
}
})
.directive('animateOnChange', function($timeout) {
  return function(scope, element, attr) {
    scope.$watch(attr.animateOnChange, function(nv,ov) {
      if (nv!=ov) {
        element.addClass('changed');
        $timeout(function() {
          element.removeClass('changed');
        }, 300); // Could be enhanced to take duration as a parameter
      }
    });
  };
});