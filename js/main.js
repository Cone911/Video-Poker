/*----- CONSTANTS -----*/
let deck = [
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
let heldCards;


/*----- CACHED ELEMENTS  -----*/

const cardsEl = document.querySelectorAll('.card');
const creditsEl = document.querySelector('.credits');
const betSizeBtn = document.querySelector('#bet-size-btn');
const dealBtn = document.querySelector('#deal-btn');
const messagesEl = document.querySelector('.messages');

const cardsArray = Array.from(cardsEl);


/*----- EVENT LISTENERS -----*/

cardsArray.forEach((card, index) => {
  card.addEventListener('click', (evt) => {
    if (gamePhase === "draw") {
      toggleHoldStatus(index, evt.target);
      highlightHeldCard(index);
    }
  });
});


betSizeBtn.addEventListener('click', incrementBetSize);

dealBtn.addEventListener('click', () => {
  if (gamePhase === "deal") {
    deductBet();
    renderCredits(playerCredits);
    clearMessages();
    resetDeck();
    shuffleDeck(deck);
    dealCards(deck, 5);
    renderPlayerHand();
    gamePhase = "draw";
    dealBtn.innerText = "HOLD";
    messagesEl.innerText = "Click cards to hold.";
  } else if (gamePhase === "draw") {
    removeStyling();
    replaceNonHeldCards();
    renderPlayerHandwithNoAnimations();
    evaluateHand();
    renderCredits(playerCredits);
    resetHeldCards();
    dealBtn.innerText = "";
    setTimeout(() => {
      clearMessages();
      gamePhase = "roundOver";
      dealBtn.innerText = "DEAL";
    }, 2800); // 2.8 SEC DELAY
  } else if(gamePhase === "roundOver"){
    clearMessages();
    gamePhase = "deal";
    renderPlayerHand();
    dealBtn.innerText = "BET";
  }
});

/*----- FUNCTIONS -----*/

init();

function init() {
  playerHand = [];
  playerCredits = 1000;
  betSize = 1;
  maxBetSize = 5;
  gamePhase = "deal";
  heldCards = [false, false, false, false, false];

  shuffleDeck(deck);
  dealCards(deck, 5);
  renderPlayerHand();
  renderCredits(playerCredits);
  renderBetSize(betSize, maxBet);
  clearMessages();
}

function renderPlayerHand() {
  cardsEl.forEach((card, index) => {
    setTimeout(() => {
      if (gamePhase == "deal") {
        card.className = 'card back';
        card.classList.add('animate__animated', 'animate__fadeInDown');
      } else if (gamePhase === "draw") {
        card.className = `card ${playerHand[index]}`;
        card.classList.add('animate__animated', 'animate__flipInY');
      } else if (gamePhase == "roundOver"){
        
      }
    }, index * 128);
  });
}

function renderPlayerHandwithNoAnimations() {
  cardsEl.forEach((card, index) => {
    setTimeout(() => {
      if (gamePhase == "deal") {
        card.className = 'card back';
      } else if (gamePhase === "draw") {
        card.className = `card ${playerHand[index]}`;
      } else if (gamePhase == "roundOver"){
      }
    }, index * 100);
  });
}

function highlightHeldCard(index) {
  const card = cardsEl[index];
  if (heldCards[index]) {
    card.classList.add('held');
  } else {
    card.classList.remove('held');
  }
}

function renderCredits(playerCredits) {
  creditsEl.innerText = `Credits: ${playerCredits}`;
}

function renderBetSize(betSize) {
  betSizeBtn.innerText = betSize;
}

function clearMessages() {
  messagesEl.innerText = '';
}

function resetDeck() {
  deck = [
    "dA", "dQ", "dK", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02",
    "hA", "hQ", "hK", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02",
    "cA", "cQ", "cK", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02",
    "sA", "sQ", "sK", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02"
  ];
}

function incrementBetSize() {
  betSize++
  if (betSize > maxBetSize) {
    betSize = 1;
  }
  renderBetSize(betSize);
}

function deductBet() {
  playerCredits -= betSize;
}

function placeBet() {
  playerCredits -= betSize;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck;
}

function dealCards(deck, numberOfCards) {
  playerHand = deck.splice(0, numberOfCards);
  remainingDeck = deck;
}

function toggleHoldStatus(index, cardElement) {
  heldCards[index] = !heldCards[index];
}

function replaceNonHeldCards() {
  let numberOfCards = 0;
  for (let i = 0; i < heldCards.length; i++) {
    if (!heldCards[i]) {
      numberOfCards++;
    }
  }
  
  let newCards = remainingDeck.splice(0, numberOfCards);
  
  playerHand.forEach((_, index) => { 
    if(!heldCards[index]){
    playerHand[index] = newCards.shift();
    }
  });
}

function resetHeldCards() {
  heldCards = [false, false, false, false, false];
}

function removeStyling() {
  cardsEl.forEach((card, index) => {
    if (playerHand[index]) {
      card.classList.remove('held');
      card.classList.remove('animate__animated', 'animate__fadeInDown');
      card.classList.remove('animate__animated', 'animate__flipInY');
    }
  })
}

function evaluateHand() {
  let ranks = playerHand.map(card => card.slice(1));
  let suits = playerHand.map(card => card[0]);

  console.log('Ranks:', ranks); // Debug the ranks being processed
  console.log('Suits:', suits); // Debug the suits being processed

  let rankCounts = {};
  let suitCounts = {};

  ranks.forEach(rank => {
    if (!rankCounts[rank]) rankCounts[rank] = 0;
    rankCounts[rank]++;
  });

  suits.forEach(suit => {
    if (!suitCounts[suit]) suitCounts[suit]++;
    suitCounts[suit]++;
  });

  let rankCountArray = [];
  let suitCountArray = [];

  for (let rank in rankCounts) {
    rankCountArray.push(rankCounts[rank]);
  }

  for (let suit in suitCounts) {
    suitCountArray.push(suitCounts[suit]);
  }

  function isRoyalFlush() {
    return isStraightFlush() && ['10', 'J', 'Q', 'K', 'A'].every(rank => ranks.includes(rank));
  }

  function isStraightFlush() {
    return isFlush() && isStraight();
  }

  function isFourOfAKind() {
    return rankCountArray.includes(4);
  }

  function isFullHouse() {
    let threeOfAKind = false;
    let pair = false;
    rankCountArray.forEach(count => {
      if (count === 3) {
        threeOfAKind = true;
      }
      if (count === 2) {
        pair = true;
      }
    });
    return threeOfAKind && pair;
  }

  function isFlush() {
    return suitCountArray.includes(5);
  }

  function isStraight() {
    const rankValuesMap = {
      '02': 0, '03': 1, '04': 2, '05': 3, '06': 4, '07': 5, '08': 6, '09': 7, '10': 8, 'J': 9, 'Q': 10, 'K': 11, 'A': 12
    };

    const rankValues = ranks.map(rank => rankValuesMap[rank]);

    rankValues.sort((a, b) => a - b);

    for (let i = 0; i < 4; i++) {
      if (rankValues[i + 1] - rankValues[i] !== 1) {
        if (i === 3 && rankValues[i + 1] === 12 && rankValues[0] === 0) {
          return true;
        }
        return false;
      }
    }
    return true;
  }

  function isThreeOfAKind() {
    return rankCountArray.includes(3);
  }

  function isTwoPair() {
    let pairCount = 0;
    rankCountArray.forEach(count => {
      if (count === 2) {
        pairCount++;
      }
    });
    return pairCount === 2;
  }

  function isJacksOrBetter() {
    let result = false;
    ['J', 'Q', 'K', 'A'].forEach(highCard => {
      if (rankCounts[highCard] === 2) {
        result = true;
      }
    });
    return result;
  }

  let winningCombination = null;
  if (isRoyalFlush()) {
    winningCombination = "Royal Flush";
  } else if (isStraightFlush()) {
    winningCombination = "Straight Flush";
  } else if (isFourOfAKind()) {
    winningCombination = "Four of a Kind";
  } else if (isFullHouse()) {
    winningCombination = "Full House";
  } else if (isFlush()) {
    winningCombination = "Flush";
  } else if (isStraight()) {
    winningCombination = "Straight";
  } else if (isThreeOfAKind()) {
    winningCombination = "Three of a Kind";
  } else if (isTwoPair()) {
    winningCombination = "Two Pair";
  } else if (isJacksOrBetter()) {
    winningCombination = "Jacks or Better";
  }

  if (winningCombination) {
    let payout = payouts[winningCombination] * betSize;
    playerCredits += payout;
    messagesEl.innerText = `${winningCombination}! You win ${payout} credits!`;
  } else {
    messagesEl.innerText = "Try again?";
  }
}
