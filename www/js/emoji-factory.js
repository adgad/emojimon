factories
.factory('Emoji', function() {
	return {
		"smile" : {
			stage: 1,
			onClick: {
				endGame: 'Uh oh. You sent away happiness!'
			},
			onFall: {
				addToScore: 1
			},
			probability: [40, 45, 30, 25],
			fallDuration: {
				min: 3.3,
				max: 4.1
			},
			endTransition: function(element){
				return {
					top: element.scrollTop,
					webkitTransform: 'scale(0.1) translate3d(0,0,0)',
					transform: 'scale(0.1) translateY(0)',
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
			probability: [0, 0, 10, 20],
			fallDuration: {
				min: 3.5,
				max: 7
			},
			endTransition: function(element){
				return {
					top: element.scrollTop,
					webkitTransform: 'scale(0.1) translate3d(0,0,0)',
					transform: 'scale(0.1) translateY(0)',
					transition: 'all 0.7s ease-in'
				}
			}
		},
		"rage": {
			onClick: {},
			onFall: {
				endGame: 'Oh no, you let misery and despair in to your life...'
			},
			probability: [60, 45, 40, 30],
			fallDuration: {
				min: 2.5,
				max: 3.5
			},
			endTransition: function(element){
				return {
					webkitTransform: 'rotate(180deg) scale(1.1)',
					transform: 'rotate(180deg) scale(1.1)',
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
			probability: [0, 10, 10, 20],
			fallDuration: {
				min: 1.7,
				max: 3
			},
			endTransition: function(element){
				return {
					webkitTransform: 'rotate(180deg) scale(1.1)',
					transform: 'rotate(180deg) scale(1.1)',
					transition: 'all 0.4s ease-in',
					opacity: 0
				}
			}
		},
		"bomb": {
			onClick: {
				addToScore: -5,
				removeSelector: 'emoji:not([type="bomb"])'
			},
			onFall: {},
			probability: [0, 0, 0, 5],
			fallDuration: {
				min: 2.3,
				max: 4.1
			},
			endTransition: function(element){
				return {
					top: element.offsetTop,
					webkitTransform: 'scale(3) rotate(1000deg) translate3d(0,0,0)',
					transform: 'scale(3) rotate(1000deg) translated3(0,0,0)',
					transition: 'all 0.7s ease-out'
				}
			}
		},
		"watch": {
			onClick: {
				addToScore: -3,
				pause: true
			},
			onFall: {},
			probability: [0, 0, 5, 8],
			fallDuration: {
				min: 2.3,
				max: 4.1
			},
			endTransition: function(element){
				return {
					top: element.offsetTop,
					webkitTransform: 'scale(2) rotate(1000deg) translate3d(0,0,0)',
					transform: 'scale(2) rotate(1000deg) translated3(0,0,0)',
					transition: 'all 0.7s ease-out'
				}
			}
		}
	};
});