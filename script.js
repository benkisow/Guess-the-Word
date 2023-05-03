// Create a list of words and pick one
var wordList = ['ABDUCT','BOARD', 'BUSINESS','CAMERA','DRUG','EDUCATION','FIELD','GUESS','HEAT','INVOLVE','JOIN','KITCHEN','LATER','METHOD','MONEY','NUMBER','OFTEN','PARENT','RESULT','SECOND','SEND','TEAM','THANK','VICTIM','WEAR','WRITER','YOUNG','YOURSELF','JAZZ']

var correctWord;

var numberOfGuesses;
var gameWon;
var flipEnabled;

// For shuffling the letters
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

//var numFlippedCards = 0;

function startGame() {
	var numberOfWords = wordList.length;
	var randomNumber = Math.floor(Math.random() * numberOfWords);

	correctWord = wordList[randomNumber];
	console.log(correctWord);

	var playAgainBtn = document.getElementById('play-again-btn');
	if (playAgainBtn != null) {
		playAgainBtn.style.display = 'none';
	}

	flipEnabled = 1;
	gameWon = 0;
	numberOfGuesses = 0;

	var guessTable = document.getElementById('guess-table');
	if (guessTable != null) {
		guessTable.remove();
	}

	var guessBtn = document.getElementById('guess-btn');
	guessBtn.removeAttribute("disabled");


	var message = document.getElementById('message');
	message.classList.remove('red-message');
	message.classList.remove('green-message');
	message.classList.add('normal-message');
	message.innerText = 'Start by making a guess or choosing a tile to flip';

	// add event listener for enter
	var guessInput = document.getElementById('guess-input');

	guessInput.removeAttribute("disabled");

	guessInput.addEventListener("keypress", function(event) {
		// if it was backspace and not a flipped letter
		if (event.key === "Enter") {
			event.preventDefault();
			document.getElementById('guess-btn').click();
		}
	})

	// Get word container div
	var wordContainer = document.getElementById('word-container');

	wordContainer.replaceChildren();

	var shuffledCorrectWord = correctWord.shuffle();
	console.log(shuffledCorrectWord);

	guessInput.setAttribute("maxlength", correctWord.length);

	// CREATE TILE FOR EACH LETTER (DIV)
	// CREATE SPAN WITHIN EACH DIV TO HOLD THE LETTER W/ DISPLAY: NONE
	// ADD AN ONCLICK TO THE TILE (DIV) TO REVEAL THE LETTER

	// For each letter of the word, add a div
	for (var i = 0; i < shuffledCorrectWord.length; i++) {
		// create letter card
		var letterCard = document.createElement('div');
		letterCard.id = 'L' + i;
		letterCard.onclick = function() {flipLetterCard(this);};
		letterCard.classList.add('letter-card');

		// create text node with the letter in it
		var letterValue = shuffledCorrectWord[i];
		var letterTextNode = document.createTextNode(letterValue);

		letterCard.appendChild(letterTextNode);

		wordContainer.appendChild(letterCard);

/*
		// create input for letter
		var letterInput = document.createElement('input');
		letterInput.type = 'text';
		letterInput.maxLength = '1';
		letterInput.classList.add('letter-input');
		letterInput.oninput = function() {onInput(this)};

		// add event listener for backspace
		letterInput.addEventListener("keydown", function(event) {
			// if it was backspace and not a flipped letter
			if (event.key == "Backspace" && (this.classList.contains('flipped-letter') == false || this.classList.contains('correct-letter') == false)) {
				console.log('this.value = ', this.value);
				// if the current input is blank then backspace last one
				if (this.value == "") {
					var letterCard = this.parentNode;
					var letterPosition = letterCard.id;
					// if not first letter
					if (letterPosition != 0) {
						console.log('backspace pressed on ', letterPosition);
						for (var i = letterPosition; i > 0; i--) {
							var prevLetterCard = document.getElementById(i-1);
							var prevLetterInput = prevLetterCard.getElementsByTagName('input')[0];
							console.log('i: ', i, 'last letter value is ', prevLetterInput.value);
							if (prevLetterInput.classList.contains('flipped-letter') == false && prevLetterInput.classList.contains('correct-letter') == false) {
								prevLetterInput.value = '';
								prevLetterInput.focus();
								break;
							}
						}
					// if first letter then do nothing
					} else {
						console.log('this.value == "", and letterPosition = 0');
						this.focus();
					}
				} else {
					this.value = '';
					this.focus();
				}
			} else {
				console.log('Pressed ', event.key, ' on ', this.parentNode.id);
			}
		})

		letterCard.appendChild(letterInput);

		// create button to "flip" (show letter and lock input)
		var flipButton = document.createElement('button');
		flipButton.classList.add('flip-btn');
		flipButton.innerText = 'Flip';
		flipButton.onclick = function() {flipLetterCard(this)};

		letterCard.appendChild(flipButton);

		wordContainer.appendChild(letterCard);
	}

	var firstInput = document.getElementById('0').getElementsByTagName('input')[0];
	firstInput.focus();
*/
	}
	guessInput.focus();
}

