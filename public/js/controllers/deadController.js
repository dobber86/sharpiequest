app.controller('deadController',  function($scope, $location, $http, playerStats) {
    $scope.playerName = playerStats.getUsername();
  
    if ($scope.playerName == "") {
        $location.path('/');
    }
   
});