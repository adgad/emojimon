angular.module('starter.factory', [])

.factory('Game', function() {

	var Game = function() {
		this.reset();
		console.log('localStorage', localStorage);
		this.topScore = localStorage['topScore']  ? parseInt(localStorage.topScore) : 0;
		if(localStorage.hasEverPlayed) {
			this.hasEverPlayed = true;
		} else {
			this.hasEverPlayed = false;
			localStorage.hasEverPlayed = false;
		}
	}

	Game.prototype.playedFirstTime = function() {
		this.hasEverPlayed = true;
		localStorage.hasEverPlayed = true;
	}

	Game.prototype.reset = function() {
		this.pace = 1500;
		this.emojiTypes = ["rage", "rage", "rage", "rage","rage", "rage", "rage", "smile","smile", "smile","smile"];
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
		this.topScore = this.score;
		localStorage['topScore'] = this.topScore;
	}

	Game.prototype.nextEmoji = 	function() {
		return this.emojiTypes[Math.floor(Math.random()* this.emojiTypes.length)];
	}
	Game.prototype.addToScore = 	function(n) {
		this.score += n;
		if(this.pace >= 900) {
			this.pace -= 50;
		}
		if(n < 0) {
			return;
		}
		if(this.score >= 15) {
			this.emojiTypes = this.emojiTypes.concat(['japanese_ogre', 'japanese_ogre'])
		} else if (this.score >= 10) {
			this.emojiTypes = this.emojiTypes.concat([, 'blush'])
			} else if(this.score>=5) {
				this.emojiTypes = this.emojiTypes.concat([ 'bomb'])

			}
	}

	return new Game();
	
});