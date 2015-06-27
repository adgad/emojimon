controllers

.controller('StartCtrl', function($scope, $timeout, $compile, Game, $state, $cordovaSocialSharing) {
		$scope.game = Game;

	 $scope.shareAnywhere = function() {
      $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "http://blog.nraboy.com");
  }
});
