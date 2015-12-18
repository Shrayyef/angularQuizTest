var myApp = angular.module('myApp', [
	'ngRoute',
	'ngCookies',
	'loginController'
]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/login', {
		resolve : {
			"check" : function($location, $cookies) {
				if ($cookies.get('user')) {
					$location.path('/dashboard');
				}
			}
		},
		templateUrl: 'partials/login.html',
		controller: 'LoginCtrl'
	}).
	when('/logout', {
		templateUrl: 'partials/login.html',
		controller: 'LogoutCtrl'
	}).	
	when('/quiz', {
		resolve: {
			"check" : function($location, $cookies) {
				if (!$cookies.get('user')) {
					$location.path('/login');
				}
			}
		},
		templateUrl: 'partials/quiz.html',
		controller: 'QuizController'
	}).
	when('/dashboard', {
		resolve: {
			"check" : function($location, $cookies) {
				if (!$cookies.get('user')) {
					$location.path('/login');
				}
			}
		},
		templateUrl: 'partials/dashboard.html',
		controller: 'UserDashboard'
	}).		
	otherwise({
		redirectTo: '/login'
	});
}]);