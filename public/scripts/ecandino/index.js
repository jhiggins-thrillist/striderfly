function start_game() {
    game = new Game();
   $(document).keydown(function(e) {
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            e.preventDefault();
        }
        if (game.dead == -1 && game.lives > 0) {
            if (e.keyCode == 38){ 
                up();
            } else if (e.keyCode == 40){
                down();
            } else if (e.keyCode == 37){
                left();
            } else if (e.keyCode == 39){
                right();
            } 
        }
    });
    board = document.getElementById("game");
    context=board.getContext("2d");
    theme = document.createElement('audio');
    theme.setAttribute('src', 'assets/frogger.mp3');
    theme.setAttribute('loop', 'true');
    theme.play();
    sprites = new Image();
    deadsprite = new Image();
    sprites.src = "images/ecandino/frogger_sprites.png"; 
    deadsprite.src = "images/ecandino/dead_frog.png";
    sprites.onload = function() {
        draw_bg();
        draw_info();
        make_cars();
        make_logs();
        draw_frog();
        setInterval(game_loop, 50);
    }
}

function game_loop() {
    draw_bg();
    draw_info();
    draw_cars();
    draw_logs();
    draw_wins()
    if (game.lives > 0) { 
        draw_frog();
    } else {
        game_over();
    }
}

// drawing functions: bg, info, frogger, cars, logs, wins

function draw_bg()  {
    context.fillStyle="#191970";
    context.fillRect(0,0,399,284);
    context.fillStyle="#000000";
    context.fillRect(0,284,399,283);
    context.drawImage(sprites, 0, 0, 399, 113, 0, 0, 399, 113);
    context.drawImage(sprites, 0, 119, 399, 34, 0, 283, 399, 34);
    context.drawImage(sprites, 0, 119, 399, 34, 0, 495, 399, 34);
}

function draw_info() {
    draw_lives();
    context.font = "bold 14pt arial";
    context.fillStyle = "#00EE00";
    context.fillText("Level ", 74, 545);
    draw_level();
    context.font = "bold 10pt arial";
    context.fillText("Score: ", 4, 560);
    context.fillText("Highscore: ", 200, 560);
    draw_score();
}

function draw_lives() {
    var x = 4;
    var y = 532;
    if ((game.score - (game.extra * 10000)) >= 10000 && game.lives < 4) {
        game.extra++;
    }
    for (var i = 0; i<(game.lives + game.extra); i++){ 
        context.drawImage(sprites, 13, 334, 17, 23, x, y, 11, 15);
        x += 14;
    }
}

function draw_level() {
    context.font = "bold 15pt arial";
    context.fillStyle = "#00EE00";
    context.fillText(game.level, 131, 545);
}

function draw_score () {
    context.font = "bold 10pt arial";
    context.fillStyle = "#00EE00";
    context.fillText(game.score, 49, 560);
    if (window.localStorage['highscore']) {
        highscore = localStorage['highscore'];
    } else highscore = 0;
    context.fillText(highscore, 272, 560);
}

function draw_frog() {
    game.log = log_collision();
    if (game.dead > 0) {
            // @4,2 ; 19x24
        context.drawImage(deadsprite, 4, 2, 19, 24, game.posX, game.posY, 19, 24);
        game.dead--;
    }
    else if (game.dead == 0) {
        game.reset();
    }
    else if (game.win > 0) {
        game.win--;
    }
    else if (game.win == 0) {
        game.reset();
    }
    else if (car_collision()) {
        sploosh();
    }
    else if (water_collision() && game.log == -1) {
        sploosh();
    }
    else if (check_win()){
        win();
    }
    else {
        if (game.log >= 0) {
            var tempX = game.posX - (logs[game.log].dir * logs[game.log].speed);
            if (bounds_check(tempX, game.posY)) {
                game.posX = tempX;
            }
        }
        if (game.facing == 'u') {
            context.drawImage(sprites, 12, 369, 23, 17, game.posX, game.posY, 23, 17);
        }
        else if (game.facing == 'd') {
            context.drawImage(sprites, 80, 369, 23, 17, game.posX, game.posY, 23, 17);
        }
        else if (game.facing == 'l') {
            context.drawImage(sprites, 80, 335, 19, 23, game.posX, game.posY, 19, 23);
        }
        else if (game.facing == 'r') {
            context.drawImage(sprites, 12, 335, 19, 23, game.posX, game.posY, 19, 23);
        }
    }
}

function draw_wins() {
    for (var i=0; i<game.won.length; i++) {
        if(game.won[i]) {
            switch (i) {
                case 0:
                    context.drawImage(sprites, 80, 369, 23, 17, 15, 80, 23, 17);
                    break;
                case 1:
                    context.drawImage(sprites, 80, 369, 23, 17, 101, 80, 23, 17);
                    break;
                case 2:
                    context.drawImage(sprites, 80, 369, 23, 17, 187, 80, 23, 17);
                    break;
                case 3:
                    context.drawImage(sprites, 80, 369, 23, 17, 270, 80, 23, 17);
                    break;
                case 4:
                    context.drawImage(sprites, 80, 369, 23, 17, 354, 80, 23, 17);
                    break;                    
            }
        }
    }
}

