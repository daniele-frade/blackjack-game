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

// create the card element, kreturn html node for card
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

// return random card from the deck
// and remove that card from the current deck
const getRandomCard = () => {
    const randomCardIndex = Math.floor(Math.random() * currentDeck.length)
    const randomCard = currentDeck[randomCardIndex]
    currentDeck.splice(randomCardIndex, 1)
    return randomCard
}


// 1 - start the game

const startNewGame = () => {
    
    // Reset UI (disable Start playing, and enable hit/stand btns)
    startGameBtn.disabled = true
    hitBtn.removeAttribute('disabled')
    standBtn.removeAttribute('disabled')

    // Reset UI cards
    let emptySpace = '<div class="card empty"></div><div class="card empty"></div><div class="card empty"></div><div class="card empty"></div>'
    document.querySelector('#dealerCards').innerHTML = emptySpace
    document.querySelector('#playerCards').innerHTML = emptySpace

    // Reset both player and dealer arrays and points
    dealerCards = []
    dealerPoints = 0
    dealerIsUsingAce = false
    playerCards = []
    playerPoints = 0
    playerIsUsingAce = false

    // Change text
    mainText.textContent = "Hit or Stand ???"

    // Generate 4 random cards
    let randCard1 = getRandomCard()
    let randCard2 = getRandomCard()
    let randCard3 = getRandomCard()
    let randCard4 = getRandomCard()
    
    givePlayerNewCard(randCard1)
    givePlayerNewCard(randCard3)
    
    giveDealerNewCard(randCard2)
    giveDealerNewCard(randCard4)


    console.log(dealerPoints)
    console.log(playerPoints)
}

// 2 - create button hit
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

// 3 - creat button stand
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


// 4 - add DOM events


// calculate points for each player