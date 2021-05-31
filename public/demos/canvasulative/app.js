// Requirements (browser support):
// * <canvas>
// * ES5 array methods

// Extremely simple high score persistence via localStorage:
var HighScore = {
    key: 'canvasulative_hiscore',
    get: function() {
        var item = localStorage.getItem(this.key) || 0;
        return parseFloat(item);
    },
    set: function(score) {
        localStorage.setItem(this.key, '' + score);
    }
}

function Game(width, height) {
    this.width = width;
    this.height = height;
    this.timeLeft = 60;
    this.score = 0;
    this.topScore = HighScore.get();
    this.pointsPerSecond = 0;
    this.showIntroOverlay = true;
    this.gameStartTime = null;      // Game start time, in milliseconds
    this.enemies = [];
    this.boundaries = { minX: 0, maxX: this.width,
                        minY: 0, maxY: this.height };
}
Game.prototype = {
    update: function(inputCommands, dt) {
        // FIXME: end of game high score is sometimes different from actual score:
        this.ship && this.ship.update(inputCommands, this.boundaries);
        for (var i in this.enemies) {
            this.enemies[i].update();
        }
        if (this.showIntroOverlay) {
            if (inputCommands.startGame) { this.start(); }
        }
        else {
            var elapsedTimeInMs = (new Date()).getTime() - this.gameStartTime;
            this.timeLeft = 60 - elapsedTimeInMs/1000;
            this.score += this.pointsPerSecond * dt;
            this.checkForCollisions(this.ship, this.enemies);
            if (this.timeLeft <= 0) {
                this._endGame();
            }
        }
    },
    crashShip: function() {
        this.ship.crash();
        this._endGame();
    },
    _endGame: function() {
        this.showIntroOverlay = true;
        if (this.score > this.topScore) {
            this.topScore = this.score;
            HighScore.set(this.topScore);
        }
    },
    start: function() {
        this.showIntroOverlay = false;
        this.timeLeft = 60;
        this.pointsPerSecond = 0;
        this.score = 0;
        this.gameStartTime = (new Date()).getTime();
        this.ship = new Ship({x: 200, y: 200});
        this.pellet = new Pellet({x: 300, y: 300});
        this.enemies = [];
        this.spawnEnemy({x: 100, y: 100});
    },
    spawnEnemy: function(spawnLocation) {
        // Ensure that the new enemy moves away from the ship at first:
        var direction = {x: -(this.ship.x - spawnLocation.x), y: -(this.ship.y - spawnLocation.y)};
        var magnitude = Math.sqrt(direction.x*direction.x + direction.y*direction.y);
        direction.x = direction.x/magnitude;
        direction.y = direction.y/magnitude;
        var enemy = new Enemy(spawnLocation, direction, this.boundaries);
        this.enemies.push(enemy);
    },
    checkForCollisions: function() {
        var self = this;
        // Report a collision if any enemy overlaps the ship
        // We are approximating the ship as a circle for ease of calculation
        var enemy_collision = this.enemies.some(function(e) {
            var distanceSquared = Math.pow(e.x - self.ship.x, 2) + Math.pow(e.y - self.ship.y, 2);
            return (distanceSquared < Math.pow(self.ship.radius + e.getRadius(), 2));
        });
        enemy_collision && this.crashShip();

        // Check for a collision with a pellet
        var p = this.pellet;
        if (p) {
            var pelletDistanceSquared = Math.pow(p.x - self.ship.x, 2) + Math.pow(p.y - self.ship.y, 2);
            if (pelletDistanceSquared < Math.pow(self.ship.radius + p.radius, 2)) {
                this.doPelletCollision();
            }
        }
    },
    doPelletCollision: function() {
        // Spawn a new enemy & pellet, ensuring that they don't appear right
        // beside the ship:
        var new_point = {x: this.ship.x, y: this.ship.y};
        while (Math.abs(new_point.x - this.ship.x) < 50 && Math.abs(new_point.y - this.ship.y) < 50) {
            new_point = {x: (50 + Math.random()*300), y: (50 + Math.random()*300)};
        }
        this.pointsPerSecond += this.pellet.value;
        this.pellet = new Pellet(new_point);
        this.spawnEnemy(new_point);
    }
};



