// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var controllers = angular.module('starter.controllers', []);
angular.module('starter', ['ionic', 'starter.directives', 'starter.factory','starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
   $stateProvider
    .state('game', {
      url: "/game",
      templateUrl: "templates/game.html",
      controller: 'GameCtrl',
      cache: false
    })
    .state('tutorial', {
      url: "/tutorial",
      templateUrl: "templates/tutorial.html",
      controller: 'TutorialCtrl'

    })
    .state('start', {
      url: "/",
      templateUrl: "templates/start.html",
      controller: 'StartCtrl'
    });
		var admobid = {};
    document.addEventListener("deviceready", function () {
    	if( /(android)/i.test(navigator.userAgent) ) { // for android
        admobid = {
            banner: 'ca-app-pub-5948456765366965/3183603538'
        };
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
        admobid = {
            banner: 'ca-app-pub-5948456765366965/1397315932'
        };
    }
        

        window.AdMob.createBanner( {
            adId: admobid.banner,
            position: window.AdMob.AD_POSITION.BOTTOM_CENTER,
            autoShow: true } );

    }, false);

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