function draw_cars() {
    for (var i=0; i<cars.length; i++) {
        cars[i].move();
        if (cars[i].out_of_bounds()) {
            cars[i] = make_car(cars[i].lane, null, cars[i].model);
        }
        cars[i].draw();
    }
}

function draw_logs() {
    for (var i=0; i< logs.length; i++) {
        logs[i].move();
        if (logs[i].out_of_bounds()) {
            logs[i] = make_log(logs[i].row)
        }
        logs[i].draw();
    }
}

function game_over() {
    context.font = "bold 72pt arial";
    context.fillStyle = "#FFFFFF";
    context.fillText("GAME", 60, 150);
    context.fillText("OVER", 60, 300);
    if (game.score >= highscore) {
        localStorage['highscore'] = game.score;
        context.font = "bold 48pt arial";
        context.fillStyle = "#00EE00";
        context.fillText("YOU GOT A", 20, 380);
        context.fillText("HIGHSCORE", 6, 460);
    }
}



// movement functions

function up() {
    if (bounds_check(game.posX, game.posY-30)) {
        game.posY -= 30;
        game.current++;
    }
    if (game.current > game.highest) {
        game.score += 10;
        game.highest++;
    }
    game.facing = 'u';
}

function down() {
    if (bounds_check(game.posX, game.posY+30)) {
        game.posY += 30;
        game.current--;
    }
    game.facing = 'd';
}

function left() {
    if (bounds_check(game.posX-30, game.posY)) game.posX -= 30;
    game.facing = 'l';
}

function right() {
    if (bounds_check(game.posX+30, game.posY)) game.posX += 30;
    game.facing = 'r';
}

function bounds_check(x, y) {
    if (y > 90 && y < 510 && x > 0 && x < 369) {
        return true;
    }
    else if (y > 60 && y < 100 && ((x > 5 && x < 40 && !game.won[0]) || 
                (x > 92 && x < 128 && !game.won[1]) || (x > 178 && x < 214 && !game.won[2]) ||
                (x > 263 && x < 299 && !game.won[3]) || (x > 347 && x < 383 && !game.won[4]))) {
        return true;
    }
    return false;
}

function check_win() {
    if(game.posY > 60 && game.posY < 100){
        if(game.posX > 5 && game.posX < 40 && !game.won[0]){
            game.won[0] = true;
            return true;
        } else if (game.posX > 92 && game.posX < 128 && !game.won[1]){
            game.won[1] = true;
            return true;
        } else if (game.posX > 178 && game.posX < 214 && !game.won[2]){
            game.won[2] = true;
            return true;
        } else if (game.posX > 263 && game.posX < 299 && !game.won[3]){
            game.won[3] = true;
            return true;
        } else if (game.posX > 347 && game.posX < 383 && !game.won[4]){
            game.won[4] = true;
            return true;
        }
    }
    return false;
}

function win() {
    game.score += 50;
    game.win = 15;
    if(game.won[0] && game.won[1] && game.won[2] && game.won[3] && game.won[4]){
        level();
    }    
}

function level() {
    for (var i=0; i<game.won.length; i++) {
        game.won[i] = false;
    }
    game.score += 1000;
    game.level ++;
}

// collision detection
// create boxes around two sprites and compare for overlap
function collides(x1, y1, w1, h1, x2, y2, w2, h2) {
    return (((x1 <= x2+w2 && x1 >=x2) && (y1 <= y2+h2 && y1 >= y2)) ||
            ((x1+w1 <= x2+w2 && x1+w1 >= x2) && (y1 <= y2+h2 && y1 >= y2)) ||
            ((x1 <= x2+w2 && x1 >=x2) && (y1+h1 <= y2+h2 && y1+h1 >= y2)) ||
            ((x1+w1 <= x2+w2 && x1+w1 >= x2) && (y1+h1 <= y2+h2 && y1+h1 >= y2)));
}

function car_collision() {
    if (game.posY < 505 && game.posY > 270) {
        for (var i=0; i<cars.length; i++) {
            if (collides(game.posX, game.posY, game.width, game.height, cars[i].posX, cars[i].posY, cars[i].width, cars[i].height)) return true;
        }
    }
    return false;
}

function log_collision() {
    if (game.posY < 270) {
        for (var i=0; i<logs.length; i++) {
            if (collides(game.posX, game.posY, game.width, game.height, logs[i].posX, logs[i].posY, logs[i].width, logs[i].height)) return i;
        }
    }
    return -1;
}

function water_collision() {
    return (game.posY > 105 && game.posY < 270);
}

function sploosh() {
    game.lives--;
    game.dead = 20;
}

// object initializers - cars, logs

function make_cars() {
    cars = [make_car(0), make_car(0, 130, 3), make_car(0, 260, 3), make_car(1), make_car(2), make_car(2, 150, 0), make_car(3, 200), make_car(4), make_car(5), make_car(5, 80), make_car(5, 240)];
}

