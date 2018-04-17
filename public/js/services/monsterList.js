app.service('monsterList', function() {
    var enemy = [
        {name: "Slime", maxHP: 10, power: 2, specialPower: 2, accuracy: 85, resistance: 1},
        {name: "Dino", maxHP: 15, power: 3, specialPower: 3, accuracy: 85, resistance: 2},
        {name: "Reptile", maxHP: 20, power: 4, specialPower: 5, accuracy: 85, resistance: 3}
    ];

    var enemyImage = [
        {idle: "img/monster/slime/idle.gif", attack: "img/monster/slime/attack.gif", special: "img/monster/slime/attack2.gif", hit:"img/monster/slime/hit.gif"},
        {idle: "img/monster/dino/idle.gif", attack: "img/monster/dino/attack.gif", special: "img/monster/dino/attack2.gif", hit:"img/monster/dino/hit.gif"},
        {idle: "img/monster/reptile/idle.gif", attack: "img/monster/reptile/attack.gif", special: "img/monster/reptile/guard.gif", hit:"img/monster/reptile/hit.gif"}
    ];

    var playerImageOverlay = [
        {fx1: "img/fx/14filter.gif"},
        {fx1: "img/fx/13filter.gif"},
        {fx1: "img/fx/2filter.gif"},
        {fx1: "img/fx/1filter.gif"}   ];

    this.getEnemy=function(x) {
        return enemy[x];
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