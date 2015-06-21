controllers

.controller('GameCtrl', function($scope, $timeout, $compile, Game, $state) {

	var emojiTypes = ["smile", "smile", "smile", "smile", "rage"];


	var container = document.getElementById('game-container');

	$scope.game = Game;



	$scope.endGame = function() {
		$scope.game.lose();
		$state.transitionTo('start',$scope, {reload: true})
		angular.element(document.querySelectorAll('emoji')).remove();
	}
	$scope.handleClick = function(type) {
		if(type === 'smile') {
			$scope.game.score++;
			if($scope.game.pace >= 750) {
				$scope.game.pace -= 50;
			}
			console.log('score', $scope.game.score);
		} else {
			$scope.endGame();
		}
		$timeout(function() {
			$scope.$apply();
		}, 0);
	}

	$scope.handleFallen = function(type) {
		if(type === 'smile') {
			$scope.endGame();
		}
	}

	function getRandomIntegerBetween(start, end) {
		return Math.floor(Math.random() * end) + start;
	};

	function getRandomEmojiType() {
		return emojiTypes[Math.floor(Math.random()*emojiTypes.length)];
	}
	function createEmoji() {
		if(!$scope.game.isPlaying) {
			return;
		}
		var emoji = {
			type: getRandomEmojiType()
		};

		angular.element(document.getElementById('game-container')).append($compile("<emoji type=" + emoji.type +" handle-click='handleClick(\"" + emoji.type+ "\")' handle-fallen='handleFallen(\"" + emoji.type+ "\")'></emoji>")($scope));

		$timeout(createEmoji, getRandomIntegerBetween(0, $scope.game.pace));
	}

	$scope.newGame = function (){
		console.log('scope.game', $scope.game);
		$scope.game.start();
		createEmoji()
	}
});
