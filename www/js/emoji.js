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
			element.on('touchdown mousedown click', function() {
				if(attr.type === 'rage') {
					endTransition = 'scale(10) translateY(0)';
				} else {
					endTransition = 'rotate(180deg) scale(1.1)'
				}
				element.off('transitionend');
				scope.handleClick(element.attr('type'));

				element.css({
					transform: endTransition,
					transitionDuration: '0.7s'
				})

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
	}
}
})