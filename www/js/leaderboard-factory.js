factories
.factory('Leaderboard', function($firebaseArray) {

  var scoresRef = new Firebase("https://emojimon.firebaseio.com/scores");
  
  return $firebaseArray(scoresRef.orderByPriority().limitToFirst(20));
});