function flipLetterCard(letterCard) {
	//numFlippedCards = numFlippedCards + 1;
	if (gameWon == 1) {

	} else {
		// add class
		if (flipEnabled == 1) {
			letterCard.classList.add('flipped-letter');
			flipEnabled = 0;
			document.getElementById('message').innerText = 'Now make a guess!'
			document.getElementById('message').classList.remove('red-message');
			document.getElementById('message').classList.add('normal-message');
		} else {
			document.getElementById('message').innerText = 'You have to make a guess before flipping another tile!'
			document.getElementById('message').classList.remove('normal-message');
			document.getElementById('message').classList.add('red-message');
		}

		var guessInput = document.getElementById('guess-input');
		guessInput.focus();
	}

	/*

	var letterCard = btn.parentNode;
	var letterInput = letterCard.getElementsByTagName('input')[0];
	var letterPosition = letterCard.id;

	var correctLetter = correctWord[letterPosition];

	letterInput.value = correctLetter;
	letterInput.setAttribute('readonly', 'true');
	letterInput.classList.add('flipped-letter');

	// Put focus on first empty one
	for (var i = 0; i < correctWord.length; i++) {
		var eachLetterCard = document.getElementById(i);
		var eachLetterInput = eachLetterCard.getElementsByTagName('input')[0];

		if (eachLetterInput.value == '') {
			eachLetterInput.focus();
			break;
		}
	}
	*/
}

function onInput (input) {
	// if it passes regex
	if (!/^[a-zA-Z]*$/g.test(input.value)) {
	        input.value = input.value.replace(/[^a-zA-Z]/g, '');
	        input.focus();
	        return false;
	}
}

