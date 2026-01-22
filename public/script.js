// Quiz questions with rating-based scenarios
const questions = [
    {
        scenario: "Mike and Sarah work on a project. Mike presents their joint work to the manager but forgets to mention Sarah's significant contributions.",
        responses: [
            { text: "Sarah tells other coworkers what happened" },
            { text: "Sarah tells others that Mike is a 'backstabber' and can't be trusted" },
            { text: "Sarah directly tells the project manager about her contributions" },
            { text: "Sarah tells Mike she no longer wants to work with him" }
        ]
    },
    {
        scenario: "Emma set a boundary with her close friend Jessica: no jokes about her appearance. Jessica makes a joke about Emma's outfit at dinner.",
        responses: [
            { text: "Emma says nothing and silently feels hurt for days" },
            { text: "Emma snaps back: 'That's exactly the kind of comment I asked you to stop making'" },
            { text: "Emma calmly tells Jessica in the moment that she's hurt and reminds her of the boundary" },
            { text: "Emma tells Jessica they can't be friends anymore if she keeps disrespecting her" }
        ]
    },
    {
        scenario: "Alex and Jordan are roommates. Jordan leaves dirty dishes in the sink for days. Alex has been quietly frustrated for weeks without saying anything.",
        responses: [
            { text: "Alex leaves passive-aggressive notes about the mess" },
            { text: "Alex starts leaving Jordan's dishes in Jordan's room to 'teach a lesson'" },
            { text: "Alex vents to mutual friends about how inconsiderate Jordan is" },
            { text: "Alex talks to Jordan calmly and says 'I've noticed dishes piling up. Can we figure out a system that works for both of us?'" }
        ]
    },
    {
        scenario: "Devon loaned his family $2,000 six months ago. It hasn't been repaid and nobody brings it up. Devon is frustrated.",
        responses: [
            { text: "Devon brings it up angrily at the next family gathering in front of everyone" },
            { text: "Devon tells other family members about the loan to pressure the borrower" },
            { text: "Devon privately tells the borrower: 'I need to talk about the loan. Can we make a repayment plan?'" },
            { text: "Devon uses guilt: 'If you cared about our relationship, you'd prioritize paying me back'" }
        ]
    },
    {
        scenario: "Casey's boss gives critical feedback: their project had sloppy work and missed details. The boss is right. Casey feels embarrassed and defensive.",
        responses: [
            { text: "Casey argues that the work wasn't actually that bad" },
            { text: "Casey makes excuses about being busy or having personal issues" },
            { text: "Casey thanks the boss and asks for specifics: 'Can you show me exactly what I missed so I can improve?'" },
            { text: "Casey apologizes sincerely and outlines a plan to prevent future errors" }
        ]
    },
    {
        scenario: "Taylor notices their partner has been distant and withdrawn for a week. When Taylor asks 'Is something wrong?' the partner says 'Nothing, I'm fine.' Taylor suspects they're lying.",
        responses: [
            { text: "Taylor ignores it and lets the partner come around on their own" },
            { text: "Taylor keeps asking repeatedly until the partner admits something is wrong" },
            { text: "Taylor respects the space but says: 'I'm here if you want to talk. I care about you'" },
            { text: "Taylor assumes the partner is upset with them and gets defensive first" }
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
    // Score based on how they rated responses
    // Healthier responses (appropriate) = low numbers (1-3)
    // Toxic responses (inappropriate) = high numbers (8-10)
    // Scoring: if they rate toxic behavior high = bad score, if they rate healthy behavior low = good score
    // We want to penalize rating inappropriate things as appropriate
    
    // For each response in the original questions array, we know if it's healthy or toxic based on position/pattern
    // Responses at even indices (0, 2, 4...) tend to be healthier
    // Responses at odd indices tend to be less healthy
    
    let toxicityScore = 0;
    
    allRatings.forEach((scenarioRatings, scenarioIndex) => {
        scenarioRatings.forEach((rating, responseIndex) => {
            const response = questions[scenarioIndex].responses[responseIndex];
            
            // Determine if response is healthy or toxic based on keywords
            const isHealthy = 
                response.text.includes('calmly') ||
                response.text.includes('directly') ||
                response.text.includes('thanks') ||
                response.text.includes('asks') ||
                response.text.includes('respectfully') ||
                response.text.includes("I'm here if you want to talk") ||
                response.text.includes('can we') ||
                response.text.includes('listen') ||
                response.text.includes('validate') ||
                response.text.includes('sincere') ||
                (responseIndex === 2 && questions[scenarioIndex].responses.length === 4);
            
            // Calculate score: rating high (8-10) for toxic = bad, rating low (1-3) for healthy = bad
            if (isHealthy) {
                // Healthy response: lower rating = worse. Add (11 - rating) to score
                toxicityScore += (11 - rating);
            } else {
                // Toxic response: higher rating = worse. Add rating to score
                toxicityScore += rating;
            }
        });
    });
    
    totalScore = toxicityScore;
}

function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    scoreValue.textContent = totalScore;
    
    let message = '';
    let details = '';
    
    if (totalScore <= 50) {
        message = `
            <h3>🌟 Exceptional Conflict Resolution Skills!</h3>
            <p>You consistently recognize and value healthy, respectful responses to conflict. You understand the importance of direct communication, empathy, and respecting others' boundaries.</p>
        `;
        details = `
            <h4>Your Approach Shows:</h4>
            <ul>
                <li>Strong ability to recognize appropriate vs inappropriate responses</li>
                <li>Understanding of healthy communication patterns</li>
                <li>Recognition that gossip and passive-aggression damage relationships</li>
                <li>Value placed on direct, calm conversations</li>
                <li>Commitment to setting and respecting boundaries</li>
            </ul>
        `;
    } else if (totalScore <= 75) {
        message = `
            <h3>👍 Strong Conflict Resolution Understanding</h3>
            <p>You generally recognize healthy approaches to conflict, though you may occasionally underestimate the impact of certain unhealthy behaviors, or overestimate the appropriateness of mildly toxic responses.</p>
        `;
        details = `
            <h4>Areas for Reflection:</h4>
            <ul>
                <li>Consider how gossip affects trust, even when intended as venting</li>
                <li>Notice how passive-aggression damages relationships more than direct conversation</li>
                <li>Reflect on the power of truly listening without offering unsolicited advice</li>
                <li>Think about how guilt and manipulation undermine relationships</li>
                <li>Remember that respecting boundaries is a sign of care, not rejection</li>
            </ul>
        `;
    } else if (totalScore <= 100) {
        message = `
            <h3>⚠️ Inconsistent Recognition of Healthy Responses</h3>
            <p>Your ratings suggest you find some toxic or unhealthy responses more acceptable than they actually are. You may sometimes justify or rationalize harmful behaviors.</p>
        `;
        details = `
            <h4>Important Reflections:</h4>
            <ul>
                <li>Gossip and talking behind someone's back damages relationships and trust</li>
                <li>Passive-aggression (silent treatment, notes, etc.) is still aggression</li>
                <li>Public callouts and anger in conflict typically escalate rather than resolve</li>
                <li>Guilt and manipulation may work short-term but destroy relationships long-term</li>
                <li>Direct, calm conversation is almost always more appropriate than indirect approaches</li>
                <li>Consider working with a therapist to examine your conflict patterns</li>
            </ul>
        `;
    } else {
        message = `
            <h3>🚨 Significant Misalignment with Healthy Responses</h3>
            <p>Your ratings suggest you find many unhealthy and toxic responses to be appropriate or acceptable. This pattern indicates you may benefit from professional support to develop healthier conflict resolution skills.</p>
        `;
        details = `
            <h4>Critical Areas for Change:</h4>
            <ul>
                <li>Seek professional help (therapist/counselor) to understand conflict patterns</li>
                <li>Recognize that gossip, blame, and anger worsen conflicts rather than resolve them</li>
                <li>Understand that direct, respectful communication is almost always more effective</li>
                <li>Learn why guilt, manipulation, and isolation harm relationships</li>
                <li>Develop awareness of how your responses affect others</li>
                <li>Work on taking responsibility rather than making excuses or shifting blame</li>
                <li>Learn that respecting others' boundaries is a strength, not a weakness</li>
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
    allRatings = [];
}

function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    scoreValue.textContent = totalScore;
    
    let message = '';
    let details = '';
    
    if (totalScore <= 5) {
        message = `
            <h3>🌟 Exceptional Conflict Resolution Skills!</h3>
            <p>You demonstrate outstanding ability to handle difficult situations with empathy, clear communication, and genuine concern for all parties involved. You understand that healthy relationships require respect, accountability, and mutual effort.</p>
        `;
        details = `
            <h4>Your Strengths:</h4>
            <ul>
                <li>You approach conflicts calmly and seek to understand all perspectives</li>
                <li>You take accountability while showing empathy to others</li>
                <li>You create solutions that work for everyone, not just yourself</li>
                <li>You understand boundaries and respect them consistently</li>
                <li>You listen actively and validate others' feelings</li>
            </ul>
        `;
    } else if (totalScore <= 12) {
        message = `
            <h3>👍 Strong Communication Patterns</h3>
            <p>You generally handle conflicts well and care about relationships. You have a solid understanding of healthy communication, though there are occasional moments where you could improve emotional regulation or perspective-taking.</p>
        `;
        details = `
            <h4>Areas for Growth:</h4>
            <ul>
                <li>Practice staying calm when receiving criticism without becoming defensive</li>
                <li>Work on listening fully before responding, especially in heated moments</li>
                <li>Remember that boundaries are healthy and not personal rejection</li>
                <li>Avoid making assumptions - ask clarifying questions instead</li>
                <li>Consider the other person's perspective even when you disagree</li>
            </ul>
        `;
    } else if (totalScore <= 22) {
        message = `
            <h3>⚠️ Inconsistent Conflict Resolution Patterns</h3>
            <p>Your responses show a mix of healthy and unhealthy approaches. You sometimes handle conflicts well, but other times revert to defensive, avoidant, or manipulative strategies. This inconsistency can confuse others and damage relationships.</p>
        `;
        details = `
            <h4>Important Areas for Development:</h4>
            <ul>
                <li>Learn to separate criticism of your actions from criticism of your character</li>
                <li>Practice addressing issues when they're small instead of letting resentment build</li>
                <li>Develop genuine apologies: acknowledge the harm, take responsibility, offer solutions</li>
                <li>Stop using guilt, blame-shifting, or silence as conflict tactics</li>
                <li>Build empathy by asking 'What might they be feeling right now?'</li>
                <li>Understand that respecting boundaries is not rejection</li>
            </ul>
        `;
    } else {
        message = `
            <h3>🚨 Harmful Conflict Patterns Present</h3>
            <p>Your responses consistently show unhealthy approaches to conflict that damage relationships: defensiveness, blame-shifting, manipulation, avoidance, or lack of empathy. These patterns are likely causing significant relationship problems.</p>
        `;
        details = `
            <h4>Critical Areas Requiring Change:</h4>
            <ul>
                <li>Seek professional help (therapist/counselor) to understand your conflict patterns</li>
                <li>Practice taking accountability without making excuses or shifting blame</li>
                <li>Learn to manage emotional reactions in the moment (pause, breathe, respond later if needed)</li>
                <li>Stop using silence, guilt, manipulation, or anger to 'win' arguments</li>
                <li>Develop genuine empathy: try to truly understand the other person's experience</li>
                <li>Respect others' boundaries as non-negotiable, not as personal attacks</li>
                <li>Work on apologizing sincerely: 'I was wrong because... I understand how that made you feel... Here's how I'll do better'</li>
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