function Ship(startLocation) {
    this.width = this.height = 15;      // Dimensions of ship in pixels
    this.x = startLocation.x;           // Location of ship's center
    this.y = startLocation.y;
    this.velocity = { x: 0, y: 0};
    this.radius = this.width;                   // Approximate, used for collision detection
    this.crashedAt = null;
}

Ship.prototype = {

    // Move the ship in response to the user's input commands.
    // Handles the following commands: moveLeft, moveRight, moveUp, moveDown
    // contraints should be an object with minX, maxX, minY, and maxY properties
    update: function(commands, constraints) {
        var MAX_SPEED = 3.2;
        var ACCELERATION = 0.8;   // Amount of speed to add when given a movement command
        var FRICTION = 1.1;       // Factor of velocity slowdown when no input is provided

        // Check for movement commands and use them to calculate acceleration values:
        var accelX = (commands['moveLeft'] ? -ACCELERATION : 0) || (commands['moveRight'] ? +ACCELERATION : 0);
        var accelY = (commands['moveUp'] ? -ACCELERATION : 0) || (commands['moveDown'] ? +ACCELERATION : 0);
        accelX && !this.crashedAt ? (this.velocity.x += accelX) : (this.velocity.x /= FRICTION);
        accelY && !this.crashedAt ? (this.velocity.y += accelY) : (this.velocity.y /= FRICTION);

        // Ensure our speed does not exceed MAX_SPEED:
        var speed = Math.sqrt(this.velocity.x*this.velocity.x + this.velocity.y*this.velocity.y);
        if (speed > MAX_SPEED) {
            // I believe this slowdown code is an incorrect simplification, but it seems to work:
            var scaleFactor = MAX_SPEED/speed;
            this.velocity.x *= scaleFactor;
            this.velocity.y *= scaleFactor;
        }
        // Enforce boundary conditions before moving the ship:
        var nextX = this.x + this.velocity.x;
        var nextY = this.y + this.velocity.y;
        if (nextX > constraints.minX + this.width/2 && nextX < constraints.maxX - this.width/2) { this.x = nextX; }
        if (nextY > constraints.minY + this.height/2 && nextY < constraints.maxY - this.height/2) { this.y = nextY; }
    },

    crash: function() {
        this.crashedAt = new Date();
    }
};


function Pellet(spawnLocation) {
    this.x = spawnLocation.x;
    this.y = spawnLocation.y;
    this.radius = 5;
    this.value = 10;
}


function Enemy(spawnLocation, direction, boundaries) {
    this.x = spawnLocation.x;
    this.y = spawnLocation.y;
    this.direction = direction;                 // A unit vector object specifying the direction of movement;
    this.boundaries = boundaries;               // an object with minX, maxX, minY, and maxY properties
    this.spawnedAt = (new Date()).getTime();    // spawn timestamp in milliseconds
    this.xBoundaries = undefined;
    this.yBoundaries = undefined;
}

