x_wrist_l = 0;
y_wrist_l = 0;

x_wrist_r = 0;
y_wrist_r = 0;

score_l = 0;
song_s_l = "";
song_1 = "";

score_r = 0;
song_s_r = "";
song_2 = "";
function setup() {
    canvas = createCanvas(550, 450);
    canvas.position(370, 120);

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelloaded);
    posenet.on('pose', gotresult);
}
function preload() {
    song_1 = loadSound("enemy.mp3");
    song_2 = loadSound("unstoppable.mp3");
}

function draw() {
    image(video, 0, 0, 550, 450);
    song_s_l = song_1.isPlaying();
    song_s_r = song_2.isPlaying();
    fill("blue");
    stroke("red");

    if(score_r > 0.2) {
        circle(x_wrist_r,y_wrist_r,15);
        song_1.stop();

        if(song_s_r == false) {
            song_2.play();
            document.getElementById("song_name").innerHTML = "Song Name = Unstoppable by sia";
        }
        
    }

    if(score_l > 0.2) {
        circle(x_wrist_l,y_wrist_l,15);
        song_2.stop();

        if(song_s_l == false) {
            song_1.play();
            document.getElementById("song_name").innerHTML = "Song Name = Enemy by Imagine dragons";
        }
        
    }
}

function modelloaded() {
    console.log("model is loaded");
}

function gotresult(results) {
    if (results.length > 0) {
        console.log(results);

        x_wrist_l = results[0].pose.leftWrist.x;
        y_wrist_l = results[0].pose.leftWrist.y;

        x_wrist_r = results[0].pose.rightWrist.x;
        y_wrist_r = results[0].pose.rightWrist.y;

        console.log("x of left wrist is = " + x_wrist_l + "   y of left wrist is = " + y_wrist_l + ",   x of right wrist is = " + x_wrist_r + "   y of right wrist is = " + y_wrist_r);

        score_l = results[0].pose.keypoints[9].score;
        score_r = results[0].pose.keypoints[10].score;
        console.log(score_l);
        console.log(score_r);
    }
}