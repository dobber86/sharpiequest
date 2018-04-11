app.controller('combatController', function($scope, $location, $timeout, monsterList, combatMath, playerStats) {  
  var playername = playerStats.getUsername()
  
  if (playername == "") {
    $location.path('/');
  }

  // Player statistics and conditions (might be moved to object later)
  $scope.playerName = playername;
  $scope.playerXp = playerStats.getXp();

  $scope.playerAlive = true;
  $scope.playerMaxHP = 15;
  $scope.playerCurrentHP = 15;
  $scope.playerPercentHP = combatMath.getPercentHP($scope.playerCurrentHP, $scope.playerMaxHP);
  $scope.playerPower = 3;
  $scope.playerSpecialPower = 3;
  $scope.playerAccuracy = 85;
  $scope.playerResistance = 3;
  $scope.playerImage = "img/char/warrior/idle.gif";

  // Player healthbar size
  $scope.playerBar = {
    "width" : $scope.playerPercentHP+"%"
  }

  // Enemy selector (update when adding a new monster!)
  $scope.enemyNumber = combatMath.getEnemy(3);

  // Enemy statistics and conditions retrieved from the monster list
  $scope.enemyName = monsterList.getEnemyName($scope.enemyNumber);
  $scope.enemyAlive = true;
  $scope.enemyMaxHP = monsterList.getEnemyHP($scope.enemyNumber);
  $scope.enemyCurrentHP = $scope.enemyMaxHP;
  $scope.enemyPercentHP = combatMath.getPercentHP($scope.enemyCurrentHP, $scope.enemyMaxHP);
  $scope.enemyPower = monsterList.getEnemyPower($scope.enemyNumber);
  $scope.enemySpecialPower = monsterList.getEnemySpecialPower($scope.enemyNumber);
  $scope.enemyAccuracy = monsterList.getEnemyAccuracy($scope.enemyNumber);
  $scope.enemyResistance = monsterList.getEnemyResistance($scope.enemyNumber);
  $scope.enemyImage = monsterList.getEnemyImage($scope.enemyNumber);

  // Enemy determines a random action (1 is attack, 2 is defend, 3 is special)
  $scope.enemyResponse = combatMath.getResponse(3);

  // Enemy healthbar size
  $scope.enemyBar = {
    "width" : $scope.enemyPercentHP+"%"
  }

  // Combat metadata
  $scope.turnCount = 0;
  $scope.combatLog = "It's a "+$scope.enemyName+"!";
  $scope.buttonLock = false;

  // Character quotes
  if ($scope.enemyResponse === 1) {
    $scope.characterQuote = "It looks agressive."
  }
  if ($scope.enemyResponse === 2) {
    $scope.characterQuote = "It looks defensive."
  }
  if ($scope.enemyResponse === 3) {
    $scope.characterQuote = "It looks strange."
  }


  // When attack button is pressed:
  $scope.playerAttack = function() {
    // Block if combat is over or button is locked
    if(!$scope.buttonLock) {
      //Blocks combat buttons for 2 seconds
      $scope.buttonLock = true;
      $timeout(function() { 
        $scope.buttonLock = false;
      }, 2000);
      
      //Attack animation
      $scope.playerAnimate(1);

      // Calculate damage
      if ($scope.enemyResponse === 1) {
          $scope.enemyCurrentHP = combatMath.getAttack($scope.enemyCurrentHP, $scope.playerPower);
          $scope.combatLog = "You deal "+$scope.playerPower+" damage.";

          // Check if enemy is still alive
          if ($scope.enemyCurrentHP === 0) {
              $scope.enemyAlive = false;
          }
        
          // If enemy is still alive, counterattack (after a short delay)
          $scope.enemyAttack();
        }

        // Calculate damage
        if ($scope.enemyResponse === 2) {
          $scope.enemyCurrentHP = combatMath.getDefend($scope.enemyCurrentHP, $scope.playerPower, $scope.enemyResistance);
          $scope.combatLog = "The "+$scope.enemyName+" defends! You deal "+combatMath.getDefendDamage($scope.playerPower, $scope.enemyResistance)+" damage.";

          // Check if enemy is still alive
          if ($scope.enemyCurrentHP === 0) {
            $scope.enemyAlive = false;
        }
      }

        //Special response
        if ($scope.enemyResponse === 3) {
          $scope.enemyCurrentHP = combatMath.getAttack($scope.enemyCurrentHP, $scope.playerPower);
          $scope.combatLog = "You deal "+$scope.playerPower+" damage.";

          // Check if enemy is still alive
          if ($scope.enemyCurrentHP === 0) {
              $scope.enemyAlive = false;
          }
        
          // If enemy is still alive, counterattack (after a short delay)
          if($scope.enemyAlive) {
              $timeout(function() {
              $scope.enemySpecial($scope.enemyName);
            }, 1500);
          }
        }

      // End of turn events
      $scope.endTurn();
    }
  }
  

  // When defend button is pressed:
  $scope.playerDefend = function() {
    // Block if combat is over
    if(!$scope.buttonLock) {
      //Blocks combat buttons for 2 seconds
      $scope.buttonLock = true;
      $timeout(function() { 
        $scope.buttonLock = false;
      }, 2000);

      //Defend animation
      $scope.playerAnimate(2);

      // Calculate damage and update healthbar
      if ($scope.enemyResponse === 1) {
          $scope.playerCurrentHP = combatMath.getDefend($scope.playerCurrentHP, $scope.enemyPower, $scope.playerResistance);
          $scope.playerPercentHP = combatMath.getPercentHP($scope.playerCurrentHP, $scope.playerMaxHP);
          $scope.playerBar.width = $scope.playerPercentHP+"%";
          $scope.combatLog = "The "+$scope.enemyName+" attacks! You take "+combatMath.getDefendDamage($scope.enemyPower, $scope.playerResistance)+" damage.";
         
          // Check if player is still alive
          if ($scope.playerCurrentHP === 0) {
            $scope.playerAlive = false;
          }
      }

      // Nothing happens if player and enemy both defend
      if ($scope.enemyResponse === 2) {
          $scope.combatLog = "The "+$scope.enemyName+" also defends! Thrilling!";
      }

      //Special response
      if ($scope.enemyResponse === 3) {
        $timeout(function() {
          $scope.enemySpecial($scope.enemyName);
        }, 1500);
      }

      //End of turn events
      $scope.endTurn();
    }
  }
  

  //When power button is pressed:
  $scope.playerSpecial = function() {
    // Block if combat is over
    if(!$scope.buttonLock) {
      //Blocks combat buttons for 2 seconds
      $scope.buttonLock = true;
      $timeout(function() { 
        $scope.buttonLock = false;
      }, 2000);

      if ($scope.enemyResponse === 1) {
      }
      if ($scope.enemyResponse === 2) {
      }
      if ($scope.enemyResponse === 3) {
      }

      //End of turn events
      $scope.endTurn();
    }
  }

  $scope.enemyAttack = function() {
    if($scope.enemyAlive) {
      $timeout(function() {
        $scope.playerCurrentHP = combatMath.getAttack($scope.playerCurrentHP, $scope.enemyPower); 
        $scope.playerPercentHP = combatMath.getPercentHP($scope.playerCurrentHP, $scope.playerMaxHP);
        $scope.playerBar.width = $scope.playerPercentHP+"%";
        $scope.combatLog = "The "+$scope.enemyName+" attacks! You take "+$scope.enemyPower+" damage.";

        // Check if player is still alive
        if ($scope.playerCurrentHP === 0) {
          $scope.playerAlive = false;
        }
      }, 1500);
    }
  }

  $scope.enemySpecial = function(enemyName) {
    if (enemyName === "Slime") {
      $scope.playerPower -= 1;
      $scope.combatLog = "The "+$scope.enemyName+" lowers your attack power!";
    }
    if (enemyName === "Dino") {
      $scope.playerResistance -= 1;
      $scope.combatLog = "The "+$scope.enemyName+" lowers your resistance!";
    }
    if (enemyName === "Reptile") {
      $scope.playerPower -= 1;
      $scope.combatLog = "The "+$scope.enemyName+" lowers your attack power!";
    }
  }

  $scope.playerAnimate = function(x) {
    if (x === 1) {
      $scope.playerImage = "img/char/warrior/attack.gif";
      $timeout(function() { 
        $scope.playerImage = "img/char/warrior/idle.gif";
      }, 1200);
    }
    if (x === 2) {
      $scope.playerImage = "img/char/warrior/guard.gif";
      $timeout(function() { 
        $scope.playerImage = "img/char/warrior/idle.gif";
      }, 1100);
    }
  }

  $scope.endTurn = function() {
    // If someone is dead, update view (after a short delay)
    $timeout(function() {
      if ($scope.enemyAlive === false) {
        $scope.buttonLock = true;
        $scope.combatLog = "The "+$scope.enemyName+" is dead!";
        $scope.characterQuote = "Victory!"
      }
      if ($scope.playerAlive === false) {
        $scope.buttonLock = true; 
        $scope.combatLog = "You are dead, oh dear!";
        $scope.characterQuote = "Urgh..."
      }
    }, 2000);

    $scope.enemyPercentHP = combatMath.getPercentHP($scope.enemyCurrentHP, $scope.enemyMaxHP);
    $scope.enemyBar.width = $scope.enemyPercentHP+"%";

    $scope.enemyResponse = combatMath.getResponse(3);

    if ($scope.enemyResponse === 1) {
      $scope.characterQuote = "It looks agressive."
    }
    if ($scope.enemyResponse === 2) {
      $scope.characterQuote = "It looks defensive"
    }
    if ($scope.enemyResponse === 3) {
      $scope.characterQuote = "It looks strange."
    }

    $scope.turnCount++;
  }
});