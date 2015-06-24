angular.module('starter.factory', [])

.factory('Game', function() {

	var Game = function() {
		this.reset();
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
		this.pace = 1400;
		this.emojiTypes = ["rage", "rage", "rage", "rage","rage", "rage", "rage", "rage", "smile","smile", "smile","smile"];
		this.hasPlayed = false;
		this.isPlaying = false;
		this.score = 0;
		this.paceIncrease = 50;
	}
	Game.prototype.start = function() {
		this.reset();
		this.hasPlayed = true;
		this.isPlaying = true;
	}
	Game.prototype.lose = function(reasonLost) {
		this.isPlaying = false;
		this.reasonLost = reasonLost;
		console.log('reasonLost', reasonLost);
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
			this.pace -= this.paceIncrease;
		}
		if(this.score > 18 && this.emojiTypes.indexOf('bomb') < 0) {
			this.emojiTypes = this.emojiTypes.concat([ 'bomb', 'rage'])
			this.paceIncrease = 20;
		} else if (this.score > 13 && this.emojiTypes.indexOf('grin') < 0) {
			this.emojiTypes = this.emojiTypes.concat(['grin', 'japanese_ogre']);
			this.paceIncrease = 35;
			} else if( this.score > 7 &&  this.emojiTypes.indexOf('japanese_ogre') < 0) {
				this.emojiTypes = this.emojiTypes.concat(['japanese_ogre'])
				this.paceIncrease = 50;
			}
	}

	return new Game();
	
});