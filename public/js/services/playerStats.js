app.service('playerStats', function() {
    
    var username = "";
    var xp = 0;

    this.saveUsername = function(x, y) {
        username = x,
        xp = y
    }

    this.getUsername = function() {
        return username;
    }

    this.getXp = function() {
        return xp;
    }
    

});