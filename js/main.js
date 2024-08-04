/*----- CONSTANTS -----*/

const deck = [
  "dA", "dQ", "dK", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02",
  "hA", "hQ", "hK", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02",
  "cA", "cQ", "cK", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02",
  "sA", "sQ", "sK", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02"
];

const payouts = {
  "Royal Flush": 250,
  "Straight Flush": 50,
  "Four of a Kind": 25,
  "Full House": 9,
  "Flush": 6,
  "Straight": 4,
  "Three of a Kind": 3,
  "Two Pair": 2,
  "Jacks or Better": 1
};

/*----- STATE VARIABLES -----*/
let playerHand = [];
let playerCredits;
let betSize;
let maxBet;
let gamePhase;


  /*----- CACHED ELEMENTS  -----*/

  const cardsEl = document.querySelectorAll('.card');
  const creditsEl = document.querySelector('.credits');
  const betSizeBtn = document.querySelector('#bet-size-btn');
  const dealBtn = document.querySelector('#deal-btn');
  const messagesEl = document.querySelector('.messages');


  /*----- EVENT LISTENERS -----*/

cardsEl.forEach(card => {
    card.addEventListener('click', () => {
      console.log('Clicked: ', card);
    });
  });
  
  
betSizeBtn.addEventListener('click', incrementBetSize);

dealBtn.addEventListener('click', () => {
  if (gamePhase === "start" || gamePhase === "deal") {
      deductBet();
      clearMessages();
      shuffleDeck(deck);
      dealCards(deck, 5); 
      renderPlayerHand();
      setGamePhaseToDraw();
    }
  });

  /*----- FUNCTIONS -----*/

init();

function init() {

  playerHand = [];
  playerCredits = 1000;
  betSize = 1;
  maxBetSize = 5;
  gamePhase = "start";

  renderPlayerHand();
  renderCredits(playerCredits);
  renderBetSize(betSize, maxBet);
  clearMessages();

  // gamePhase = "deal";

  };

  function renderPlayerHand() {
    cardsEl.forEach((card, index) => {
      setTimeout(() => {
        if (gamePhase == "start") {
          card.className = 'card back';
          card.classList.add('animate__animated', 'animate__fadeInDown');
        } else {
          card.className = `card ${playerHand[index]}`;
          card.classList.add('animate__animated', 'animate__flipInY');
        }
      }, index * 200); // Delay each iteration by index * 1000 milliseconds
    });
  }

function renderCredits(playerCredits){
  creditsEl.innerText = `Credits: ${playerCredits}`;
}

function renderBetSize(betSize) {
  betSizeBtn.innerText = betSize;
}

function incrementBetSize(){
  betSize++
  if(betSize > maxBetSize){
    betSize = 1;
  }
  renderBetSize(betSize);
}

function deductBet() {
  playerCredits -= betSize;
  renderCredits(playerCredits);
}

function clearMessages() {
  messagesEl.innerText = '';
};

function placeBet() {
  playerCredits -= betSize;
}

function shuffleDeck(deck){
  for (let i = deck.length -1; i > 0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck;
}

function dealCards(deck, numberOfCards){
  playerHand = deck.splice(0, numberOfCards);
  remainingDeck = deck;
}

function setGamePhaseToDraw() {
  gamePhase = "draw";
}


