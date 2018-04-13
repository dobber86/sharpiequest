app.controller('updateController',  function($scope, $location, $http, playerStats) {
    
    $scope.playerUpdate = function () {
        console.log("in update");

        $scope.update = {
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

        if ($scope.update.hp === 0) {
            $http.post('/update', angular.toJson($scope.update))
            .then(function (response) {
                console.log("Saving update");
            });
            $location.path('/dead/');
        } else {
            $http.post('/update', angular.toJson($scope.update))
            .then(function (response) {
                console.log("Saving update");
            });
            $location.path('/loot/');   
        }    
    };
});