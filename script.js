const QS = (q) => document.querySelector(q)

// Declare global variables
const message = QS("#message")
var specialMessage = QS("#specialMessage")
const guessInput = QS("#guessInput")
const guessButton = QS("#guessButton")
const restartButton = QS("#restartButton")
var minNumber
var maxNumber
var winningNumber
var guessedNumber
var gameWon = false
var gameOver = false
var numbersGuessed = []
var guessCount
const MAXTRIES = 10

// Set Event Listeners
guessButton.addEventListener("click", guessNumber)
restartButton.addEventListener("click", startGame)
window.addEventListener("keydown", function (event) {
    if (event.keyCode == "13") { guessNumber() }
})

function startGame() {
    minNumber = 1
    maxNumber = 100
    guessInput.setAttribute("min", minNumber)
    guessInput.setAttribute("max", maxNumber)
    guessInput.value = ""
    numbersGuessed = []
    guessCount = 0
    winningNumber = getRandomNum()
    message.innerText = "Guess a number between 1 and 100."
    specialMessage.innerText = `Guess the number within ${MAXTRIES} tries.`
    gameWon = false
    gameOver = false
    var triesRemaining = MAXTRIES
    guessButton.style.visibility = "initial"
}

function guessNumber() {
    if (gameWon || gameOver) return

    if (!guessInput.value || isNaN(guessInput.value)) {
        message.innerHTML = `Guess a <b>number</b> between ${minNumber} and ${maxNumber}.`
        console.log("Number wasn't guessed")
        guessInput.value = ""
        return
    }

    guessedNumber = parseInt(guessInput.value)
    guessInput.value = ""

    if (!isInRange()) {
        message.innerHTML = `Guess a number between <b>${minNumber}</b> and <b>${maxNumber}</b>.`
        console.log("Guess was out of range.")
        return
    }

    if (numbersGuessed.includes(guessedNumber)) {
        message.innerText = `You already guessed ${guessedNumber}.\n Try a number between ${minNumber} and ${maxNumber}.`
        console.log("Guessed number was already tried.")
        return
    }

    numbersGuessed.push(guessedNumber)
    guessCount++
    triesRemaining = MAXTRIES - guessCount

    if (guessedNumber == winningNumber) {
        message.innerHTML = `<b>You won!</b>\n It took you only ${guessCount} guesses.`
        specialMessage.innerText = `The winning number was ${winningNumber}.`
        gameWon = true
        guessButton.style.visibility = "hidden"
    } else collapseNumRange()

    if (triesRemaining <= 0 && !gameWon) {
        message.innerHTML = `<b>You lost.</b></br>You could not guess the number within ${MAXTRIES} tries.`
        guessButton.style.visibility = "hidden"
        specialMessage.innerText = `The number was ${winningNumber}.`
        gameOver = true
    }

    if (!gameWon && !gameOver) {
        message.innerHTML = `Guess a number between ${minNumber} and ${maxNumber}.`     
        specialMessage.innerHTML = `You have <i>${triesRemaining}</i> tries remaining.`
        guessInput.setAttribute("min", minNumber)
        guessInput.setAttribute("max", maxNumber)
    }
}

//May use to simply (re)startGame function
function resetVariables() {

}

function getRandomNum() {
    let randomNumber = Math.ceil(Math.random() * 100)
    console.log(`Random Number:  ${randomNumber}`)
    return randomNumber
}

function isInRange() {
    if (guessedNumber >= minNumber && guessedNumber <= maxNumber) {
        return true
    }
    return false
}

const collapseNumRange = () => {
    if (guessedNumber >= minNumber && guessedNumber < winningNumber) {
        minNumber = guessedNumber
    }
    else {
        maxNumber = guessedNumber
    }
}

/*
function insertSpecialMessage(specialMessage) {
    let p = document.createElement("p")
    p.innerHTML = specialMessage;
    p.setAttribute("id", "specialMessage")
    game.append(p)
}
*/

startGame()

//var game = document.getElementById("game")
