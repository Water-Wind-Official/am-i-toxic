// Quiz questions with scoring
const questions = [
    {
        question: "When someone disagrees with you in a conversation, what's your usual response?",
        options: [
            { text: "I listen to their perspective and try to understand their viewpoint", points: 0 },
            { text: "I debate my point but remain respectful", points: 1 },
            { text: "I get defensive and argue more intensely", points: 3 },
            { text: "I dismiss their opinion or get angry", points: 5 }
        ]
    },
    {
        question: "How do you handle it when a friend cancels plans at the last minute?",
        options: [
            { text: "I'm understanding - things happen", points: 0 },
            { text: "I'm disappointed but accept it gracefully", points: 1 },
            { text: "I make them feel guilty about it", points: 4 },
            { text: "I give them the silent treatment or make passive-aggressive comments", points: 5 }
        ]
    },
    {
        question: "When you're wrong about something, how do you typically react?",
        options: [
            { text: "I admit it and apologize if needed", points: 0 },
            { text: "I admit it but try to justify why I thought that way", points: 2 },
            { text: "I reluctantly admit it only if there's clear proof", points: 4 },
            { text: "I rarely admit being wrong or find ways to shift blame", points: 5 }
        ]
    },
    {
        question: "How often do you interrupt others while they're speaking?",
        options: [
            { text: "Rarely - I make an effort to listen", points: 0 },
            { text: "Sometimes, but I catch myself", points: 2 },
            { text: "Often, especially if I have something important to say", points: 4 },
            { text: "Frequently - I need to share my thoughts immediately", points: 5 }
        ]
    },
    {
        question: "When a friend shares their success or achievement with you, what's your first reaction?",
        options: [
            { text: "Genuine happiness and celebration for them", points: 0 },
            { text: "Happy for them, though I might feel a bit envious", points: 1 },
            { text: "I compare it to my own achievements", points: 3 },
            { text: "I downplay it or bring up my own accomplishments", points: 5 }
        ]
    },
    {
        question: "How do you respond when someone asks you to change a behavior that bothers them?",
        options: [
            { text: "I appreciate the feedback and try to improve", points: 0 },
            { text: "I listen and consider it, though I might be defensive at first", points: 2 },
            { text: "I get defensive and explain why they're being too sensitive", points: 4 },
            { text: "I refuse to change and blame them for being difficult", points: 5 }
        ]
    },
    {
        question: "When you're in a bad mood, how does it affect your interactions with others?",
        options: [
            { text: "I try not to let it affect others", points: 0 },
            { text: "People can tell, but I'm still respectful", points: 1 },
            { text: "I'm noticeably short or irritable with people", points: 4 },
            { text: "I take it out on others through snapping or mean comments", points: 5 }
        ]
    },
    {
        question: "How do you handle secrets or private information that friends share with you?",
        options: [
            { text: "I always keep them confidential", points: 0 },
            { text: "I keep them unless I have a good reason to share", points: 2 },
            { text: "I might share with close friends if it's interesting", points: 4 },
            { text: "I often share gossip or secrets for entertainment", points: 5 }
        ]
    },
    {
        question: "When someone is going through a difficult time, what's your typical response?",
        options: [
            { text: "I offer emotional support and help however I can", points: 0 },
            { text: "I listen and try to be there for them", points: 1 },
            { text: "I give advice even if they don't ask for it", points: 3 },
            { text: "I make it about myself or minimize their problems", points: 5 }
        ]
    },
    {
        question: "How do you react when someone sets a boundary with you (e.g., 'I need space' or 'Please don't joke about that')?",
        options: [
            { text: "I respect it immediately without question", points: 0 },
            { text: "I respect it, though I might ask for clarification", points: 1 },
            { text: "I feel hurt and make them explain/justify it", points: 3 },
            { text: "I ignore it or get angry about them setting boundaries", points: 5 }
        ]
    },
    {
        question: "In group settings, how much do you dominate the conversation?",
        options: [
            { text: "I make sure everyone gets a chance to speak", points: 0 },
            { text: "I contribute but don't monopolize", points: 1 },
            { text: "I tend to talk more than others", points: 3 },
            { text: "I'm usually the center of attention and do most of the talking", points: 5 }
        ]
    },
    {
        question: "When you make a mistake that affects someone else, what do you do?",
        options: [
            { text: "I apologize sincerely and try to make it right", points: 0 },
            { text: "I apologize but explain my reasoning", points: 2 },
            { text: "I apologize only if they seem really upset", points: 4 },
            { text: "I make excuses or blame external circumstances", points: 5 }
        ]
    },
    {
        question: "How do you respond when someone achieves something you wanted?",
        options: [
            { text: "I'm genuinely happy for them", points: 0 },
            { text: "I congratulate them despite feeling disappointed", points: 1 },
            { text: "I find it hard to congratulate them", points: 3 },
            { text: "I feel resentful or try to diminish their achievement", points: 5 }
        ]
    },
    {
        question: "When giving feedback or criticism, how do you typically deliver it?",
        options: [
            { text: "Constructively and kindly, focusing on improvement", points: 0 },
            { text: "Honestly but with tact", points: 1 },
            { text: "Bluntly without much regard for feelings", points: 4 },
            { text: "Harshly or in a way that demeans the person", points: 5 }
        ]
    },
    {
        question: "How often do you use guilt or manipulation to get what you want?",
        options: [
            { text: "Never - I communicate directly", points: 0 },
            { text: "Rarely, only in desperate situations", points: 2 },
            { text: "Sometimes, if I think it will work", points: 4 },
            { text: "Often - it's an effective strategy", points: 5 }
        ]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;
let selectedAnswer = null;

// DOM elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const progressFill = document.getElementById('progress');
const scoreValue = document.getElementById('score-value');
const resultMessage = document.getElementById('result-message');
const resultDetails = document.getElementById('result-details');

// Initialize
totalQuestionsSpan.textContent = questions.length;

// Event listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    currentQuestionIndex = 0;
    totalScore = 0;
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    selectedAnswer = null;
    nextBtn.disabled = true;
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option.text;
        optionDiv.addEventListener('click', () => selectOption(index, optionDiv));
        optionsContainer.appendChild(optionDiv);
    });
}

