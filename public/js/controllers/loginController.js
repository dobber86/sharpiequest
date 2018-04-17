app.controller('loginController',  function($scope, $location, $http, playerStats) {
    
    $scope.login = {
        username: "",
        password: ""
    },

    $scope.doLogin = function () {
        console.log("in login");
        if ($scope.login.username === "") {
            $scope.loginWrong = "No username entered. Everybody has a name.";
        } else if ($scope.login.password === "") {
            $scope.loginWrong = "No password entered.";
        } else {
            $http.post('/fetch', angular.toJson($scope.login))
            .then(function (response) {
                console.log("Fetching: " + response.data[0]);
                $scope.loginWrong = "";
                $scope.loginPlayer = response.data[0];
                playerStats.saveUsername(
                    $scope.loginPlayer.username,
                    $scope.loginPlayer.hp,
                    $scope.loginPlayer.maxhp,
                    $scope.loginPlayer.mp,
                    $scope.loginPlayer.maxmp,
                    $scope.loginPlayer.power,
                    $scope.loginPlayer.resistance,
                    $scope.loginPlayer.accuracy,
                    $scope.loginPlayer.insight,
                    $scope.loginPlayer.specialpower,
                    $scope.loginPlayer.xp,
                    $scope.loginPlayer.level,
                    $scope.loginPlayer.money
                );
                $location.path('/combat/');
                
            })
            .catch(function(response) {
                console.log("Terugweg fout invoer" + response);
                $scope.loginWrong = "Wrong username or password. Try again.";
            })
            
        };
    };
});