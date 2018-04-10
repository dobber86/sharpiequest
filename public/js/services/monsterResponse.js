app.service('monsterResponse', function() {
  this.getResponse=function(){
    $scope.playerCurrentHP = Math.max(0,$scope.playerCurrentHP - $scope.enemyPower);
    $scope.playerPercentHP = (100*($scope.playerCurrentHP / $scope.playerMaxHP));
    $scope.playerBar.width = $scope.playerPercentHP+"%";
    $scope.combatLog = "The "+$scope.enemyName+" attacks! You take "+$scope.enemyPower+" damage.";
  }

});