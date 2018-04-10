app.controller('combatController', function($scope, $timeout, monsterList, monsterResponse, playerStats) {  
  // Player statistics and conditions (might be moved to object later)
  $scope.playerName = playerStats.getUsername();
  $scope.playerAlive = true;
  $scope.playerMaxHP = 15;
  $scope.playerCurrentHP = 15;
  $scope.playerPercentHP = (100*($scope.playerCurrentHP / $scope.playerMaxHP))
  $scope.playerPower = 3;
  $scope.playerResistance = 3;
  $scope.playerImage = "img/char/warrior/idle.gif";

  // Player healthbar size
  $scope.playerBar = {
    "width" : $scope.playerPercentHP+"%"
  }

  // Enemy selector (update when adding a new monster!)
  $scope.enemyNumber = Math.floor((Math.random() * 3) + 1);;

  // Enemy statistics and conditions retrieved from the monster list
  $scope.enemyName = monsterList.getEnemyName($scope.enemyNumber);
  $scope.enemyAlive = true;
  $scope.enemyMaxHP = monsterList.getEnemyHP($scope.enemyNumber);
  $scope.enemyCurrentHP = $scope.enemyMaxHP;
  $scope.enemyPercentHP = (100*($scope.enemyCurrentHP / $scope.enemyMaxHP))
  $scope.enemyPower = monsterList.getEnemyPower($scope.enemyNumber);
  $scope.enemyResistance = monsterList.getEnemyResistance($scope.enemyNumber);
  $scope.enemyImage = monsterList.getEnemyImage($scope.enemyNumber);

  // Enemy healthbar size
  $scope.enemyBar = {
    "width" : $scope.enemyPercentHP+"%"
  }

  // Combat metadata
  $scope.turnCount = 0;
  $scope.combatLog = "It's a "+$scope.enemyName+"!";
  $scope.characterQuote = "I don't know what it might do next."

  // When attack button is pressed:
  $scope.playerAttack = function() {
    // Block if combat is over
    if($scope.playerAlive && $scope.enemyAlive) {
      // Enemy determines a random action (1 is attack, 2 is defend)
      $scope.enemyResponse = Math.floor((Math.random() * 2) + 1);
     
      $scope.playerImage = "img/char/warrior/attack.gif";
      $timeout(function() { 
        $scope.playerImage = "img/char/warrior/idle.gif";
      }, 1200);

      // Calculate damage and update healthbar
      if ($scope.enemyResponse === 1) {
          $scope.enemyCurrentHP = Math.max(0,$scope.enemyCurrentHP - $scope.playerPower);
          $scope.enemyPercentHP = (100*($scope.enemyCurrentHP / $scope.enemyMaxHP));
          $scope.enemyBar.width = $scope.enemyPercentHP+"%";
          $scope.combatLog = "You deal "+$scope.playerPower+" damage.";

          // Check if enemy is still alive
          if ($scope.enemyCurrentHP === 0) {
              $scope.enemyAlive = false;
          }
        
          // If enemy is still alive, counterattack (after a short delay)
          if($scope.enemyAlive) {
            $timeout(function() { 
              $scope.playerCurrentHP = Math.max(0,$scope.playerCurrentHP - $scope.enemyPower);
              $scope.playerPercentHP = (100*($scope.playerCurrentHP / $scope.playerMaxHP));
              $scope.playerBar.width = $scope.playerPercentHP+"%";
              $scope.combatLog = "The "+$scope.enemyName+" attacks! You take "+$scope.enemyPower+" damage.";

              // Check if player is still alive
              if ($scope.playerCurrentHP === 0) {
                $scope.playerAlive = false;
              }

            }, 2000);
          }
        }

        // Calculate damage and update healthbar
        if ($scope.enemyResponse === 2) {
          $scope.enemyCurrentHP = Math.max(0,$scope.enemyCurrentHP - (Math.max(0, $scope.playerPower - $scope.enemyResistance)));
          $scope.enemyPercentHP = (100*($scope.enemyCurrentHP / $scope.enemyMaxHP));
          $scope.enemyBar.width = $scope.enemyPercentHP+"%";
          $scope.combatLog = "The "+$scope.enemyName+" defends! You deal "+(Math.max(0, ($scope.playerPower - $scope.enemyResistance)))+" damage.";

          // Check if enemy is still alive
          if ($scope.enemyCurrentHP === 0) {
            $scope.enemyAlive = false;
        }
      }

    // If enemy is dead, update view (after a short delay)
      if ($scope.enemyAlive === false) {
      $timeout(function() { 
        $scope.combatLog = "The "+$scope.enemyName+" is dead!";
      }, 2000);
    }

    // If player is dead, update view (after a short delay)
    if ($scope.playerAlive === false) {
      $timeout(function() { 
        $scope.combatLog = "You are dead, oh dear!";
      }, 2000);
    } 

    // End of turn events
    $scope.turnCount++;
    } 
  }

  // When defend button is pressed:
  $scope.playerDefend = function() {
    // Block if combat is over
    if($scope.playerAlive && $scope.enemyAlive) {
      // Enemy determines a random action (1 is attack, 2 is defend)
      $scope.enemyResponse = Math.floor((Math.random() * 2) + 1);

      // Calculate damage and update healthbar
      if ($scope.enemyResponse === 1) {
          $scope.playerCurrentHP = Math.max(0,$scope.playerCurrentHP - (Math.max(0, $scope.enemyPower - $scope.playerResistance)));
          $scope.playerPercentHP = (100*($scope.playerCurrentHP / $scope.playerMaxHP));
          $scope.playerBar.width = $scope.playerPercentHP+"%";
          $scope.combatLog = "The "+$scope.enemyName+" attacks! You take "+(Math.max(0, $scope.enemyPower - $scope.playerResistance))+" damage.";
         
          // Check if player is still alive
          if ($scope.playerCurrentHP === 0) {
            $scope.playerAlive = false;
          }
      }

      // Nothing happens if player and enemy both defend
      if ($scope.enemyResponse === 2) {
          $scope.combatLog = "The "+$scope.enemyName+" also defends! Thrilling!";
      }

      // If player is dead, update view (after a short delay)
      if ($scope.playerAlive === false) {
        $timeout(function() { 
          $scope.combatLog = "You are dead, oh dear!";
        }, 2000);
      }  

      // Update turn count
      $scope.turnCount++;
      }
    }
});