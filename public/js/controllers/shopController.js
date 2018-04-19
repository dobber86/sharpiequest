app.controller('shopController',  function($scope, $location, $http, playerStats, combatMath, soundHandler) {
    
    //Refresh case
    $scope.playerName = playerStats.getUsername(); 
    // $scope.playerName = "q"; 
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

    //Shop items
    $scope.potionHp = 10;
    $scope.pricePotionHp = 10;

    $scope.potionMp = 10;
    $scope.pricePotionMp = 10;

    $scope.itemMaxHp = 5;
    $scope.priceMaxHp = 3;

    $scope.itemMaxMp = 5;
    $scope.priceMaxMp = 3;

    $scope.itemPower = 1;
    $scope.pricePower = 5;

    $scope.itemSpecial = 1;
    $scope.priceSpecial = 5;

    $scope.itemResistance = 1;
    $scope.priceResistance = 5;

    $scope.itemAccuracy = 3;
    $scope.priceAccuracy = 5;

    $scope.itemInsight = 3;
    $scope.priceInsight = 5;

    //Hp purchase
    $scope.playerBuyHp = function() {
        if ($scope.playerMoney >= $scope.pricePotionHp) {
            if (($scope.playerCurrentHP + $scope.potionHp) <= $scope.playerMaxHP) {
                $scope.playerCurrentHP += $scope.potionHp;
                $scope.playerMoney -= $scope.pricePotionHp;
                $scope.playerPercentHP = combatMath.getPercentHP($scope.playerCurrentHP, $scope.playerMaxHP);
                $scope.playerHealthBar.width = $scope.playerPercentHP+"%";
                $scope.saveShopUpdate();
            } else if ($scope.playerCurrentHP === $scope.playerMaxHP) {

            } else {
                $scope.playerCurrentHP = $scope.playerMaxHP;
                $scope.playerMoney -= $scope.pricePotionHp;
                $scope.playerPercentHP = combatMath.getPercentHP($scope.playerCurrentHP, $scope.playerMaxHP);
                $scope.playerHealthBar.width = $scope.playerPercentHP+"%";
                $scope.saveShopUpdate();
            }
        }
    };

    // Max Hp purchase
    $scope.playerBuyMaxHp = function () {
        if ($scope.playerXp >= $scope.priceMaxHp) {
            $scope.playerMaxHP += $scope.itemMaxHp;
            $scope.playerCurrentHP += $scope.itemMaxHp;
            $scope.playerPercentHP = combatMath.getPercentHP($scope.playerCurrentHP, $scope.playerMaxHP);
            $scope.playerHealthBar.width = $scope.playerPercentHP+"%";
            $scope.playerXp -= $scope.priceMaxHp;
            $scope.saveShopUpdate();
        }
    }

    // Mp purchase
    $scope.playerBuyMp = function() {
        if ($scope.playerMoney >= $scope.pricePotionMp) {
            if (($scope.playerCurrentMP + $scope.potionMp) <= $scope.playerMaxMP) {
                $scope.playerCurrentMP += $scope.potionMp;
                $scope.playerMoney -= $scope.pricePotionMp;
                $scope.playerPercentMP = combatMath.getPercentHP($scope.playerCurrentMP, $scope.playerMaxMP);
                $scope.playerManaBar.width = $scope.playerPercentMP+"%";
                $scope.saveShopUpdate();
            } else if ($scope.playerCurrentMP === $scope.playerMaxMP) {
    
            } else {
                $scope.playerCurrentMP = $scope.playerMaxMP;
                $scope.playerMoney -= $scope.pricePotionMp;
                $scope.playerPercentMP = combatMath.getPercentHP($scope.playerCurrentMP, $scope.playerMaxMP);
                $scope.playerManaBar.width = $scope.playerPercentMP+"%";
                $scope.saveShopUpdate();
            }
        }
    };

    // Max Mp purchase
    $scope.playerBuyMaxMp = function () {
        if ($scope.playerXp >= $scope.priceMaxMp) {
            $scope.playerMaxMP += $scope.itemMaxMp;
            $scope.playerCurrentMP += $scope.itemMaxMp;
            $scope.playerPercentMP = combatMath.getPercentHP($scope.playerCurrentMP, $scope.playerMaxMP);
            $scope.playerManaBar.width = $scope.playerPercentMP+"%";
            $scope.playerXp -= $scope.priceMaxMp;
            $scope.saveShopUpdate();
        }
    }

    // Power purchase
    $scope.playerBuyPower = function () {
        if ($scope.playerXp >= $scope.pricePower) {
            $scope.playerPower += $scope.itemPower;
            $scope.playerXp -= $scope.pricePower;
            $scope.saveShopUpdate();
        }
    }

    // Resistance purchase
    $scope.playerBuyResistance = function () {
        if ($scope.playerXp >= $scope.priceResistance) {
            $scope.playerResistance += $scope.itemResistance;
            $scope.playerXp -= $scope.priceResistance;
            $scope.saveShopUpdate();
        }
    }

    // Accuracy purchase
    $scope.playerBuyAccuracy = function () {
        if ($scope.playerXp >= $scope.priceAccuracy) {
            if (($scope.playerAccuracy + $scope.itemAccuracy) <= 100) {
                $scope.playerAccuracy += $scope.itemAccuracy;
                $scope.playerXp -= $scope.priceAccuracy;
                $scope.saveShopUpdate();
            } else if ($scope.playerAccuracy === 100) {

            } else {
                $scope.playerAccuracy = 100;
                $scope.playerXp -= $scope.priceAccuracy;
                $scope.saveShopUpdate();
            }
        }
    }

    // Insight purchase
    $scope.playerBuyInsight = function () {
        if ($scope.playerXp >= $scope.priceInsight) {
            if (($scope.playerInsight + $scope.itemInsight) <= 100) {
                $scope.playerInsight += $scope.itemInsight;
                $scope.playerXp -= $scope.priceInsight;
                $scope.saveShopUpdate();
            } else if ($scope.playerInsight === 100) {

            } else {
                $scope.playerInsight = 100;
                $scope.playerXp -= $scope.priceInsight;
                $scope.saveShopUpdate();
            }
        }
    }
    
    // Special Power purchase
    $scope.playerBuySpecial = function () {
        if ($scope.playerXp >= $scope.priceSpecial) {
            $scope.playerSpecialPower += $scope.itemSpecial;
            $scope.playerXp -= $scope.priceSpecial;
            $scope.saveShopUpdate();
        }
    }

    // Saving purchases in PlayerStat
    $scope.saveShopUpdate = function () {
        playerStats.saveShopUpdate(
            $scope.playerCurrentHP,
            $scope.playerMaxHP,
            $scope.playerCurrentMP,
            $scope.playerMaxMP,
            $scope.playerPower,
            $scope.playerResistance,
            $scope.playerAccuracy,
            $scope.playerInsight,
            $scope.playerSpecialPower,
            $scope.playerXp,
            $scope.playerMoney
        );
        $scope.playerUpdate();
    }
        
    //Sending purchase update to Database
    $scope.playerUpdate = function () {
        // console.log("in shop update");

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
            // console.log("Saving shop update");
        }); 
    };

    // Music & sound
    $scope.music = soundHandler.getMusic("shop");
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
        sound.volume = soundHandler.pauseSound();
        reaction.volume = soundHandler.pauseSound();
        menu.volume = soundHandler.pauseSound();
        sbutton.classList.toggle("btn-light");
        sbutton.classList.toggle("btn-danger");
        if (soundHandler.getSoundOn()) {
            soundHandler.saveSoundOn(false);
        } else {
            soundHandler.saveSoundOn(true);
        }
    }

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
    $scope.arrow4State = {
        "display" : "none"
    }
    $scope.arrow5State = {
        "display" : "none"
    }
    $scope.arrow6State = {
        "display" : "none"
    }
    $scope.arrow7State = {
        "display" : "none"
    }
    $scope.arrow8State = {
        "display" : "none"
    }
    $scope.arrow9State = {
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
        if (x === 4){
            $scope.arrow4State.display = "";
        }
        if (x === 5){
            $scope.arrow5State.display = "";
        }
        if (x === 6){
            $scope.arrow6State.display = "";
        }
        if (x === 7){
            $scope.arrow7State.display = "";
        }
        if (x === 8){
            $scope.arrow8State.display = "";
        }
        if (x === 9){
            $scope.arrow9State.display = "";
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
        if (x === 4){
            $scope.arrow4State.display = "none";
        }
        if (x === 5){
            $scope.arrow5State.display = "none";
        }
        if (x === 6){
            $scope.arrow6State.display = "none";
        }
        if (x === 7){
            $scope.arrow7State.display = "none";
        }
        if (x === 8){
            $scope.arrow8State.display = "none";
        }
        if (x === 9){
            $scope.arrow9State.display = "none";
        }
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
        if (x === 4){
            $scope.arrow4State.display = "";
        }
        if (x === 5){
            $scope.arrow5State.display = "";
        }
        if (x === 6){
            $scope.arrow6State.display = "";
        }
        if (x === 7){
            $scope.arrow7State.display = "";
        }
        if (x === 8){
            $scope.arrow8State.display = "";
        }
        if (x === 9){
            $scope.arrow9State.display = "";
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
        if (x === 4){
            $scope.arrow4State.display = "none";
        }
        if (x === 5){
            $scope.arrow5State.display = "none";
        }
        if (x === 6){
            $scope.arrow6State.display = "none";
        }
        if (x === 7){
            $scope.arrow7State.display = "none";
        }
        if (x === 8){
            $scope.arrow8State.display = "none";
        }
        if (x === 9){
            $scope.arrow9State.display = "none";
        }
    }

   
});