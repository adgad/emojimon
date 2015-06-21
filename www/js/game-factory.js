angular.module('starter.factory', [])

.factory('Game', function() {

	var Game = function() {
		this.reset();
	}

	Game.prototype.reset = function() {
		this.pace = 1500;
		this.emojiTypes = ["rage", "rage", "rage", "rage","rage", "rage", "smile", "smile", "smile","smile"];
		this.hasPlayed = false;
		this.isPlaying = false;
		this.score = 0;
	}
	Game.prototype.start = function() {
		this.reset();
		this.hasPlayed = true;
		this.isPlaying = true;
	}
	Game.prototype.lose = function() {
		this.isPlaying = false;
	}

	Game.prototype.nextEmoji = 	function() {
		return this.emojiTypes[Math.floor(Math.random()* this.emojiTypes.length)];
	}
	Game.prototype.addToScore = 	function(n) {
		this.score += n;
		switch(this.score) {
			case 5:
				this.emojiTypes = this.emojiTypes.concat(['bomb', 'bomb'])
		}
	}
	return new Game();
	
});