angular.module('starter.factory', [])

.factory('Game', function() {

	var Game = function() {
		this.pace = 1500;
		this.hasPlayed = false;
		this.isPlaying = false;
		this.score = 0;
		this.reset();
	}

	Game.prototype.reset = function() {
		this.pace = 1500;
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


	return new Game();
	
});