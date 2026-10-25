const questions = [
    {
        question: "1. What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        answer: 0
    },
    {
        question: "2. Which language styles a webpage?",
        options: ["Java", "CSS", "SQL", "Python"],
        answer: 1
    },
    {
        question: "3. Which language adds interactivity?",
        options: ["HTML", "CSS", "JavaScript", "XML"],
        answer: 2
    }
];

let currentQuestion = 0;
let totalScore = 0;
let answered = false;

function displayQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("question").textContent = q.question;
    document.getElementById("options").innerHTML = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("score").textContent = "";
    document.getElementById("nextBtn").disabled = true;

    answered = false;

    q.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = option;
        button.onclick = () => checkAnswer(index);

        document.getElementById("options").appendChild(button);
    });
}

function checkAnswer(selected) {
    if (answered) return;

    answered = true;

    const correct = questions[currentQuestion].answer;
    const feedback = document.getElementById("feedback");

    if (selected === correct) {
        totalScore++;
        feedback.textContent = "Correct answer!";
        feedback.style.color = "green";
    } else {
        feedback.textContent =
            "Incorrect! Correct answer: " +
            questions[currentQuestion].options[correct];

        feedback.style.color = "red";
    }

    document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        document.getElementById("question").textContent =
            "Quiz Completed!";

        document.getElementById("options").innerHTML = "";

        document.getElementById("feedback").textContent =
            "Well done! You completed all questions.";

        document.getElementById("score").textContent =
            "Your Score: " + totalScore + " / " + questions.length;

        document.getElementById("nextBtn").style.display = "none";
    }
}

async function fetchJoke() {
    const jokeElement = document.getElementById("joke");

    jokeElement.textContent = "Loading...";

    try {
        const response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        jokeElement.textContent =
            data.setup + " — " + data.punchline;

    } catch (error) {
        jokeElement.textContent =
            "Unable to load data. Please check your internet connection.";
    }
}

displayQuestion();