// Quiz questions with rating-based scenarios
// Design principles:
// - Ideal ranges vary (some best responses are 4-6, not 9-10)
// - Some "reasonable-sounding" responses are problematic
// - Some "harsh-sounding" responses are actually appropriate
// - Includes sincerely misguided perspectives that feel relatable

const questions = [
    {
        scenario: "Jordan has been friends with Sam for 8 years. Recently, Sam started dating someone Jordan finds controlling—Sam has canceled plans three times, stopped coming to group events, and seems more withdrawn. When Jordan brings it up, Sam gets defensive and says 'You just don't understand our relationship.' Jordan is genuinely worried but also hurt by being shut out.",
        responses: [
            { text: "Jordan decides to give Sam space and stop bringing it up, trusting that Sam is an adult who can make their own choices", idealRange: [3, 5] },
            { text: "Jordan tells Sam: 'I've noticed you seem different lately. I miss you and I'm worried. I'm here if you ever want to talk, no pressure'", idealRange: [8, 10] },
            { text: "Jordan reaches out to Sam's family members to share concerns about the relationship and asks them to intervene", idealRange: [2, 4] },
            { text: "Jordan writes Sam a long message explaining exactly why the partner seems controlling, with specific examples and articles about unhealthy relationships", idealRange: [3, 5] },
            { text: "Jordan stops initiating contact and waits for Sam to reach out first, to avoid being 'that friend' who can't let go", idealRange: [2, 4] },
            { text: "Jordan confronts Sam's partner directly about the changes they've noticed in Sam's behavior", idealRange: [1, 3] },
            { text: "Jordan keeps inviting Sam to things without mentioning the relationship, maintaining the door for connection", idealRange: [7, 9] }
        ]
    },
    {
        scenario: "Alex manages a small team. One employee, Morgan, has been underperforming for two months—missing deadlines, making errors, and seeming disengaged. Alex has given informal feedback twice. Morgan recently mentioned 'going through some personal stuff' but didn't elaborate. Other team members are starting to complain about picking up Morgan's slack.",
        responses: [
            { text: "Alex gives Morgan more time and flexibility, understanding that everyone goes through hard periods and work isn't everything", idealRange: [3, 5] },
            { text: "Alex has a private conversation: 'I've noticed ongoing issues with your work. I want to support you, but I also need to understand if there's something we can do or if this role isn't working right now'", idealRange: [8, 10] },
            { text: "Alex documents all of Morgan's mistakes carefully in case they need evidence for HR later", idealRange: [4, 6] },
            { text: "Alex redistributes Morgan's important work to reliable team members to protect the team's output", idealRange: [5, 7] },
            { text: "Alex tells the complaining team members that Morgan is 'dealing with personal issues' to help them be more understanding", idealRange: [1, 3] },
            { text: "Alex sets clear, written expectations with specific deadlines and consequences, giving Morgan a formal improvement plan", idealRange: [7, 9] },
            { text: "Alex suggests Morgan take a leave of absence to deal with personal issues, with the job waiting when they're ready", idealRange: [4, 6] }
        ]
    },
    {
        scenario: "Casey and their partner have been together for 3 years. Recently, Casey discovered their partner has been texting an ex regularly—friendly conversations, nothing overtly romantic, but the partner never mentioned it. When Casey brings it up, the partner says 'It's nothing, we're just friends, and I didn't tell you because I knew you'd overreact.' Casey feels hurt and unsure whether their discomfort is reasonable.",
        responses: [
            { text: "Casey accepts the explanation and tries to let it go, recognizing that jealousy is often insecurity rather than intuition", idealRange: [2, 4] },
            { text: "Casey says: 'I'm not saying you can't have friends, but the secrecy bothers me more than the texting. I need us to be honest with each other'", idealRange: [8, 10] },
            { text: "Casey asks to see all the text messages to verify that nothing inappropriate happened", idealRange: [3, 5] },
            { text: "Casey gives an ultimatum: stop texting the ex or the relationship is over", idealRange: [2, 4] },
            { text: "Casey focuses on their own behavior, wondering if they've been too jealous or controlling in the past to make their partner hide things", idealRange: [4, 6] },
            { text: "Casey tells close friends about the situation to get outside perspective on whether they're overreacting", idealRange: [5, 7] },
            { text: "Casey insists on meeting the ex in person so they can assess the dynamic themselves", idealRange: [3, 5] }
        ]
    },
    {
        scenario: "River's elderly parent has been making increasingly poor financial decisions—giving money to obvious phone scams, buying unnecessary insurance policies, forgetting bills. River is worried about cognitive decline but also respects that the parent is a capable adult who has always valued independence. The parent gets angry and says 'I'm not a child' when River tries to help.",
        responses: [
            { text: "River backs off and respects the parent's autonomy, understanding that dignity matters more than preventing every mistake", idealRange: [2, 4] },
            { text: "River has a gentle conversation: 'I've noticed some things that worry me. Can we talk about setting up some safeguards together, just in case?'", idealRange: [7, 9] },
            { text: "River secretly monitors the parent's bank accounts and mail to catch problems before they get worse", idealRange: [3, 5] },
            { text: "River contacts a doctor to discuss the parent's cognitive state without the parent's knowledge", idealRange: [4, 6] },
            { text: "River involves other family members to present a united front and convince the parent to accept help", idealRange: [5, 7] },
            { text: "River consults an elder law attorney about options for financial protection, even if the parent objects", idealRange: [6, 8] },
            { text: "River sets up automatic bill payments and fraud alerts on the parent's accounts after getting reluctant permission", idealRange: [8, 10] }
        ]
    },
    {
        scenario: "Taylor works on a team where one colleague, Jamie, consistently takes credit for group ideas in meetings, interrupts others, and dismisses feedback. Multiple people have noticed but no one says anything because Jamie is well-liked by upper management. Taylor is frustrated but also aware that complaining could seem like jealousy or create drama.",
        responses: [
            { text: "Taylor focuses on doing excellent work and trusts that eventually the truth will become apparent to management", idealRange: [3, 5] },
            { text: "Taylor starts documenting their own contributions in writing before meetings so there's a clear record", idealRange: [7, 9] },
            { text: "Taylor talks to other colleagues privately to confirm they're not the only one noticing the pattern", idealRange: [5, 7] },
            { text: "Taylor addresses Jamie directly: 'Hey, in the last meeting you presented the idea I shared with you as your own. I'd appreciate acknowledgment when I contribute'", idealRange: [8, 10] },
            { text: "Taylor brings the pattern to HR or management, framing it as a workplace culture concern rather than a personal complaint", idealRange: [5, 7] },
            { text: "Taylor adopts similar tactics—being more assertive about claiming credit and interrupting when needed to be heard", idealRange: [2, 4] },
            { text: "Taylor mentally disengages, accepting that workplace politics are unavoidable and focusing on other aspects of life", idealRange: [2, 4] }
        ]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;
let allRatings = [];

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
    nextBtn.disabled = false;
    
    // Create rating scales for each response
    question.responses.forEach((response, index) => {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'response-item';
        
        const labelDiv = document.createElement('div');
        labelDiv.className = 'response-label';
        labelDiv.textContent = response.text;
        
        const ratingDiv = document.createElement('div');
        ratingDiv.className = 'rating-container';
        
        const leftLabel = document.createElement('span');
        leftLabel.className = 'rating-label left';
        leftLabel.textContent = 'Very Inappropriate';
        
        const rightLabel = document.createElement('span');
        rightLabel.className = 'rating-label right';
        rightLabel.textContent = 'Very Appropriate';
        
        const input = document.createElement('input');
        input.type = 'range';
        input.className = 'rating-slider';
        input.min = '1';
        input.max = '10';
        input.value = '5';
        input.id = `rating-${currentQuestionIndex}-${index}`;
        
        const valueDisplay = document.createElement('span');
        valueDisplay.className = 'rating-value';
        valueDisplay.textContent = '5';
        
        input.addEventListener('input', (e) => {
            valueDisplay.textContent = e.target.value;
        });
        
        ratingDiv.appendChild(leftLabel);
        ratingDiv.appendChild(input);
        ratingDiv.appendChild(valueDisplay);
        ratingDiv.appendChild(rightLabel);
        
        responseDiv.appendChild(labelDiv);
        responseDiv.appendChild(ratingDiv);
        optionsContainer.appendChild(responseDiv);
    });
}

function nextQuestion() {
    // Collect all ratings for current question
    const question = questions[currentQuestionIndex];
    const ratings = [];
    
    question.responses.forEach((response, index) => {
        const input = document.getElementById(`rating-${currentQuestionIndex}-${index}`);
        const rating = parseInt(input.value);
        ratings.push(rating);
    });
    
    allRatings.push(ratings);
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        calculateScore();
        showResults();
    }
}

