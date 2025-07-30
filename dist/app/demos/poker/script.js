/**
 * Card Duel Game Lab Instructions
 * -------------------------------
 *
 * Goal:
 * Implement the JavaScript functionality for a card duel game where you draw cards against the computer.
 * Use the Deck of Cards API to manage the deck and card drawing. Display the drawn cards, keep score of wins, and declare a final winner.
 *
 * Setup:
 * HTML and CSS are provided. Focus on completing the JavaScript file to add interactivity to the game.
 *
 * Completed Example:
 * Reference the completed example here: https://660f7722fa5cb63b81e4d9ed--melodious-conkies-07f0f6.netlify.app/
 *
 * API Reference:
 * Deck of Cards API - https://deckofcardsapi.com/
 *
 * Tasks:
 * 1. Use the fetch API with async/await to shuffle a new deck when the game starts and draw two cards each round.
 *
 * 2. Display the player's and computer's drawn card images in the provided <img> elements.
 *
 * 3. Implement logic to compare the drawn cards. Update the score based on the higher card. In case of a tie, no points are awarded.
 *
 * 4. After all cards have been drawn, disable the "Draw Card" button and display a message indicating the winner.
 *
 * Hints:
 * - For card value comparison, assign numerical values to face cards (e.g., Jack = 11, Queen = 12, King = 13, Ace = 14).
 * - Utilize the 'remaining' field in the API's draw card response to determine when the deck is exhausted.
 *
 * Note: Reference the completed example for guidance on structure and functionality.
 */

let playerScore = 0;
let computerScore = 0;
let deckId;
let deckCount = 52;

document.getElementById("drawCard").addEventListener("click", drawCards);

// Initialize the game
async function initializeGame() {
    let deckResponse =  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    var deck = await Promise.all([deckResponse]);
    deck = await deck[0].json();
    deckId = deck.deck_id;
}

// Draw two cards
async function drawCards() {
    let card1 = fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);

    let [cardsJson] = await Promise.all([card1]);
    var cards = await cardsJson.json();
    console.log(cards);
    updateGameUI(cards.cards);
    updateScores(cards.cards[0], cards.cards[1]);
}

// Update UI after drawing cards
function updateGameUI(cards) {
    document.getElementById("playerCardImg").src = cards[0].image;
    document.getElementById("computerCardImg").src = cards[1].image;
}

// Update scores
function updateScores(playerCard, computerCard) {
    deckCount -= 2;
    let playerCardValue = cardValue(playerCard);
    let computerCardValue = cardValue(computerCard);

    if (playerCardValue > computerCardValue) {
        playerScore++;
        document.getElementById("playerScore").innerText = playerScore;
    } else if (computerCardValue > playerCardValue) {
        computerScore++;
        document.getElementById("computerScore").innerText = computerScore;
    } else {
        const suitValuemap = {
            "DIAMONDS": 1,
            "CLUBS": 2,
            "HEARTS": 3,
            "SPADES": 4
        };
        let playerCardSuit = suitValuemap[playerCard.suit];
        let computerCardSuit = suitValuemap[computerCard.suit];
        if (playerCardSuit > computerCardSuit) {
            playerScore++;
            document.getElementById("playerScore").innerText = playerScore;
        } else if (computerCardSuit > playerCardSuit) {
            computerScore++;
            document.getElementById("computerScore").innerText = computerScore;
        }
    }
    declareWinner(deckCount);
}

function cardValue(card) {
    const cardValueMap = {
        "ACE": 14,
        "KING": 13,
        "QUEEN": 12,
        "JACK": 11
    };
    return cardValueMap[card.value] || parseInt(card.value);
}

// Declare a winner at the end
function declareWinner() {
    if (deckCount === 0 ) {
        document.getElementById("drawCard").disabled = true;
        let winnerMessage = playerScore > computerScore ? "Player wins!" : computerScore > playerScore ? "Computer wins!" :"It's a tie!";
        document.getElementById("winnerMessage").innerText = winnerMessage;
    }
}

// Initialize game on load
initializeGame();
