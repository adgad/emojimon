angular.module('starter.directives', ['ngAnimate'])
.directive('emoji', function($timeout, $animate, Emoji) {
	var windowWidth = window.innerWidth;
	var emojiSize = 45;


	function getRandomIntegerBetween(start, end) {
		return Math.floor(Math.random() * end) + start;
	};
	function getRandomFloatBetween(start, end) {
		return (Math.random() * end) + start;
	};
	return {
		scope: {
			'handleClick': '&',
			'handleFallen': '&',
			'handleEnter': '&'
		},
		link: function(scope, element, attr) {
			var props = Emoji[attr.type];

      element.css({
	       left: getRandomIntegerBetween(emojiSize, (windowWidth - (2*emojiSize))) + 'px',
	       backgroundImage: 'url("img/emoji/' + attr.type + '.svg")',
 	      	webkitTransition: '-webkit-transform ' + getRandomFloatBetween(props.fallDuration.min, props.fallDuration.max) + 's linear',
 	      	transition: 'transform ' + getRandomFloatBetween(props.fallDuration.min, props.fallDuration.max) + 's linear'

      });
      element.attr('will-change', 'transform');
			element.on('mousedown touchstart  touchend click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				element.off('transitionEnd');
				element.off('webkitTransitionEnd');
				scope.handleClick(element.attr('type'));

				element.css(props.endTransition(element))

				element.one('webkitTransitionEnd transitionEnd', function() {
					element.clickStarted = false;
					element.remove();
      		scope.$destroy();
      	});
      	return false;
			});
			
    	$timeout(function() {
	      element.css({
	      	webkitTransform: 'translate3d(0,' + (window.innerHeight + 50) + 'px, 0) rotateZ(0deg)',
	      	transform: 'translate3d(0,' + (window.innerHeight + 50) + 'px,0) rotateZ(0deg);'
	      }).one('webkitTransitionEnd transitionEnd', function() {
	      	scope.handleFallen(element.attr('type'));
	      	element.remove();
      		scope.$destroy();
	      });

        scope.handleEnter(element.attr('type'));
    	}, 1000);
    	element.off('pause');
    	element.on('pause', function(e) {
    		var style = window.getComputedStyle(element[0], null)
    		var transitionProp = ('transition' in element[0].style) ? 'transitionDuration' : 'webkitTransitionDuration';
    		var transformProp = ('transform' in style) ? 'transform' : 'webkitTransform';
    		element.attr('data-transform', style.getPropertyValue(transformProp) || style[transformProp]);
    		element.attr('data-transition',element[0].style[transitionProp]);

    		element.css({
    			webkitTransform: element.attr('data-transform'),
    			transform: element.attr('data-transform'),
    			webkitTransitionDuration: '10000s',
    			transitionDuration: '10000s',
    			webkitAnimationPlayState: 'paused',
    			animationPlayState: 'paused'
    		});
    	});
    	element.on('unpause', function(e) {
    		var transform = element.attr('data-transform');
    		var heightSoFar =transform.match(/([0-9]*\.[0-9]+)/);
    		var heightToGo = window.innerHeight + 50;
    		var transitionDuration = parseFloat(element.attr('data-transition').replace('s', ''), 10);
    		if(heightSoFar) {
    			heightSoFar = parseFloat(heightSoFar, 10);
    			transitionDuration = transitionDuration * ((heightToGo - heightSoFar) / heightToGo);
    		}
    		element.css({
    				webkitTransitionDuration: transitionDuration + 's',
						transitionDuration: transitionDuration + 's',
    		});
    		$timeout(function() {
    			element.css({
    				webkitTransform: 'matrix(1, 0, 0, 1, 0, ' + (window.innerHeight + 50) + ')',
	      		transform: 'matrix(1, 0, 0, 1, 0, ' + (window.innerHeight + 50) + ')',
	    			webkitAnimationPlayState: 'running',
	    			animationPlayState: 'running'
					});
    		}, 10)

    	})
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
