peter_pang_Song = "";
harry_potter_Song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
song_peter_pan = "";
scorerightWrist = 0;
song_harry_potter= "";



function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO)
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function preload(){
    peter_pang_Song = loadSound("music2.mp3");
    harry_potter_Song = loadSound("music.mp3");
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#1aff00");
    stroke("#c91444");

    song_peter_pan = peter_pang_Song.isplaying();
    console.log(song_peter_pan);

    if(scoreleftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        harry_potter_Song.stop();
        if(song_peter_pan == false){
            peter_pang_Song.play();

        }
        else{
            document.getElementById("song_id").innerHTML = "Song name: Peter Pan song";
        }
    }
}
function modelLoaded(){
    console.log("PoseNet is initialized");
}
function play(){
    peter_pang_Song.play();
    harry_potter_Song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
if(results.length > 0)
{
    console.log(results);
    scoreleftWrist = results[0].pose.keypoints[9].score;
    console.log("leftWrist_Score = " +scoreleftWrist);

    scorerightWrist = results[0].pose.keypoints[10].score;
    console.log("rightWrist_Score = "+scorerightWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
}
}