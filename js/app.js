//List of cards
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

//display cards on page
const ul = document.querySelector(".deck");

function newGame() {
  // used to make adding elements to the web site with better performance
  const fragment = document.createDocumentFragment();
  cardPics = shuffle(cardPics);
  for (let i = 0; i < cardPics.length; i++) {
    //create `li` and `i` tags for each icon in the array
    const li = document.createElement("li");
    const iTag = document.createElement("i");
    li.classList.add("card");
    iTag.classList.add("fa");
    //add them starting from first element until the last
    iTag.classList.add(cardPics[i]);
    li.appendChild(iTag);
    //add li elements in fragment element so it won't keep browser busy by adding each of them one by one
    fragment.appendChild(li);
  }
  //append to the container to be printed on the browser
  console.log(fragment);
  ul.appendChild(fragment);

  click();
}

//Store selected cards in an array
let selectedCards = [];
//Store matched cards
let matchedCards = [];
//first click to start timer
let isFirstClick = true;

//Show the card's picture on click
function selectCard(event) {
  if (isFirstClick) {
    startClock();
    isFirstClick = false;
  }

  let matchOne = this;
  let matchTwo = selectedCards[0];

  //if the list already has another card, check to see if the two cards match
  if (selectedCards.length === 1) {
    event.target.classList.add("show", "open", "stop");
    selectedCards.push(this);
    //if cards do match
    if (this.innerHTML === selectedCards[0].innerHTML) {
      matchOne.classList.add("match");
      matchTwo.classList.add("match");
      matchedCards.push(matchOne, matchTwo);
      countMoves();
      starRating();
      selectedCards = [];
      winGame();
    //if cards do not match
    } else {
      setTimeout(function() {
        matchOne.classList.remove("show", "open", "stop");
        matchTwo.classList.remove("show", "open", "stop");
        selectedCards = [];
      }, 600);
      countMoves()
      starRating();
    }
  //if the list has no card
  } else {
    event.target.classList.add("show", "open", "stop");
    selectedCards.push(this);
  }
}

//click event
function click() {
  const cards = document.querySelectorAll(".card");
  for (const card of cards) {
      card.addEventListener("click", selectCard);
  }
}

//winning the game
function winGame() {
  if (matchedCards.length === cardPics.length) {
    stopClock();
    countStars();
    showModal();
  };
}

//strat a new game
newGame();

//restart game
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", restart);

function restart(){
  ul.innerHTML = "";
  newGame();
  matchedCards = [];
  moves.innerHTML = 0;
  thirdStar.classList.remove("grey");
  secondStar.classList.remove("grey");
  firstStar.classList.remove("grey");
  stopClock();
  sec.innerHTML = "00";
  min.innerHTML = "00";
  isFirstClick = true;
  modal.classList.remove("show-modal");
}

//moves counter
const moves = document.querySelector(".moves");
function countMoves() {
  moves.innerHTML++;
}

//star rating
const stars = document.querySelector(".stars");
const firstStar = document.querySelector(".firststar");
const secondStar = document.querySelector(".secondstar");
const thirdStar = document.querySelector(".thirdstar");
function starRating() {
  if (moves.innerHTML >= 22) {
      thirdStar.classList.add("grey");
  } else if (moves.innerHTML >= 17) {
      secondStar.classList.add("grey");
  } else if (moves.innerHTML >= 13) {
      firstStar.classList.add("grey");
  }
}

//timer
const sec = document.querySelector("#sec");
const min = document.querySelector("#min");
let clock;

function startClock() {
  clock = setInterval(timer, 1000);
}

function timer() {
  if (sec.innerHTML == 59) {
      sec.innerHTML = "00";
      min.innerHTML++;
  } else if (sec.innerHTML >= 0) {
      sec.innerHTML++;
  }
}

//stop timer
function stopClock() {
    clearInterval(clock);
}

//modal popup with victory message
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
const playButton = document.querySelector(".play-button")
const finalTime = document.querySelector("#final-time");
const finalMoves = document.querySelector("#final-moves");
const finalStars = document.querySelector("#final-stars");
let numOfStars;

function countStars() {
  if (moves.innerHTML >= 22) {
      numOfStars = "0 stars";
  } else if (moves.innerHTML >= 17) {
      numOfStars = "1 star";
  } else if (moves.innerHTML >= 13) {
      numOfStars = "2 stars";
  } else {
    numOfStars = "3 stars"
  }
}

//show modal
function showModal() {
  modal.classList.toggle("show-modal");
  finalMoves.innerHTML = moves.innerHTML;
  finalTime.innerHTML = min.innerHTML + ":" + sec.innerHTML;
  finalStars.innerHTML = numOfStars;
}

//click function
function windowOnClick(event) {
  if (event.target === modal) {
    showModal();
  }
}
closeButton.addEventListener("click", showModal);
window.addEventListener("click", windowOnClick);
playButton.addEventListener("click", restart);
