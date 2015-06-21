angular.module('starter.controllers', ['ngAnimate'])

.controller('GameCtrl', function($scope, $timeout, $compile) {

	var emojiTypes = ["smile", "smile", "smile", "smile", "rage"];


	var container = document.getElementById('game-container');

	
	$scope.pace = 1500;
	$scope.hasPlayed = false;
	$scope.isPlaying = false;



	$scope.handleClick = function(type) {
		if(type === 'smile') {
			$scope.score++;
			if($scope.pace >= 750) {
				$scope.pace -= 50;
			}
			console.log('score', $scope.score);
		} else {
			$scope.isPlaying = false;
			angular.element(document.querySelectorAll('emoji')).remove();
		}
		$timeout(function() {
			$scope.$apply();
		}, 0);
	}

	$scope.handleFallen = function(type) {
		if(type === 'smile') {
			$scope.isPlaying = false;
			angular.element(document.querySelectorAll('emoji')).remove();
		}
	}

	function getRandomIntegerBetween(start, end) {
		return Math.floor(Math.random() * end) + start;
	};

	function getRandomEmojiType() {
		return emojiTypes[Math.floor(Math.random()*emojiTypes.length)];
	}
	function createEmoji() {
		if(!$scope.isPlaying) {
			return;
		}
		var emoji = {
			type: getRandomEmojiType()
		};

		angular.element(document.getElementById('game-container')).append($compile("<emoji type=" + emoji.type +" handle-click='handleClick(\"" + emoji.type+ "\")' handle-fallen='handleFallen(\"" + emoji.type+ "\")'></emoji>")($scope));

		$timeout(createEmoji, getRandomIntegerBetween(0, $scope.pace));
	}

	$scope.newGame = function() {
		$scope.score = 0;
		$scope.isPlaying = true;
		$scope.hasPlayed = true;
		createEmoji()
	}
})

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
				element.css({
					transform: endTransition,
					transitionDuration: '0.7s'
				})
				element.one('transitionend', function() {
					element.remove();
      		scope.$destroy();
					scope.handleClick(element.attr('type'));
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
