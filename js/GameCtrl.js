controllers
.controller('GameCtrl', function($scope, $timeout, $compile, Game, $state, Emoji) {

	var container = document.getElementById('game-container');

	$scope.game = Game;


	$scope.endGame = function(reasonLost) {
		$scope.game.lose(reasonLost);
		$state.transitionTo('start',$scope, {reload: true})
		angular.element(document.querySelectorAll('emoji')).remove();
	}

	$scope.handleClick = function(type) {
		var props = Emoji[type];
		if(props.onClick.addToScore) {
			$scope.game.addToScore(props.onClick.addToScore);
		}
		if(props.onClick.endGame) {
			$scope.endGame(props.onClick.endGame);
		}
		if(props.onClick.removeSelector) {
			angular.element(document.querySelectorAll('emoji:not([type="bomb"])')).remove();
		}
		$timeout(function() {
			$scope.$apply();
		}, 0);
	}

	$scope.handleFallen = function(type) {
		var props = Emoji[type];
		if(props.onFall.addToScore) {
			$scope.game.addToScore(props.onFall.addToScore);
		}
		if(props.onFall.endGame) {
			$scope.endGame(props.onFall.endGame);
		}
		if(props.onFall.removeSelector) {
			angular.element(document.querySelectorAll()).remove();
		}
		$timeout(function() {
			$scope.$apply();
		}, 0);
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
	$timeout(newGame, 500); //wait for state to transition in;
});
