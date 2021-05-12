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



// create the card element
// return html node for card
const createCardElement = (aCard) => {
    let cardEl = document.createElement('card-t')
    
    if (aCard == '0') {
        cardEl.setAttribute('rank', 0)
        cardEl.setAttribute('backcolor', '#44F')
        cardEl.setAttribute('backtext', "")
    } else {
        cardEl.setAttribute("cid", aCard)
    }

    return cardEl
}


// add the card element
const addCardElementToSpace = (card, spaceId) => {
    const emptySpaces = document.querySelectorAll(`#${spaceId} .empty`)

    if (emptySpaces.length === 1) {
        const newEmptySpace = document.createElement('div')
        newEmptySpace.classList.add("card")
        newEmptySpace.classList.add("empty")
        document.getElementById(spaceId).appendChild(newEmptySpace)
    }

    const firstEmptySpace = emptySpaces[0]
    const cardImage = createCardElement(card)
    firstEmptySpace.appendChild(cardImage)
    firstEmptySpace.classList.remove('empty')
}


// create button hit
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

// creat button stand
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