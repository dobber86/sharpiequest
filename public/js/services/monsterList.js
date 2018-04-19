app.service('monsterList', function() {
    var enemy = [
        {name: "Slime", maxHP: 10, power: 2, specialPower: 2, accuracy: 85, resistance: 1},
        {name: "Dino", maxHP: 15, power: 2, specialPower: 3, accuracy: 85, resistance: 2},
        {name: "Reptile", maxHP: 20, power: 3, specialPower: 5, accuracy: 85, resistance: 2},
        {name: "Giant", maxHP: 25, power: 4, specialPower: 4, accuracy: 85, resistance: 3}
    ];

    var lastEnemy = enemy[1];
    var lastBackground = 1;

    this.scaleNight=function(x, isDark) {
        if (isDark === true) {
            enemy[x].maxHP+=5;
            enemy[x].power+=1;
            enemy[x].specialPower+=1;
            enemy[x].resistance+=1;
        }
    }

    this.scaleCycle=function(x, levelCycle) {
        enemy[x].maxHP+=(5*levelCycle);
        enemy[x].power+=(2*levelCycle);
        enemy[x].specialPower+=(1*levelCycle);
        enemy[x].resistance+=(1*levelCycle);
    }

    this.undoNight=function(x) {
        enemy[x].maxHP-=5;
        enemy[x].power-=1;
        enemy[x].specialPower-=1;
        enemy[x].resistance-=1;
    }

    this.undoCycle=function(x, levelCycle) {
        enemy[x].maxHP-=(5*levelCycle);
        enemy[x].power-=(2*levelCycle);
        enemy[x].specialPower-=(1*levelCycle);
        enemy[x].resistance-=(1*levelCycle);
    }

    var enemyImage = [
        {idle: "img/monster/slime/idle.gif", attack: "img/monster/slime/attack.gif", special: "img/monster/slime/attack2.gif", hit:"img/monster/slime/hit.gif"},
        {idle: "img/monster/dino/idle.gif", attack: "img/monster/dino/attack.gif", special: "img/monster/dino/attack2.gif", hit:"img/monster/dino/hit.gif"},
        {idle: "img/monster/reptile/idle.gif", attack: "img/monster/reptile/attack.gif", special: "img/monster/reptile/guard.gif", hit:"img/monster/reptile/hit.gif"},
        {idle: "img/monster/giant/idle.gif", attack: "img/monster/giant/attack.gif", special: "img/monster/giant/attack2.gif", hit:"img/monster/giant/hit.gif"}
    ];

    var playerImageOverlay = [
        {fx1: "img/fx/14filter.gif"},
        {fx1: "img/fx/13filter.gif"},
        {fx1: "img/fx/2filter.gif"},
        {fx1: "img/fx/8filter.gif"}   
    ];

    this.getEnemy=function(x) {
        lastEnemy = enemy[x];
        return enemy[x];
    }

    this.getLastEnemy=function(x) {
        return lastEnemy;
    }

    this.saveLastBackground=function(x) {
        lastBackground = x;
    }

    this.getLastBackground=function(x) {
        return lastBackground;
    }

    this.getEnemyImage=function(x, animation) {
        if (animation === "idle") {
            return enemyImage[x].idle;
        }
        if (animation === "attack") {
            return enemyImage[x].attack;
        }
        if (animation === "special") {
            return enemyImage[x].special;
        }
        if (animation === "hit") {
            return enemyImage[x].hit;
        }
    }

    this.getPlayerImageOverlay=function(x) {
        return playerImageOverlay[x].fx1;
    }
});