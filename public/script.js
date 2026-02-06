// Quiz questions with multi-select responses
// Users select all responses that apply to what they would do

const questions = [
    {
        scenario: "Jordan has been friends with Sam for 8 years. Recently, Sam started dating someone Jordan finds controlling—Sam has canceled plans three times, stopped coming to group events, and seems more withdrawn. When Jordan brings it up, Sam gets defensive and says 'You just don't understand our relationship.' Jordan is genuinely worried but also hurt by being shut out.",
        responses: [
            "Stop bringing up the relationship and respect Sam's stated boundary",
            "Keep inviting Sam to things without mentioning the partner",
            "Have a direct conversation expressing worry about the changes in behavior",
            "Reach out to Sam's family to share concerns",
            "Write Sam a detailed message with examples of controlling behavior",
            "Confront Sam's partner directly about the changes",
            "Wait for Sam to reach out first to avoid seeming pushy",
            "Distance themselves emotionally to protect against the hurt"
        ]
    },
    {
        scenario: "Alex manages a small team. One employee, Morgan, has been underperforming for two months—missing deadlines, making errors, and seeming disengaged. Alex has given informal feedback twice. Morgan recently mentioned 'going through some personal stuff' but didn't elaborate. Other team members are starting to complain about picking up Morgan's slack.",
        responses: [
            "Give Morgan more time and flexibility, understanding they're going through something",
            "Have a private, empathetic conversation asking what kind of support would help",
            "Set clear performance expectations with specific deadlines",
            "Document all of Morgan's mistakes for potential HR purposes",
            "Tell other team members that Morgan is dealing with personal issues to build compassion",
            "Offer a temporary leave of absence with the job waiting when ready",
            "Create a formal improvement plan with consequences if not met",
            "Ask direct questions about what's going on and listen without judgment"
        ]
    },
    {
        scenario: "Casey and their partner have been together for 3 years. Recently, Casey discovered their partner has been texting an ex regularly—friendly conversations, nothing overtly romantic, but the partner never mentioned it. When Casey brings it up, the partner says 'It's nothing, we're just friends, and I didn't tell you because I knew you'd overreact.' Casey feels hurt and unsure whether their discomfort is reasonable.",
        responses: [
            "Accept the explanation and try to let it go",
            "Address the secrecy directly—express that the hiding matters more than the texting",
            "Ask to see the text messages to verify nothing inappropriate happened",
            "Give an ultimatum: stop texting the ex or break up",
            "Work on their own jealousy and insecurity about the situation",
            "Tell close friends to get outside perspective",
            "Insist on meeting the ex in person to assess the dynamic",
            "Suggest couples therapy to work through the trust issue"
        ]
    },
    {
        scenario: "River's elderly parent has been making increasingly poor financial decisions—giving money to obvious phone scams, buying unnecessary insurance policies, forgetting bills. River is worried about cognitive decline but also respects that the parent is a capable adult who has always valued independence. The parent gets angry and says 'I'm not a child' when River tries to help.",
        responses: [
            "Respect their autonomy and let them make their own mistakes",
            "Have a gentle conversation about setting up safeguards together",
            "Secretly monitor their bank accounts and mail to catch problems",
            "Contact a doctor to discuss potential cognitive decline without telling the parent",
            "Involve other family members to present a united front",
            "Consult an elder law attorney about financial protection options",
            "Set up automatic bill payments and fraud alerts with the parent's permission",
            "Set up automatic bill payments and fraud alerts without asking permission"
        ]
    },
    {
        scenario: "Taylor works on a team where one colleague, Jamie, consistently takes credit for group ideas in meetings, interrupts others, and dismisses feedback. Multiple people have noticed but no one says anything because Jamie is well-liked by upper management. Taylor is frustrated but also aware that complaining could seem like jealousy or create drama.",
        responses: [
            "Keep their head down and do excellent work, trusting truth will emerge",
            "Document their own contributions in writing before meetings",
            "Talk to other colleagues privately to confirm they're seeing the same pattern",
            "Address Jamie directly and calmly about taking credit for shared ideas",
            "Bring the pattern to HR or management as a workplace culture issue",
            "Adopt similar tactics to be more assertive about claiming credit",
            "Mentally disengage and focus on aspects of life outside work",
            "Create a paper trail of emails showing their contributions"
        ]
    }
];

let currentQuestionIndex = 0;
let allSelections = [];
let questionAnalysis = [];

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
    allSelections = [];
    questionAnalysis = [];
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
    
    // Create checkboxes for multiple selection
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options-grid';
    
    question.responses.forEach((response, index) => {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `response-${currentQuestionIndex}-${index}`;
        checkbox.className = 'response-checkbox';
        checkbox.addEventListener('change', () => updateNextButton());
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = response;
        
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        optionsDiv.appendChild(checkboxContainer);
    });
    
    optionsContainer.appendChild(optionsDiv);
}

function updateNextButton() {
    const checkboxes = document.querySelectorAll('.response-checkbox');
    const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
    nextBtn.disabled = !anyChecked;
}

function nextQuestion() {
    // Collect selected responses for this question
    const question = questions[currentQuestionIndex];
    const checkboxes = document.querySelectorAll('.response-checkbox');
    const selected = [];
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selected.push({
                index: index,
                text: question.responses[index]
            });
        }
    });
    
    allSelections.push({
        questionIndex: currentQuestionIndex,
        selected: selected
    });
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        analyzeResponses();
        showResults();
    }
}

function analyzeResponses() {
    // Build analysis of what they selected
    questionAnalysis = [];
    
    allSelections.forEach((selection) => {
        const question = questions[selection.questionIndex];
        questionAnalysis.push({
            scenario: question.scenario,
            responses: question.responses,
            selected: selection.selected
        });
    });
}

function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    // Build the breakdown of their selections
    let breakdownHTML = '<h3>What You Would Do:</h3>';
    breakdownHTML += '<div class="selections-breakdown">';
    
    questionAnalysis.forEach((analysis, qIndex) => {
        breakdownHTML += `<div class="scenario-summary">`;
        breakdownHTML += `<h4>Scenario ${qIndex + 1}:</h4>`;
        breakdownHTML += `<div class="selected-responses">`;
        
        analysis.selected.forEach((selected) => {
            breakdownHTML += `<div class="selected-item">✓ ${selected.text}</div>`;
        });
        
        breakdownHTML += `</div></div>`;
    });
    
    breakdownHTML += '</div>';
    
    let message = `
        <h3>Your Relational Response Pattern</h3>
        <p>You selected ${allSelections.reduce((sum, s) => sum + s.selected.length, 0)} total actions across all scenarios. Here's what your choices reveal about how you handle conflict and connection:</p>
    `;
    
    let details = `
        ${breakdownHTML}
        <h4>What to Consider:</h4>
        <ul>
            <li>Do you typically combine multiple approaches, or stick to one strategy?</li>
            <li>Are you acting from a place of protection, communication, or boundary-setting?</li>
            <li>When you'd take action, is it direct or indirect?</li>
            <li>Are there patterns in when you step back vs. when you intervene?</li>
        </ul>
    `;
    
    resultMessage.innerHTML = message;
    resultDetails.innerHTML = details;
}

function restartQuiz() {
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
    currentQuestionIndex = 0;
    allSelections = [];
    questionAnalysis = [];
}
