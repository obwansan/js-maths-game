var num1;
var num2;
var answer = 0;
var score = 0;
var myInterval;

var startResetBtn = document.getElementById('start-reset');
var question = document.querySelector('#question');
var boxes = document.getElementsByClassName('box');
var choices = document.querySelector('#choices');
var scoreValue = document.getElementById('scoreValue');
var timeremaining = document.querySelector('#timeremaining');
var timeremainingvalue = document.querySelector('#timeremainingvalue');
var gameOver = document.getElementById('gameOver');
var correct = document.querySelector('#correct');
var wrong = document.querySelector('#wrong');

function generateQuestion() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    question.textContent = num1 + ' x ' + num2;
}

function generateAnswers() {
    // get answer
    answer = num1 * num2;
    // assign answer to box randomly
    var randomBox = Math.floor(Math.random() * 4);
    boxes[randomBox].textContent = answer;
    // set other choices
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i] !== boxes[randomBox]) {
            boxes[i].textContent = Math.floor(Math.random() * 100) + 1; 
        }
    }
}

function countDown() {
   var i = 20;
   myInterval = setInterval(function() {
        timeremainingvalue.innerHTML = i;
        if (i === 0) {
            clearInterval(myInterval);
            // show game over message
            gameOver.style.display = 'block';
            gameOver.innerHTML = 
                '<p>Game Over!</p><p>Your score is ' + score + '</p>';
            // change button to 'start game'
            startResetBtn.textContent = 'Start Game'
        } else {
            i--;
        }
    }, 1000);
  
}

function startGame() {
    // change button text
    startResetBtn.textContent = 'Reset Game';
    // hide gameOver
    gameOver.style.display = 'none';
    // generate new questions and answers
    generateQuestion();
    generateAnswers();
    // show score number
    score = 0;
    scoreValue.textContent = score;
    // show countdown box
    timeremaining.style.display = 'block';
    // start timer
    countDown();
}

function stopGame() {
    // change button text
    startResetBtn.textContent = 'Start Game';
    // hide question and choices
    question.textContent = '';
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].textContent = '';
    }
    // hide score number
    score = 0;
    scoreValue.textContent = score;
    // hide countdown box
    timeremaining.style.display = 'none';
    // stop countdown
    clearInterval(myInterval);
}

// start/stop game 
startResetBtn.addEventListener('click', function() {
    if (startResetBtn.textContent === 'Reset Game') {
       stopGame();
    } else {
       startGame();
    }
});

function answerQuestion() {
    // if playing, answer question
//    if (gameOver.style.display == 'none') {
    // loop through all the boxes
    for(var i = 0; i < boxes.length; i++) {
       // add an event listener to each box
       boxes[i].addEventListener('click', function() {
//         var boxNumber = Number(this.textContent);
//         console.log('boxNumber: ' + boxNumber);
//         console.log('answer: ' + answer);
           // get box number
           var boxNumber = Number(this.textContent);
//         // if answer is correct
           if (boxNumber === answer) {
             // increase score by 1 & display
             score += 1;
//             console.log(score);
             scoreValue.textContent = score;
//             console.log(score);
           // show 'correct' box for one sec
           correct.classList.add('show');
           setTimeout(function(){
             correct.classList.remove('show');
             }, 1000);
           // generate new questions & answers
           generateQuestion();
           generateAnswers();
           }
           else {
              // show 'wrong' box for one sec
              wrong.classList.add('show');
              setTimeout(function(){
                wrong.classList.remove('show');
              }, 1000); 
           }

    });
  }
// }
}

answerQuestion();
 
















