factories
.factory('Game', function(Emoji) {

	var paceIncrease = [50,50,35,20];

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
		this.hasPlayed = false;
		this.isPlaying = false;
		this.score = 0;
		this.setStage(0);
	}
	Game.prototype.start = function() {
		this.reset();
		this.hasPlayed = true;
		this.isPlaying = true;
	}
	Game.prototype.lose = function(reasonLost) {
		this.isPlaying = false;
		this.reasonLost = reasonLost;
		if(this.score > this.topScore) {
			this.topScore = this.score;
			localStorage['topScore'] = this.topScore;
		}
	}

	Game.prototype.nextEmoji = 	function() {
		return this.emojiTypes[Math.floor(Math.random()* this.emojiTypes.length)];
	}
	Game.prototype.setStage = function(n) {
		this.stage = n;
		this.emojiTypes = [];
		for(var type in Emoji) {
			for(var i = 0; i < Emoji[type].probability[n]; i++) {
				this.emojiTypes.push(type);
			}
		};
		this.paceIncrease = paceIncrease[n];
	}
	Game.prototype.addToScore = 	function(n) {
		this.score += n;
		if(n < 0) {
			return;
		}
		if(this.pace >= 500) {
			this.pace -= this.paceIncrease;
		}
		if(this.score > 25 && this.emojiTypes.indexOf('bomb') < 0) {
			this.setStage(3);
		} else if (this.score > 18 && this.emojiTypes.indexOf('grin') < 0) {
			this.setStage(2);
			} else if( this.score > 7 &&  this.emojiTypes.indexOf('japanese_ogre') < 0) {
				this.setStage(1);
			}
	}

	return new Game();
	
});