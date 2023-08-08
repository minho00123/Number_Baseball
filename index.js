// Grab elements
const gameStartBtn = document.querySelector(".game-start-btn");
const howToPlayIcon = document.querySelector(".how-to-play-btn");
const tutorialPage = document.querySelector(".tutorial-wrapper");
const tutorialBtn = document.querySelector(".tutorial-btn");
const gameWrapper = document.querySelector(".game-wrapper");
const resultContainer = document.querySelector(".result-container");
const strikeCircles = document.querySelector(".strike-numbers").children;
const ballCircles = document.querySelector(".ball-numbers").children;
const outCircles = document.querySelector(".out-numbers").children;

const inputs = document.querySelector(".number-input-container").children;

// Change the Screen when the game starts + make answer
let answer = [];

function isSame(n, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (n === arr[i]) {
      return true;
    }
  }
  return false;
}

function makeRandomNumber() {
  let i = 0;
  while (i < 3) {
    let n = Math.floor(Math.random() * 10);
    if (!isSame(n, answer)) {
      answer.push(n);
      i++;
    }
  }
}

// Change to the game mode when click the start button
gameStartBtn.addEventListener("click", function () {
  gameStartBtn.classList.add("hide");
  gameWrapper.classList.remove("hide");
  howToPlayIcon.removeAttribute("hidden");
  makeRandomNumber();
  playGame();
  inputs[0].focus();
});

// Go to tutorial page when the user clicks 'How to Play' button
howToPlayIcon.addEventListener("click", function () {
  gameWrapper.classList.add("hide");
  tutorialPage.classList.remove("hide");
  howToPlayIcon.setAttribute("hidden", "");
  tutorialBtn.removeAttribute("hidden", "");
  inputs[0].focus();
});

// Go to tutorial page when the user clicks 'Go back' button
tutorialBtn.addEventListener("click", function () {
  tutorialPage.classList.add("hide");
  gameWrapper.classList.remove("hide");
  tutorialBtn.setAttribute("hidden", "");
  howToPlayIcon.removeAttribute("hidden", "");
  inputs[0].focus();
});

// Get User's input numbers

function playGame(cntStrikes, cntBalls, cntOuts) {
  let userNumbers = [];

  for (let i = 0; i < 3; i++) {
    inputs[i].addEventListener("keyup", function (e) {
      if (this.value.length === this.maxLength) {
        userNumbers.push(Number(this.value));
        if (i !== 2) {
          inputs[i + 1].focus();
        }
      } else {
        alert("Write only one number");
        this.value = "";
      }
    });
  }

  // Count the strikes, balls, and outs
  document.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (i === j && userNumbers[i] === answer[j]) {
            cntStrikes++;
          } else if (userNumbers[i] === answer[j]) {
            cntBalls++;
          }
        }
      }

      cntOuts = 3 - cntStrikes - cntBalls;

      for (let i = 1; i < cntStrikes + 1; i++) {
        strikeCircles[i].style.backgroundColor = "#f2b705";
      }
      for (let i = 1; i < cntBalls + 1; i++) {
        ballCircles[i].style.backgroundColor = "#147346";
      }
      for (let i = 1; i < cntOuts + 1; i++) {
        outCircles[i].style.backgroundColor = "#f20505";
      }
    }
  });

  userNumbers = [];
  inputs[0].focus();
}

let gameCnt = 1;

while (gameCnt < 11) {
  let cntStrikes = 0;
  let cntBalls = 0;
  let cntOuts = 0;
  playGame(cntStrikes, cntBalls, cntOuts);
  console.log(cntStrikes, cntBalls, cntOuts);

  gameCnt++;
}
