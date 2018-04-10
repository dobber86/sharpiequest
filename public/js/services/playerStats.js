app.service('playerStats', function() {
    
    var username = "";

    this.saveUsername=function(x) {
        username = x;
    }

    this.getUsername=function() {
        return username;
    }
  
  });