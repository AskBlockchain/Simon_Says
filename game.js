var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


 function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    console.log(gamePattern);

   level++;

   $("#level-title").text("Level " + level);

    playSound(randomChosenColour);

   $("#"+randomChosenColour).addClass("pressed");
     setTimeout(function () {
       $("#"+randomChosenColour).removeClass("pressed");
     }, 100)


  }


   $(".btn").click(function(){
   var userChosenColor = $(this).attr("id");
   userClickedPattern.push(userChosenColor);

   $("#"+userChosenColor).addClass("pressed");
     setTimeout(function () {
       $("#"+userChosenColor).removeClass("pressed");
     }, 100)

    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length -1);
    console.log(userClickedPattern);
   });


  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play()
    };





$(document).keydown(function(){
  if (!started) {
    nextSequence();

    started = true;
  }

});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

  //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length) {

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      };

  }


  else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Press Any Key to Re-start");
    startOver();
    console.log("Wrong");
  };

  function startOver() {
    started = false;
    level = 0;
    gamePattern = [];

  };

};
