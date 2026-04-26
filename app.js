const questions = [
  {
    question: "What is the most dangerous mamal?",
    answers: [
      { text: "Lion", correct: false },
      { text: "Great White Shark", correct: false },
      { text: "Woman", correct: true },
      { text: "Wolf", correct: false }
    ]
  },
  {
    question: "What is the fastest land Animal?",
    answers: [
      { text: "Horse", correct: false },
      { text: "Lion", correct: false },
      { text: "Falcon", correct: false },
      { text: "Cheetah", correct: true }
    ]
  },
  {
    question: "Which year did the World War II End?",
    answers: [
      { text: "1942", correct: false },
      { text: "1945", correct: true },
      { text: "1939", correct: false },
      { text: "1950", correct: false }
    ]
  },
  {
    question: "Which symbol is used for comments in JavaScript (single line)?",
    answers: [
        {text: ". <!-- -->", correct: false},
        {text: "#", correct: false},
        {text: "//", correct: true},
        {text: "**", correct: false},
    ]
  },
  {
    question: "Who is smarter",
    answers: [
        {text: "The Professor", correct: false},
        {text: "Walter White", correct: false},
        {text: "Micheal Scofield", correct: true},
        {text: "Raymond Reddington", correct: false}
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progress = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  questionElement.innerText = currentQuestion.question;
  progress.innerText = `Question ${questionNo} of ${questions.length}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.addEventListener("click", () => selectAnswer(answer.correct, button));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(correct, button) {
  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerText = `You scored ${score} out of ${questions.length}`;
  progress.innerText = "";
  nextButton.innerText = "Restart";
  nextButton.style.display = "block";

  nextButton.onclick = startQuiz;
}

startQuiz();