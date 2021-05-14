// Blackjack Game //

// arrays of cards/points and Ace choice
//let dealerCards = []
let dealerPoints = 0
let dealerIsUsingAce = false

//let playerCards = []
let playerPoints = 0
let playerIsUsingAce = false

// generate a deck of cards
const generateNewDeck = () => {
    const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    const cardFaces = ['s', 'd', 'c', 'h']

    // use https://github.com/cardmeister/cardmeister.github.io thus 
    // create an array of "As", "Ad", "Ac", "Ah", "1s", "1d" ... and so on

    const allCards = []

    // building the allCards array
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

// create the card element, return html node for card
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

// get random card from the deck
const getRandomCard = () => {
    const randomCardIndex = Math.floor(Math.random() * currentDeck.length)
    const randomCard = currentDeck[randomCardIndex]
    // remove that card from the current deck
    currentDeck.splice(randomCardIndex, 1)
    return randomCard
}

// give player new card
const givePlayerNewCard = (card) => {
    //playerCards.push(card)
    addCardElementToSpace(card, 'playerCards')

    // remove last char - this gives us 'A', '1', '2'.....'10', 'J', 'Q', 'K'
    let cardValue = card.slice(0, -1)

    if (cardValue > 'A' && cardValue < 'X') {
        playerPoints += 10
    } else if (cardValue === 'A') {
        
        if (playerPoints + 11 < 22) {
            playerPoints += 11
            playerIsUsingAce = true
        } else {
            playerPoints += 1
        }
    } else {
        const numValue = parseInt(cardValue)
        playerPoints += numValue
    }

    // last minute check for ace usage
    if (playerPoints > 21 && playerIsUsingAce) {
        playerPoints -= 10
        playerIsUsingAce = false
    }
}

// give dealer new card
const giveDealerNewCard = (card) => {

    addCardElementToSpace(card, 'dealerCards')

    // remove last char - this gives us 'A', '1', '2'.....'10', 'J', 'Q', 'K'
    let cardValue = card.slice(0, -1)

    // detecting whether it is J, Q or K
    if (cardValue > 'A' && cardValue < 'X') {
        dealerPoints += 10
    } else if (cardValue === 'A') {
        
        if (dealerPoints + 11 < 22) {
            dealerPoints += 11
            dealerIsUsingAce = true
        } else {
            dealerPoints += 1
        }
    } else {
        const numValue = parseInt(cardValue)
        dealerPoints += numValue
    }

    // last minute check for ace usage
    if (dealerPoints > 21 && dealerIsUsingAce) {
        dealerPoints -= 10
        dealerIsUsingAce = false
    }
}

// check and declare winner
const declareWinner = () => {
    resetButtonsForNewGame()

    if (dealerPoints > 21 || playerPoints > dealerPoints) {
        mainText.textContent = 'You WON. Play Again?'
    } else if (dealerPoints > playerPoints) {
        mainText.textContent = 'You LOST. Play Again?'
    } else {
        mainText.textContent = 'DRAW. Play Again?'
    }
}

// reset for a new game
const resetButtonsForNewGame = () => {
    // disable all the buttons
    hitBtn.disabled = true
    standBtn.disabled = true
    startGameBtn.removeAttribute('disabled')
    startGameBtn.textContent = "Yes, play!"
}

// 1 - start the game
const startNewGame = () => {
    
    // reset UI (disable start playing btn, and enable hit/stand btns)
    startGameBtn.disabled = true
    hitBtn.removeAttribute('disabled')
    standBtn.removeAttribute('disabled')

    // reset UI cards
    let emptySpace = '<div class="card empty"></div><div class="card empty"></div><div class="card empty"></div><div class="card empty"></div>'
    document.querySelector('#dealerCards').innerHTML = emptySpace
    document.querySelector('#playerCards').innerHTML = emptySpace

    // reset both player and dealer arrays and points
    //dealerCards = []
    dealerPoints = 0
    dealerIsUsingAce = false
    //playerCards = []
    playerPoints = 0
    playerIsUsingAce = false

    // change text
    mainText.textContent = 'Hit or Stand?'

    // generate 4 random cards
    let randCard1 = getRandomCard()
    let randCard2 = getRandomCard()
    let randCard3 = getRandomCard()
    let randCard4 = getRandomCard()
    
    givePlayerNewCard(randCard1)
    givePlayerNewCard(randCard3)
    
    giveDealerNewCard(randCard2)
    giveDealerNewCard(randCard4)

    // place a closed card on top of dealer's first card
    const firstDealerCardSpace = document.querySelector('#dealerCards .card')
    const cardImage = createCardElement('0')
    firstDealerCardSpace.appendChild(cardImage)
}

// 2 - create button hit
const hitButtonClicked = () => {
    // generate a new card
    const newCard = getRandomCard()
    givePlayerNewCard(newCard)

    // check if user lost the game
    if (playerPoints > 21) {
        resetButtonsForNewGame()
        mainText.textContent = 'You LOST. Play Again?'
    }
}

// 3 - create button stand
const standButtonClicked = () => {
    
    // disable "Hit" and "Stand" buttons
    hitBtn.disabled = true
    standBtn.disabled = true

    // flip Dealer's closed card
    //let firstDealerCard = document.querySelector('#dealerCards .card')
    //firstDealerCard.classList.add('empty')
    //firstDealerCard.innerHTML = ''
    //addCardElementToSpace(dealerCards[0], 'dealerCards')

    // delete the cover card on the dealer to reveal his hidden card
    const cardImages = document.getElementsByTagName('card-t')
    cardImages[1].remove()

    let timerId = setInterval(() => {
        if (dealerPoints >= 17) {
            clearInterval(timerId)
            declareWinner()
        } else {
            let randCard = getRandomCard()
            giveDealerNewCard(randCard)
        }
    }, 1000)
}

// 4 - connect the buttons with DOM events
let currentDeck = generateNewDeck()
const startGameBtn = document.getElementById('startGame')
const hitBtn = document.getElementById('hitButton')
const standBtn = document.getElementById('standButton')
const mainText = document.querySelector('#message h2')

window.addEventListener("DOMContentLoaded", () => {
    
    // connect startGameBtn with startNewGame()
    startGameBtn.addEventListener('click', (event) => {
        startNewGame()
    })

    // connect hit Button with hitButtonClicked()
    hitBtn.addEventListener('click', (event) => {
        hitButtonClicked()
    })

    // connect standBtn with standButtonClicked()
    standBtn.addEventListener('click', (event) => {
        standButtonClicked()
    })
})