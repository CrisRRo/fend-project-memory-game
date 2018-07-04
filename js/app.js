/*
 * Create a list that holds all of the cards
 */
let myCardList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const gameDeck = document.querySelector(".deck");			// Get the container of the cards
const finalScreen = document.querySelector("#end");			// Get the container of the final screen
const scoreMes = document.querySelector(".score-message");	// Get the third line of congratulation message
const playAgainButton = document.querySelector(".replay");	// Get the container of the play again button
const restartButton = document.querySelector(".restart");	// Get element showing the final screen
const movesButton = document.querySelector(".moves");		// Get element showing number of moves
const stars = document.querySelector(".stars");				// Get element showing number of stars
const minutes = document.querySelector(".minutes");			// Get element showing number of minutes
const seconds = document.querySelector(".seconds");			// Get element showing number of seconds
let firstClickedElement = null;								// For every 2 clicks, store the element of the 1st clicked card
let firstCard = null;										// For every 2 clicks, store the value of the 1st clicked card
let cellNo = 0;												// Keep track of number of matched cards
let movesNo = 0;											// Keep track of number of moves until end of the game
let starsNo = 3;											// Keep track of number of stars to be displayed
let timer = 0;												// Keep track of seconds passed from the beginning of the game
let gameStarted = false;									// Keep track if a new game has started or not
let myInterval;												// Store the ID of setInterval function

if (movesNo === 0) {
	createStars(3); // No wrong moves yet (beginning of the game)
}

// Display cards for the first time
myCardList = shuffle(myCardList);
placeCardsOnDeck();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// Add an event listener to the cards
gameDeck.addEventListener('click', function(event){
	
		// Store this card attribute
		let thisCard = event.target.getAttribute('class');
		
		// Check to see if a card is clicked, not the border of the deck && if that card is not already with face up (his class is 'card match' or 'card open show' (otherwise nothing happens)
		if ((event.target.nodeName === 'LI') && !thisCard.includes('match') && !thisCard.includes('open')){
			
			if (!gameStarted) {
				gameStarted = true;
				displayTime();
				myInterval = setInterval(displayTime, 1000);
			}
		
			manipulateCard(event);
		
			// Increase and display moves number (movesNo = movesNo + 1)
			setMovesNo(movesNo + 1);

			// Check if it is end of the game (all 16 cards are matched)
			if (cellNo === 16){
				endOfGame();
			}
			
			displayStars();
		}
}, false);

restartButton.addEventListener('click', restartGame, false);

// Manipulate cards on click according to their status
function manipulateCard(event) {
	// Check if there is any card already clicked
	if (firstClickedElement === null){

		// No card clicked yet => store its value (class) into firstCard variable
		firstCard = event.target.lastElementChild.getAttribute('class');

		// Show the card
		showCard(event);

		// Get the element of the first clicked card
		firstClickedElement = document.querySelector('.clicked');

	} else if (firstCard === event.target.lastElementChild.getAttribute('class')) {
		// Show the second clicked card
		showCard(event);

		// Since 2nd card matches the first one => change cards status to "card match" (both cards remain with their face up) -> with a short delay
		changeCardsStatus(event, 'card match');

		// Reinitialize to null (a new pair of clicks begins)
		other2cards();
		
		// Increase number of matched cards
		cellNo = cellNo + 2;

	} else {
		// Show the second clicked card
		showCard(event);

		// Set the 2 clicked cards attributes to wrong class -> with a short delay
		changeCardsStatus(event, 'card open show wrong');

		// Set the 2 clicked cards attributes to its defaults -> with a short delay
		setTimeout(function(){
			changeCardsStatus(event, 'card');

			// Reinitialize to null (a new pair of clicks begins)
			other2cards();
		}, 300);
	}
}

// Show the card when it is clicked (change its class to open show)
function showCard(event){
	event.target.setAttribute('class', 'card open show clicked');
}

// Change status of the last 2 clicked cards
function changeCardsStatus(event, cardStatus){
	event.target.setAttribute('class', cardStatus);
	firstClickedElement.setAttribute('class', cardStatus);
}

// Reinitialize to null (a new pair of clicks begins)
function other2cards(){
	firstClickedElement = null;
	firstCard = null;
}

// End of the game settings
function endOfGame(){
	gameDeck.style.display = 'none';
	finalScreen.style.display = 'initial';
	playAgainButton.style.display = 'initial';
	
	// Display the score at the end of the game
	scoreMes.innerHTML = "- with " + movesNo + " moves and " + starsNo + " stars -";

	// Stop time counter
	clearInterval(myInterval);

	playAgainButton.addEventListener('click', replay, false);
}

// Set and display the number of moves on screen
function setMovesNo(moves){
	movesNo = moves;
	movesButton.innerText = movesNo;
}

// Set the cards on the deck for starting a new game
function placeCardsOnDeck(){
	gameDeck.innerHTML="";
	for(var r=0; r<myCardList.length; r++){
		// Create one card
		let thisCard = document.createElement("LI");
		thisCard.setAttribute("class", "card");
		thisCard.innerHTML = "<i class='" + myCardList[r] + "'></i>";
		// Display the created card
		gameDeck.appendChild(thisCard);
	}
}

// Create the necessary number of stars on the screen
function createStars(number){
	if (number === 3){
		// Create 3 stars
		stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
	} else if (number === 2){
		// Create 2 stars
		stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
	} else {
		// Create 1star
		stars.innerHTML = "<li><i class='fa fa-star'></i></li>";
	}
}

function displayStars() {
	if (movesNo > 52) {
		createStars(1); // There are more than 20 wrong moves => display only 1 star
		starsNo = 1;
	} else if (movesNo > 42) {
		createStars(2); // There are more than 10 wrong moves => display only 2 stars
		starsNo = 2;
	} else {
		starsNo = 3;
	}
}

function displayTime() {
	displayMinutes();
	displaySeconds();
	timer++;
}

function displaySeconds(){
	if (Math.floor(timer % 60) < 10) {
		seconds.innerText = "0" + Math.floor(timer % 60);
	} else {
		seconds.innerText = Math.floor(timer % 60);
	}
}

function displayMinutes(){
	if (Math.floor(timer / 60) < 10) {
		minutes.innerText = "0" + Math.floor(timer / 60);
	} else {
		minutes.innerText = Math.floor(timer / 60);
	}
}

function initializeTime(){
	timer = 0;
	displayTime();
	gameStarted = false;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Things to happen when replay button is pressed
function replay(){
	gameDeck.style.display = 'flex';
	finalScreen.style.display = 'none';
	playAgainButton.style.display = 'none';
	setMovesNo(0);						// Restart number of moves
	createStars(3);						// Restart number of stars
	initializeTime();					// Restart timer related aspects
	myCardList = shuffle(myCardList);	// Shuffle the cards
	placeCardsOnDeck();					// Display cards on the screen
	cellNo = 0;							// Restart number of matched cards	
}

function restartGame(){
	gameDeck.style.display = 'flex';
	finalScreen.style.display = 'none';
	playAgainButton.style.display = 'none';
	setMovesNo(0);						// Restart number of moves
	createStars(3);						// Restart number of stars
	clearInterval(myInterval);			// Stop time counter
	initializeTime();					// Restart timer related aspects
	myCardList = shuffle(myCardList);	// Shuffle the cards
	placeCardsOnDeck();					// Display cards on the screen
	cellNo = 0;							// Restart number of matched cards	
}