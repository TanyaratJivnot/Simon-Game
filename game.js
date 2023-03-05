var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern =[];

var statusGame = false;
var level =0;

/* ผู้ใช้ click ปุ่ม */
$(".btn").click(function handler() {
    var userChosenColour = $(this).attr("id");/* เก็บ ID */
    userClickedPattern.push(userChosenColour);/*เก็บ ID ลงอาเรย์ */

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);/* นำสื่งที่ผู้เล่นกดเข้าเชคที่ method -1 คือ เลือกเชคคำตอบสุดท้ายที่ผู้เล่นกด */
});

$(document).keydown(function(){
    if(!statusGame){
        $("#level-title").text("Level"+level);
        nextSequence();
        statusGame = true;
    }
})
function nextSequence(){
    userClickedPattern = [];/* เก็บค่าล่าสุดเสมอ */
    console.log(userClickedPattern);
    level++;
    $("#level-title").text("Level "+level); 

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("." + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    var clickColor = $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        clickColor.removeClass("pressed")
    },100);
}
function checkAnswer(currentLevel){
    /* เช็คค่าอาเรย์ที่เก็บ ของที่สุ่มเเละของที่ผู้เล่นกดว่าตรงไหม */
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        /* ถ้าคำตอบถูก ให้เลื่อน level */
        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        $("h1").text("Game Over, Press Any Key to Restart");
        var soundWrong = new Audio("sounds/wrong.mp3");
        soundWrong.play();
        var worng=$("body").addClass("game-over");
        setTimeout(function(){
            worng.removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    statusGame = false;
}