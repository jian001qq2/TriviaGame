/*This is a not working as video demonstrated. it only runs the questions and timer, but
somehow the response I planed this app to do after the user made a seleciton was not working. 
double check the */

// This code will run as soon as the page loads
window.onload = function () {
    $("#wraper").hide();
    $("#start").on("click", function () {
        $("#start").hide();
        //run the function to show the question
        questions();
    });
};
//  Variable that will hold our setInterval that runs the timer
var intervalId;
// prevents the clock from being sped up unnecessarily
var clockRunning = false;
// set object varialbe for the timer
var timer = {
    answerTime: 30,
    runTimer: function () {
        if (!clockRunning) {
            intervalId = setInterval(timer.count, 1000);
            clockRunning = true;
        }
    },
    count: function () {
        timer.answerTime--;
        $("#timer").html("<h2>Time Remaining: " + timer.answerTime + " Seconds </h2>");
        if (timer.answerTime === 0) {
            timer.stopTimer();
            timer.answerTime = 30;
        }
    },
    stopTimer: function () {
        clearInterval(intervalId);
        $("#timer").html("<h2>Time Remaining: " + timer.answerTime + " Seconds </h2>");
        clockRunning = false;
    },

};
// create a big array with properties like object
//issue encountered is that when I try to refer the number in the answer it woun't work
/*orginially plant to use the index to show the coreect answer text in screen but things
weren't going right,so create a new property answerText hope to show the answer*/
var problems = [
    { // first question
        question: "What is the world's longest river?", // 1. amazon 2. nile 3. yangtze
        choices: ["Nile", "Mississippi", "Amazon", "Yangtze"],
        //correct answer index in the choice
        answer: 2,

        answerText: " Amazon",
    },
    { // second question
        question: "What is the diameter of Earth?", // d = 7,917.5 mi
        choices: ["7,800 mi", "7,700 mi", "7,600 mi", "7,900 mi"],
        answer: 3,
        answerText: " 7,900 mi ",
    },
    { // third question
        question: " What colour is a Welsh poppy? ", // it 's  a flower, yellow
        choices: ["yellow", "black", "white", "pink"],
        answer: 0,
        answerText: " yellow",
    },
    { // fourth question
        question: "A Boeing 777 is equipped with how many engines?", // 2 engines
        choices: ["4", "2", "5", "3"],
        answer: 1,
        answerText: " 2",
    },
    { // fifth question
        question: "How many colours are there in a rainbow?", //7
        choices: ["6", "5", "10", "7"],
        answer: 3,
        answerText: "7",
    },
    { // sixth question
        question: "What was the very first women's magazine called?",
        choices: ["The Ladies Mercury", "Woman's Day", "Woman Magazine", "Today's Woman"],
        answer: 0,
        answerText: "The Ladies Mercury ",
    },
]

// variables for keep track the numbers of correct, incorrect, answered, and problem
var totalQuestions = problems.length;
console.log(totalQuestions);
var correctAns = 0;
var wrongAns = 0;
var unanswered = totalQuestions - correctAns - wrongAns;
//coutner use to display the questions in the problem
var counter = 0;

//function declartions 
//this is uses for the questions
function questions() {
    timer.answerTime = 30;
    timer.runTimer();
    // to show the div contains question and choices
    $("#wraper").show();
    //Attempt to uncheck the question choice for start of each quesiton 
    $('input:radio').prop("checked",false);
    //print text of question in html 
    $("#problems").text(problems[counter].question);
    $("#choice-0").text(problems[counter].choices[0]);
    $("#choice-1").text(problems[counter].choices[1]);
    $("#choice-2").text(problems[counter].choices[2]);
    $("#choice-3").text(problems[counter].choices[3]);
    
}

// check whether the user selected the right or wrong answer, and print coresponding message on the screen.
function checkAnswer() {
    var userSelection = $("input:checked").val(); // answer index of user selection in choices
    //check the index is equal to the correct answer index , if yes, stop time, print correct
    if (userSelection == problems[counter].answer) {
        timer.stopTimer();
        correctAns++;
        $("#ringt-answer").html("<h2>Correct!</h2>")

    } else {
        timer.stopTimer();
        wrongAns++;
        var correctText = problems[counter].answerText;
        $("#wrong-answer").html("<h2>Incorrect!</h2>" + "<br></br>" + "<h2>the correct answer is: " + correctText + "</h2>")

    }

};
/*expect to swich the page after the user selected a choice or time out, it will wait 1 second
after the user selection to deterimine which text to print, then if no user's selection and time ran
out , print another text */
function SwichPage() {
    // to clear the section for response after chosen an answer
    $("#response").empty();
    // check conditions to see if a choice was made by the user, if yes run the check function
    // to check user's selection
    if ($("input").is(':checked')) {
        checkAnswer();
        //run this when time out, and no choice was made
    } else if (timer.answerTime === 0) {
        //text to show when time's up
            var correctText = problems[counter].answerText;
            $("#out-of-time").html("<h2> Time's Up! </h2>" + "<br></br>" + "<h2>the correct answer is: " + correctText + "</h2>");

    }

};
//function for game reset
function reset() {
    timer.answerTime = 30;
    totalQuestions = 0;
    counter = 0;
    correctAns = 0;
    wrongAns = 0;
    unanswered = totalQuestions - correctAns - wrongAns;
    $("#result").empty();
    $("#response").empty();
    questions();
}
//declaration of a funciton to show overall effort of the user
/* this funtion should run after all the questions were shown*/
function result() {
    if ((counter +1)>= totalQuestions) {
        var finalMessage = "<h2>All done, here is how you did ! </h2>";
        var breakLine = $("<br>");
        var coreectMessge = "<h2> Correct Answers: " + correctAns + "</h2>";
        var incorrectMessage = "<h2> Incorrect Answers: " + wrongAns + "</h2>";
        var unansweredMessage = "<h2> UNanswered: " + unanswered + "</h2>";
        var startOver = $("div").html("<h2 id ='play-again'>Start Over? </h2>");
        //this is used to reset the game if user clicked the start over text
        startOver.on("click", reset);
        $('#result').append(finalMessage + breakLine + coreectMessge + breakLine + incorrectMessage +
            unansweredMessage + breakLine + startOver)
    }

}

/*this is the section really run everything i declared above.
I planed to simplify the really run code when the selection is clikced, then wait 3 secounds to s
show another quesiton.*/
$("input").on("click", function () {
    SwichPage();
    counter++;
    setTimeout(questions, 1000 * 3);
});
result();

/*Overall outcome
    I list the question and the choices correctly. Also create pretty good timer for this
game to track each quesiton's answering time. however, I didn't get the response after the 
user's selection or when time is out to work as I planed to work, I check over and over
of my logics and variable referencing , but I could not find out any solution for that.
I detailed out my steps above on almost every one. and I think I did my best effort on this game,.
the reason I did not make this game working maybe I make this one so hard by adding too many
 new stuffs I am no vey familiar with such as list several objects in a array. anyways , the due day
 is coming , I will submit what I have right now.*/

  /*Personal notes to the grader of this homework
    Please, Please, Please, if you could fix this one and make it to work, could you comment out
    what you did in detial or comment out the working code above or below the one that you corrected */