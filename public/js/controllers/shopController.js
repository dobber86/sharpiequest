app.controller('shopController',  function($scope, $location, $http, playerStats, combatMath) {
    
    //Refresh case
    $scope.playerName = playerStats.getUsername(); 
    if ($scope.playerName == "") {
        $location.path('/');
    }

    // Player statistics and conditions (might be moved to object later)
    $scope.playerXp = playerStats.getXp();
    $scope.playerCurrentHP = playerStats.getHp();
    $scope.playerMaxHP = playerStats.getMaxHp();
    $scope.playerPercentHP = combatMath.getPercentHP($scope.playerCurrentHP, $scope.playerMaxHP);
    $scope.playerMaxMP = playerStats.getMaxMp();
    $scope.playerCurrentMP = playerStats.getMp();
    $scope.playerPercentMP = combatMath.getPercentHP($scope.playerCurrentMP, $scope.playerMaxMP);
    $scope.playerMaxPower = playerStats.getPower();
    $scope.playerPower = $scope.playerMaxPower;
    $scope.playerMaxSpecialPower = playerStats.getSpecialPower();
    $scope.playerSpecialPower = $scope.playerMaxSpecialPower;
    $scope.playerAccuracy = playerStats.getAccuracy();
    $scope.playerMaxResistance = playerStats.getResistance();
    $scope.playerResistance = $scope.playerMaxResistance;
    $scope.playerInsight = playerStats.getInsight();
    $scope.playerLevel = playerStats.getLevel();
    $scope.playerMoney = playerStats.getMoney();
    $scope.playerImage = "img/char/warrior/idle.gif";

    // Player bar size
    $scope.playerHealthBar = {
        "width" : $scope.playerPercentHP+"%"
    }
    $scope.playerManaBar = {
        "width" : $scope.playerPercentMP+"%"
    }
    
    // Button to combat
    $scope.toCombat = function () {
        $location.path('/combat/');
    };

    // Button state
    $scope.buttonState = "opacity: 1.0;";

    $scope.arrow1State = {
        "display" : "none"
    }
    $scope.arrow2State = {
        "display" : "none"
    }
    $scope.arrow3State = {
        "display" : "none"
    }

    $scope.arrowStateOn = function(x) {
        if (x === 1){
          $scope.arrow1State.display = "";
        }
        if (x === 2){
          $scope.arrow2State.display = "";
        }
        if (x === 3){
          $scope.arrow3State.display = "";
        }
    }
    
    $scope.arrowStateOff = function(x) {
        if (x === 1){
          $scope.arrow1State.display = "none";
        }
        if (x === 2){
          $scope.arrow2State.display = "none";
        }
        if (x === 3){
          $scope.arrow3State.display = "none";
        }
    }
   
});