function calculateScore() {
    // Score based on how close ratings are to ideal ranges
    // Better: ratings close to ideal range = lower score
    // Worse: ratings far from ideal range = higher score
    
    let totalDeviation = 0;
    
    allRatings.forEach((scenarioRatings, scenarioIndex) => {
        scenarioRatings.forEach((rating, responseIndex) => {
            const response = questions[scenarioIndex].responses[responseIndex];
            const [minIdeal, maxIdeal] = response.idealRange;
            
            // Calculate how far from ideal range
            let deviation = 0;
            
            if (rating < minIdeal) {
                // Rated too low (inappropriately low for good response, or not low enough for bad response)
                deviation = minIdeal - rating;
            } else if (rating > maxIdeal) {
                // Rated too high (inappropriately high for bad response, or not high enough for good response)
                deviation = rating - maxIdeal;
            }
            // If rating is within ideal range, deviation = 0 (perfect!)
            
            totalDeviation += deviation;
        });
    });
    
    totalScore = totalDeviation;
}

function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    scoreValue.textContent = totalScore;
    
    // 5 scenarios × ~7 responses = ~35 ratings
    // Max possible deviation roughly 35 × 9 = 315
    // Scoring tiers adjusted accordingly
    
    let message = '';
    let details = '';
    
    if (totalScore <= 15) {
        message = `
            <h3>🌟 Exceptional Relational Insight</h3>
            <p>You demonstrate nuanced understanding of complex interpersonal situations. You recognize that good responses aren't always the "nicest" or most aggressive—context matters, and you navigate that well.</p>
        `;
        details = `
            <h4>What This Reflects:</h4>
            <ul>
                <li>You understand that respecting autonomy and expressing concern can coexist</li>
                <li>You recognize when direct confrontation helps vs. when it creates defensiveness</li>
                <li>You see the value in documentation and self-protection without becoming paranoid</li>
                <li>You understand that secrecy in relationships is often more concerning than the secret itself</li>
                <li>You balance firmness with compassion effectively</li>
            </ul>
        `;
    } else if (totalScore <= 35) {
        message = `
            <h3>👍 Strong Judgment with Some Blind Spots</h3>
            <p>You handle most interpersonal situations thoughtfully, but some responses suggest you might overcorrect in certain directions—perhaps being too passive to avoid conflict, or too confrontational when patience would help.</p>
        `;
        details = `
            <h4>Common Patterns to Consider:</h4>
            <ul>
                <li>Are you avoiding difficult conversations by calling it "respecting their autonomy"?</li>
                <li>Are you demanding transparency from others in ways that feel controlling?</li>
                <li>Do you sometimes believe the "obvious" good response without considering context?</li>
                <li>Are there situations where you assume bad intent too quickly—or too slowly?</li>
            </ul>
            <p>Reflect on the responses where your rating differed most from the ideal range. Those reveal your specific growth areas.</p>
        `;
    } else if (totalScore <= 60) {
        message = `
            <h3>⚠️ Mixed Relational Patterns</h3>
            <p>Your responses suggest inconsistency in how you evaluate interpersonal situations. You may sometimes confuse passivity with kindness, or assertiveness with aggression. This can lead to misread situations and damaged relationships.</p>
        `;
        details = `
            <h4>Questions to Reflect On:</h4>
            <ul>
                <li>Do you avoid speaking up because it feels "easier," then resent the other person?</li>
                <li>Do you sometimes escalate conflicts by involving others unnecessarily?</li>
                <li>Do you mistake controlling behavior for care, or distance for respect?</li>
                <li>Are you quick to assume you're wrong to avoid conflict—or quick to assume you're right?</li>
                <li>Do you believe that pointing out someone's flaw excuses how you pointed it out?</li>
            </ul>
            <p>Working with a therapist or reading about healthy attachment styles could provide valuable perspective.</p>
        `;
    } else {
        message = `
            <h3>🚨 Significant Misalignment in Relational Judgment</h3>
            <p>Your responses show patterns that, if acted upon, would likely harm relationships. This might reflect past experiences that normalized unhealthy dynamics, or beliefs about relationships that need reexamination.</p>
        `;
        details = `
            <h4>Important Considerations:</h4>
            <ul>
                <li>Passive responses aren't always kind—sometimes they're avoidant and breed resentment</li>
                <li>Aggressive responses aren't always honest—sometimes they're just aggressive</li>
                <li>Involving others in conflicts usually escalates rather than resolves them</li>
                <li>Secrecy and surveillance both damage trust, even when justified</li>
                <li>Taking care of yourself doesn't require ignoring others' legitimate concerns</li>
                <li>Protecting someone doesn't justify overriding their autonomy</li>
            </ul>
            <p><strong>Consider seeking professional support to explore these patterns.</strong> A therapist can help you understand where these beliefs come from and develop healthier approaches.</p>
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
    allRatings = [];
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
