controllers

.controller('LeaderboardCtrl', function($scope, Game, Leaderboard) {
		$scope.game = Game;
		$scope.leaderboard = Game.leaderboard;
});
