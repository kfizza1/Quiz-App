const questions = [
{
    question: "Which year did the Titanic sink?",
    answers: [
        {text:"1912", correct: true},
        {text:"1920", correct: false},
        {text:"1901", correct: false},
        {text:"1935", correct: false},
    ]
},

{
    question: "Who was the first President of the United States?",
    answers: [
        {text:"Thomas Jefferson", correct: false},
        {text:"George Washington", correct: true},
        {text:"Abraham Lincoln", correct: false},
        {text:"John Adams", correct: false},
    ]
},
{
    question: "Which planet is known as the Red Planet?",
    answers: [
        {text:"venus", correct: false},
        {text:"jupiter", correct: false},
        {text:"mars", correct: true},
        {text:"saturn", correct: false},
    ]
},
{
    question: "Who invented the light bulb?",
    answers: [
        {text:"Thomas Edison", correct: true},
        {text:"Isaac Newton", correct: false},
        {text:"Albert Einstein", correct: false},
        {text:"  Alexander Graham Bell", correct: false},
    ]
},
{
    question: "What is the powerhouse of the cell?",
    answers: [
        {text:"Mitochondrion", correct: false},
        {text:"Nucleus", correct: true},
        {text:"Ribosome", correct: false},
        {text:"Endoplasmic reticulum", correct: false},
    ]
},
{
    question: "What is the chemical symbol for water?",
    answers: [
        {text:"Wa", correct: false},
        {text:"Wo", correct: false},
        {text:"W", correct: false},
        {text:"H2o", correct: true},
    ]
},




];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 ;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
   
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}


function handleNextBtn(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
        }
        else{
            showScore();
        }
}


nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})


startQuiz();