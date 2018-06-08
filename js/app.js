/*
 * Create a list that holds all of your cards
 */


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

/* Used like so - TO BE DELETED
var arr = [2, 11, 37, 42];
arr = shuffle(arr);
console.log(arr);  */

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

const gameDeck = document.querySelector(".deck");			// Get the container of the cards
const finalScreen = document.querySelector("#end");			// Get the container of the final screen
const restartButton = document.querySelector(".restart");	// Get element showing the final screen
const movesButton = document.querySelector(".moves");		// Get element showing number of moves
let firstClickedElement = null;								// For every 2 clicks, store the element of the 1st clicked card
let firstCard = null;										// For every 2 clicks, store the value of the 1st clicked card
let cellNo = 0;												// Keep track of number of matched cards
let movesNo = 0;											// Keep track of number of moves until end of the game

// Add an event listener to the cards
gameDeck.addEventListener('click', function(event){
	
		// Store this card attribute
		let thisCard = event.target.getAttribute("class");
		
		// Check to see if a card is clicked, not the border of the deck && if that card is not already with face up (his class is 'card match' or 'card open show' (otherwise nothing happens)
		if ((event.target.nodeName === 'LI') && !thisCard.includes("match") && !thisCard.includes("open")){

			manipulateCard(event);

			// Increase and display moves number (movesNo = movesNo + 1)
			setMovesNo(movesNo + 1);

			// Check if it is end of the game
			if (cellNo === 16){
				endOfGame();
			}
		}

}, false);

restartButton.addEventListener('click', function(event){
	gameDeck.style.display = "flex";
	finalScreen.style.display = "none";
	// Restart number of moves
	setMovesNo(0);
	placeCardsOnDeck();
}, false);

// Manipulate cards on click according to their status
function manipulateCard(event) {
	// Check if there is any card already clicked
	if (firstClickedElement === null){

		// No card clicked yet => store its value (class) into firstCard variable
		firstCard = event.target.lastElementChild.getAttribute("class");

		// Show the card
		showCard(event);

		// Get the element of the first clicked card
		firstClickedElement = document.querySelector(".clicked");

	} else if (firstCard === event.target.lastElementChild.getAttribute("class")) {
		// Show the second clicked card
		showCard(event);

		// Since 2nd card matches the first one => change cards status to "card match" (both cards remain with their face up) -> with a short delay
		changeCardsStatus(event, "card match");

		// Reinitialize to null (a new pair of clicks begins)
		other2cards();
		
		// Increase number of matched cards
		cellNo = cellNo + 2;

	} else {
		// Show the second clicked card
		showCard(event);

		// Set the 2 clicked cards attributes to wrong class -> with a short delay
		changeCardsStatus(event, "card open show wrong");

		// Set the 2 clicked cards attributes to its defaults -> with a short delay
		setTimeout(function(){
			changeCardsStatus(event, "card");

			// Reinitialize to null (a new pair of clicks begins)
			other2cards();
		}, 300);
	}
}

// Show the card when it is clicked (change its class to open show)
function showCard(event){
	event.target.setAttribute("class", "card open show clicked");
}

// Change status of the last 2 clicked cards
function changeCardsStatus(event, cardStatus){
	event.target.setAttribute("class", cardStatus);
	firstClickedElement.setAttribute("class", cardStatus);
}

// Reinitialize to null (a new pair of clicks begins)
function other2cards(){
	firstClickedElement = null;
	firstCard = null;
}

// End of the game settings
function endOfGame(){
	gameDeck.style.display = "none";
	finalScreen.style.display = "initial";
	// Restart number of moves
	setMovesNo(0);
}

// Set and display the number of moves on screen
function setMovesNo(moves){
	movesNo = moves;
	movesButton.innerText = movesNo;
}

// Set the cards on the deck for starting a new game
function placeCardsOnDeck(){
	
}