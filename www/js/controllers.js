angular.module('starter.controllers', ['ngAnimate'])

.controller('GameCtrl', function($scope, $timeout, $compile) {

	var emojiTypes = ["smile", "smile", "smile", "smile", "rage"];


	var container = document.getElementById('game-container');

	$scope.score = 4;
	$scope.isPlaying = true;
	var totalEmojiShown = 0;


	$scope.handleClick = function(type) {
		console.log('click', type);
		if(type === 'smile') {
			$scope.score++;
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
		console.log(type, 'has fallen');
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

		angular.element(document.getElementById('game-container')).append($compile("<emoji type=" + emoji.type +" handle-click='handleClick(\"" + emoji.type+ "\")'></emoji>")($scope));

		$timeout(createEmoji, getRandomIntegerBetween(0, 3000));
	}


createEmoji();
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
			element.on('click', function() {
				scope.handleClick(element.attr('type'));
				this.remove();
				scope.$destroy();
			});
    	setTimeout(function() {
	      element.css({
	      	transform: 'translateY(' + window.innerHeight + 'px)'
	      }).on('transitionend', function() {
	      	this.remove();
	      	scope.$destroy();
	      	scope.handleFallen(element.attr('type'));
	      });
    	}, 1000);
	}
}
})
