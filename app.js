const deck = []

class Card {
  constructor(val, suit) {
    this.val = val
    this.suit = suit
  }
}

for (let i = 0; i < 9; i++) {
  deck[i] = new Card(i + 6, 0)
}

for (let i = 9; i < 18; i++) {
  deck[i] = new Card(i - 3, 1)
}

for (let i = 18; i < 27; i++) {
  deck[i] = new Card(i - 12, 2)
}


for (let i = 27; i < 36; i++) {
  deck[i] = new Card(i - 21, 3)
}

const mixDeck = []

for (let i = 0; i < 36; i++) {
  mixDeck[i] = deck.splice(Math.floor(Math.random() * deck.length), 1)[0]
}

let myDeck = mixDeck.splice(0, 18)
let enDeck = mixDeck.splice(0, 18)

let myRow = []
let enRow = []

let quantMy = 18
let quantEnemy = 18

let take = false
let win = false

const getStringValue = function (card) {
  switch (card.val) {
    case 11:
      return "J"
    case 12:
      return "Q"
    case 13:
      return "K"
    case 14:
      return "A"
    default:
      return card.val
  }
}

const getStringSuit = function (card) {
  if (card.suit === 0) {
    return "&#9829"
  }
  if (card.suit === 1) {
    return "&#9830"
  }
  if (card.suit === 2) {
    return "&#9827"
  }
  if (card.suit === 3) {
    return "&#9824"
  }
}

const activWin = function (who) {
  if (who === "me") {
    quantMy += myRow.length
    quantEnemy -= myRow.length

    document.getElementById("quantMy").innerHTML = quantMy
    document.getElementById("quantEnemy").innerHTML = quantEnemy

    myDeck = myRow.concat(myDeck)
    myDeck = enRow.concat(myDeck)

    myRow = []
    enRow = []
  }

  if (who === "enemy") {
    quantMy -= myRow.length
    quantEnemy += myRow.length

    document.getElementById("quantMy").innerHTML = quantMy
    document.getElementById("quantEnemy").innerHTML = quantEnemy

    enDeck = myRow.concat(enDeck)
    enDeck = enRow.concat(enDeck)

    myRow = []
    enRow = []
  }
}

document.getElementById("quantMy").addEventListener("click", function () {

  if (win === true) {
    return
  }

  if (take === false) {

    myRow.push(myDeck.pop())
    enRow.push(enDeck.pop())

    const myRowView = document.getElementById("myRow")
    const enRowView = document.getElementById("enRow")

    myRowView.innerHTML += `<div class="card white">${getStringValue(myRow[myRow.length - 1])}
		${getStringSuit(myRow[myRow.length - 1])}</div>`

    if (myRow[myRow.length - 1].suit === 0 || myRow[myRow.length - 1].suit === 1) {
      myRowView.lastChild.style.color = "red"
    }

    enRowView.innerHTML += `<div class="card white">${getStringValue(enRow[enRow.length - 1])}
		${getStringSuit(enRow[enRow.length - 1])}</div>`

    if (enRow[enRow.length - 1].suit === 0 || enRow[enRow.length - 1].suit === 1) {
      enRowView.lastChild.style.color = "red"
    }

    if (myRow[myRow.length - 1].val === enRow[enRow.length - 1].val) {
      return
    }

    take = true
    return
  }

  if (take === true && myRow[myRow.length - 1].val > enRow[enRow.length - 1].val) {

    if (myRow[myRow.length - 1].val === 14 && enRow[enRow.length - 1].val === 6) {
      activWin("enemy")
    } else {
      activWin("me")
    }

    document.getElementById("myRow").innerHTML = ""
    document.getElementById("enRow").innerHTML = ""

    take = false

    if (myDeck.length === 0 || enDeck.length === 0) {
      win = true
    }
  }

  if (take === true && myRow[myRow.length - 1].val < enRow[enRow.length - 1].val) {

    if (myRow[myRow.length - 1].val === 6 && enRow[enRow.length - 1].val === 14) {
      activWin("me")
    } else {
      activWin("enemy")
    }

    document.getElementById("myRow").innerHTML = ""
    document.getElementById("enRow").innerHTML = ""

    take = false

    if (myDeck.length === 0 || enDeck.length === 0) {
      win = true
    }
  }
})
