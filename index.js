var buttonColors = ["red", "blue", "green", "yellow"]; 
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keypress", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

/* adding method to the button and decides what to do after click on buttons */

$(".btn").on("click", function() { 

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern); // stores th color in the array userclickedpattern
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

});

/* function nextsequnce : generating random number and selecting the random color */

function nextSequence() {

  userClickedPattern = []; // Reset user's pattern for the new level
  level++;
  $("#level-title").text("Level " + level); // Adding text that should incraesed accrodingly

  var randomNumber = Math.floor(Math.random() * 4); // creates a random number and roundoff upto 4.
  var randomChosenColor = buttonColors[randomNumber]; // this randomNumber is then used to fetch random color
  gamePattern.push(randomChosenColor); // then the color is pushed in blak array gamePattern

  $("#" + randomChosenColor) // selects the id with color name (html)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);

}

//***************** function playsound: adding sound ********************* */

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // adding sound effects to the color
  audio.play();
}
/****************** function animatepress: adding effects *******************/

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); // adding .pressed class usng Jquery (adding animation)

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed"); // remoing and setting timoeut of the class
  }, 100);
}

/* function checkanswer and generating length */

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

/* funciton startover to begin from the level zero */

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
