// CREATE GLOBAL VARIABLES
// Create list of words
var wordList = ['ABDUCT','BOARD','CAMERA','DRUG','FIELD','GUESS','HEAT','JOIN','LATER','METHOD','MONEY','NUMBER','OFTEN','PARENT','RESULT','SECOND','SEND','TEAM','THANK','VICTIM','WEAR','WRITER','YOUNG','JAZZ']

var correctWord; // For storing correct word value
var numberOfGuesses; // For storing how many guesses user has made
var gameWon; // For storing whether the game has been won
var flipEnabled; // For controlling whether the user can flip tiles


// Prototype for shuffling the letters of the word
String.prototype.shuffle = function() {
	var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}


// Run startGame() function onload of the window
window.onload = function() {
	startGame();
}


// Function to flip tiles
function flip(tile) {
	// Cannot flip tiles if game has been won
	if (gameWon == 1) {

	} else {
		// Cannot flip tiles if flipEnabled = 0;
		if (flipEnabled == 1) {
			// Add class to tile to flip it
			tile.classList.add('flipped-letter');
			flipEnabled = 0;
			document.getElementById('message').innerText = 'Now make a guess!'
			document.getElementById('message').classList.remove('red-message');
			document.getElementById('message').classList.add('normal-message');
		} else {
			document.getElementById('message').innerText = 'You have to make a guess before flipping another tile!'
			document.getElementById('message').classList.remove('normal-message');
			document.getElementById('message').classList.add('red-message');
		}

		// Put focus back on input
		var guessInput = document.getElementById('guess-input');
		guessInput.focus();
	}
}


// Function to flip WINNER tiles
function flipWinner(i) {
	setTimeout(function() {
		document.getElementById(i).classList.add('flipped-letter');
	}, 200 * i)
}


// Function to start the game
function startGame() {
	// Choose a random word from the list
	var numberOfWords = wordList.length;
	var randomNumber = Math.floor(Math.random() * numberOfWords);
	correctWord = wordList[randomNumber];
	console.log(correctWord);

	// Hide the play again button if it is there
	var playAgainBtn = document.getElementById('play-again-btn');
	if (playAgainBtn != null) {
		playAgainBtn.style.display = 'none';
	}

	// Set variables back to initial values to start game
	flipEnabled = 1;
	gameWon = 0;
	numberOfGuesses = 0;

	// Remove the table of guesses if it is there
	var guessTable = document.getElementById('guess-table');
	if (guessTable != null) {
		guessTable.remove();
	}

	// Update message
	var message = document.getElementById('message');
	message.classList.remove('red-message');
	message.classList.remove('green-message');
	message.classList.add('normal-message');
	message.innerText = 'Start by making a guess or choosing a tile to flip';

	// Unhide input
	var guessInput = document.getElementById('guess-input');
	guessInput.style.display = 'block';

	// Add event listener for ENTER
	guessInput.addEventListener("keydown", function(event) {
		console.log('key pressed');
		// if its a repeat don't do anything
		if (event.repeat == true) {
			return
		} else if (event.key === "Enter") {
			console.log('key was enter');
			event.preventDefault();
			checkGuess();
		}

	})

	// Remove children from word-container div
	var wordContainer = document.getElementById('word-container');
	wordContainer.replaceChildren();

	// Shuffle the word
	var shuffledCorrectWord = correctWord.shuffle();
	console.log(shuffledCorrectWord);

	// Set the maxlength of the input to the length of the word
	guessInput.setAttribute("maxlength", correctWord.length);

	// For each letter of the word, add a tile
	for (var i = 0; i < shuffledCorrectWord.length; i++) {
		// create container div
		var tileContainerDiv = document.createElement('div');
		// give class
		tileContainerDiv.classList.add('container');
		// append to wordContainer
		wordContainer.appendChild(tileContainerDiv);

		// create card div
		var tileDiv = document.createElement('div');
		// give class
		tileDiv.classList.add('card');
		// give onclick
		tileDiv.onclick = function() {flip(this);}
		// append to container div
		tileContainerDiv.appendChild(tileDiv);

		// create front div
		var frontDiv = document.createElement('div');
		// give class
		frontDiv.classList.add('front');
		// append to card div
		tileDiv.appendChild(frontDiv);

		// create back div
		var backDiv = document.createElement('div');
		// give class
		backDiv.classList.add('back');
		// add content (letter)
		var letterValue = shuffledCorrectWord[i];
		var letterTextNode = document.createTextNode(letterValue);
		backDiv.appendChild(letterTextNode);
		// append to card div
		tileDiv.appendChild(backDiv);
	}
	// Put focus back on input
	guessInput.focus();
}


