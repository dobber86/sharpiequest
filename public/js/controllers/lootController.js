app.controller('lootController',  function($scope, $location, $http, playerStats, combatMath, monsterList, soundHandler) {
    
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
    $scope.chestImage = "img/loot/Open.gif";
    $scope.playerImage = "img/char/warrior/idle.gif";

    $scope.enemyName = monsterList.getLastEnemy().name;

     // Player bar size
    $scope.playerHealthBar = {
        "width" : $scope.playerPercentHP+"%"
    }
    $scope.playerManaBar = {
        "width" : $scope.playerPercentMP+"%"
    }

    $scope.backgroundNumber = monsterList.getLastBackground();

    $scope.backgroundState = {
        "background": "url('../img/backgrounds/"+$scope.backgroundNumber+".png')",
        "background-size" : "cover",
        "background-repeat" : "no-repeat",
        "background-position" : "center center"
    }

    $scope.music = "img/music/theme-2.ogg";
    var music = document.getElementById("music");
    var mbutton = document.getElementById("musicbutton");
    var sbutton = document.getElementById("soundbutton");
    music.volume = soundHandler.getVolume("music");
    music.loop = true;
    music.autoplay = true;
    
    $scope.pauseMusic = function() { 
      soundHandler.pauseMusic();
      mbutton.classList.toggle("btn-light");
      mbutton.classList.toggle("btn-danger");
    }

    //Loot
    $scope.lootXp = $scope.playerLevel;
    $scope.lootMoney = $scope.playerLevel + 10;
    

    //Function adding loot to PlayerStat
    $scope.playerLoot = function() {
        $scope.playerXp += $scope.lootXp;
        $scope.playerMoney += $scope.lootMoney;
        $scope.playerLevel += 1;
        playerStats.saveLootUpdate(
            $scope.playerXp,
            $scope.playerLevel,
            $scope.playerMoney
        );
    };

    //Sending loot update to Database
    $scope.playerUpdate = function () {
        // console.log("in loot update");

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

        $http.post('/update', angular.toJson($scope.update))
        .then(function (response) {
            // console.log("Saving loot update");
        });
           
    };

    $scope.playerLoot();
    $scope.playerUpdate();
    
    //To shop button
    $scope.toShop = function () {
        $location.path('/shop/');
    }

});
