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
	       backgroundImage: 'url("img/emoji/' + attr.type + '.png")'
      });
      var endTransition;

			element.on('touchdown mousedown', function() {

				switch(attr.type) {
					case 'smile':
					case 'blush':
						endTransition = {
							top: element.scrollTop,
							transform: 'scale(0.1) translateY(0)',
							transitionDuration: '0.7s'
						}
						break;
					case 'rage':
					case 'japanese_ogre':
						endTransition = {
							transform: 'rotate(180deg) scale(1.1)',
							transitionDuration: '0.7s',
							opacity: 0
						}
						break;
					case 'bomb':
						endTransition = {
							top: element.offsetTop,
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
});