// Function to make sure input only accepts letters
function onInput (input) {
	if (!/^[a-zA-Z]*$/g.test(input.value)) {
	        input.value = input.value.replace(/[^a-zA-Z]/g, '');
	        input.focus();
	        return false;
	}
}


// Function to check if guess is correct
function checkGuess() {
	console.log('checkGuess running');

	// get input value
	var input = document.getElementById('guess-input');
	var inputValue = input.value.toUpperCase();
	console.log('input: ',inputValue);

	// get message span
	var message = document.getElementById('message');

	// check if value is long enough
	if (inputValue.length == correctWord.length) {
		// clear input
		input.value = '';

		// get guess container
		var guessContainer = document.getElementById('guess-container');

		// add to number of guesses
		numberOfGuesses = numberOfGuesses + 1;
		console.log('numberOfGuesses: ',numberOfGuesses);

		// if it doesn't exist, create a table for guesses
		var guessTableCheck = document.getElementById('guess-table');

		if (guessTableCheck == null) {
			var guessTable = document.createElement('table');
			guessTable.id = 'guess-table';

			guessContainer.appendChild(guessTable);
		} else {
			var guessTable = document.getElementById('guess-table');
		}

		// get which letters have been flipped
		var flippedLetters = '';
		var flippedLetterCards = document.getElementsByClassName('flipped-letter');

		for (var i = 0; i < flippedLetterCards.length; i++) {
			var letterValue = flippedLetterCards[i].innerText;
			flippedLetters += letterValue;
		}

		if (inputValue == correctWord) {
			console.log('You Win!');

			// youWin();

			// Set variables for game being won
			flipEnabled = 0;
			gameWon = 1;

			// Hide input
			input.style.display = 'none';

			// Update message
			message.innerHTML = 'You flipped ' + flippedLetters.length + ' tiles and made ' + numberOfGuesses + ' guesses.'
			message.classList.remove('normal-message');
			message.classList.remove('red-message');
			message.classList.add('green-message');

			// Create a row in guessTable
			var guessTableRow = document.createElement('tr');
			guessTableRow.innerHTML = '<td class="guess-num correct-guess">' + numberOfGuesses + '</td><td class="guess-value correct-guess">' + inputValue + '</td><td class="guess-flipped-letters correct-guess">' + flippedLetters + '</td>';

			guessTable.appendChild(guessTableRow);

			// delete everything out of word-container
			var wordContainer = document.getElementById('word-container');

			wordContainer.replaceChildren();

			// Add WINNER tiles to word container
			var winnerMessage = 'WINNER';

			for (var i = 0; i < winnerMessage.length; i++) {
				// create container div
				var tileContainerDiv = document.createElement('div');
				// give class
				tileContainerDiv.classList.add('container');
				// append to wordContainer
				wordContainer.appendChild(tileContainerDiv);
				// create card div
				var tileDiv = document.createElement('div');
				// give class
				tileDiv.classList.add('card');
				// give id to tile
				tileDiv.id = i;
				// give onclick
				tileDiv.onclick = function() {flip(this);}
				// append to container div
				tileContainerDiv.appendChild(tileDiv);
				// create front div
				var frontDiv = document.createElement('div');
				// give class
				frontDiv.classList.add('front');
				// append to card div
				tileDiv.appendChild(frontDiv);
				// create back div
				var backDiv = document.createElement('div');
				// give class
				backDiv.classList.add('back-winner');
				// add content (letter)
				var letterValue = winnerMessage[i];
				var letterTextNode = document.createTextNode(letterValue);
				backDiv.appendChild(letterTextNode);
				// append to card div
				tileDiv.appendChild(backDiv);

				// flip each tile
				flipWinner(i);
			}

			// unhide play again button
			var playAgainBtn = document.getElementById('play-again-btn');
			playAgainBtn.style.display = 'block';

			playAgainBtn.focus();

		} else {
			// Update message for wrong guess
			message.innerHTML = 'Its not ' + inputValue + '! Flip another tile and/or guess again.'
			message.classList.remove('normal-message');
			message.classList.remove('green-message');
			message.classList.add('red-message');

			// create a row in guessTable
			var guessTableRow = document.createElement('tr');
			guessTableRow.innerHTML = '<td class="guess-num">' + numberOfGuesses + '</td><td class="guess-value">' + inputValue + '</td><td class="guess-flipped-letters">' + flippedLetters + '</td>';

			guessTable.appendChild(guessTableRow);
		}

		// turn flip back on
		flipEnabled = 1;
	} else {
		// Update message for guess not long enough
		message.innerText = 'Guess must be a ' + correctWord.length + '-letter word!';
		message.classList.remove('normal-message');
		message.classList.remove('green-message');
		message.classList.add('red-message');

		// Put focus back on input
		input.focus();
	}
}