factories
.factory('Game', function(Emoji, Leaderboard) {

	var paceIncrease = [70,40,30,20,10];

	var Game = function() {
		this.reset();
		
		this.username = localStorage.username || 'Anonymous';
		localStorage.username = this.username;
		this.minLeaderboardScore = Leaderboard.length ? Leaderboard[Leaderboard.length - 1].score : 0;
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
			this.minLeaderboardScore = Leaderboard.length ? Leaderboard[Leaderboard.length - 1].score : 0;
				if(this.score > this.minLeaderboardScore || Leaderboard.length < 19) {
				Leaderboard.$add({
					"name":  this.username,
					"score": this.score,
					"$priority": -this.score
				}, this.score);
				this.isLeader = true;
				this.minLeaderboardScore =  Leaderboard.length ? Leaderboard[Leaderboard.length - 1].score : 0;
			} else {
				this.isLeader = false;
			}
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