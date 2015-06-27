angular.module('starter.directives', ['ngAnimate'])
.directive('emoji', function($timeout, $animate) {
	var windowWidth = window.innerWidth;
	var emojiSize = 32;
	var clickEvent = ('ontransitionend' in window) ? 'touchdown mousedown' : 'click';
	var duration = {
		'smile': {
			min: 4,
			max: 4.1
		},
		'grin': {
			min: 5,
			max: 8
		},
		'rage': {
			min: 2.2,
			max: 3.5
		},
		japanese_ogre: {
			min: 1.7,
			max: 3
		}
	}

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
      element.css({
	       left: getRandomIntegerBetween(emojiSize, (windowWidth - (2*emojiSize))) + 'px',
	       backgroundImage: 'url("img/emoji/' + attr.type + '.svg")'
      });

      element.attr('will-change', 'transform');
      var endTransition;

			element.on(clickEvent, function(e) {
				e.preventDefault();
				switch(attr.type) {
					case 'smile':
					case 'grin':
						endTransition = {
							top: element.scrollTop,
							webkitTransform: 'scale(0.1) translate3d(0,0,0)',
							transform: 'scale(0.1) translateY(0)',
							transitionDuration: '0.7s'
						}
						break;
					case 'rage':
					case 'japanese_ogre':
						endTransition = {
							webkitTransform: 'rotate(180deg) scale(1.1)',
							transform: 'rotate(180deg) scale(1.1)',
							transitionDuration: '0.4s',
							opacity: 0
						}
						break;
					case 'bomb':
						endTransition = {
							top: element.offsetTop,
							webkitTransform: 'scale(3) rotate(1000deg) translate3d(0,0,0)',
							transform: 'scale(3) rotate(1000deg) translated3(0,0,0)',
							transitionDuration: '0.2s'
						}
				}

				element.off('transitionEnd');
				element.off('webkitTransitionEnd');
				scope.handleClick(element.attr('type'));

				element.css(endTransition)

				element.one('webkitTransitionEnd transitionEnd', function() {
					element.remove();
      		scope.$destroy();
      	});
			});
    	setTimeout(function() {
	      element.css({
	      	webkitTransform: 'translate3d(0,' + (window.innerHeight + 50) + 'px, 0)',
	      	transform: 'translate3d(0,' + (window.innerHeight + 50) + 'px,0)',
	      	transitionDuration: getRandomFloatBetween(duration[attr.type].min, duration[attr.type].max) + 's'
	      }).one('webkitTransitionEnd transitionEnd', function() {
	      	scope.handleFallen(element.attr('type'));
	      	this.remove();
					scope.$destroy();
	      });
    	}, 1000);

    	element.on('$destroy', function () {
		    scope.$destroy();
		  });
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