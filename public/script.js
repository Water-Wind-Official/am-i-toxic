// Quiz questions with polarity-based choices
// Each question presents two contrasting approaches
// Users pick which resonates with their thinking

const questions = [
    {
        scenario: "Jordan has been friends with Sam for 8 years. Recently, Sam started dating someone Jordan finds controlling—Sam has canceled plans three times, stopped coming to group events, and seems more withdrawn. When Jordan brings it up, Sam gets defensive and says 'You just don't understand our relationship.' Jordan is genuinely worried but also hurt by being shut out.",
        polarity: {
            left: "Stop bringing up the relationship and respect Sam's boundary, even if it feels like rejection",
            right: "Keep inviting Sam to things and stay emotionally present—isolation needs a counterweight, not silence"
        }
    },
    {
        scenario: "Alex manages a small team. One employee, Morgan, has been underperforming for two months—missing deadlines, making errors, and seeming disengaged. Alex has given informal feedback twice. Morgan recently mentioned 'going through some personal stuff' but didn't elaborate. Other team members are starting to complain about picking up Morgan's slack.",
        polarity: {
            left: "Assume Morgan is struggling and offer flexibility—work through this together with compassion",
            right: "Set a clear performance bar and timeline—Morgan needs structure and to know expectations matter"
        }
    },
    {
        scenario: "Casey and their partner have been together for 3 years. Recently, Casey discovered their partner has been texting an ex regularly—friendly conversations, nothing overtly romantic, but the partner never mentioned it. When Casey brings it up, the partner says 'It's nothing, we're just friends, and I didn't tell you because I knew you'd overreact.' Casey feels hurt and unsure whether their discomfort is reasonable.",
        polarity: {
            left: "Let it go and work on your own jealousy—you might be reading too much into it",
            right: "Address the secrecy directly—honesty in relationships matters regardless of what's being hidden"
        }
    },
    {
        scenario: "River's elderly parent has been making increasingly poor financial decisions—giving money to obvious phone scams, buying unnecessary insurance policies, forgetting bills. River is worried about cognitive decline but also respects that the parent is a capable adult who has always valued independence. The parent gets angry and says 'I'm not a child' when River tries to help.",
        polarity: {
            left: "Respect their autonomy and let them make mistakes—dignity and independence matter",
            right: "Intervene proactively to protect them—financial ruin is worse than a wounded ego"
        }
    },
    {
        scenario: "Taylor works on a team where one colleague, Jamie, consistently takes credit for group ideas in meetings, interrupts others, and dismisses feedback. Multiple people have noticed but no one says anything because Jamie is well-liked by upper management. Taylor is frustrated but also aware that complaining could seem like jealousy or create drama.",
        polarity: {
            left: "Keep your head down and do good work—getting involved will make you look petty",
            right: "Speak up about it—document contributions, talk to Jamie, or tell management the pattern matters"
        }
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;
let allChoices = [];
let deviationDetails = [];

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
    allRatings = [];
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.scenario;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    nextBtn.disabled = true;
    
    // Create polarity buttons
    const polarityContainer = document.createElement('div');
    polarityContainer.className = 'polarity-container';
    
    // Left button
    const leftBtn = document.createElement('button');
    leftBtn.className = 'polarity-btn left-btn';
    leftBtn.textContent = question.polarity.left;
    leftBtn.addEventListener('click', () => selectPolarity('left', leftBtn));
    
    // Right button
    const rightBtn = document.createElement('button');
    rightBtn.className = 'polarity-btn right-btn';
    rightBtn.textContent = question.polarity.right;
    rightBtn.addEventListener('click', () => selectPolarity('right', rightBtn));
    
    polarityContainer.appendChild(leftBtn);
    polarityContainer.appendChild(rightBtn);
    optionsContainer.appendChild(polarityContainer);
}

function selectPolarity(choice, buttonEl) {
    // Mark button as selected
    document.querySelectorAll('.polarity-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    buttonEl.classList.add('selected');
    
    // Store choice and enable next button
    const question = questions[currentQuestionIndex];
    allChoices.push({
        questionIndex: currentQuestionIndex,
        choice: choice,
        left: question.polarity.left,
        right: question.polarity.right
    });
    
    nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        calculateScore();
        showResults();
    }
}

function calculateScore() {
    // Analysis: which polarities did the user lean toward?
    // No "score" per se—we're showing their polarity pattern
    totalScore = 0;
    deviationDetails = [];
    
    let leftCount = 0;
    let rightCount = 0;
    
    allChoices.forEach((choice) => {
        if (choice.choice === 'left') {
            leftCount++;
        } else {
            rightCount++;
        }
        
        deviationDetails.push({
            left: choice.left,
            right: choice.right,
            chosen: choice.choice
        });
    });
    
    // Simple summary: 0 = balanced, positive = leans right, negative = leans left
    totalScore = rightCount - leftCount;
}

function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    scoreValue.textContent = totalScore >= 0 ? `+${totalScore}` : totalScore;
    
    // Build the breakdown of their polarity choices
    let breakdownHTML = '<h3>Your Polarity Choices:</h3>';
    breakdownHTML += '<div class="breakdown-list">';
    
    deviationDetails.forEach((detail, index) => {
        const chosenClass = detail.chosen === 'left' ? 'chosen-left' : 'chosen-right';
        breakdownHTML += `
            <div class="polarity-breakdown ${chosenClass}">
                <div class="polarity-choice-label">${detail.chosen === 'left' ? 'You chose LEFT:' : 'You chose RIGHT:'}</div>
                <div class="polarity-choice-text">"${detail.chosen === 'left' ? detail.left : detail.right}"</div>
                <div class="polarity-other-text">Other perspective: "${detail.chosen === 'left' ? detail.right : detail.left}"</div>
            </div>
        `;
    });
    
    breakdownHTML += '</div>';
    
    let message = '';
    let details = '';
    
    if (totalScore <= -3) {
        message = `
            <h3>🛡️ Protective & Boundary-Focused</h3>
            <p>You lean toward respecting autonomy, stepping back, and trusting people to figure things out. You value privacy and avoid overstepping.</p>
        `;
        details = `
            <h4>Your Pattern:</h4>
            <p>You tend to:</p>
            <ul>
                <li>Prioritize respect for people's autonomy and dignity</li>
                <li>Avoid intervening unless explicitly asked</li>
                <li>Trust people to make their own choices</li>
                <li>Protect privacy and not involve others unnecessarily</li>
            </ul>
            <h4>To Consider:</h4>
            <p>Stepping back can sometimes feel like abandonment. There's a middle ground between hovering and disappearing entirely. Direct, honest communication acknowledges both respect AND care.</p>
        `;
    } else if (totalScore >= 3) {
        message = `
            <h3>⚡ Action-Oriented & Protective</h3>
            <p>You lean toward direct communication, setting boundaries, and taking action when you see problems. You believe in being clear and active about concerns.</p>
        `;
        details = `
            <h4>Your Pattern:</h4>
            <p>You tend to:</p>
            <ul>
                <li>Address issues directly rather than avoiding them</li>
                <li>Take protective action when you see someone in trouble</li>
                <li>Set clear expectations and boundaries</li>
                <li>Speak up about patterns that concern you</li>
            </ul>
            <h4>To Consider:</h4>
            <p>Action and protection can sometimes feel controlling. The goal isn't to fix people—it's to be honest about what you see and give them the information to decide for themselves.</p>
        `;
    } else {
        message = `
            <h3>⚖️ Balanced & Context-Dependent</h3>
            <p>You see value in both approaches depending on the situation. You know when to speak up and when to step back.</p>
        `;
        details = `
            <h4>Your Pattern:</h4>
            <p>You're able to:</p>
            <ul>
                <li>Assess situations without rigid rules</li>
                <li>Balance respect for autonomy with honest communication</li>
                <li>Know when to act and when to wait</li>
                <li>Avoid both overstepping and abandonment</li>
            </ul>
            <h4>Strength:</h4>
            <p>This nuanced approach is exactly what healthy relationships need. Context matters, people are complex, and good judgment means knowing the difference.</p>
        `;
    }
    
    resultMessage.innerHTML = message;
    resultDetails.innerHTML = breakdownHTML + details;
}

function restartQuiz() {
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
    currentQuestionIndex = 0;
    totalScore = 0;
    allChoices = [];
    deviationDetails = [];
}
