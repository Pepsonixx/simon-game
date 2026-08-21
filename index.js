let userArray = []
let gameArray = []
const colorsArray = ["red", "blue", "green", "yellow"]
let gameInRun = false
let level = 0
//Audios

const audios = {
    yellow: new Audio("./sounds/yellow.mp3"),
    blue: new Audio("./sounds/blue.mp3"),
    green: new Audio("./sounds/green.mp3"),
    red: new Audio("./sounds/red.mp3"),
    wrong: new Audio("./sounds/wrong.mp3"),
}


//functions

function isGameRunning() {
    if (gameInRun === false) {
        ulti()
        gameInRun = true
    }
}


function randomColor() {
    let randomNumber = Math.random()
    // console.log("The first is " + randomNumber)
    randomNumber = randomNumber*4
    // console.log("The second is " + randomNumber)
    randomNumber = Math.floor(randomNumber)
    // console.log("The third is " + randomNumber)
    return colorsArray[randomNumber]
}



function blickButton(selected) {
    $("." + selected).addClass("blicked")
    setTimeout(() => {$("." + selected).removeClass("blicked")}, 100)
    audios[selected].currentTime = 0
    audios[selected].play()

}

function newButton() {
    let newColor = randomColor()
    gameArray.push(newColor)
    console.log("Just added newColor, now the Game Array is " + gameArray)
    blickButton(newColor)
    
}


function ulti() {
    $("body").removeClass("gameOver")
    $("h1").text("You are on level " + level)

    setTimeout(newButton, 500)
}

function buttonClicked() {
    let colorOfButton = this.id
    console.log(colorOfButton)
    userArray.push(colorOfButton)
    console.log("U are on level " + level)
    let userArrayLength = userArray.length
    let arraySelector = userArrayLength - 1
    console.log(userArrayLength)

    // Check if the pressed button is the correct one.

    if (userArray[arraySelector] === gameArray[arraySelector]) {
        console.log("Right one")
        blickButton(colorOfButton)
        console.log("It should be " + gameArray[arraySelector] + " === " + userArray[arraySelector])

        // Check if level is done.
        if (userArrayLength === gameArray.length) {
            level++
            userArray = []
            $("h1").text("You are on level " + level)
            setTimeout(newButton, 500)
        }
    }

    else{
        console.log("Wrong one ??")
        setTimeout(() => {
            $("body").addClass("gameOver")
            $("h1").text("Game Over, press any key to restart")
            gameInRun = false
            audios.wrong.play()
            gameArray = []
            userArray = []
            level = 0
        }, 100)
        
    }

}


$(document).on("keydown", isGameRunning)


$(".btn").on("click", buttonClicked)
