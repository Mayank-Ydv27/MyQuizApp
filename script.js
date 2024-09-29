const container = document.querySelector('.container');
const headingBox = document.querySelector('.heading');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
// const alert = document.querySelector('.alert');
// const redalert = document.querySelector('.redalert');
const greenAlert = document.querySelector('.green-alert');
const redAlert = document.querySelector('.red-alert');
const instructions = document.querySelector('.instructions');


const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. Which of the following is an HTML semantic element?",
        choices: ["<div>", "<span>", "<article>", "<b>"],
        answer: "<article>"
    },
    {
        question: "Q. What property is used to change the font size in CSS?",
        choices: ["font-weight", "font-style", "font-size", "text-decoration"],
        answer: "font-size"
    },
    {
        question: "Q. Which HTML attribute is used to specify inline styles?",
        choices: ["style", "class", "id", "href"],
        answer: "style"
    },
    {
        question: "Q. Which selector selects all <p> elements inside a <div>?",
        choices: ["div p", "div > p", "div+p", "p div"],
        answer: "div p"
    },
    {
        question: "Q. What is the default display value of a <div> element?",
        choices: ["inline", "block", "inline-block", "flex"],
        answer: "block"
    }
    
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayGreenAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayRedAlert(`Wrong Answer!.................... ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayGreenAlert("You have completed this quiz!");
    nextBtn.textContent = "Attempt Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to display green alert
const displayGreenAlert = (msg) => {
    greenAlert.style.display = "block";
    greenAlert.textContent = msg;
    setTimeout(() => {
        greenAlert.style.display = "none";
    }, 2000);
}

// Function to display red alert
const displayRedAlert = (msg) => {
    redAlert.style.display = "block";
    redAlert.textContent = msg;
    setTimeout(() => {
        redAlert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            
            timeLeft = 15;
            currentQuestionIndex++;
            if (currentQuestionIndex < quiz.length) {
                showQuestions();
            }
            else {
                stopTimer();
                showScore();
            }

        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    instructions.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});