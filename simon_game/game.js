var buttonColours=["ed","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var gameStarted=false;
$(document).on("keypress",function(){
    if(!gameStarted){
        $("#level-title").text("Level "+level);
        nextSequence();
        gameStarted=true;
    }});

$(".btn").on("click",function(){
        var userChosenColour =$(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);

    })
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);    
}

function playSound(name){
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
            $("#"+currentColour).removeClass("pressed");
    }, 100);
}
function startOver(){
    level=0;
    gamePattern=[];
    gameStarted=false;
}