function selectOption(index, element) {
    // Remove selection from all options
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Select the clicked option
    element.classList.add('selected');
    selectedAnswer = index;
    nextBtn.disabled = false;
}

function nextQuestion() {
    if (selectedAnswer === null) return;
    
    // Add points from selected answer
    const question = questions[currentQuestionIndex];
    totalScore += question.options[selectedAnswer].points;
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    scoreValue.textContent = totalScore;
    
    let message = '';
    let details = '';
    
    if (totalScore <= 10) {
        message = `
            <h3>🌟 Excellent Self-Awareness!</h3>
            <p>You demonstrate healthy communication patterns and respect for others. You show empathy, handle conflicts constructively, and respect boundaries. Keep up these positive behaviors!</p>
        `;
        details = `
            <h4>Your Strengths:</h4>
            <ul>
                <li>You listen actively and value others' perspectives</li>
                <li>You take responsibility for your actions</li>
                <li>You handle disagreements with respect</li>
                <li>You support others genuinely</li>
            </ul>
        `;
    } else if (totalScore <= 25) {
        message = `
            <h3>👍 Generally Healthy Patterns</h3>
            <p>You show mostly positive behaviors with some areas for growth. Everyone has moments of defensiveness or frustration, and you're aware of them. Continue working on self-awareness.</p>
        `;
        details = `
            <h4>Areas to Consider:</h4>
            <ul>
                <li>Work on accepting feedback without defensiveness</li>
                <li>Practice active listening without interrupting</li>
                <li>Be mindful of how your mood affects others</li>
                <li>Continue developing empathy in challenging situations</li>
            </ul>
        `;
    } else if (totalScore <= 45) {
        message = `
            <h3>⚠️ Some Concerning Patterns</h3>
            <p>Your responses suggest some toxic behavioral patterns that might be affecting your relationships. The good news is that recognizing these patterns is the first step toward positive change.</p>
        `;
        details = `
            <h4>Important Areas for Growth:</h4>
            <ul>
                <li>Practice genuine apologies without justifications</li>
                <li>Work on managing defensive reactions</li>
                <li>Respect others' boundaries without taking it personally</li>
                <li>Develop empathy by considering others' perspectives</li>
                <li>Avoid manipulation and communicate directly</li>
                <li>Consider seeking feedback from trusted friends</li>
            </ul>
        `;
    } else {
        message = `
            <h3>🚨 Significant Toxic Patterns</h3>
            <p>Your responses indicate several toxic behavioral patterns that are likely harming your relationships. It's important to take this seriously and consider working on these behaviors, possibly with professional help.</p>
        `;
        details = `
            <h4>Critical Areas Needing Attention:</h4>
            <ul>
                <li>Seek professional help (therapist or counselor) to work through these patterns</li>
                <li>Practice taking accountability for your actions</li>
                <li>Learn to manage anger and frustration constructively</li>
                <li>Develop genuine empathy for others</li>
                <li>Stop manipulative behaviors and learn direct communication</li>
                <li>Respect boundaries as non-negotiable</li>
                <li>Work on celebrating others without jealousy</li>
            </ul>
        `;
    }
    
    resultMessage.innerHTML = message;
    resultDetails.innerHTML = details;
}

function restartQuiz() {
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
    currentQuestionIndex = 0;
    totalScore = 0;
    selectedAnswer = null;
}
