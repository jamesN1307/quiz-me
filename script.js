var  question = [
    {
        problem: "What is the first Pokémon in the Pokédex?",
        choices: ["a. snorlax", "b. Mew", "c. Charizard", "d. Bulbasaur"],
        correct: "d. Bulbasaur"
    },
    {
        problem: "What is Ash's first pokemon?",
        choices: ["a. Meowth", "b. Dragonite", "c. Pikachu", "d. Dialga"],
        correct: "c. Pikachu"
    },
    {
        problem: "Who is Team Rocket BOSS?",
        choices: ["a. Jessie", "b. Giovanni", "c. James", "d. Ash"],
        correct: "b. Giovanni"
    },
    {
        problem: "What Pokemon type is Pikachu?",
        choices: ["a. Dark", "b. Dragon", "c. electric", "d. water"],
        correct: "c. electric"
    },
    {
        problem: "How old is Ash?",
        choices: ["a. Too Old", "b. 10", "c. 26", "d. bruh idk how he still look like 10 after 20 years"],
        correct: "b. 10"
    },
];
// get element id of each elements

var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

var correctAns = 0;
var questionNumber = 0;
var scroreReult;
var questionIndex = 0;
// start quiz 
var totalTime = 90;
function newQuiz() {
    questionIndex = 0;
    totalTime = 90;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < question.length - 1) {
                gameOver();
            }
        }
    },1000);

    startQuiz();
};

// question content display question and choices

function startQuiz(){
    nextquestion();
}

function nextquestion(){
    questionTitle.textContent = question[questionIndex].problem;
    choiceA.textContent = question[questionIndex].choices[0];
    choiceB.textContent = question[questionIndex].choices[1];
    choiceC.textContent = question[questionIndex].choices[2];
    choiceD.textContent = question[questionIndex].choices[3];
}
// check answer

function checkAnswer(correct){
    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block"
    answerCheck.style.display = "block"

    if (question[questionIndex].correct === question[questionIndex].choices[correct]){
        // right answer = +1 score and display Correct statement
        correctAns++;
        answerCheck.textContent = "good job! Correct answer"
    }else{
        // wrong answer will display wrong statement which will will include what the right answer suppose to be and deduct 3 seconds out of total time left
        totalTime -= 3;
        answerCheck.textContent = "Sorry wrong answer! The correct answer is " + question[questionIndex].correct;
    }

    questionIndex++;
    // apply to all question 
    if(questionIndex < question.length){
        nextquestion();
    }else {
        // if user complete all questions then game is over 
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }
function chooseB() { checkAnswer(1); }
function chooseC() { checkAnswer(2); }
function chooseD() { checkAnswer(3); }

// when game is over timer display 0 a
function gameOver() {
    summary.style.display = "block";
    timesUp.style.display = "block";
    questionDiv.style.display = "none";
    timer.style.display = "none";
    startDiv.style.display = "none";
// final score will display 
    finalScore.textContent = correctAns;
}
// user submit their initial and sotre their score in the local storage
function storeHighScores(event) {
    event.preventDefault();

    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);

    // display hall of fame score summary
    displayHighScoresSummary();
}

// display high scores summary function

var i = 0;
var savedNewHighScore = localStorage.getItem("high scores");

function displayHighScoresSummary() {
    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedNewHighScore = localStorage.getItem("high scores");

    // check if the score is already in local storage

    if (savedNewHighScore === null) {
        return;
    }
    console.log(savedNewHighScore);


    var storedHighScores = JSON.parse(savedNewHighScore);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

//  addEventListener

startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    displayHighScoresSummary(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});