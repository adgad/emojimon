controllers

.controller('TutorialCtrl', function($scope, $timeout, $compile, Game, $state) {
		$scope.game = Game;
		$scope.game.playedFirstTime();
});
