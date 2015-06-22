controllers
.controller('GameCtrl', function($scope, $timeout, $compile, Game, $state) {

	var container = document.getElementById('game-container');

	$scope.game = Game;



	$scope.endGame = function() {
		$scope.game.lose();
		$state.transitionTo('start',$scope, {reload: true})
		angular.element(document.querySelectorAll('emoji')).remove();
	}
	$scope.handleClick = function(type) {
		switch(type) {
			case 'smile':
			case 'grin':
				$scope.endGame();
				break;
			case 'bomb':
				$scope.game.addToScore(-3);
				angular.element(document.querySelectorAll('emoji:not([type="bomb"])')).remove();
				break;
			case 'rage':
				break;
			default:
		}

		$timeout(function() {
			$scope.$apply();
		}, 0);
	}

	$scope.handleFallen = function(type) {
		switch(type) {
			case 'rage':
			case 'japanese_ogre':
				$scope.endGame();
				break;
			case 'smile':
				$scope.game.addToScore(1);
				break;
			case 'grin':
				$scope.game.addToScore(3);
				break;
		}
	}

	function getRandomIntegerBetween(start, end) {
		return Math.floor(Math.random() * end) + start;
	};


	function createEmoji(forceType) {
		if(!$scope.game.isPlaying) {
			return;
		}
		var emoji = {
			type: forceType || $scope.game.nextEmoji()
		};

		angular.element(document.getElementById('game-container')).append($compile("<emoji type=" + emoji.type +" handle-click='handleClick(\"" + emoji.type+ "\")' handle-fallen='handleFallen(\"" + emoji.type+ "\")' data-variant='" + getRandomIntegerBetween(1, 2) + "'></emoji>")($scope));
		if(!forceType) {
			$timeout(createEmoji, getRandomIntegerBetween(0, $scope.game.pace));
		}
		
	}

	function newGame(){
		if(!$scope.game.hasEverPlayed) {
			$state.transitionTo('tutorial',$scope, {reload: true})
		} else {
			$scope.game.start();
			createEmoji('smile');
			$timeout(function() {
				createEmoji('rage')
			}, getRandomIntegerBetween(0, $scope.game.pace));
			$timeout(createEmoji, getRandomIntegerBetween(0, $scope.game.pace))
		}
	}

	newGame();
});
