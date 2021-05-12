// Steps: 

// store the cards
let dealerCards = []
let playerCards = []

// generate a deck of cards
const generateNewDeck = () => {
    const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    const cardFaces = ['s', 'd', 'c', 'h']

    // Use https://github.com/cardmeister/cardmeister.github.io thus 
    // Create an array of "As", "Ad", "Ac", "Ah", "1s", "1d" ... and so on

    const allCards = []

    // Building the allCards array
    for (let i in cardValues) {
        let card = cardValues[i]

        for (let j in cardFaces) {
            let face = cardFaces[j]
            let actualCard = card + face
            allCards.push(actualCard)
        }
    }

    return allCards
}
// start the game

// return random card from the deck

// calculate points for each player

// buttons hit and stand

// create the addCardElementToSpace

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

const standButtonClicked = () => {
    
    // Disable "Hit" and "Stand" buttons
    hitBtn.disabled = true
    standBtn.disabled = true

    // Flip Dealer's closed card
    let firstDealerCard = document.querySelector('#dealerCards .card')
    firstDealerCard.classList.add('empty')
    firstDealerCard.innerHTML = ''
    addCardElementToSpace(dealerCards[0], 'dealerCards')

    // Figure out if dealer needs a new card

    // Dealer cannot stand below 17, also they stand between 17 and 20

}