factories
.factory('Leaderboard', function($firebaseArray) {

  var scoresRef = new Firebase("https://emojimon.firebaseio.com/scores");
  var omgwtfRef = new Firebase("https://emojimon.firebaseio.com/omgwtf");

  return {
    normal: $firebaseArray(scoresRef.orderByPriority()),
    omgwtf: $firebaseArray(omgwtfRef.orderByPriority())
  }
});
