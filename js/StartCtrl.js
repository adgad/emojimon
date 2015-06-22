controllers

.controller('StartCtrl', function($scope, $timeout, $compile, Game, $state) {
		$scope.game = Game;
});
