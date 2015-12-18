var loginController = angular.module('loginController', []);

loginController.controller('LoginCtrl', ['$scope', '$http', '$location', '$cookies', '$rootScope', function($scope, $http, $location, $cookies, $rootScope) {
	$http.get('js/users.json').success(function(data) {
		$scope.users = data;
	});
	$scope.submit = function() {
		var username = $scope.username.toLowerCase();
		var password = md5($scope.password);
		for (var i = $scope.users.length - 1; i >= 0; i--) {
			if (username == $scope.users[i].username && password == $scope.users[i].password) {
				$cookies.put('user', username);
				$location.path('/dashboard');
			} else {
				$scope.loginError = 'Username/Password not Correct';
			}
		};
	};
}]);

loginController.controller('LogoutCtrl', ['$location', '$cookies', '$rootScope', function($location, $cookies, $rootScope) {
	if (!$cookies.get('user')) {
		$location.path('/login');
	} else {
		$rootScope.results = '';
		$cookies.remove('user');
		$location.path('/login');
	}

}]);


loginController.controller('QuizController', ['$scope', '$http', '$rootScope', '$timeout', '$location', function($scope, $http, $rootScope, $timeout, $location) {
	$http.get('js/questions.json').success(function(data) {
		$scope.questions = shuffle(data);
	});

	$scope.counter = 120;
	var results = [];
	var questionResult = {};
    $scope.onTimeout = function(){
        $scope.counter--;
        if ($scope.counter > 0) {
            mytimeout = $timeout($scope.onTimeout,1000);
        }
        else {
            $location.path('/dashboard');
        }
    }
    var mytimeout = $timeout($scope.onTimeout,1000);

	$scope.answer = function(qId, aIndex) {
		for (var i = $scope.questions.length - 1; i >= 0; i--) {
			if (qId === $scope.questions[i].id) {
				var questionResult = {};
				if (aIndex === $scope.questions[i].answer) {
					questionResult.id = $scope.questions[i].id;
					questionResult.question = $scope.questions[i].question;
					questionResult.result = 'correct';
					results.push(questionResult);
				} else {
					questionResult.id = $scope.questions[i].id;
					questionResult.question = $scope.questions[i].question;
					questionResult.result = 'false';
					results.push(questionResult);
				}
			}
		};
		$rootScope.results = results;
	};

	$scope.submit = function() {
		$location.path('/dashboard');
    };

}]);

loginController.controller('UserDashboard', ['$scope', '$cookies', '$rootScope', function($scope, $cookies, $rootScope) {
	$scope.user = $cookies.get('user');
	if (typeof $rootScope.results !== 'undefined' && $rootScope.results !== '') {
	   $scope.takenQuiz = true;
	   $scope.results = $rootScope.results;
	   $scope.correctAnswers = 0;
		for (var i = $scope.results.length - 1; i >= 0; i--) {
			if ($scope.results[i].result === 'correct') {
				$scope.correctAnswers++;
			}
		};
	}
	
}]);


function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}




