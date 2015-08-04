factories
.factory('Game', function(Emoji, Leaderboard) {

	var paceIncrease = [70,40,30,20,10];

	var Game = function() {
		this.reset();
		this.username = localStorage.username || 'Anonymous';
		localStorage.username = this.username;
		if(localStorage.hasEverPlayed) {
			this.hasEverPlayed = true;
		} else {
			this.hasEverPlayed = false;
			localStorage.hasEverPlayed = false;
		}
	}

	Object.defineProperty(Game.prototype, 'type', {
		get: function() {
			return localStorage.lastPlayedType || 'normal'
		},
		set: function(newVal) {
			localStorage.lastPlayedType = newVal;
		}
	})

	Object.defineProperty(Game.prototype, 'leaderboard', {
		get: function() {
			return Leaderboard[this.type];
		}
	});

	Object.defineProperty(Game.prototype, 'minLeaderboardScore', {
		get: function() {
			return this.leaderboard.length > 19 ? this.leaderboard[19].score : 0;
		}
	});

	Object.defineProperty(Game.prototype, 'emoji', {
			get: function() {
			return Emoji[this.type];
		}
	});

	Object.defineProperty(Game.prototype, 'topScoreKey', {
		get: function() {
			return this.type === 'normal' ? 'topScore' : 'topScore.' + this.type;
		}
	});

	Object.defineProperty(Game.prototype, 'topScore', {
		get: function() {
			return localStorage[this.topScoreKey]  ? parseInt(localStorage[this.topScoreKey]) : 0;
		},
		set: function(newVal) {
			localStorage[this.topScoreKey] = newVal;
		}
	});

	Object.defineProperty(Game.prototype, 'pace', {
		get: function() {
			var paces = {
				normal: 1400,
				omgwtf: 750
			};
			return paces[this.type];
		}
	});

	Game.prototype.playedFirstTime = function() {
		this.hasEverPlayed = true;
		localStorage.hasEverPlayed = true;
	}

	Game.prototype.reset = function() {
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

			this.minLeaderboardScore = this.leaderboard.length > 19 ? this.leaderboard[19].score : 0;
			if(this.score > this.minLeaderboardScore || this.leaderboard.length < 19) {
				this.isLeader = true;
				this.minLeaderboardScore = this.leaderboard.length > 19 ? this.leaderboard[19].score : 0;
			} else {
				this.isLeader = false;
			}
			this.leaderboard.$add({
				"name":  this.username,
				"score": this.score,
				"platform": typeof window.device !== 'undefined' ? device.platform : 'web',
				"$priority": -this.score,
			}, this.score);
		}



	}

	Game.prototype.nextEmoji = 	function() {
		return this.emojiTypes[Math.floor(Math.random()* this.emojiTypes.length)];
	}
	Game.prototype.setStage = function(n) {
		this.stage = n;
		this.emojiTypes = [];
		for(var type in this.emoji) {
			for(var i = 0; i < this.emoji[type].probability[n]; i++) {
				this.emojiTypes.push(type);
			}
		};
		this.paceIncrease = paceIncrease[n];
	}
	Game.prototype.addToScore =	function(n) {
		this.score += n;
		if(n < 0) {
			return;
		}
		if(this.pace >= 500) {
			this.pace -= this.paceIncrease;
		}

		if(this.score > 40) {
			this.setStage(4);
		} else if(this.score > 25) {
			this.setStage(3);
		} else if (this.score > 18) {
			this.setStage(2);
			} else if( this.score > 10) {
				this.setStage(1);
			}
	}

	Game.prototype.saveLocalStorage = function() {
		localStorage.username = this.username;
	}

	return new Game();

});
