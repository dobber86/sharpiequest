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

    var username = inUsername,
        hp = inHp,
        maxhp = inMaxHp,
        mp = inMp,
        maxmp = inMaxMp,
        power = inPower,
        resistance = inResistance,
        accuracy = inAccuracy,
        insight = inInsight,
        specialpower = inSpecialPower,
        xp = inXp,
        level = inLevel,
        money = inMoney;

    this.saveReset = function() {
        hp = inHp,
        maxhp = inMaxHp,
        mp = inMp,
        maxmp = inMaxMp,
        power = inPower,
        resistance = inResistance,
        accuracy = inAccuracy,
        insight = inInsight,
        specialpower = inSpecialPower,
        xp = inXp,
        level = inLevel,
        money = inMoney
    }

    this.saveUsername = function(dbusername, dbhp, dbmhp, dbmp, dbmmp, dbpow, dbres, dbacc, dbins, dbspe, dbxp, dblvl, dbmon) {
        username = dbusername,
        hp = dbhp,
        maxhp = dbmhp,
        mp = mp,
        maxmp = dbmmp,
        power = dbpow,
        resistance = dbres,
        accuracy = dbacc,
        insight = dbins,
        specialpower = dbspe,
        xp = dbxp,
        level = dblvl,
        money = dbmon
    }

    this.saveCombatUpdate = function(cHp, cMp, cXp, cLvl) {
        hp = cHp,
        mp = cMp,
        xp = cXp,
        level = cLvl
    }

    this.getUsername = function() {
        return username;
    }

    this.getHp = function() {
        return hp;
    }

    this.getMaxHp = function() {
        return maxhp;
    }

    this.getMp = function() {
        return mp;
    }

    this.getMaxMp = function() {
        return maxmp;
    }

    this.getPower = function() {
        return power;
    }

    this.getResistance = function() {
        return resistance;
    }

    this.getAccuracy = function() {
        return accuracy;
    }

    this.getInsight = function() {
        return insight;
    }

    this.getSpecialPower = function() {
        return specialpower;
    }

    this.getXp = function() {
        return xp;
    }

    this.getLevel = function() {
        return level;
    }

    this.getMoney = function() {
        return money;
    }
});