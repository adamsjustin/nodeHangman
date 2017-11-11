var inquirer = require('inquirer');
var fs = require('fs');
var wordArray = [];
var arrayNumber;
var wordToGuess;
var word;
var underscoreArray = [];
var guessesLeft = 10;
var guess;
var questions = [{
    type: 'input',
    name: 'guess',
    message: 'Guess a Letter! '
}]
var correct;
var turn = false;
function inquiry() {
    inquirer.prompt(questions).then(function (answers) {
        answers.guess = new Letter(answers.guess);
        answers.guess.checkCorrect();
        answers.guess.checkEnd();
    });
}
function Hangman() {
    fs.readFile('words.txt', 'utf8', function (err, data) {
        wordArray = data.split(',');
        if (err) throw err;
        //console.log(wordArray);
    arrayNumber = Math.floor((Math.random() * wordArray.length));
    //console.log(arrayNumber);
    word = new Word(wordArray[arrayNumber], []);
    //console.log(word.array);
    word.letters(word.array);
    // console.log(underscores);
    correct = word.array.length;
    console.log(correct);
    inquiry();
    });
}
function Word(primary, array, letters, questions) {
    this.primary = primary;
    this.array = primary.split('');
    //console.log(primary);
    //console.log(this.array);
    this.letters = function (array) {
        for (i = 0; i < array.length; i++) {
            underscoreArray.push('_ ');
        }
        
        console.log(underscoreArray);
    }
};
//inquirer(questions, callback);
function Letter(guess, checkCorrect) {
    this.guess = guess
    this.checkCorrect = function () {
        for (i = 0; i < word.array.length; i++) {
            if (this.guess === word.array[i]) {
                underscoreArray[i] = this.guess;
                turn = true;
            }
        }
        if(turn) {
            correct--;
            turn = false;
        }else{
            guessesLeft--;
        }
        console.log(underscoreArray);
        console.log('Left: ' + guessesLeft);
        console.log(correct)
        
    }
    this.checkEnd = function() {
        if (correct === 1){
            underscoreArray = [];
            console.log('You Win!')
            game();
            return;
    }   
    if ( guessesLeft === 0 ) {
        console.log('You losed!')
        game();
        return;
    }
    inquiry();
}    
};
function game() {
    
    Hangman();
}
game();