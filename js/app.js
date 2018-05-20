/*
 * Create a list that holds all of your cards
 */

let cardPics = [
  "fa-diamond", "fa-diamond",
  "fa-paper-plane-o", "fa-paper-plane-o",
  "fa-anchor", "fa-anchor",
  "fa-bolt", "fa-bolt",
  "fa-cube", "fa-cube",
  "fa-leaf", "fa-leaf",
  "fa-bicycle", "fa-bicycle",
  "fa-bomb", "fa-bomb"
];

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

// used to make adding elements to the web site with better performance
const fragment = document.createDocumentFragment();

// Shuffle the array first
cardPics = shuffle(cardPics);
for (let i = 0; i < cardPics.length; i++) {
    // I need to create `li` and `i` tags for each icon in the array
    const li = document.createElement('li');

    // Add the class `card` to it
    li.classList.add('card');
  // li.classList.add('show');

    // Then create a child `i` element
    // Naming it `i` would break my loop
    const iTag = document.createElement('i');

    // Adding the default 'fa' class so other fa-plane etc can make sense
    iTag.classList.add('fa');

    // I will just add them starting from first element until the last
    // because shuffling already handled by other function
    // It will add it starting from 0 to 15
    iTag.classList.add(cardPics[i]);

    // Adding the `i` into the `li`
    li.appendChild(iTag);

    // Adding all these li elements in to the currently invisible
    // fragment element so it won't keep browser busy by adding each
    // of them one by one
    fragment.appendChild(li);
}
// I need to append it to the container so they can actually
// be printed on the browser
const ul = document.querySelector('.deck');
console.log(fragment);
ul.appendChild(fragment);

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

//Store up to 2 cards in an array
let selectedCards = [];

//Show the card's picture on click
function selectCard(event) {
//  if (selectedCards.length < 2) {

//if the list already has another card, check to see if the two cards match
  if (selectedCards.length === 1) {
    event.target.classList.add("show", "open");
    selectedCards.push(this);
//if cards do match
    if (this.innerHTML === selectedCards[0].innerHTML) {
      this.classList.add("match");
      selectedCards[0].classList.add("match");
      selectedCards = [];
//if cards do not match
    } else {
      this.classList.remove("show", "open");
      selectedCards[0].classList.remove("show", "open");
      selectedCards = [];
      }
  }
//if the list has no card
  else {
    event.target.classList.add("show", "open");
    selectedCards.push(this);
  }
}

const cards = document.querySelectorAll(".card");
for (const card of cards) {
    card.addEventListener("click", selectCard);
}
