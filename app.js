// Steps: 

// store the cards
let dealerCards = []
let playerCards = []

// generate a deck of cards

// start the game

// return random card from the deck

// calculate points for each player

// buttons hit and stand

const hitButtonClicked = () => {
    // generate a new card
    const newCard = getRandomCard()

    // add to player's array
    playerCards.push(newCard)

    // display the image on the player cards space
    addCardElementToSpace(newCard, 'playerCards')

    // check if user lost the game
    // ??
}