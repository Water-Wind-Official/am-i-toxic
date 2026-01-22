// Quiz questions with scoring - Hypothetical conflict scenarios
const questions = [
    // Scenario 1: Work colleague conflict
    {
        question: "SCENARIO: Sarah and Mike work on the same project. Sarah discovers Mike presented her ideas to the manager without crediting her. Sarah is upset and feels her work was stolen. Question 1 - What should Sarah do FIRST?",
        options: [
            { text: "Request a private meeting with Mike to discuss what happened calmly and understand his perspective", points: 0 },
            { text: "Bring it up in the team meeting to publicly call out the mistake", points: 4 },
            { text: "Complain about it to other coworkers before addressing it with Mike", points: 3 },
            { text: "Send an angry email listing all the ways Mike has wronged her", points: 5 }
        ]
    },
    {
        question: "SCENARIO (CONTINUED): Sarah decides to talk to Mike privately. Mike apologizes but explains he was rushing and forgot to mention her. How should Sarah respond to his apology?",
        options: [
            { text: "Accept the apology and discuss how to prevent this in the future (like email summaries)", points: 0 },
            { text: "Accept it but remind him he's done similar things before", points: 2 },
            { text: "Tell him the apology isn't enough and demand he tell the manager immediately", points: 3 },
            { text: "Refuse to accept it and say she doesn't trust him anymore", points: 5 }
        ]
    },
    {
        question: "SCENARIO (CONTINUED): Mike offers to correct the mistake by telling the manager about Sarah's contributions. Sarah wants to move forward professionally. What's the most constructive next step for BOTH of them?",
        options: [
            { text: "Work together on a shared document going forward and establish clear communication about individual contributions", points: 0 },
            { text: "Have Sarah verify everything Mike does to ensure he doesn't make the same mistake", points: 3 },
            { text: "Avoid working together on projects in the future", points: 2 },
            { text: "Sarah should go directly to HR to file a formal complaint", points: 4 }
        ]
    },
    // Scenario 2: Friendship boundary conflict
    {
        question: "SCENARIO: Emma and Jessica are close friends. Emma recently set a boundary: she doesn't want Jessica to make jokes about her appearance anymore. Jessica made a joke about Emma's outfit at dinner. Emma felt hurt. Question 1 - What should Emma do?",
        options: [
            { text: "Calmly remind Jessica about her boundary in the moment and explain how it made her feel", points: 0 },
            { text: "Silently feel hurt and bring it up days later when she's more upset", points: 3 },
            { text: "Make similar jokes about Jessica to show how it feels", points: 4 },
            { text: "End the friendship without explaining why", points: 5 }
        ]
    },
    {
        question: "SCENARIO (CONTINUED): Jessica responds defensively: 'I was just joking! You're being too sensitive. I've always done this!' How should Emma handle Jessica's defensive reaction?",
        options: [
            { text: "Stay calm and reiterate that regardless of intention, the jokes hurt her, and the boundary still stands", points: 0 },
            { text: "Give up on the boundary and accept the jokes since Jessica thinks it's normal", points: 4 },
            { text: "Turn it back on Jessica: 'If you really cared about me, you wouldn't question my feelings'", points: 3 },
            { text: "Agree with Jessica that she IS being too sensitive to avoid conflict", points: 2 }
        ]
    },
    {
        question: "SCENARIO (CONTINUED): The situation is escalating. Jessica is still defensive, and Emma is considering ending the friendship. What's the healthiest approach for both of them?",
        options: [
            { text: "Emma could say: 'I value our friendship, but I need you to respect this boundary. Can we talk about what's driving your resistance to it?'", points: 0 },
            { text: "Jessica should insist Emma is wrong about her own feelings", points: 5 },
            { text: "They should avoid discussing it and hope it blows over", points: 2 },
            { text: "Emma should make Jessica feel guilty for not respecting her boundary immediately", points: 4 }
        ]
    },
    // Scenario 3: Roommate living situation
    {
        question: "SCENARIO: Alex and Jordan are roommates. Jordan frequently leaves dirty dishes in the sink for days and leaves a mess in shared spaces. Alex has been silently frustrated for weeks. Question 1 - How should Alex approach this?",
        options: [
            { text: "Schedule a calm conversation and use 'I' statements: 'I feel frustrated when dishes pile up because it affects my space'", points: 0 },
            { text: "Leave passive-aggressive notes about the mess", points: 4 },
            { text: "Start 'accidentally' leaving Jordan's dishes in their room to send a message", points: 5 },
            { text: "Vent to mutual friends about how inconsiderate Jordan is", points: 3 }
        ]
    },
    {
        question: "SCENARIO (CONTINUED): Alex brings it up calmly. Jordan responds: 'I'll get to it when I have time. You're too uptight about cleanliness.' How should Alex respond constructively?",
        options: [
            { text: "Acknowledge Jordan's schedule concerns while explaining their shared space needs maintenance: 'I understand you're busy, but dishes in the sink attract bugs. Can we create a system that works for both of us?'", points: 0 },
            { text: "Accept Jordan's answer and continue being frustrated in silence", points: 3 },
            { text: "Tell Jordan they're a slob and don't respect shared spaces", points: 5 },
            { text: "Give Jordan an ultimatum: 'Do the dishes now or I'm moving out'", points: 4 }
        ]
    },
    {
        question: "SCENARIO (CONTINUED): After discussion, they need to find a compromise that respects both needs. What's a healthy resolution approach?",
        options: [
            { text: "Create a shared agreement: dishes washed daily, each person owns their mess, weekly shared space cleanup schedule", points: 0 },
            { text: "Alex should do all the cleaning since they care more about it", points: 2 },
            { text: "Only allow dishes in bedrooms to prevent mess in shared spaces", points: 1 },
            { text: "Whoever leaves a mess has to pay the other person money", points: 3 }
        ]
    },
    // Scenario 4: Family money conflict
    {
        question: "SCENARIO: Devon's family borrowed $2,000 from him 6 months ago 'temporarily.' The money hasn't been repaid, and no one mentions it when they gather. Devon is frustrated but hasn't brought it up. Question 1 - What should Devon do?",
        options: [
            { text: "Have a private, direct conversation with the family member who borrowed it: 'I need to discuss the loan from 6 months ago. When can we establish a repayment plan?'", points: 0 },
            { text: "Bring it up angrily at the next family gathering in front of everyone", points: 5 },
            { text: "Start dropping hints and making comments about how the money would help his own situation", points: 4 },
            { text: "Tell other family members about the loan to pressure the borrower", points: 3 }
        ]
    },
    {
        question: "SCENARIO (CONTINUED): The family member responds: 'I know, I know, I've been meaning to. Times are tough right now.' How should Devon handle this?",
        options: [
            { text: "Show empathy while staying firm: 'I understand finances are tight. Let's create a realistic repayment schedule that works for you - maybe $300/month?'", points: 0 },
            { text: "Respond with anger: 'That's what you said 6 months ago! You don't care about me!'", points: 5 },
            { text: "Just accept that the money is probably gone and stop expecting it", points: 2 },
            { text: "Use guilt: 'If you cared about our relationship, you'd make this a priority'", points: 4 }
        ]
    },
    {
        question: "SCENARIO (CONTINUED): The family member can't pay it all back quickly. Devon needs a strategy that protects the relationship AND sets boundaries. What's appropriate?",
        options: [
            { text: "Set a clear agreement: 'Can you commit to $X per month for X months? I'll document this for both of us.' Get it in writing to avoid misunderstandings", points: 0 },
            { text: "Accept verbal promises without any follow-up plan", points: 3 },
            { text: "Demand full payment immediately or cut off the relationship", points: 4 },
            { text: "Just forget about it and feel resentful for years", points: 2 }
        ]
    },
    // Scenario 5: Professional criticism conflict
    {
        question: "SCENARIO: Casey's boss gave feedback that their project had 'sloppy work and missed details.' Casey feels embarrassed and defensive. The boss is right - there were errors. Question 1 - How should Casey respond initially?",
        options: [
            { text: "Thank the boss and ask for specifics: 'Can you show me exactly what I missed? I want to improve.'", points: 0 },
            { text: "Argue about whether the work was actually that bad", points: 4 },
            { text: "Make excuses about being busy or having personal issues affecting work", points: 3 },
            { text: "Ignore the feedback and hope they don't bring it up again", points: 2 }
        ]
    },
    {
        question: "SCENARIO (CONTINUED): The boss provides specific examples. Casey recognizes the boss is correct. What's the professional response?",
        options: [
            { text: "Sincerely apologize and explain your action plan to prevent this: 'I see your points. Going forward, I'll implement a checklist and get peer review before submitting.'", points: 0 },
            { text: "Apologize but remind the boss of all the things you've done right before", points: 2 },
            { text: "Tell the boss they're being unfair and too harsh on you", points: 5 },
            { text: "Apologize only to make the awkwardness go away, then repeat the same mistakes", points: 3 }
        ]
    },
    {
        question: "SCENARIO (CONTINUED): Casey wants to rebuild trust and improve. How should Casey approach this moving forward?",
        options: [
            { text: "Follow through on the action plan, submit quality work, and acknowledge the feedback helped when results improve", points: 0 },
            { text: "Work extra hard for 2 weeks then go back to normal habits", points: 3 },
            { text: "Avoid the boss to prevent further criticism", points: 2 },
            { text: "Tell the boss the feedback was unhelpful and unfair", points: 4 }
        ]
    },
    // Scenario 6: Partner communication breakdown
    {
        question: "SCENARIO: Taylor noticed their partner has been distant and withdrawn for a week. When Taylor asks 'Is something wrong?' the partner says 'Nothing, I'm fine.' Taylor suspects this is not true but doesn't push. Question 1 - What should Taylor do?",
        options: [
            { text: "Respect the space but express care: 'I've noticed you seem quieter. I'm here if you want to talk, but I won't push. I care about you.'", points: 0 },
            { text: "Ignore it and let the partner come around on their own", points: 2 },
            { text: "Keep asking about it repeatedly until they admit something is wrong", points: 3 },
            { text: "Assume the partner is upset with them and start acting defensive", points: 4 }
        ]
    },
    {
        question: "SCENARIO (CONTINUED): A few days later, the partner finally opens up: 'I've been stressed about my family, but I didn't want to burden you.' How should Taylor respond?",
        options: [
            { text: "Listen without judgment and offer support: 'You're not a burden. I want to be here for you. Tell me more about what's happening.'", points: 0 },
            { text: "Say 'I told you so' about noticing the distance", points: 2 },
            { text: "Turn it around: 'Well, I've been stressed too and dealing with it alone, so now we're even'", points: 4 },
            { text: "Tell them they should have opened up sooner instead of worrying you", points: 3 }
        ]
    },
    {
        question: "SCENARIO (CONTINUED): The partner shares their stress and fears. Taylor wants to strengthen the relationship through this challenge. What's the healthiest approach?",
        options: [
            { text: "Listen fully, validate their feelings, and ask how to support them: 'What do you need from me right now?'", points: 0 },
            { text: "Offer unsolicited advice about how to fix their family problems immediately", points: 3 },
            { text: "Use this as ammunition later if you argue about something else", points: 5 },
            { text: "Feel hurt that they didn't trust you with the information sooner", points: 2 }
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
