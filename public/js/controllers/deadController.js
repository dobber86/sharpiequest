app.controller('deadController',  function($scope, $location, $http, playerStats) {
    $scope.playerName = playerStats.getUsername();
  
    if ($scope.playerName == "") {
        $location.path('/');
    };

    $scope.playerReset = function () {
        console.log("in reset");
        playerStats.saveReset();

        $scope.reset = {
            username: playerStats.getUsername(),
            hp: playerStats.getHp(),
            maxhp: playerStats.getMaxHp(),
            mp: playerStats.getMp(),
            maxmp: playerStats.getMaxMp(),
            power: playerStats.getPower(),
            resistance: playerStats.getResistance(),
            accuracy: playerStats.getAccuracy(),
            insight: playerStats.getInsight(),
            specialpower: playerStats.getSpecialPower(),
            xp: playerStats.getXp(),
            level: playerStats.getLevel(),
            money: playerStats.getMoney()
        };

        $http.post('/update', angular.toJson($scope.reset))
        .then(function (response) {
            console.log("Saving reset");
        });

        $location.path('/');
 
    };

    $scope.playerDelete = function () {
        console.log("in delete");

        $scope.delete = {
            username: playerStats.getUsername()
        };

        $http.post('/delete', angular.toJson($scope.delete))
        .then(function (response) {
            console.log("Saving delete");
        });

        $location.path('/');

    }
   
    

});