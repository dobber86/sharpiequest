app.service('monsterList', function() {
    var enemy1Name = "Slime";
    var enemy1MaxHP = 10;
    var enemy1Power = 2;
    var enemy1Resistance = 1;
    var enemy1Image = "img/monster/slime/idle.gif"

    var enemy2Name = "Dino";
    var enemy2MaxHP = 15;
    var enemy2Power = 3;
    var enemy2Resistance = 1;
    var enemy2Image = "img/monster/dino/idle.gif"

    var enemy3Name = "Reptile";
    var enemy3MaxHP = 20;
    var enemy3Power = 4;
    var enemy3Resistance = 1;
    var enemy3Image = "img/monster/reptile/idle.gif"

    this.getEnemyName=function(x){
        if (x === 1) {
            return enemy1Name;
        }
        if (x === 2) {
            return enemy2Name;
        }
        if (x === 3) {
            return enemy3Name;
        }
    }

    this.getEnemyHP=function(x){
        if (x === 1) {
            return enemy1MaxHP;
        }
        if (x === 2) {
            return enemy2MaxHP;
        }
        if (x === 3) {
            return enemy3MaxHP;
        }
    }

    this.getEnemyPower=function(x){
        if (x === 1) {
            return enemy1Power;
        }
        if (x === 2) {
            return enemy2Power;
        }
        if (x === 3) {
            return enemy3Power;
        }
    }

    this.getEnemyResistance=function(x){
        if (x === 1) {
            return enemy1Resistance;
        }
        if (x === 2) {
            return enemy2Resistance;
        }
        if (x === 3) {
            return enemy3Resistance;
        }
    }

    this.getEnemyImage=function(x){
        if (x === 1) {
            return enemy1Image;
        }
        if (x === 2) {
            return enemy2Image;
        }
        if (x === 3) {
            return enemy3Image;
        }
    }
});