// Steps: 

// store the cards
let dealerCards = []
let playerCards = []

// generate a deck of cards

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