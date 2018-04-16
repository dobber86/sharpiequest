app.controller('combatController', function($scope, $location, $timeout, monsterList, combatMath, playerStats, playerQuotes) {  
  $scope.playerName = playerStats.getUsername()
  
  if ($scope.playerName == "") {
    $location.path('/');
  }

  // Player statistics and conditions (might be moved to object later)
  $scope.playerAlive = true;
  $scope.playerXp = playerStats.getXp();
  $scope.playerMaxHP = playerStats.getMaxHp();
  $scope.playerCurrentHP = playerStats.getHp();
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
  $scope.enemyImage = monsterList.getEnemyImage($scope.enemyNumber, "idle");

  // Enemy determines a random action (1 is attack, 2 is defend, 3 is special)
  $scope.enemyResponse = combatMath.getResponse(3);

  // Enemy healthbar size
  $scope.enemyBar = {
    "width" : $scope.enemyPercentHP+"%"
  }

  // Combat metadata
  $scope.turnCount = 1;
  $scope.turnCountSpecial = 0;
  $scope.combatLog = "It's a "+$scope.enemyName+"!";
  $scope.buttonLock = false;

  // Character quote
  $scope.characterQuote = playerQuotes.getQuote($scope.enemyName, $scope.enemyResponse);

  // When attack button is pressed:
  $scope.playerAttack = function() {
    // Block if combat is over or button is locked
    if(!$scope.buttonLock) {
      //Blocks combat buttons for 2 seconds
      $scope.buttonLock = true;
      $scope.buttonState = "opacity: 0.2";
      $timeout(function() { 
        $scope.buttonLock = false;
        $scope.buttonState = "opacity: 1.0";
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
      $scope.buttonState = "opacity: 0.2";
      $timeout(function() { 
        $scope.buttonLock = false;
        $scope.buttonState = "opacity: 1.0";
      }, 2000);

      //Defend animation
      $scope.playerAnimate(2);

      // Calculate damage and update healthbar
      if ($scope.enemyResponse === 1) {
          $scope.enemyAnimate($scope.enemyNumber, 1);
          $scope.playerCurrentHP = combatMath.getDefend($scope.playerCurrentHP, $scope.enemyPower, $scope.playerResistance);
          $scope.playerPercentHP = combatMath.getPercentHP($scope.playerCurrentHP, $scope.playerMaxHP);
          $scope.playerHealthBar.width = $scope.playerPercentHP+"%";
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
    // Block if you don't have enough MP
    if ($scope.playerCurrentMP >= 3) {

      //Blocks combat buttons for 2 seconds
      $scope.buttonLock = true;
      $scope.buttonState = "opacity: 0.2";
      $timeout(function() { 
        $scope.buttonLock = false;
        $scope.buttonState = "opacity: 1.0";
      }, 2000);

    //Attack animation
    $scope.playerAnimate(1);

    // Calculate damage
      if ($scope.enemyResponse === 1) {
          $scope.enemyCurrentHP = combatMath.getAttack($scope.enemyCurrentHP, $scope.playerSpecialPower);
          $scope.combatLog = "You deal "+$scope.playerSpecialPower+" damage.";

          // Check if enemy is still alive
          if ($scope.enemyCurrentHP === 0) {
              $scope.enemyAlive = false;
          }
        
          // If enemy is still alive, counterattack (after a short delay)
          $scope.enemyAttack();
        }

        // Calculate damage
        if ($scope.enemyResponse === 2) {
          $scope.enemyCurrentHP = combatMath.getAttack($scope.enemyCurrentHP, $scope.playerSpecialPower);
          $scope.combatLog = "You devastate the "+$scope.enemyName+"'s defences! You deal "+$scope.playerSpecialPower+" damage.";

          // Check if enemy is still alive
          if ($scope.enemyCurrentHP === 0) {
            $scope.enemyAlive = false;
        }
      }

        //Special response
        if ($scope.enemyResponse === 3) {
          $scope.enemyCurrentHP = combatMath.getAttack($scope.enemyCurrentHP, $scope.playerSpecialPower);
          $scope.combatLog = "You deal "+$scope.playerSpecialPower+" damage.";

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

      //End of turn events
      $scope.playerCurrentMP-=3;
      $scope.playerPercentMP = combatMath.getPercentHP($scope.playerCurrentMP, $scope.playerMaxMP);
      $scope.playerManaBar.width = $scope.playerPercentMP+"%";
      $scope.endTurn();
    }
  }
  else {
    $scope.characterQuote=("I don't have enough energy!");
  }
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

  $scope.enemyAttack = function() {
    if($scope.enemyAlive) {
      $timeout(function() {
        $scope.enemyAnimate($scope.enemyNumber, 1);
        $scope.playerCurrentHP = combatMath.getAttack($scope.playerCurrentHP, $scope.enemyPower); 
        $scope.playerPercentHP = combatMath.getPercentHP($scope.playerCurrentHP, $scope.playerMaxHP);
        $scope.playerHealthBar.width = $scope.playerPercentHP+"%";
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
      $scope.playerPower = Math.max(($scope.playerMaxPower-1), $scope.playerPower-1);
      $scope.combatLog = "The "+$scope.enemyName+" lowers your attack power for a turn!";
      $scope.turnCountSpecial = $scope.turnCount +1;
    }
    if (enemyName === "Dino") {
      $scope.playerResistance = Math.max(($scope.playerMaxResistance-1), $scope.playerResistance-1);
      $scope.combatLog = "The "+$scope.enemyName+" lowers your resistance for a turn!";
      $scope.turnCountSpecial = $scope.turnCount +1;
    }
    if (enemyName === "Reptile") {
      $scope.playerSpecialPower = Math.max(($scope.playerMaxSpecialPower-1), $scope.playerSpecialPower-1);
      $scope.combatLog = "The "+$scope.enemyName+" lowers your special power for a turn!";
      $scope.turnCountSpecial = $scope.turnCount +1;
    }
  }

  $scope.enemySpecialResolve = function(enemyName) {
    console.log($scope.turnCountSpecial);
    if ($scope.turnCount == $scope.turnCountSpecial) {
      if (enemyName === "Slime") {
        $scope.playerPower += 1;
        $scope.turncountSpecial = 0;
      }
      if (enemyName === "Dino") {
        $scope.playerResistance += 1;
        $scope.turncountSpecial = 0;
      }
      if (enemyName === "Reptile") {
        $scope.playerSpecialPower += 1;
        $scope.turncountSpecial = 0;
      }
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

  $scope.enemyAnimate= function(x, animation) {
    if (x === 0) {
      $scope.enemyImage = monsterList.getEnemyImage($scope.enemyNumber, "attack");
      $timeout(function() { 
        $scope.enemyImage = monsterList.getEnemyImage($scope.enemyNumber, "idle");
      }, 800);
    }
    if (x === 1) {
      $scope.enemyImage = monsterList.getEnemyImage($scope.enemyNumber, "attack");
      $timeout(function() { 
        $scope.enemyImage = monsterList.getEnemyImage($scope.enemyNumber, "idle");
      }, 1200);
    }
    if (x === 2) {
      $scope.enemyImage = monsterList.getEnemyImage($scope.enemyNumber, "attack");
      $timeout(function() { 
        $scope.enemyImage = monsterList.getEnemyImage($scope.enemyNumber, "idle");
      }, 800);
    }
  }

  $scope.endTurn = function() {
    // If someone is dead, update view (after a short delay)
    $timeout(function() {
      if ($scope.enemyAlive === false) {
        $scope.buttonLock = true;
        $scope.combatLog = "The "+$scope.enemyName+" is dead!";
        $scope.characterQuote = "Victory!";
        $scope.playerVictory();
      }
      if ($scope.playerAlive === false) {
        $scope.buttonLock = true; 
        $scope.combatLog = "You are dead, oh dear!";
        $scope.characterQuote = "Urgh...";
        $scope.playerDead();
      }
    }, 2000);

    $scope.enemyPercentHP = combatMath.getPercentHP($scope.enemyCurrentHP, $scope.enemyMaxHP);
    $scope.enemyBar.width = $scope.enemyPercentHP+"%";

    $scope.enemyResponse = combatMath.getResponse(3);

    $scope.characterQuote = playerQuotes.getQuote($scope.enemyName, $scope.enemyResponse);

    //Very stupid fix, please ignore
    $timeout(function() {
        $scope.enemySpecialResolve($scope.enemyName);
    }, 1500);

    $scope.turnCount++;
  }
  
  $scope.playerVictory = function() {
    $scope.playerLevel += 1;
    playerStats.saveCombatUpdate(
      $scope.playerCurrentHP,
      $scope.playerCurrentMP,
      $scope.playerXp,
      $scope.playerLevel
    );
  }

  $scope.playerDead = function() {
    playerStats.saveCombatUpdate(
      $scope.playerCurrentHP,
      $scope.playerCurrentMP,
      $scope.playerXp,
      $scope.playerLevel
    );
  }
});
