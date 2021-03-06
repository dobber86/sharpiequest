app.controller('combatController', function($scope, $location, $timeout, monsterList, combatMath, playerStats, playerQuotes, soundHandler) {  
  //Get player name and current level
  $scope.playerName = playerStats.getUsername();
  $scope.playerLevel = playerStats.getLevel();
  
  //If there is no player name, redirect to homepage (happens on page reload)
  if ($scope.playerName == "") {
    $location.path('/');
  }

  //Determine which level the player is currently on
  $scope.levelCycle = 0;
  $scope.backgroundCalc = function() {
    $scope.backgroundNumber = $scope.playerLevel;
    for (i= 0; $scope.backgroundNumber > 8; i++) {
        $scope.levelCycle++;
        $scope.backgroundNumber = $scope.backgroundNumber - 8;
      }
    if ($scope.backgroundNumber > 4) {
      $scope.levelDark = true;
    }
    else {
      $scope.levelDark = false;
    }
    if ($scope.backgroundNumber === 1 || $scope.backgroundNumber === 8) {
      $scope.levelName = "Wasteland of the Front";
    }
    if ($scope.backgroundNumber === 2 || $scope.backgroundNumber === 7) {
      $scope.levelName = "Fields of Serving";
    }
    if ($scope.backgroundNumber === 3 || $scope.backgroundNumber === 6) {
      $scope.levelName = "Query Plains";
    }
    if ($scope.backgroundNumber === 4 || $scope.backgroundNumber === 5) {
      $scope.levelName = "City of the Back";
    }
  }
  $scope.backgroundCalc();
  monsterList.saveLastBackground($scope.backgroundNumber);

  // Enemy selector (update when adding a new monster!)
  if ($scope.backgroundNumber === 8) {
    $scope.enemyNumber = 3;
  }
  else {
    $scope.enemyNumber = combatMath.getEnemy(3);
  }
  // $scope.enemyNumber = 1;

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
  $scope.playerMoney = playerStats.getMoney();
  $scope.playerImage = "img/char/warrior/idle.gif";
  $scope.playerImageOverlay = monsterList.getPlayerImageOverlay($scope.enemyNumber);
  $scope.playerImageOverlay2 = "img/fx/1filter.gif";

  // Scale enemy statistics
  monsterList.scaleNight($scope.enemyNumber, $scope.levelDark);
  monsterList.scaleCycle($scope.enemyNumber, $scope.levelCycle);

  // Enemy statistics and conditions retrieved from the monster list
  $scope.enemyName = monsterList.getEnemy($scope.enemyNumber).name;
  $scope.enemyAlive = true;
  $scope.enemyMaxHP = monsterList.getEnemy($scope.enemyNumber).maxHP;
  $scope.enemyCurrentHP = $scope.enemyMaxHP;
  $scope.enemyPercentHP = combatMath.getPercentHP($scope.enemyCurrentHP, $scope.enemyMaxHP);
  $scope.enemyPower = monsterList.getEnemy($scope.enemyNumber).power;
  $scope.enemySpecialPower = monsterList.getEnemy($scope.enemyNumber).specialPower;
  $scope.enemyAccuracy = monsterList.getEnemy($scope.enemyNumber).accuracy;
  $scope.enemyResistance = monsterList.getEnemy($scope.enemyNumber).resistance;
  $scope.enemyImage = monsterList.getEnemyImage($scope.enemyNumber, "idle");
  $scope.enemyImageOverlay = "img/fx/3filter.gif";

  // Enemy determines a random action (1 is attack, 2 is defend, 3 is special)
  $scope.enemyResponse = combatMath.getResponse(3);

  // Character quote
  $scope.characterQuote = playerQuotes.getQuote($scope.enemyName, $scope.enemyResponse, $scope.playerInsight);
  $scope.miniQuote = playerQuotes.getMiniQuote($scope.enemyName);

  // Music & sound
  $scope.music = soundHandler.getMusic($scope.enemyNumber, $scope.levelDark);
  $scope.sound = soundHandler.getSound("slash");
  $scope.reaction = soundHandler.getSound("slash1");
  $scope.menu = soundHandler.getSound("menu");
  var music = document.getElementById("music");
  var sound = document.getElementById("sound");
  var reaction = document.getElementById("reaction");
  var menu = document.getElementById("menu");
  var mbutton = document.getElementById("musicbutton");
  var sbutton = document.getElementById("soundbutton");
  music.volume = soundHandler.getVolume("music");
  sound.volume = soundHandler.getVolume("sound");
  reaction.volume = soundHandler.getVolume("sound");
  menu.volume = soundHandler.getVolume("sound");
  music.loop = true;
  music.autoplay = soundHandler.getMusicOn();
  
  // Checking state of music button
  if (!soundHandler.getMusicOn()) {
    mbutton.classList.toggle("btn-light");
    mbutton.classList.toggle("btn-danger");
  }

  // Music button click
  $scope.pauseMusic = function() { 
    soundHandler.pauseMusic();
    mbutton.classList.toggle("btn-light");
    mbutton.classList.toggle("btn-danger");
    if (soundHandler.getMusicOn()) {
      soundHandler.saveMusicOn(false);
    } else {
      soundHandler.saveMusicOn(true);
    }
  }

  // Checking state of sound button
  if (!soundHandler.getSoundOn()) {
    sbutton.classList.toggle("btn-light");
    sbutton.classList.toggle("btn-danger");
  }

  // Sound button click
  $scope.pauseSound = function() { 
    sound.volume = soundHandler.pauseSound(sound.volume);
    reaction.volume = soundHandler.pauseSound(reaction.volume);
    menu.volume = soundHandler.pauseSound(menu.volume);
    sbutton.classList.toggle("btn-light");
    sbutton.classList.toggle("btn-danger");
    if (soundHandler.getSoundOn()) {
      soundHandler.saveSoundOn(false);
    } else {
      soundHandler.saveSoundOn(true);
    }
  }
 
  // Combat metadata
  $scope.turnCount = 1;
  $scope.turnCountSpecial = 0;
  if ($scope.enemyNumber === 3) {
    $scope.combatLog = "It's a "+$scope.enemyName+"! This is the final challenge!";
  }
  else {
    $scope.combatLog = "It's a "+$scope.enemyName+"!";
  }
  
  $scope.buttonLock = false;

  // Player bar size
  $scope.playerHealthBar = {
    "width" : $scope.playerPercentHP+"%"
  }
  $scope.playerManaBar = {
    "width" : $scope.playerPercentMP+"%"
  }

  // Enemy healthbar size
  $scope.enemyBar = {
    "width" : $scope.enemyPercentHP+"%"
  }

  // Button state
  $scope.buttonState = {
    "opacity": "1.0"
  }

  // Arrow state
  $scope.arrow1State = {
    "display" : "none"
  }
  $scope.arrow2State = {
    "display" : "none"
  }
  $scope.arrow3State = {
    "display" : "none"
  }

  // Hide special attack animations
  $scope.playerSpecialState = {
    "display" : "none"
  }
  $scope.enemySpecialState = {
    "display" : "none"
  }
  $scope.enemySpecialState2 = {
    "display" : "none"
  }

  var nextButton = document.getElementById("nextbutton");

  // Toggle visibility Next Button
  $scope.visibilityNext = function() {
    nextButton.classList.toggle("invisible");
  }

  // Background css needs to be handled in Angular
  $scope.backgroundState = {
    "background": "url('../img/backgrounds/"+$scope.backgroundNumber+".png')",
    "background-size" : "cover",
    "background-repeat" : "no-repeat",
    "background-position" : "center center"
  }

  // Giant needs some special css
  if ($scope.enemyNumber === 3) {
    $scope.bossStyle = {
      "width": "30vw",
      "height": "auto",
      "overflow": "hidden",
      "margin": "-50px",
      "right": "10%",
      "margin-top": "-6vw"
    }
  }

  // When attack button is pressed:
  $scope.playerAttack = function() {
    // Block if combat is over or button is locked
    if(!$scope.buttonLock) {
      //Blocks combat buttons for 2 seconds
      $scope.buttonLock = true;
      $scope.buttonState = { "opacity": "0.2" }
      $timeout(function() { 
        $scope.buttonLock = false;
        $scope.buttonState = { "opacity": "1.0" }
      }, 2000);
      
      // Attack animation
      $scope.playerAnimate(1);

      // Determine if attack hits
      $scope.isHit = combatMath.getHit($scope.playerAccuracy);

      // Calculate damage
      if ($scope.enemyResponse === 1) {
        if ($scope.isHit === true) {
          $scope.enemyCurrentHP = combatMath.getAttack($scope.enemyCurrentHP, $scope.playerPower);
          $scope.combatLog = "You deal "+$scope.playerPower+" damage.";

          // Check if enemy is still alive
          if ($scope.enemyCurrentHP === 0) {
              $scope.enemyAlive = false;
          }
        }
        else {
          $scope.combatLog = "Your attack missed!";
        }
          // If enemy is still alive, counterattack (after a short delay)
          $scope.enemyAttack();
        }

        // Calculate damage
        if ($scope.enemyResponse === 2) {
          if ($scope.isHit === true) {
            $scope.enemyCurrentHP = combatMath.getDefend($scope.enemyCurrentHP, $scope.playerPower, $scope.enemyResistance);
            $scope.combatLog = "The "+$scope.enemyName+" defends! You deal "+combatMath.getDefendDamage($scope.playerPower, $scope.enemyResistance)+" damage.";

            // Check if enemy is still alive
            if ($scope.enemyCurrentHP === 0) {
              $scope.enemyAlive = false;
            }
          }
          else {
            $scope.combatLog = "The "+$scope.enemyName+" defends, but your attack misses!";
          }
        }

        //Special response
        if ($scope.enemyResponse === 3) {
          if ($scope.isHit === true) {
            $scope.enemyCurrentHP = combatMath.getAttack($scope.enemyCurrentHP, $scope.playerPower);
            $scope.combatLog = "You deal "+$scope.playerPower+" damage.";

            // Check if enemy is still alive
            if ($scope.enemyCurrentHP === 0) {
              $scope.enemyAlive = false;
            }
          }
          else {
            $scope.combatLog = "Your attack missed!";
          }
          
            // If enemy is still alive, counterattack (after a short delay)
            if($scope.enemyAlive) {
              $timeout(function() {
              $scope.enemyAnimate($scope.enemyNumber, "special");
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
      $scope.buttonState = { "opacity": "0.2" }
      $timeout(function() { 
        $scope.buttonLock = false;
        $scope.buttonState = { "opacity": "1.0" }
      }, 2000);

      //Defend animation
      $scope.playerAnimate(2);

      // Calculate damage and update healthbar
      if ($scope.enemyResponse === 1) {
          $scope.enemyAnimate($scope.enemyNumber, "attack");
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
          $scope.enemyAnimate($scope.enemyNumber, "special");
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
      $scope.buttonState = { "opacity": "0.2" }
      $timeout(function() { 
        $scope.buttonLock = false;
        $scope.buttonState = { "opacity": "1.0" }
      }, 2000);

    //Attack animation
    $scope.playerAnimate(3);

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
              $scope.enemyAnimate($scope.enemyNumber, "special");
              $scope.enemySpecial($scope.enemyName);
            }, 1500);
          }
        }

      // End of turn events
      $scope.playerCurrentMP-=3;
      $scope.playerPercentMP = combatMath.getPercentHP($scope.playerCurrentMP, $scope.playerMaxMP);
      $scope.playerManaBar.width = $scope.playerPercentMP+"%";
      $scope.endTurn();
      }
      // If player doesn't have enough MP, give a response
      else {
        $scope.characterQuote=("I don't have enough energy!");
      }
    }
  }

  $scope.enemyAttack = function() {
    if($scope.enemyAlive) {
      $timeout(function() {
        $scope.enemyAnimate($scope.enemyNumber, "attack");
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
      $scope.playerSpecialPower = Math.max(($scope.playerMaxSpecialPower-1), $scope.playerSpecialPower-1);
      $scope.combatLog = "The "+$scope.enemyName+" lowers your devastate power for a turn!";
      $scope.turnCountSpecial = $scope.turnCount +1;
    }
    if (enemyName === "Dino") {
      $scope.playerResistance = Math.max(($scope.playerMaxResistance-1), $scope.playerResistance-1);
      $scope.combatLog = "The "+$scope.enemyName+" lowers your defence for a turn!";
      $scope.turnCountSpecial = $scope.turnCount +1;
    }
    if (enemyName === "Reptile") {
      $scope.playerPower = Math.max(($scope.playerMaxPower-1), $scope.playerPower-1);
      $scope.combatLog = "The "+$scope.enemyName+" lowers your attack power for a turn!";
      $scope.turnCountSpecial = $scope.turnCount +1;
    }
    if (enemyName === "Giant") {
      $scope.playerCurrentHP = combatMath.getAttack($scope.playerCurrentHP, $scope.enemySpecialPower); 
      $scope.playerPercentHP = combatMath.getPercentHP($scope.playerCurrentHP, $scope.playerMaxHP);
      $scope.playerHealthBar.width = $scope.playerPercentHP+"%";
      $scope.combatLog = "The "+$scope.enemyName+" breaks your defence! You take "+$scope.enemySpecialPower+" damage.";
      // $scope.playerResistance = Math.max(($scope.playerMaxResistance-1), $scope.playerResistance-1);
      // $scope.combatLog = "The "+$scope.enemyName+" lowers your defence for a turn!";
      // $scope.turnCountSpecial = $scope.turnCount +1;

      // Check if player is still alive
      if ($scope.playerCurrentHP === 0) {
        $scope.playerAlive = false;
      }
    }
  }

  $scope.enemySpecialResolve = function(enemyName) {
    if ($scope.turnCount == $scope.turnCountSpecial) {
      if (enemyName === "Slime") {
        $scope.playerSpecialPower += 1;
        $scope.turncountSpecial = 0;
      }
      if (enemyName === "Dino") {
        $scope.playerResistance += 1;
        $scope.turncountSpecial = 0;
      }
      if (enemyName === "Reptile") {
        $scope.playerPower += 1;
        $scope.turncountSpecial = 0;
      }
    }
  }

  $scope.playerAnimate = function(x) {
    if (x === 1) {
      $scope.playerImage = "img/char/warrior/attack.gif";
      $scope.sound = soundHandler.getSound("slash");
      soundHandler.playSound("slash");
      $timeout(function() { 
        $scope.playerImage = "img/char/warrior/idle.gif";
      }, 1200);
    }
    if (x === 2) {
      $scope.playerImage = "img/char/warrior/guard.gif";
      $scope.sound = soundHandler.getSound("guard");
      soundHandler.playSound("guard");
      $timeout(function() { 
        $scope.playerImage = "img/char/warrior/idle.gif";
      }, 1100);
    }
    if (x === 3) {
      $scope.playerImage = "img/char/warrior/attack.gif";
      $scope.sound = soundHandler.getSound("devastate");
      soundHandler.playSound("devastate");
      $timeout(function() { 
        $scope.playerImage = "img/char/warrior/idle.gif";
      }, 1200);
      $timeout(function() { 
        $scope.playerSpecialState = {
          "display" : ""
        }
      }, 600);
      $timeout(function() { 
        $scope.playerSpecialState = {
          "display" : "none"
        }
      }, 900);
    }
  }

  $scope.enemyAnimate= function(x, animation) {
    if (x === 0 && animation == "attack") {
      $scope.enemyImage = monsterList.getEnemyImage(x, "attack");
      $scope.reaction = soundHandler.getSound("slime1");
      soundHandler.playSound("slime1");
      $timeout(function() { 
        $scope.enemyImage = monsterList.getEnemyImage(x, "idle");
      }, 800);
    }
    if (x === 0 && animation == "special") {
      $scope.enemyImage = monsterList.getEnemyImage(x, "special");
      $scope.reaction = soundHandler.getSound("slime2");
      soundHandler.playSound("slime2");
      $timeout(function() { 
        $scope.enemyImage = monsterList.getEnemyImage(x, "idle");
      }, 1500);
      $timeout(function() { 
        $scope.enemySpecialState = {
          "display" : ""
        }
      }, 900);
      $timeout(function() { 
        $scope.enemySpecialState = {
          "display" : "none"
        }
      }, 1300);
    }

    if (x === 1 && animation == "attack") {
      $scope.enemyImage = monsterList.getEnemyImage(x, "attack");
      $scope.reaction = soundHandler.getSound("dino1");
      soundHandler.playSound("dino1");
      $timeout(function() { 
        $scope.enemyImage = monsterList.getEnemyImage(x, "idle");
      }, 1200);
    }
    if (x === 1 && animation == "special") {
      $scope.enemyImage = monsterList.getEnemyImage(x, "special");
      $scope.reaction = soundHandler.getSound("dino2");
      soundHandler.playSound("dino2");
      $timeout(function() { 
        $scope.enemyImage = monsterList.getEnemyImage(x, "idle");
      }, 900);
      $timeout(function() { 
        $scope.enemySpecialState = {
          "display" : ""
        }
      }, 600);
      $timeout(function() { 
        $scope.enemySpecialState = {
          "display" : "none"
        }
      }, 1100);
    }

    if (x === 2 && animation == "attack") {
      $scope.enemyImage = monsterList.getEnemyImage(x, "attack");
      $scope.reaction = soundHandler.getSound("reptile1");
      soundHandler.playSound("reptile1");
      $timeout(function() { 
        $scope.enemyImage = monsterList.getEnemyImage(x, "idle");
      }, 800);
    }
    if (x === 2 && animation == "special") {
      $scope.enemyImage = monsterList.getEnemyImage(x, "special");
      $scope.reaction = soundHandler.getSound("reptile2");
      soundHandler.playSound("reptile2");
      $timeout(function() { 
        $scope.enemyImage = monsterList.getEnemyImage(x, "idle");
      }, 600);
      $timeout(function() { 
        $scope.enemySpecialState = {
          "display" : ""
        }
      }, 400);
      $timeout(function() { 
        $scope.enemySpecialState = {
          "display" : "none"
        }
      }, 800);
    }

    if (x === 3 && animation == "attack") {
      $scope.enemyImage = monsterList.getEnemyImage(x, "attack");
      $scope.reaction = soundHandler.getSound("giant1");
      soundHandler.playSound("giant1");
      $timeout(function() { 
        $scope.enemyImage = monsterList.getEnemyImage(x, "idle");
      }, 1200);
    }
    if (x === 3 && animation == "special") {
      $scope.enemyImage = monsterList.getEnemyImage(x, "special");
      $scope.reaction = soundHandler.getSound("giant2");
      soundHandler.playSound("giant2");
      $timeout(function() { 
        $scope.enemyImage = monsterList.getEnemyImage(x, "idle");
      }, 2000);
      $timeout(function() { 
        $scope.enemySpecialState = {
          "display" : "",
          "margin-top": "2vw"
        }
      }, 800);
      $timeout(function() { 
        $scope.enemySpecialState = {
          "display" : "none"
        }
      }, 1700);
    }
  }

  $scope.endTurn = function() {
    // If someone is dead, update view (after a short delay)
    $timeout(function() {
      if ($scope.enemyAlive === false) {
        $scope.buttonLock = true;
        $scope.combatLog = "The "+$scope.enemyName+" is dead!";
        $scope.characterQuote = "Victory!";
        $scope.enemyImage = "";
        $scope.enemyImageOverlay = "img/fx/1filter.gif";
        $scope.playerSpecialState = {
          "display" : ""
        }

        if ($scope.levelDark === true) {
          monsterList.undoNight($scope.enemyNumber);
        }
        if ($scope.levelCycle > 0) {
          monsterList.undoCycle($scope.enemyNumber, $scope.levelCycle);
        }
        
        if (music.paused === false) {
          music.pause();
          $timeout(function() {
            if ($scope.enemyNumber === 3) {
              $scope.music = soundHandler.getOutro(3);
            }
            else {
              $scope.music = soundHandler.getOutro(1);
            }
            music.volume = 0.3;
            music.play();
          }, 2000);
        }
        if (sound.volume > 0) {
          sound.volume = 0.1;
        }
        $scope.sound = soundHandler.getSound("victory");
        soundHandler.playSound("victory");
        $scope.playerVictory();
        $timeout(function() {
          $scope.visibilityNext();
        }, 2200);
      }
      if ($scope.playerAlive === false) {
        $scope.buttonLock = true; 
        $scope.combatLog = "You are dead, oh dear!";
        $scope.characterQuote = "Urgh...";
        $scope.playerImage = "";
        $scope.playerImageOverlay2 = "img/fx/1filter.gif";
        $scope.enemySpecialState2 = {
          "display" : ""
        }

        if ($scope.levelDark === true) {
          monsterList.undoNight($scope.enemyNumber);
        }
        if ($scope.levelCycle > 0) {
          monsterList.undoCycle($scope.enemyNumber, $scope.levelCycle);
        }

        if (music.paused === false) {
          music.pause();
          $timeout(function() {
            $scope.music = soundHandler.getOutro(2);
            music.volume = 0.3;
            music.play();
          }, 2000);
        }
        $scope.sound = soundHandler.getSound("death");
        soundHandler.playSound("death");
        $scope.playerDead();

        $timeout(function() {
          $scope.visibilityNext();
        }, 2200);
      }
    }, 2000);

    $scope.enemyPercentHP = combatMath.getPercentHP($scope.enemyCurrentHP, $scope.enemyMaxHP);
    $scope.enemyBar.width = $scope.enemyPercentHP+"%";

    $scope.enemyResponse = combatMath.getResponse(3);

    $scope.characterQuote = playerQuotes.getQuote($scope.enemyName, $scope.enemyResponse, $scope.playerInsight);
    $scope.miniQuote = playerQuotes.getMiniQuote($scope.enemyName);

    // Very stupid fix, please ignore
    $timeout(function() {
        $scope.enemySpecialResolve($scope.enemyName);
    }, 1500);

    $scope.turnCount++;

    // Special Giant stuff
    if ($scope.enemyNumber === 3) {
      if ($scope.turnCount > 10) {
        $scope.enemyPower+=1;
        $scope.enemySpecialPower+=1;
      }
    }
  }
  
  $scope.playerVictory = function() {
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

  // Conditions for making the menu arrow appear
  $scope.arrowStateOn = function(x) {
    soundHandler.playSound("menu");
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

  // Conditions for making the menu arrows disappear
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
