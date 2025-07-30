// ChatGPT Conversation Links:
// 1.https://chatgpt.com/share/67a6ce08-561c-8004-87bf-3a8d17e6db29
// 2.https://chatgpt.com/share/67b0c949-fd00-8004-ac04-20d3ba4f88d5
// 3.https://chatgpt.com/share/67b17d17-f864-8004-9f83-98f1b1c908b2
// Add as many links as needed

let words = ["PIZZA", "UNICORN", "ROBOT", "BANANA", "SPACESHIP", "NINJA"];

let currentWord = "";
let guessedLetters = [];
let lives = 6;

let gameContent = document.getElementById("game-content");
let classicModeBtn = document.getElementById("classic-mode");
let timeModeBtn = document.getElementById("time-mode");
let wordContainer = document.getElementById("word-container");
let livesDisplay = document.getElementById("lives-count");
let messageDisplay = document.getElementById("message");
let keys = document.querySelectorAll(".key");

let timeleft = 30
let timer
let timeModeOn = false //use to turn on the timer interval.
let timercounter = 0 // ensure the timer interval only turn on once.

function startGame() {
  keyenable()
  clearTimer()
  let randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  guessedLetters = [];
  lives = 6;

  gameContent.style.display = "block";
  livesDisplay.textContent = lives;
  messageDisplay.textContent = "";
  updateWordDisplay();
}

function updateWordDisplay() {
  wordContainer.innerHTML = "";

  for (let i = 0; i < currentWord.length; i++) {
    let span = document.createElement("span");
    span.textContent = "_";
    span.className = "word-underscore";
    wordContainer.appendChild(span);
  }
}

classicModeBtn.addEventListener("click", () => {
  startGame();
  document.getElementById("timer").style.display = "none";
});

keys.forEach(key => {
  key.addEventListener("click", function () {
    if(timeModeOn & timercounter == 0){
      startTimer()
      timercounter = 1
    }
    if(lives > 0 ){
    let guessedLetter = this.dataset.key.toUpperCase();
    // console.log(guessedLetter)
    // console.log(key)
    if (!guessedLetters.includes(guessedLetter)) {
      guessedLetters.push(guessedLetter);
      key.disabled = true
      let found = false;
      for (let i = 0; i < currentWord.length; i++) {
        // console.log(`Comparing ${currentWord[i]} with ${guessedLetter}`);
        if (currentWord[i] === guessedLetter) {
          revealLetter(i, guessedLetter);
          found = true;
        }
      }
      if (!found) {
        // console.log(`Letter ${guessedLetter} not found in word`);
        lives -= 1;
        livesDisplay.textContent = lives;
        checkcondition()
      }
      }
    }
  });
});

//active when time mode button was clicked
timeModeBtn.onclick = function(){
  document.getElementById("timer").style.display = "block";
  startGame();
  timeleft = 30
  timeModeOn = true
  document.getElementById("time-left").innerHTML = timeleft
  timercounter = 0 
}

//enter with keyboard
  document.addEventListener("keydown",function(event){
    if(/^[a-zA-Z]$/.test(event.key)){
      if(timeModeOn && timercounter == 0){
        startTimer()
        timercounter = 1
      }
    if(lives > 0 ){
      let guessedLetter = event.key.toUpperCase();
      if (!guessedLetters.includes(guessedLetter)) {
        guessedLetters.push(guessedLetter);
        document.querySelector(`[data-key="${guessedLetter.toLowerCase()}"]`).disabled = true
        let found = false;
        for (let i = 0; i < currentWord.length; i++) {
          // console.log(`Comparing ${currentWord[i]} with ${guessedLetter}`);
          if (currentWord[i] === guessedLetter) {
            revealLetter(i, guessedLetter);
            found = true;
          }
        }
        if (!found) {
          // console.log(`Letter ${guessedLetter} not found in word`);
          lives -= 1;
          livesDisplay.textContent = lives;
          checkcondition()
        }
        }
      }}
  });

  //put correct letter into the field
function revealLetter(index, letter) {
  let spans = document.querySelectorAll("#word-container span");
  if (spans[index]) {
    spans[index].textContent = letter;
    spans[index].classList.replace("word-underscore", "word-letter");
    checkcondition()
  }
}

// check win lose condition
function checkcondition (){
let spannumber = document.querySelectorAll(".word-underscore").length
  if (spannumber == 0 & lives > 0 & timeleft != 0 ){
        let message = document.getElementById("message")
      message.textContent = `🎉 You Win!`
      lives = 0
      clearTimer()
      console.log("I am sure you can't get it again")
  }
if(spannumber != 0){
  if ( lives == 0 | timeleft == 0){
    let message = document.getElementById("message")
    message.textContent = `💀Game over! The correct word is: ${currentWord}`
    clearTimer()
    console.log("HAHA!You lost!")
  }
}
}

//Enable the key
function keyenable(){
  let key = document.querySelectorAll(".key");
  for (i=0;i<key.length;i++){
    key[i].disabled = false
  }
}

// Start 30s timer
function startTimer(){
    timer = setInterval(() => {
      if (timeleft > 0 ){
    document.getElementById("time-left").innerHTML = timeleft -= 1
      }
      else if (timeleft == 0){
        checkcondition()
      }
  }, 1000);
}

//stop timer
function clearTimer(){
  clearInterval(timer)
}