function checkGuess() {
	// get input value
	var input = document.getElementById('guess-input');
	var inputValue = input.value.toUpperCase();
	console.log('input: ',inputValue);

	// get message span
	var message = document.getElementById('message');

	// check if value is long enough
	if (inputValue.length == correctWord.length) {
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

		var flippedLetters = '';
		var flippedLetterCards = document.getElementsByClassName('flipped-letter');

		for (var i = 0; i < flippedLetterCards.length; i++) {
			var letterValue = flippedLetterCards[i].innerText;
			flippedLetters += letterValue;
		}

		if (inputValue == correctWord) {
			console.log('You Win!');

			// youWin();

			flipEnabled = 0;
			gameWon = 1;

			input.setAttribute("disabled","true");
			document.getElementById('guess-btn').setAttribute("disabled","true");

			message.innerHTML = 'You flipped ' + flippedLetters.length + ' tiles and made ' + numberOfGuesses + ' guesses.'
			message.classList.remove('normal-message');
			message.classList.remove('red-message');
			message.classList.add('green-message');

			// create a row
			var guessTableRow = document.createElement('tr');
			guessTableRow.innerHTML = '<td class="guess-num correct-guess">' + numberOfGuesses + '</td><td class="guess-value correct-guess">' + inputValue + '</td><td class="guess-flipped-letters correct-guess">' + flippedLetters + '</td>';

			guessTable.appendChild(guessTableRow);

			// delete everything out of word-container
			var wordContainer = document.getElementById('word-container');

			wordContainer.replaceChildren();

			var winnerMessage = 'WINNER!';

			// CREATE TILE FOR EACH LETTER (DIV)
			// CREATE SPAN WITHIN EACH DIV TO HOLD THE LETTER W/ DISPLAY: NONE
			// ADD AN ONCLICK TO THE TILE (DIV) TO REVEAL THE LETTER

			// For each letter of the word, add a div
			for (var i = 0; i < winnerMessage.length; i++) {
				// create letter card
				var letterCard = document.createElement('div');
				letterCard.id = 'L' + i;
				letterCard.onclick = function() {flipLetterCard(this);};
				letterCard.classList.add('winner-letter-card');

				// create text node with the letter in it
				var letterValue = winnerMessage[i];
				var letterTextNode = document.createTextNode(letterValue);

				letterCard.appendChild(letterTextNode);

				wordContainer.appendChild(letterCard);
			}

			var playAgainBtn = document.getElementById('play-again-btn');
			playAgainBtn.style.display = 'block';

			playAgainBtn.focus();

		} else {
			message.innerHTML = 'Its not ' + inputValue + '! Flip another tile and/or guess again.'
			message.classList.remove('normal-message');
			message.classList.remove('green-message');
			message.classList.add('red-message');

			// create a row
			var guessTableRow = document.createElement('tr');
			guessTableRow.innerHTML = '<td class="guess-num">' + numberOfGuesses + '</td><td class="guess-value">' + inputValue + '</td><td class="guess-flipped-letters">' + flippedLetters + '</td>';

			guessTable.appendChild(guessTableRow);
		}

		// turn flip back on
		flipEnabled = 1;
	} else {
		message.innerText = 'Guess must be a ' + correctWord.length + '-letter word!';
		message.classList.remove('normal-message');
		message.classList.remove('green-message');
		message.classList.add('red-message');

		input.focus();
	}

	


/*
	for (let i = 0; i < correctWord.length; i++) {
		var letterCard = document.getElementById(i);
		var letterInput = letterCard.getElementsByTagName('input')[0];

		var letterGuess = letterInput.value.toUpperCase();

		var correctLetter = correctWord[i];

		if (letterGuess == correctLetter) {
			numCorrectLetters = numCorrectLetters + 1;
			letterInput.classList.remove('flipped-letter');
			letterInput.classList.add('correct-letter');
			letterInput.setAttribute("readonly", "true");
		} else {
			letterInput.classList.add('wrong-letter');
			letterInput.setAttribute("readonly", "true");
			clearWrongLetters(i);
		}
	}

	if (numCorrectLetters == correctWord.length) {
		alert('You Win!');
	}
	*/
}

function clearWrongLetters(i) {
	setTimeout(function() {
		var letterCard = document.getElementById(i);
		var letterInput = letterCard.getElementsByTagName('input')[0];
		letterInput.classList.remove('wrong-letter');
		letterInput.value = '';
		letterInput.removeAttribute("readonly");

		// Put focus on first blank one
		var firstInput = document.getElementById('0').getElementsByTagName('input')[0];

		if (firstInput.value == '') {
			firstInput.focus();
		} else {
			var index = 0;

			while (index < correctWord.length) {
				var nextOne = String(index + 1);

				var nextOneCard = document.getElementById(nextOne);
				var nextLetterInput = nextOneCard.getElementsByTagName('input')[0];

				if (nextLetterInput.value == '') {
					nextLetterInput.focus();
					break;
				}

				index++;
			}
		}
	}, 1000);
}

/*
// Add guess button when all inputs have values
setInterval(function() {
	var nonBlankInputs = 0;

	for (var i = 0; i < correctWord.length; i++) {
		var eachLetterCard_global = document.getElementById(i);
		var eachLetterInput_global = eachLetterCard_global.getElementsByTagName('input')[0];

		if (eachLetterInput_global.value != '') {
			var nonBlankInputs = nonBlankInputs + 1;
		}
	}

	if (nonBlankInputs == correctWord.length) {
		document.getElementById('guess-btn').style.display = 'block';
	} else {
		document.getElementById('guess-btn').style.display = 'none';
	}
}, 10);
*/