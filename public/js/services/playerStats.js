app.service('playerStats', function() {

    // Initial values:
    var inUsername = "",
        inHp = 15,
        inMaxHp = 15,
        inMp = 10,
        inMaxMp = 10,
        inPower = 3,
        inResistance = 3,
        inAccuracy = 85,
        inInsight = 85,
        inSpecialPower = 3,
        inXp = 1,
        inLevel = 1,
        inMoney = 0;

    var player = {
        username: inUsername,
        hp: inHp,
        maxhp: inMaxHp,
        mp: inMp,
        maxmp: inMaxMp,
        power: inPower,
        resistance: inResistance,
        accuracy: inAccuracy,
        insight: inInsight,
        specialpower: inSpecialPower,
        xp: inXp,
        level: inLevel,
        money: inMoney
    };

    this.saveReset = function() {
        player.hp = inHp,
        player.maxhp = inMaxHp,
        player.mp = inMp,
        player.maxmp = inMaxMp,
        player.power = inPower,
        player.resistance = inResistance,
        player.accuracy = inAccuracy,
        player.insight = inInsight,
        player.specialpower = inSpecialPower,
        player.xp = inXp,
        player.level = inLevel,
        player.money = inMoney
    }

    this.saveUsername = function(dbusername, dbhp, dbmhp, dbmp, dbmmp, dbpow, dbres, dbacc, dbins, dbspe, dbxp, dblvl, dbmon) {
        player.username = dbusername,
        player.hp = dbhp,
        player.maxhp = dbmhp,
        player.mp = dbmp,
        player.maxmp = dbmmp,
        player.power = dbpow,
        player.resistance = dbres,
        player.accuracy = dbacc,
        player.insight = dbins,
        player.specialpower = dbspe,
        player.xp = dbxp,
        player.level = dblvl,
        player.money = dbmon
    }

    this.saveCombatUpdate = function(cHp, cMp, cXp, cLvl) {
        player.hp = cHp,
        player.mp = cMp,
        player.xp = cXp,
        player.level = cLvl
    }

    this.saveLootUpdate = function(lXp, lLvl, lMoney) {
        player.xp = lXp,
        player.level = lLvl,
        player.money = lMoney
    }

    this.getUsername = function() {
        return player.username;
    }

    this.getHp = function() {
        return player.hp;
    }

    this.getMaxHp = function() {
        return player.maxhp;
    }

    this.getMp = function() {
        return player.mp;
    }

    this.getMaxMp = function() {
        return player.maxmp;
    }

    this.getPower = function() {
        return player.power;
    }

    this.getResistance = function() {
        return player.resistance;
    }

    this.getAccuracy = function() {
        return player.accuracy;
    }

    this.getInsight = function() {
        return player.insight;
    }

    this.getSpecialPower = function() {
        return player.specialpower;
    }

    this.getXp = function() {
        return player.xp;
    }

    this.getLevel = function() {
        return player.level;
    }

    this.getMoney = function() {
        return player.money;
    }
});