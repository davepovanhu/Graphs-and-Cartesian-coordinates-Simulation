const questions = [
    {
        question: "Describe how changing the coefficient 'a' of a quadratic function changes the graph.",
        choices: ["A. Shifts the graph vertically", "B. Reflects or stretches the graph", "C. Changes the roots", "D. Affects the axis of symmetry"],
        correct: "B"
    },
    {
        question: "What effect does changing the constant 'c' in a quadratic function have on the graph?",
        choices: ["A. Shifts the graph horizontally", "B. Changes the direction of the parabola", "C. Shifts the graph vertically", "D. Affects the vertex"],
        correct: "C"
    },
    {
        question: "Which term affects the axis of symmetry of a parabola?",
        choices: ["A. The 'a' coefficient", "B. The 'b' coefficient", "C. The 'c' coefficient", "D. The constant term"],
        correct: "B"
    },
    {
        question: "In the quadratic equation y = ax² + bx + c, what does the vertex form represent?",
        choices: ["A. y = a(x - h)² + k", "B. y = ax² + bx", "C. y = ax²", "D. y = mx + b"],
        correct: "A"
    },
    {
        question: "What does the value of 'a' control in a quadratic function?",
        choices: ["A. The direction and width of the parabola", "B. The location of the vertex", "C. The axis of symmetry", "D. The position of the focus"],
        correct: "A"
    },
    {
        question: "How do you find the axis of symmetry of a parabola given the equation y = ax² + bx + c?",
        choices: ["A. x = -b/2a", "B. x = c/a", "C. x = b/a", "D. x = -c/2b"],
        correct: "A"
    },
    {
        question: "Which point represents the highest or lowest point on a parabola?",
        choices: ["A. The focus", "B. The vertex", "C. The directrix", "D. The root"],
        correct: "B"
    },
    {
        question: "What is the relationship between the focus and the directrix in a parabola?",
        choices: ["A. They define the axis of symmetry", "B. The distance from any point on the parabola to the focus is equal to the distance to the directrix", "C. They determine the roots", "D. They control the vertex"],
        correct: "B"
    },
    {
        question: "Which of the following statements is true about the roots of a parabola?",
        choices: ["A. The roots are where the parabola crosses the y-axis", "B. The roots are the same as the vertex", "C. The roots are the points where the parabola crosses the x-axis", "D. The roots are the minimum value of the function"],
        correct: "C"
    },
    {
        question: "If the coefficient 'a' in a quadratic equation is positive, what is the shape of the parabola?",
        choices: ["A. The parabola opens upwards", "B. The parabola opens downwards", "C. The parabola shifts to the left", "D. The parabola becomes narrower"],
        correct: "A"
    },
    {
        question: "How does the quadratic function change if the coefficient 'b' increases?",
        choices: ["A. The graph shifts horizontally", "B. The vertex moves, changing the axis of symmetry", "C. The graph becomes wider", "D. The graph shifts vertically"],
        correct: "B"
    },
    {
        question: "What is the directrix in a parabola?",
        choices: ["A. The highest point", "B. The lowest point", "C. A line parallel to the axis of symmetry", "D. A line perpendicular to the axis of symmetry"],
        correct: "C"
    },
    {
        question: "What is the vertex of a parabola in the equation y = a(x - h)² + k?",
        choices: ["A. (0, 0)", "B. (h, k)", "C. (-h, -k)", "D. (h, -k)"],
        correct: "B"
    },
    {
        question: "What is the axis of symmetry in the vertex form y = a(x - h)² + k?",
        choices: ["A. x = h", "B. y = h", "C. x = k", "D. y = k"],
        correct: "A"
    },
    {
        question: "How do the focus and directrix affect the graph of a parabola?",
        choices: ["A. They control the opening direction", "B. They affect the steepness", "C. They define the set of all points equidistant to both", "D. They change the width"],
        correct: "C"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let isAnswerSelected = false;
let score = 0;

function showQuestion(index) {
    const questionData = questions[index];
    document.getElementById('question').innerText = questionData.question;
    document.getElementById('options').innerHTML = questionData.choices.map((choice, i) =>
        `<button class="choice-button" onclick="selectAnswer('${String.fromCharCode(65 + i)}')">${choice}</button>`
    ).join('');
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('prevButton').style.display = index > 0 ? 'inline-block' : 'none';
    document.getElementById('nextButton').style.display = isAnswerSelected && index < questions.length - 1 ? 'inline-block' : 'none';
    document.getElementById('seeAnswersButton').style.display = index === questions.length - 1 ? 'inline-block' : 'none';
}

function selectAnswer(answer) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    if (answer === correctAnswer) {
        document.getElementById('feedback').innerHTML = '<span class="correct">Correct!</span>';
        score++;
    } else {
        document.getElementById('feedback').innerHTML = '<span class="incorrect">Incorrect.</span>';
    }
    userAnswers[currentQuestionIndex] = answer;
    isAnswerSelected = true;
    document.getElementById('nextButton').style.display = 'inline-block';
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        isAnswerSelected = false;
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function showCorrectAnswers() {
    const answersHtml = questions.map((question, index) => 
        `<div><p><strong>Question ${index + 1}:</strong> ${question.correct}</p></div>`
    ).join('');
    document.getElementById('question').innerHTML = `<p><strong>Your Score: ${score} / ${questions.length}</strong></p>`;
    document.getElementById('options').innerHTML = '';
    document.getElementById('feedback').innerHTML = answersHtml;
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('prevButton').style.display = 'none';
    document.getElementById('seeAnswersButton').style.display = 'none';
}

function goBack() {
    window.history.back();
}

showQuestion(currentQuestionIndex);
