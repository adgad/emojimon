angular.module('starter.directives', ['ngAnimate'])
.directive('emoji', function($timeout, $animate) {
	var windowWidth = window.innerWidth;
	var emojiSize = 32;
	function getRandomIntegerBetween(start, end) {
		return Math.floor(Math.random() * end) + start;
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

			element.on('touchdown mousedown', function() {

				switch(attr.type) {
					case 'smile':
					case 'grin':
						endTransition = {
							top: element.scrollTop,
							webkitTransform: 'scale(0.1) translateY(0)',
							transform: 'scale(0.1) translateY(0)',
							transitionDuration: '0.7s'
						}
						break;
					case 'rage':
					case 'japanese_ogre':
						endTransition = {
							webkitTransform: 'rotate(180deg) scale(1.1)',
							transform: 'rotate(180deg) scale(1.1)',
							transitionDuration: '0.7s',
							opacity: 0
						}
						break;
					case 'bomb':
						endTransition = {
							top: element.offsetTop,
							webkitTransform: 'scale(3) rotate(1000deg) translate(0)',
							transform: 'scale(3) rotate(1000deg) translate(0)',
							transitionDuration: '0.2s'
						}
				}

				element.off('transitionend');
				scope.handleClick(element.attr('type'));

				element.css(endTransition)

				element.one('transitionend', function() {
					element.remove();
      		scope.$destroy();
      	});
			});
    	setTimeout(function() {
	      element.css({
	      	webkitTransform: 'translateY(' + window.innerHeight + 'px)',
	      	transform: 'translateY(' + window.innerHeight + 'px)'
	      }).one('transitionend', function() {
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