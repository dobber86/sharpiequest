app.service('soundHandler', function($timeout) {
    var musicVolume = 0.1;
    var soundVolume = 0.3;
    var toggle = false;
    
    var sounds = [ 
        {file: "img/sound/31.ogg", timeout: 0}, // menu
        {file: "img/sound/33.ogg", timeout: 250}, // victory
        {file: "img/sound/35.ogg", timeout: 250}, // death
        {file: "img/sound/12.ogg", timeout: 500}, //slash
        {file: "img/sound/26.ogg", timeout: 500}, //guard
        {file: "img/sound/24.ogg", timeout: 500}, //devastate

        {file: "img/sound/18.ogg", timeout: 250}, //slime1
        {file: "img/sound/3.ogg", timeout: 250}, //slime2
        {file: "img/sound/9.ogg", timeout: 600}, //dino1
        {file: "img/sound/28.ogg", timeout: 600}, //dino2

        {file: "img/sound/12.ogg", timeout: 250}, //reptile1
        {file: "img/sound/20.ogg", timeout: 500} //reptile2
    ];
    
    this.getMusic = function(x) {
        if (x === 0 || x === 1 || x === 2) {
            return "img/music/theme-1.ogg";
        }
        if (x === 3) {
            return "img/music/final-countdown.mp3";
        }
    }

    this.getSound = function(name) {
        if (name === "menu") {
            return sounds[0].file;
        }
        if (name === "victory") {
            return sounds[1].file;
        }
        if (name === "death") {
            return sounds[2].file;
        }
        if (name === "slash") {
            return sounds[3].file;
        }
        if (name === "guard") {
            return sounds[4].file;
        }
        if (name === "devastate") {
            return sounds[5].file;
        }

        if (name === "slime1") {
            return sounds[6].file;
        }
        if (name === "slime2") {
            return sounds[7].file;
        }
        if (name === "dino1") {
            return sounds[8].file;
        }
        if (name === "dino2") {
            return sounds[9].file;
        }
        if (name === "reptile1") {
            return sounds[10].file;
        }
        if (name === "reptile2") {
            return sounds[11].file;
        }
    }

    this.playSound = function(name) {
        if (name === "menu") {
            if (menu.play()) {
                return menu.currentTime = 0;
            }
            else {
                return menu.play();
            }
        }

        if (name === "victory") {
            return  $timeout(function() { sound.play();  }, sounds[1].timeout);
        }
        if (name === "death") {
            return  $timeout(function() { sound.play();  }, sounds[2].timeout);
        }
        if (name === "slash") {
            return  $timeout(function() { sound.play();  }, sounds[3].timeout);
        }
        if (name === "guard") {
            return  $timeout(function() { sound.play();  }, sounds[4].timeout);
        }
        if (name === "devastate") {
            return  $timeout(function() { sound.play();  }, sounds[5].timeout);
        }

        if (name === "slime1") {
            return  $timeout(function() { reaction.play();  }, sounds[6].timeout);
        }
        if (name === "slime2") {
            return  $timeout(function() { reaction.play();  }, sounds[7].timeout);
        }
        if (name === "dino1") {
            return  $timeout(function() { reaction.play();  }, sounds[8].timeout);
        }
        if (name === "dino2") {
            return  $timeout(function() { reaction.play();  }, sounds[9].timeout);
        }
        if (name === "reptile1") {
            return  $timeout(function() { reaction.play();  }, sounds[10].timeout);
        }
        if (name === "reptile2") {
            return  $timeout(function() { reaction.play();  }, sounds[11].timeout);
        }
    }

    this.getVolume = function(x) {
        if (x === "music") {
            return musicVolume;
        }
        if (x === "sound") {
            return soundVolume;
        }
    }

    this.pauseMusic = function() {
        return music.paused ? music.play() : music.pause();
    }

    this.pauseSound = function() {
        if (!toggle) {
            if (soundVolume > 0) {
                soundVolume = 0;
                return soundVolume;
                toggle = true;
            }
        }
        if (!toggle) {
            if (soundVolume === 0) {
                soundVolume = 0.3;
                return soundVolume;
                toggle = true;
            }
        }
        toggle = false;
    }
});