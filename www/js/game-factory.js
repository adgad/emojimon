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
		this.emojiTypes = ["rage", "rage", "rage", "rage","rage", "rage", "rage", "rage", "blush","blush", "blush","blush"];
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
		if(this.score > this.topScore) {
			this.topScore = this.score;
			localStorage['topScore'] = this.topScore;
		}
	}

	Game.prototype.nextEmoji = 	function() {
		return this.emojiTypes[Math.floor(Math.random()* this.emojiTypes.length)];
	}
	Game.prototype.addToScore = 	function(n) {
		this.score += n;
		if(n < 0) {
			return;
		}
		if(this.pace >= 500) {
			this.pace -= 50;
		}
		if(this.score > 17 && this.emojiTypes.indexOf('bomb') < 0) {
			this.emojiTypes = this.emojiTypes.concat([ 'bomb'])
		} else if (this.score > 12 && this.emojiTypes.indexOf('smile') < 0) {
			this.emojiTypes = this.emojiTypes.concat([, 'smile'])
			} else if( this.score > 7 &&  this.emojiTypes.indexOf('japanese_ogre') < 0) {
				this.emojiTypes = this.emojiTypes.concat(['japanese_ogre', 'japanese_ogre'])
			}
	}

	return new Game();
	
});