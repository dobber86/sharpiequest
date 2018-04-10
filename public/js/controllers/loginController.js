app.controller('loginController',  function($scope, $location, $http, playerStats) {
    
    $scope.login = {
        username: "",
        password: ""
    },

    $scope.doLogin = function () {
        console.log("in login");
        if ($scope.login.username === "") {
            $scope.loginPlayer = "No username entered. Everybody has a name.";
        } else if ($scope.login.password === "") {
            $scope.loginPlayer = "No password entered.";
        } else {
            $http.post('/fetch', angular.toJson($scope.login))
            .then(function (response) {
                console.log("Fetching: " + response.data[0]);
                $scope.loginWrong = "";
                $scope.loginPlayer = response.data[0];
                playerStats.saveUsername($scope.loginPlayer.username);
                $location.path('/combat/');
                
            })
            .catch(function(response) {
                console.log("Terugweg fout invoer");
                $scope.loginWrong = "Wrong username or password. Try again.";
            })
            
        };
    };
});