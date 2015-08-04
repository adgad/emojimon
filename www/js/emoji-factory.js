factories
.factory('Emoji', function() {

	var scaleFactor = window.innerHeight / 572;
	var normalEmoji = {
		"smile" : {
			stage: 1,
			onClick: {
				endGame: 'Uh oh. You sent away happiness!'
			},
			onFall: {
				addToScore: 1
			},
			onEnter: {},
			probability: [40, 35, 30, 25, 20],
			fallDuration: {
				min: 3.3 * scaleFactor,
				max: 4.1 * scaleFactor
			},
			endTransition: function(element){
				return {
					top: element.scrollTop,
					webkitTransform: 'scale(0.1) translateY(0)',
					transform: 'scale(0.1) translateY(0)',
					webkitTransition: 'all 0.7s ease-in',
					transition: 'all 0.7s ease-in'
				}
			}
		},
		"grin": {
			onClick: {
				endGame: 'Uh oh. You sent away happiness!'
			},
			onFall: {
				addToScore: 2
			},
			onEnter: {},
			probability: [0, 0, 10, 20, 10],
			fallDuration: {
				min: 3.5 * scaleFactor,
				max: 7 * scaleFactor
			},
			endTransition: function(element){
				return {
					top: element.scrollTop,
					webkitTransform: 'scale(0.1) translateY(0)',
					transform: 'scale(0.1) translateY(0)',
					webkitTransition: 'all 0.7s ease-in',
					transition: 'all 0.7s ease-in'
				}
			}
		},
		"rage": {
			onClick: {},
			onFall: {
				endGame: 'Oh no, you let misery and despair in to your life...'
			},
			probability: [60, 45, 40, 30, 40],
			onEnter: {},
			fallDuration: {
				min: 2.3 * scaleFactor,
				max: 3.2 * scaleFactor
			},
			endTransition: function(element){
				return {
					webkitTransform: 'rotate(180deg) scale(1.1)',
					transform: 'rotate(180deg) scale(1.1)',
					webkitTransition: 'all 0.4s ease-in',
					transition: 'all 0.4s ease-in',
					opacity: 0
				}
			}
		},
		"japanese_ogre": {
			onClick: {},
			onFall: {
				endGame: 'The wretched ogre has devoured your happiness...'
			},
			probability: [0, 2, 10, 20, 25],
			onEnter: {},
			fallDuration: {
				min: 1.7 * scaleFactor,
				max: 3 * scaleFactor
			},
			endTransition: function(element){
				return {
					webkitTransform: 'rotate(180deg) scale(1.1)',
					transform: 'rotate(180deg) scale(1.1)',
					webkitTransition: 'all 0.4s ease-in',
					transition: 'all 0.4s ease-in',
					opacity: 0
				}
			}
		},
		"bomb": {
			onClick: {
				addToScore: -5,
				removeSelector: 'emoji:not([type="bomb"])',
				ghostify: false,
				fatten: false
			},
			onFall: {},
			onEnter: {},
			probability: [0, 0, 0, 2, 3],
			fallDuration: {
				min: 2.3 * scaleFactor,
				max: 4.1 * scaleFactor
			},
			endTransition: function(element){
				return {
					top: element.offsetTop,
					webkitTransform: 'scale(3) rotate(1000deg) translate3d(0,0,0)',
					transform: 'scale(3) rotate(1000deg) translate3d(0,0,0)',
					webkitTransition: 'all 0.7s ease-out',
					transition: 'all 0.7s ease-out'
				}
			}
		},
		"watch": {
			onClick: {
				addToScore: -3,
				pause: true
			},
			onEnter: {},
			onFall: {},
			probability: [0, 1, 2, 3, 4],
			fallDuration: {
				min: 2.3 * scaleFactor,
				max: 4.1 * scaleFactor
			},
			endTransition: function(element){
				return {
					webkitTransform: 'rotate(1000deg)',
					transform: 'rotate(1000deg)',
					webkitTransition: 'all 0.7s ease-out',
					transition: 'all 0.7s ease-out'
				}
			}
		},
		"ghost": {
			onEnter: {
				ghostify: true
			},
			onClick: {
				ghostify: false
			},
			onFall: {
				ghostify: false
			},
			probability: [0, 0, 0, 1, 3],
			fallDuration: {
				min: 2.3 * scaleFactor,
				max: 7.1 * scaleFactor
			},
			endTransition: function(element){
				return {
					webkitTransform: 'rotate(180deg) scale(1.1)',
					transform: 'rotate(180deg) scale(1.1)',
					webkitTransition: 'all 0.4s ease-in',
					transition: 'all 0.4s ease-in',
					opacity: 0
				}
			}
		},
		"cake": {
			onEnter: {},
			onClick: {
				addToScore: -2,
				fatten: true
			},
			onFall: {
			},
			probability: [0, 1, 1, 1, 1],
			fallDuration: {
				min: 2.3 * scaleFactor,
				max: 3.1 * scaleFactor
			},
			endTransition: function(element){
				return {
					webkitTransform: 'rotate(180deg) scale(1.1)',
					transform: 'rotate(180deg) scale(1.1)',
					webkitTransition: 'all 0.4s ease-in',
					transition: 'all 0.4s ease-in',
					opacity: 0
				}
			}
		}
	};

	var omgwtfEmoji = {
		"smile" : {
			stage: 1,
			onClick: {
				endGame: 'Uh oh. You sent away happiness!'
			},
			onFall: {
				addToScore: 2
			},
			onEnter: {},
			probability: [20, 20, 25, 20, 10],
			fallDuration: {
				min: 1.5 * scaleFactor,
				max: 3 * scaleFactor
			},
			endTransition: function(element){
				return {
					top: element.scrollTop,
					webkitTransform: 'scale(0.1) translateY(0)',
					transform: 'scale(0.1) translateY(0)',
					webkitTransition: 'all 0.7s ease-in',
					transition: 'all 0.7s ease-in'
				}
			}
		},
		"grin": {
			onClick: {
				endGame: 'Uh oh. You sent away happiness!'
			},
			onFall: {
				addToScore: 4
			},
			onEnter: {},
			probability: [5, 10, 10, 20, 30],
			fallDuration: {
				min: 1.5 * scaleFactor,
				max: 4 * scaleFactor
			},
			endTransition: function(element){
				return {
					top: element.scrollTop,
					webkitTransform: 'scale(0.1) translateY(0)',
					transform: 'scale(0.1) translateY(0)',
					webkitTransition: 'all 0.7s ease-in',
					transition: 'all 0.7s ease-in'
				}
			}
		},
		"rage": {
			onClick: {},
			onFall: {
				endGame: 'Oh no, you let misery and despair in to your life...'
			},
			probability: [60, 45, 40, 30, 40],
			onEnter: {},
			fallDuration: {
				min: 1.2 * scaleFactor,
				max: 3 * scaleFactor
			},
			endTransition: function(element){
				return {
					webkitTransform: 'rotate(180deg) scale(1.1)',
					transform: 'rotate(180deg) scale(1.1)',
					webkitTransition: 'all 0.4s ease-in',
					transition: 'all 0.4s ease-in',
					opacity: 0
				}
			}
		},
		"japanese_ogre": {
			onClick: {},
			onFall: {
				endGame: 'The wretched ogre has devoured your happiness...'
			},
			probability: [10, 11, 14, 25, 40],
			onEnter: {},
			fallDuration: {
				min: 1 * scaleFactor,
				max: 2.4 * scaleFactor
			},
			endTransition: function(element){
				return {
					webkitTransform: 'rotate(180deg) scale(1.1)',
					transform: 'rotate(180deg) scale(1.1)',
					webkitTransition: 'all 0.4s ease-in',
					transition: 'all 0.4s ease-in',
					opacity: 0
				}
			}
		},
		"bomb": {
			onClick: {
				addToScore: -5,
				removeSelector: 'emoji:not([type="bomb"])',
				ghostify: false,
				fatten: false
			},
			onFall: {},
			onEnter: {},
			probability: [2, 2, 2, 3, 4],
			fallDuration: {
				min: 2.3 * scaleFactor,
				max: 4.1 * scaleFactor
			},
			endTransition: function(element){
				return {
					top: element.offsetTop,
					webkitTransform: 'scale(3) rotate(1000deg) translate3d(0,0,0)',
					transform: 'scale(3) rotate(1000deg) translate3d(0,0,0)',
					webkitTransition: 'all 0.7s ease-out',
					transition: 'all 0.7s ease-out'
				}
			}
		},
		"watch": {
			onClick: {
				addToScore: -3,
				pause: true
			},
			onEnter: {},
			onFall: {},
			probability: [0, 1, 2, 3, 4],
			fallDuration: {
				min: 2.3 * scaleFactor,
				max: 4.1 * scaleFactor
			},
			endTransition: function(element){
				return {
					webkitTransform: 'rotate(1000deg)',
					transform: 'rotate(1000deg)',
					webkitTransition: 'all 0.7s ease-out',
					transition: 'all 0.7s ease-out'
				}
			}
		},
		"ghost": {
			onEnter: {
				ghostify: true
			},
			onClick: {
				ghostify: false
			},
			onFall: {
				ghostify: false
			},
			probability: [0, 1, 0, 1, 1],
			fallDuration: {
				min: 0.3 * scaleFactor,
				max: 1.6 * scaleFactor
			},
			endTransition: function(element){
				return {
					webkitTransform: 'rotate(180deg) scale(1.1)',
					transform: 'rotate(180deg) scale(1.1)',
					webkitTransition: 'all 0.4s ease-in',
					transition: 'all 0.4s ease-in',
					opacity: 0
				}
			}
		},
		"cake": {
			onEnter: {},
			onClick: {
				addToScore: -2,
				fatten: true
			},
			onFall: {
			},
			probability: [0, 0, 1, 1, 1],
			fallDuration: {
				min: 2.3 * scaleFactor,
				max: 3.1 * scaleFactor
			},
			endTransition: function(element){
				return {
					webkitTransform: 'rotate(180deg) scale(1.1)',
					transform: 'rotate(180deg) scale(1.1)',
					webkitTransition: 'all 0.4s ease-in',
					transition: 'all 0.4s ease-in',
					opacity: 0
				}
			}
		}
	};

	return {
		normal: normalEmoji,
		omgwtf: omgwtfEmoji
	}
});
