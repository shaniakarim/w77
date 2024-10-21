let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'gameContainer',
    scene: {
        preload: preload,
        create: create
    }
};

let game = new Phaser.Game(config);

let questionIndex = 0;
let questions = [
    { question: "Have you ever lied about your age?", heaven: false },
    { question: "Forgot to tip the waiter?", heaven: false },
    { question: "Do you like pineapple on pizza?", heaven: false },
    { question: "Helped an old lady cross the road?", heaven: true },
    
];

let score = 0;
let questionText, resultText;

function preload() {
    // got help from chatgpt 
}

function create() {
    this.cameras.main.setBackgroundColor('#ffffff');
    
  
    questionText = this.add.text(100, 150, questions[questionIndex].question, { fontSize: '24px', fill: '#000' });
    

    let yesButton = this.add.text(200, 400, 'Yes', { fontSize: '32px', fill: '#00ff00' });
    yesButton.setInteractive().on('pointerdown', () => handleAnswer(true));

    let noButton = this.add.text(400, 400, 'No', { fontSize: '32px', fill: '#ff0000' });
    noButton.setInteractive().on('pointerdown', () => handleAnswer(false));
    
    resultText = this.add.text(100, 500, '', { fontSize: '24px', fill: '#000' });
}

function handleAnswer(answer) {
    let currentQuestion = questions[questionIndex];

    
    if (currentQuestion.heaven === 'atheist') {
        resultText.setText("Nothingness awaits. Eternal darkness.");
    } else if (answer === currentQuestion.heaven) {
        score++;
        resultText.setText("You might make it to heaven!");
    } else {
        resultText.setText("Not looking good. Hell is waiting.");
    }

    questionIndex++;
    if (questionIndex < questions.length) {
        questionText.setText(questions[questionIndex].question);
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    if (score >= 3) {
        resultText.setText("You're going to heaven!");
    } else {
        resultText.setText("Down you go! Welcome to hell.");
    }
}