Enemy.prototype = {
    // Return the time since the enemy was spawned, in milliseconds:
    getAge: function() {
        return (new Date()).getTime() - this.spawnedAt;
    },

    // Shrink the enemy's size as it ages:
    getRadius: function() {
        var maxRadius = 30, minRadius = 10;
        return Math.max(minRadius, maxRadius - this.getAge()/500);
    },

    // Slow the enemy down as it ages:
    getSpeed: function() {
        var initialSpeed = 3, minSpeed = 1;
        return Math.max(initialSpeed - this.getAge()/3000, minSpeed);
    },

    update: function() {
        var radius = this.getRadius();

        // Update X position, enforcing boundary conditions:
        var newX = this.x + this.direction.x*this.getSpeed();
        if (newX - radius < this.boundaries.minX) {
            newX = this.boundaries.minX + radius;
            this.direction.x = -this.direction.x;
        }
        else if (newX + radius > this.boundaries.maxX) {
            newX = this.boundaries.maxX - radius;
            this.direction.x = -this.direction.x;
        }
        this.x = newX;

        // Update Y position, enforcing boundary conditions:
        var newY = this.y + this.direction.y*this.getSpeed();
        if (newY - radius < this.boundaries.minY) {
            newY = this.boundaries.minY + radius;
            this.direction.y = -this.direction.y;
        }
        else if (newY + radius > this.boundaries.maxY) {
            newY = this.boundaries.maxY - radius;
            this.direction.y = -this.direction.y;
        }
        this.y = newY;
    }
};



function GameView(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.setDefaults();
    this.render();
}

GameView.prototype = {
    setDefaults: function() {
        this.context.fillStyle = 'white';
        this.context.strokeStyle = 'white';
        this.context.font = '1em Joystix,monospace';
    },

    render: function() {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);    // Reset the canvas
        this.drawEnemies(this.game.enemies);
        this.game.ship && this.drawShip(this.game.ship);
        this.game.pellet && this.drawPellet(this.game.pellet);
        this.drawStats();
        this.game.showIntroOverlay ? this.drawIntroOverlay() : null;
        this._getNextFrame();
    },

    // Draw an overlay on the canvas, with the game name, controls, etc.
    drawIntroOverlay: function() {
        this.context.save();
        this.context.textAlign = 'center';
        // Display main title:
        this.context.font = '2em Joystix,monospace';
        this.context.fillText('Canvasulative', this.canvas.width/2, this.canvas.height/2 - 30);
        this.context.font = '1em Joystix,monospace';
        this.context.fillText('Press SPACE to play', this.canvas.width/2, this.canvas.height/2);

        // Display attribution text at the bottom:
        this.context.font = '0.8em Joystix,monospace';
        this.context.fillText('A clone of Cumulative, by Guy Lima:', this.canvas.width/2, this.canvas.height - 85);
        this.context.fillText('http://www.guylima.com/cumulative/', this.canvas.width/2, this.canvas.height - 70);
        this.context.restore();
    },

    drawStats: function() {
        var width = this.canvas.width;
        var height = this.canvas.height;
        var textPadding = 5;
        this.context.textAlign = 'left';
        this.context.fillText('Time: ' + this.game.timeLeft.toFixed(1), textPadding, 20);
        this.context.textAlign = 'right';
        this.context.fillText('Score: ', width - textPadding - 50, 20);
        this.context.fillText(this.game.score.toFixed(0), width - textPadding, 20);
        this.context.fillText('Top: ', width - textPadding - 50, 40);
        this.context.fillText(this.game.topScore.toFixed(0), width - textPadding, 40);
        this.context.fillText('Pts/s: ' + this.game.pointsPerSecond, width - textPadding, height - textPadding);
    },

    getEnemyColour: function(age) {
        var maxOpacity = 1, minOpacity = 0.4;
        var opacity = Math.max(minOpacity, maxOpacity - age/5000);
        return 'rgba(255,0,0,' + opacity.toFixed(2) + ')';
    },

    drawShip: function(ship) {
        var timeSinceCrash = ship.crashedAt && (new Date() - ship.crashedAt);
        if (!timeSinceCrash) {
            this.context.strokeStyle = 'white';
            this.context.lineWidth = 3;
            this.context.strokeRect(ship.x - ship.width/2, ship.y - ship.height/2, ship.width, ship.height);
        }
        else if (timeSinceCrash < 2000) {
            // Draw the ship's exploding debris
            var numParticles = 20;
            for (var i=0; i<numParticles; i += 1) {
                var delX = Math.sin(Math.PI*i/6.5)*timeSinceCrash/40;
                var delY = Math.cos(Math.PI*i/6.5)*timeSinceCrash/40;
                this.context.fillRect(ship.x + delX, ship.y + delY, 2, 2);
                this.context.fillRect(ship.x + delX/2, ship.y + delY/2, 2, 2);
            }
        }
    },

    drawPellet: function(pellet) {
        this.context.strokeStyle = 'yellow';
        this.context.lineWidth = 3;
        this.context.beginPath();
        this.context.arc(pellet.x - pellet.radius, pellet.y - pellet.radius, pellet.radius, 0, Math.PI*2, false);
        this.context.stroke();
    },

    // Draw each enemy on the canvas
    drawEnemies: function(enemies) {
        this.context.save();
        this.context.lineWidth = 5;
        this.context.lineCap = 'round';
        for (var i = 0; i < enemies.length; i+=1) {
            var enemy = enemies[i];
            var radius = enemy.getRadius();
            var rotationAngle = enemy.getAge()/500;
            this.context.strokeStyle = this.getEnemyColour(enemy.getAge());
            this.context.beginPath();
            this.context.arc(enemy.x, enemy.y, radius,
                             Math.PI/8 + rotationAngle, 7*Math.PI/8 + rotationAngle, false);
            this.context.stroke();
            this.context.beginPath();
            this.context.arc(enemy.x, enemy.y, radius,
                             9*Math.PI/8 + rotationAngle, 15*Math.PI/8 + rotationAngle, false);
            this.context.stroke();
        }
        this.context.restore();
    },

    // Use requestAnimationFrame (if available) to trigger the next rendering
    // of the GameView.
    _getNextFrame: function() {
        this.render_func = this.render_func || this.render.bind(this);
        this.requestAnimFrame = this.requestAnimFrame || (function(){
            return window.requestAnimationFrame       ||
                   window.webkitRequestAnimationFrame ||
                   window.mozRequestAnimationFrame    ||
                   window.oRequestAnimationFrame      ||
                   window.msRequestAnimationFrame     ||
                   function(callback, element){
                       window.setTimeout(callback, 1000 / 60);
                   };
        }());

        // Call this.render (with the appropriate "this" value) for each frame.
        // We also need to bind our requestAnimFrame to window, or it won't run
        // properly.
        this.requestAnimFrame.bind(window)(this.render_func, this.canvas);
    }
};



