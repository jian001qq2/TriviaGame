// This code will run as soon as the page loads
window.onload = function () {
    $("#wraper").hide();
    $("#start").on("click", function () {
        $("#start").hide();


        //run the function to show the question
        questions();
    });
};
// //  Variable that will hold our setInterval that runs the timer
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
        } //to make a if statement to reset the total time when new question start
    },
    stopTimer: function () {
        clearInterval(intervalId);
        $("#timer").html("<h2>Time Remaining: " + timer.answerTime + " Seconds </h2>");
        clockRunning = false;
    },

};
// create a big array with properties like object
var problems = [{ // first question
        question: "What is the world's longest river?", // 1. amazon 2. nile 3. yangtze
        choices: ["Nile", "Mississippi", "Amazon", "Yangtze"],
        //correct answer index in the choice
        answer: 2,
        //orginially plant to use the index to show the coreect answer text in screen but stucked
        //so create a new property to show it 
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
    $("#problems").text(problems[counter].question);
    $("#choice-0").text(problems[counter].choices[0]);
    $("#choice-1").text(problems[counter].choices[1]);
    $("#choice-2").text(problems[counter].choices[2]);
    $("#choice-3").text(problems[counter].choices[3]);
    counter++;
}

// check whether the user selected the right or wrong answer, and print coresponding message on the screen.
function checkAnswer() {
    var userSelection = $("input:checked").val(); // answer index of user selection in choice
    if (userSelection === problems[counter].answer) {
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
//function to show text when time's up
function outTime() {
    var correctText = problems[counter].answerText;
    $("#out-of-time").html("<h2> Time's Up! </h2>" + "<br></br>" + "<h2>the correct answer is: " + correctText + "</h2>");


}
// expect to swich the page after the user selected a choice or time out
function SwichPage() {
    // to clear the section for response after chosen an answer
    $("#response").empty();
    // check conditions to determine which response for the problem
    if ($("input").is(':checked')) {
        setTimeout(checkAnswer, 1000);
    } else if (timer.answerTime === 0) {
        setTimeout({
            outTime
        }, 1000);
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

function result() {
    if (counter >= totalQ) {
        var finalMessage = "<h2>All done, here is how you did ! </h2>";
        var breakLine = $("<br>");
        var coreectMessge = "<h2> Correct Answers: " + correctAns + "</h2>";
        var incorrectMessage = "<h2> Incorrect Answers: " + wrongAns + "</h2>";
        var unansweredMessage = "<h2> UNanswered: " + unanswered + "</h2>";
        var startOver = $("div").html("<h2 id ='play-again'>Start Over? </h2>").on("click", reset);
        $('#result').append(finalMessage + breakLine + coreectMessge + breakLine + incorrectMessage +
            unansweredMessage + breakLine + startOver)
    }

}
//This section is how the game runs
//Event listener for the start button


//condition when the user clicks a choice
$("input").on("click", function () {
    SwichPage();
    setTimeout(questions, 1000 * 3);
});
