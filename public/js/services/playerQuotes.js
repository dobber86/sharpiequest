app.service('playerQuotes', function() {
    var correctQuote = 4;

    //Slime quotes
    var slimeQuotes = [
        "It's face is looking a bit mischievous.",
        "It looks like it's a bit scared of me.",
        "It seems to be preparing to do something weird.",
        "Dang it! I got slime all over my armor.",
        "I think I need a nap after this."
    ];

    //Dino quotes
    var dinoQuotes = [
        "Those teeth are very sharp!",
        "It's flapping its tail really fast.",
        "It seems to be very focussed.",
        "I thought dinos were extinct? Time to correct that.",
        "I really should have stayed in school."
    ];

    //Reptile quotes
    var reptileQuotes = [
        "That reptile is looking very agressive.",
        "I got him on the ropes!",
        "Uh-oh. It looks incredibly angry now.",
        "I sure hope you know what you're doing.",
        "I hope this thing drops some nice loot."
    ];

    this.getQuote=function(enemyName, enemyResponse) {
        var correctQuote = Math.floor((Math.random() * 5) + 1);
        
        if (enemyName === "Slime") {
            if (correctQuote === 1 || correctQuote === 2 || correctQuote === 3) {
                if (enemyResponse === 1) {
                    return slimeQuotes[0];
                }
                if (enemyResponse === 2) {
                    return slimeQuotes[1];
                }
                if (enemyResponse === 3) {
                    return slimeQuotes[2];
                }
            }
            if (correctQuote === 4) {
                return slimeQuotes[3];
            }
            if (correctQuote === 5) {
                return slimeQuotes[4];
            } 
        }   

        if (enemyName === "Dino") {
            if (correctQuote === 1 || correctQuote === 2 || correctQuote === 3) {
                if (enemyResponse === 1) {
                    return dinoQuotes[0];
                }
                if (enemyResponse === 2) {
                    return dinoQuotes[1];
                }
                if (enemyResponse === 3) {
                    return dinoQuotes[2];
                }
            }
            if (correctQuote === 4) {
                return dinoQuotes[3];
            }
            if (correctQuote === 5) {
                return dinoQuotes[4];
            }
        }
        
        if (enemyName === "Reptile") {
            if (correctQuote === 1 || correctQuote === 2 || correctQuote === 3) {
                if (enemyResponse === 1) {
                    return reptileQuotes[0];
                }
                if (enemyResponse === 2) {
                    return reptileQuotes[1];
                }
                if (enemyResponse === 3) {
                    return reptileQuotes[2];
                }
            }
            if (correctQuote === 4) {
                return reptileQuotes[3];
            }
            if (correctQuote === 5) {
                return reptileQuotes[4];
            }
        }    
    }
});