controllers
.controller('GameCtrl', function($scope, $timeout, $compile, Game, $state, Emoji) {

	var container = document.getElementById('game-container');

	$scope.game = Game;
	$scope.emojiPaused = false;


	$scope.endGame = function(reasonLost) {

		$scope.game.lose(reasonLost);
		$state.transitionTo('start',$scope, {reload: true})
		angular.element(document.querySelectorAll('emoji')).remove();
	}

	$scope.handleEnter = function(type) {
		var props = Game.emoji[type];
		if(props.onEnter.addToScore) {
			$scope.game.addToScore(props.onEnter.addToScore);
		}
		if(props.onEnter.endGame) {
			$scope.endGame(props.onEnter.endGame);
		}
		if(props.onEnter.removeSelector) {
			angular.element(document.querySelectorAll(props.onEnter.removeSelector)).remove();
		}
		if(props.onEnter.pause) {
			angular.element(document).triggerHandler('pause');
		}
		if(props.onEnter.ghostify === true) {
			document.body.classList.add('ghostify');
		} else if (props.onEnter.ghostify === false) {
			if(document.querySelectorAll('emoji[type="ghost"]').length <= 1) {
				document.body.classList.remove('ghostify');
			}
		}
		$timeout(function() {
			$scope.$apply();
		}, 0);
	}


	$scope.handleClick = function(type) {
		var props = Game.emoji[type];
		if(props.onClick.addToScore) {
			$scope.game.addToScore(props.onClick.addToScore);
		}
		if(props.onClick.endGame) {
			$scope.endGame(props.onClick.endGame);
		}
		if(props.onClick.removeSelector) {
			angular.element(document.querySelectorAll(props.onClick.removeSelector)).remove();
		}
		if(props.onClick.pause) {
			angular.element(document).triggerHandler('pause');
		}
		if(props.onClick.ghostify === true) {
			document.body.classList.add('ghostify');
		} else if (props.onClick.ghostify === false) {
			if(document.querySelectorAll('emoji[type="ghost"]').length <= 1) {
				document.body.classList.remove('ghostify');
			}
		}
		if(props.onClick.fatten === true) {
			document.body.classList.add('fatten');
			clearTimeout(fattenTimeout);
			var fattenTimeout = setTimeout(function() {
				document.body.classList.remove('fatten');
			}, 9000);
		} else if (props.onClick.fatten === false)  {
			document.body.classList.remove('fatten');
			clearTimeout(fattenTimeout);
		}

		$timeout(function() {
			$scope.$apply();
		}, 0);
	}

	$scope.handleFallen = function(type) {
		var props = Game.emoji[type];
		if(props.onFall.addToScore) {
			$scope.game.addToScore(props.onFall.addToScore);
		}
		if(props.onFall.endGame) {
			$scope.endGame(props.onFall.endGame);
		}
		if(props.onFall.removeSelector) {
			angular.element(document.querySelectorAll()).remove();
		}
		if(props.onFall.ghostify === true) {
			document.body.classList.add('ghostify');
		} else if (props.onFall.ghostify === false) {
			if(document.querySelectorAll('emoji[type="ghost"]').length <= 1) {
				document.body.classList.remove('ghostify');
			}
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
		if(!$scope.emojiPaused) {
			angular.element(document.getElementById('game-container')).append($compile("<emoji type=" + emoji.type +" handle-click='handleClick(\"" + emoji.type+ "\")' handle-fallen='handleFallen(\"" + emoji.type+ "\")' handle-enter='handleEnter(\"" + emoji.type + "\")' data-variant='" + getRandomIntegerBetween(1, 2) + "'></emoji>")($scope));
		}

		if(!forceType) {
			$timeout(createEmoji, getRandomIntegerBetween(0, $scope.game.pace));
		}

	}

	function newGame(){
		if(!$scope.game.hasEverPlayed) {
			$state.transitionTo('tutorial',$scope, {reload: true})
		} else {
			$scope.game.start();
			document.body.classList.remove('ghostify');
			document.body.classList.remove('fatten');
			createEmoji('smile');
			$timeout(function() {
				createEmoji('rage')
			}, getRandomIntegerBetween(0, $scope.game.pace));
			$timeout(createEmoji, getRandomIntegerBetween(0, $scope.game.pace))
		}
	}
	angular.element(document).off('pause');
	angular.element(document).off('unpause');
	angular.element(document).on('pause', function(){
			if($scope.emojiPaused) {
				return;
			}
				$scope.emojiPaused = true;
				angular.element(document.querySelectorAll('emoji')).triggerHandler('pause');
				$timeout(function() {
					angular.element(document).triggerHandler('unpause');
				}, 4000);
	});
	angular.element(document).on('unpause', function() {
		angular.element(document.querySelectorAll('emoji')).triggerHandler('unpause');
				$scope.emojiPaused = false;
	});

	$timeout(newGame, 500); //wait for state to transition in;
});
