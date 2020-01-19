let paddle_left_y;
let paddle_right_y;
let paddle_left_x = 15;
let paddle_right_x;
let paddle_width = 5;
let paddle_height = 50;
let paddle_down_right = true;
let paddle_down_left = false;
let circle_x;
let circle_y;
let paddle_speed_right;
let paddle_speed_left;
let x_speed;
let y_speed;
let coin_flip;
let player_1 = { "score": 0, "streak": 0 };
let player_2 = { "score": 0, "streak": 0 };
let top_streak = { "player": "none", "streak": 0 };

let hit_left = false;
let hit_right = false;

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('canvas');
    canvas.background(105);
    circle_x = random(width);
    circle_y = random(height);
    paddle_left_y = random(2, height);
    paddle_right_y = random(2, height);
    paddle_right_x = width - 20;
    coin_flip = floor(random(2));
    x_speed = floor(random(1, 3));
    y_speed = floor(random(1, 3));
    paddle_speed_right = floor(random(2, 5));
    paddle_speed_left = floor(random(2, 5));
    if (coin_flip > 0) {
        x_speed *= -1;
        y_speed *= -1;
    }
}

function draw() {
    background(105);
    noStroke();

    drawRectLeft();
    drawRectRight();
    drawCircle();
    hitCheck();

    updateScores();

}

function updateScores() {
    document.getElementById("player1").innerHTML = "Player 1<br><strong>" + player_1.score + "</strong>";
    document.getElementById("player2").innerHTML = "Player 2<br><strong>" + player_2.score + "</strong>";
    document.getElementById("streak").innerHTML = "Highest Streak<br><strong>" + top_streak.streak + "</strong>";
}

function hitCheck() {
    if (circle_x - 5 < paddle_left_x || circle_x + 5 > paddle_right_x + paddle_width) {

    } else {
        // check left paddle
        if (!hit_left && circle_x - 5 <= paddle_left_x + paddle_width
            && circle_y - 5 > paddle_left_y
            && circle_y + 5 < paddle_left_y + paddle_height) {
            x_speed = -x_speed;
            hit_left = true;
            hit_right = false;
        }
        if (!hit_right && circle_x + 5 >= paddle_right_x
            && circle_y - 5 > paddle_right_y
            && circle_y + 5 < paddle_right_y + paddle_height) {
            x_speed = -x_speed;
            hit_left = false;
            hit_right = true;
        }
    }
}

function drawRectRight() {
    rect(width - 20, paddle_right_y, paddle_width, paddle_height);


    if (paddle_right_y + 50 >= height) {
        paddle_down_right = false;
    }
    if (paddle_right_y <= 0) {
        paddle_down_right = true;
    }

    if (paddle_down_right) {
        paddle_right_y += paddle_speed_right;
    }
    else if (!paddle_down_right) {
        paddle_right_y -= paddle_speed_right;
    }
}

function drawRectLeft() {
    rect(paddle_left_x, paddle_left_y, paddle_width, paddle_height);


    if (paddle_left_y + 50 >= height) {
        paddle_down_left = false;
    }
    if (paddle_left_y <= 0) {
        paddle_down_left = true;
    }

    if (paddle_down_left) {
        paddle_left_y += paddle_speed_left;
    }
    else if (!paddle_down_left) {
        paddle_left_y -= paddle_speed_left;
    }
}

function drawCircle() {
    circle(circle_x, circle_y, 10);

    circle_x += x_speed;
    circle_y += y_speed;

    if (circle_x > width + 10) {
        player_1.score++;
        player_1.streak++;
        player_2.streak = 0;
        if (top_streak.streak < player_1.streak) {
            top_streak.player = "Player 1";
            top_streak.streak = player_1.streak;
        }

        reset();
    } else if (circle_x < - 10) {
        player_2.score++;
        player_2.streak++;
        player_1.streak = 0;
        if (top_streak < player_2.streak) {
            top_streak.player = "Player 2";
            top_streak.streak = player_2.streak;
        }
        reset();
    }
    if (circle_y > height - 5 || circle_y < 5) {
        y_speed = -y_speed;
    }
}
function reset() {
    //x_speed = -x_speed;
    circle_x = random(width / 4, width - (width / 4));
    circle_y = random(height);
    coin_flip = floor(random(2));
    x_speed = floor(random(1, 3));
    y_speed = floor(random(1, 3));
    if (coin_flip > 0) {
        x_speed *= -1;
        y_speed *= -1;
    }

    hit_left = false;
    hit_right = false;

    paddle_speed_right = floor(random(2, 5));
    paddle_speed_left = floor(random(2, 5));
}