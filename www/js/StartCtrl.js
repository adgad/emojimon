controllers

.controller('StartCtrl', function($scope, $timeout, $compile, Game, $state,$cordovaSocialSharing) {
		$scope.game = Game;
		
 	$scope.shareAnywhere = function() {
 			if($scope.game.hasPlayed) {

        $cordovaSocialSharing.share("I just scored " + $scope.game.score + " on Emojimon", null, null, device.platform == "Android" ? "https://play.google.com/store/apps/details?id=com.ionicframework.emojimon715922" : "https://play.google.com/store/apps/details?id=com.ionicframework.emojimon715922"); //TODO: switch for ios url
 			} else {
 				 $cordovaSocialSharing.share("Download Emojimon. It's awesome. Honest.", null, null, device.platform == "Android" ? "https://play.google.com/store/apps/details?id=com.ionicframework.emojimon715922" : "https://play.google.com/store/apps/details?id=com.ionicframework.emojimon715922"); //TODO: switch for ios url
 			}
    }

    $scope.usernameChange = function() {
    	$scope.game.saveLocalStorage();
    }
});