// Converts browser input events to game-related commands
function InputController(game) {
    this.game = game;       // Game model object
    this._commands = {};    // Queued commands to be sent to the model

    // Map javascript key codes to game commands that can be sent to the model:
    this.keyMap = {
        32: 'startGame',    // space
        37: 'moveLeft',     // left arrow
        38: 'moveUp',       // up arrow
        39: 'moveRight',    // right arrow
        40: 'moveDown'      // down arrow
    };
    this.bindKeyboardListeners();
    this.startUpdateLoop();
}
InputController.prototype = {
    bindKeyboardListeners: function() {
        var that = this;
        window.addEventListener('keydown', function(e) {
            if (e.keyCode in that.keyMap) {
                var commandName = that.keyMap[e.keyCode];
                that._commands[commandName] = true;
            }
        });
        window.addEventListener('keyup', function(e) {
            if (e.keyCode in that.keyMap) {
                var commandName = that.keyMap[e.keyCode];
                delete that._commands[commandName];
            }
        });
    },
    startUpdateLoop: function() {
        var ticksPerSecond = 50;
        var dt = 1/ticksPerSecond;
        var self = this;
        var updateFn = (function() {
            self.game.update(this._commands, dt);
        }).bind(this);
        setInterval(updateFn, 1000/ticksPerSecond);
    }
};


window.onload = function() {
    var canvas = document.getElementById('game');
    var game = new Game(canvas.width, canvas.height);
    var view = new GameView(game, canvas);
    var controller = new InputController(game);
};