function make_car(row, x, model) {
    switch(row) {
        case 0:
            return new Car(x==null?-25:x, rows[row], row, 3, model==null?1:model);
            break;
        case 1:
            return new Car(x==null?399:x, rows[row], row, 2, model==null?0:model);
            break;
        case 2:
            return new Car(x==null?399:x, rows[row], row, 4, model==null?2:model);
            break;
        case 3:
            return new Car(x==null?-25:x, rows[row], row, 3, model==null?3:model);
            break;
        case 4:
            return new Car(x==null?399:x, rows[row], row, 3, model==null?0:model);
            break;
        case 5:
            return new Car(x==null?399:x, rows[row], row, 4, model==null?4:model);
            break;
    }
}

function make_logs() {
    logs = [make_log(7), make_log(7, 170), make_log(8), make_log(8, 200), make_log(9), make_log(10), make_log(11), make_log(11, 100, 0), make_log(12)];
}

function make_log(row, x, len) {
    switch(row) {
        case 7:
            return new Log(x==null?399:x, rows[row], row, 1, 1, len==null?1:len);
            break;
        case 8:
            return new Log(x==null?-85:x, rows[row], row, 4, -1, len==null?2:len);
            break;
        case 9:
            return new Log(x==null?399:x, rows[row], row, 2, 1, len==null?0:len);
            break;
        case 10:
            return new Log(x==null?-85:x, rows[row], row, 2, -1, len==null?1:len);
            break;
        case 11:
            return new Log(x==null?399:x, rows[row], row, 3, 1, len==null?1:len);
            break;
        case 12:
            return new Log(x==null?-85:x, rows[row], row, 3, -1, len==null?2:len);
            break;
    }
}

/* game "classes" - game, car, log
 * Car models:
 *   0: pink sedan
 *   1: white sedan
 *   2: yellow sedan
 *   3: white bulldozer
 *   4: white truck
 * Log lengths:
 *   0: long
 *   1: medium
 *   2: small
 */

var models = [{width: 30, height: 22, dir: 1}, {width: 29, height: 24, dir: -1}, {width:24, height: 26, dir: 1}, {width: 24, height: 21, dir: -1}, {width: 46, height: 19, dir: 1}];

function Car(x, y, lane, speed, model) {
    this.posX = x;
    this.posY = y;
    this.lane = lane;
    this.speed = speed;
    this.model = model;
    this.width = models[model].width;
    this.height = models[model].height;
    this.move = function() {
        this.posX = this.posX - (models[model].dir * this.speed * game.level);
    }
    this.draw = function() {
        switch(this.model) {
            case 0:
                context.drawImage(sprites, 8, 265, 30, 22, this.posX, this.posY, 30, 22);
                break;
            case 1: 
                context.drawImage(sprites, 45, 264, 29, 24, this.posX, this.posY, 29, 24);
                break;
            case 2: 
                context.drawImage(sprites, 81, 263, 24, 26, this.posX, this.posY, 24, 26);
                break;
            case 3: 
                context.drawImage(sprites, 9, 300, 24, 21, this.posX, this.posY, 24, 21);
                break;
            case 4: 
                context.drawImage(sprites, 105, 301, 46, 19, this.posX, this.posY, 46, 19);
                break;         
        }
    }
    this.out_of_bounds = function() {
        return ((this.posX + this.width) < 0 || this.posX > 399);
    }
}

var lengths = [{width: 179, height: 21}, {width: 118, height: 21}, {width: 85, height: 22}];

function Log (x, y, row, speed, dir, length) {
    this.posX = x;
    this.posY = y;
    this.row = row;
    this.speed = speed;
    this.dir = dir;
    this.length = length;
    this.width = lengths[length].width;
    this.height = lengths[length].height;
    this.move = function() {
        this.posX = this.posX - (this.dir * this.speed);
    }
    this.draw = function () {
        switch(this.length) {
            case 0:
                context.drawImage(sprites, 6, 165, 179, 21, this.posX, this.posY, 179, 21);
                break;

            case 1:
                context.drawImage(sprites, 5, 197, 118, 21, this.posX, this.posY, 118, 21);
                break;

            case 2:
                context.drawImage(sprites, 6, 229, 85, 22, this.posX, this.posY, 85, 22);
                break;
        }
    }
    this.out_of_bounds = function() {
        return ((this.posX + this.width) < 0 || this.posX > 399);
    }
}

// y-coords of rows starting with first traffic row
var rows = [473, 443, 413, 383, 353, 323, 288, 261, 233, 203, 173, 143, 113];

function Game() {
    this.lives = 5;
    this.extra = 0;
    this.level = 1;
    this.score = 0;   
    this.posX = 187;
    this.posY = 503;
    this.facing = 'u';
    this.log = -1;
    this.current = -1;
    this.highest = -1;
    this.dead = -1;
    this.win = -1;
    this.won = [false, false, false, false, false];
    this.reset = function () {
        this.posY = 503;
        this.posX = 187;
        this.facing = 'u';
        this.log = -1;
        this.current = -1;
        this.highest = -1;
        this.dead = -1;
        this.win = -1;
    }
}