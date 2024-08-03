/*----- constants -----*/

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

/*----- state variables -----*/
let playerHand = [];
let playerCredits;
let betSize;
let gamePhase;


  /*----- cached elements  -----*/

  const cardsEl = document.querySelectorAll('.card');
  const creditsEl = document.querySelector('.credits');
  const betSizeBtn = document.querySelector('#bet-size-btn');
  const dealBtn = document.querySelector('#deal-btn');
  const messagesEl = document.querySelector('.messages');


  /*----- event listeners -----*/

  cardsEl.forEach(card => {
    card.addEventListener('click', () => {
      console.log('Clicked: ', card);
      card.classList.add('dA'); // TEST: Adds the 'dA' class to the clicked card
    });
  });
  
  
  betSizeBtn.addEventListener('click', () =>{
    console.log('Button clicked: ', betSizeBtn);
  });
  
  dealBtn.addEventListener('click', () =>{
    console.log('Button clicked: ', dealBtn);
  });

  /*----- functions -----*/

init();

function init() {

  playerHand = [];
  playerCredits = 1000;
  betSize = 1;
  gamePhase = "deal";

  renderPlayerHand();
  renderCredits();
  renderBetSize();
  clearMessages();

  };

function renderPlayerHand(){
    cardsEl.forEach(card =>{
      card.classList.add('back');
    })
  }

function renderCredits(){
  creditsEl.innerText = `Credits: ${playerCredits}`;
}

function renderBetSize() {
  betSizeBtn.innerText = betSize;
}

function clearMessages() {
  messagesEl.innerText = '';
};


