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

    var slimeMiniQuotes = [
        "Blob",
        "Bloobl",
        "Blegh",
        "Blub",
        "Blahp"
    ];

    //Dino quotes
    var dinoQuotes = [
        "Those teeth are very sharp!",
        "It's flapping its tail really fast.",
        "It seems to be very focussed.",
        "I thought dinos were extinct?",
        "I really should have stayed in school."
    ];

    var dinoMiniQuotes = [
        "Rawr!",
        "Chomp",
        "Rawr?",
        "Eegh!",
        "Food?"
    ];

    //Reptile quotes
    var reptileQuotes = [
        "That reptile is looking very agressive.",
        "I got him on the ropes!",
        "Uh-oh. It looks incredibly angry now.",
        "I sure hope you know what you're doing.",
        "I hope this thing drops some nice loot."
    ];

    var reptileMiniQuotes = [
        "Get ready to die!",
        "You look ugly!",
        "The prophecy is a lie!",
        "You are not the one!",
        "Look at my scales!"
    ];

    //Giant quotes
    var giantQuotes = [
        "He's charging right for me!",
        "I think I see an opening!",
        "I can feel the ground shaking...",
        "Luckily I have proper adventurer insurance.",
        "Please don't delete me if you lose."
    ];

    var giantMiniQuotes = [
        "Me Smash!",
        "You weak.",
        "Me final boss!",
        "You like pancakes?",
        "Me no depth perception."
    ];

    this.getQuote=function(enemyName, enemyResponse, playerInsight) {
        var correctQuote = Math.floor((Math.random() * 100) + 1);
        
        if (enemyName === "Slime") {
            if (correctQuote < playerInsight) {
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
            else {
                var wrongQuote = Math.floor((Math.random() * 2) + 1);
                if (wrongQuote === 1) {
                    return slimeQuotes[3];
                }
                if (wrongQuote === 2) {
                    return slimeQuotes[4];
                }
            }
        }   

        if (enemyName === "Dino") {
            if (correctQuote < playerInsight) {
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
            else {
                var wrongQuote = Math.floor((Math.random() * 2) + 1);
                if (wrongQuote === 1) {
                    return dinoQuotes[3];
                }
                if (wrongQuote === 2) {
                    return dinoQuotes[4];
                }
            }
        }
        
        if (enemyName === "Reptile") {
            if (correctQuote < playerInsight) {
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
            else {
                var wrongQuote = Math.floor((Math.random() * 2) + 1);
                if (wrongQuote === 1) {
                    return reptileQuotes[3];
                }
                if (wrongQuote === 2) {
                    return reptileQuotes[4];
                }
            }
        }
        
        if (enemyName === "Giant") {
            if (correctQuote < playerInsight) {
                if (enemyResponse === 1) {
                    return giantQuotes[0];
                }
                if (enemyResponse === 2) {
                    return giantQuotes[1];
                }
                if (enemyResponse === 3) {
                    return giantQuotes[2];
                }
            }
            else {
                var wrongQuote = Math.floor((Math.random() * 2) + 1);
                if (wrongQuote === 1) {
                    return giantQuotes[3];
                }
                if (wrongQuote === 2) {
                    return giantQuotes[4];
                }
            }
        }
    }

    this.getMiniQuote=function(enemyName) {
        var miniQuote = Math.floor((Math.random() * 5));
        if (enemyName === "Slime") {
            return slimeMiniQuotes[miniQuote];
        }
        if (enemyName === "Dino") {
            return dinoMiniQuotes[miniQuote];
        }
        if (enemyName === "Reptile") {
            return reptileMiniQuotes[miniQuote];
        }
        if (enemyName === "Giant") {
            return giantMiniQuotes[miniQuote];
        }
    }
});