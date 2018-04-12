app.service('playerStats', function() {
    
    var username = "",
        hp = 10,
        mp = 5,
        power = 1,
        resistance = 1,
        accuracy = 8,
        insight = 1,
        specialpower = 1,
        xp = 1,
        level = 1;

    this.saveUsername = function(user, hp, mp, pow, res, acc, ins, spe, xp, lvl) {
        username = user,
        hp = hp,
        mp = mp,
        power = pow,
        resistance = res,
        accuracy = acc,
        insight = ins,
        specialpower = spe,
        xp = xp,
        level = lvl
    }

    this.getUsername = function() {
        return username;
    }

    this.getXp = function() {
        return xp;
    }
    

});