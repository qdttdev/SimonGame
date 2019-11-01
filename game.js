/***************
 ** VARIABLES **
 ***************/
var buttonColorsAR = ["red", "blue", "green", "yellow"]; // Store color possibilities
var gamePatternAR = []; // Store color patterns of game
var userClickedPatternAR = []; // Store color pattern of user

var notStarted = true; // check if game started
var level = 0; // initialize starting level


/************************************************************************
 ** Function: keypress // First keypress to start game                 **
 ************************************************************************/
$(document).keypress(function()
{
    if(notStarted)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        notStarted = false;
    }   
});

/***********************************************************************
 ** Function: click // Get user click button and button effects       **
 ***********************************************************************/
$(".btn").click(function()
{
    // Get user click button
    var userChosenColor = $(this).attr("id");    
    userClickedPatternAR.push(userChosenColor);

    // Button sound and effects
    playSound(userChosenColor);
    animatePress(userChosenColor);

    // Check answer with computer sequence
    checkAnswer(userClickedPatternAR.length-1);

});


/************************************************************************
 ** Function: checkAnswer // Compare user clicks and Computer sequence **
 ************************************************************************/
function checkAnswer(currentLevel)
{
    if(gamePatternAR[currentLevel] === userClickedPatternAR[currentLevel])
    {
        // TEST
        // console.log(gamePatternAR[gamePatternAR.length-1]);
        // console.log(userClickedPatternAR[userClickedPatternAR.length-1]);
        // console.log("Success");       

        if(userClickedPatternAR.length === gamePatternAR.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }        
    }

    else
    {
        // TEST
        // console.log(gamePatternAR[gamePatternAR.length-1]);
        // console.log(userClickedPatternAR[userClickedPatternAR.length-1]);
        // console.log("Wrong");

        // Sound effect
        playSound("wrong");

        // Animation
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function()
        {
            $("body").removeClass("game-over");
        }, 200);    
        
        // Refresh game
        startOver();

    }
}
/************************************************************************
 ** Function: nextSequence // Computer play and button sound & effects **
 ************************************************************************/
function nextSequence()
{
    // Reset user play for next level
    userClickedPatternAR = [];
    
    // Starts game
    level++;    
    $("#level-title").text("Level " + level);

    // Generate a random number from 0-3
    var randomNumber = Math.floor(Math.random() * 4);   
    var randomChosenColor = buttonColorsAR[randomNumber];
    gamePatternAR.push(randomChosenColor);

    // Button sound & effects
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);     
    
}

/************************************************************************
 ** Function: animatePress // Animation when button clicked            **
 ************************************************************************/
function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");

    setTimeout(function()
    {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

/************************************************************************
 ** Function: playSound // Sound play when computer play/ user click   **
 ************************************************************************/
function playSound(sound)
{
    var colorSound = new Audio("sounds/" + sound + ".mp3");
    colorSound.play();
}

/************************************************************************
 ** Function: startOver // Refresh game                                **
 ************************************************************************/
function startOver()
{
    level = 0;
    gamePatternAR = [];
    notStarted = true;
}














