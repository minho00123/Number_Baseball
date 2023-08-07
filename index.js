// Grab elements
const gameStartBtn = document.querySelector(".game-start-btn");
const howToPlayIcon = document.querySelector(".how-to-play-btn");
const gameWrapper = document.querySelector(".game-wrapper");
const resultContainer = document.querySelector(".result-container");
const strikeCircles = document.querySelector(".strike-board").children;
const ballCircles = document.querySelector(".ball-board").children;
const outCircles = document.querySelector(".out-board").children;
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

gameStartBtn.addEventListener("click", function () {
  gameStartBtn.classList.add("hide");
  gameWrapper.classList.remove("hide");
  howToPlayIcon.removeAttribute("hidden");
  makeRandomNumber();
});

// Get User's input numbers
let userNum = [];

function isNumber(key, keyCode) {
  if (keyCode == 32) {
    return false;
  } else if (Number.isInteger(Number(key))) {
    return true;
  } else if (keyCode === " ") {
    return false;
  } else if (keyCode >= 48 && keyCode <= 57) {
    return false;
  } else if (keyCode >= 65 && keyCode <= 90) {
    return false;
  } else if (keyCode >= 186 && keyCode <= 192) {
    return false;
  } else if (keyCode >= 219 && keyCode <= 222) {
    return false;
  }
}

for (let i = 0; i < 3; i++) {
  inputs[i].addEventListener("keydown", function (e) {
    let key = e.key;
    const checkIsNumber = isNumber(key, e.keyCode);
    if (checkIsNumber) {
      userNum.push(Number(key));
      if (userNum.length > i + 1) {
        userNum.pop();
      }
      if (!isSame(Number(key), userNum)) {
        alert("The same number is found. Please write again!");
        userNum.pop();
      }
    } else if (checkIsNumber === false) {
      alert("Please write a number!");
    }
  });
}

// Check the strikes, balls, and outs
let strikeIdx = [];
let gameCnt = 0;

inputNum3.addEventListener("keydown", function (e) {
  if (e.keyCode === 13 && userNum.length === 3) {
    let i = 0;
    let j = 0;
    while (i < 3) {
      if (userNum[i] === answer[j] && i === j) {
        strikeCircles[i].style.backgroundColor = "#F2BB13";
        strikeIdx.push(i);
        inputs[i].setAttribute("disabled", "");
        i++;
        j = 0;
      } else if (userNum[i] === answer[j]) {
        ballCircles[i].style.backgroundColor = "#A7D9B3";
        inputs[i].value = "";
        i++;
        j = 0;
      } else {
        j++;
      }

      if (j === 2) {
        outCircles[i].style.backgroundColor = "#BF0404";
        inputs[i].value = "";
        i++;
        j = 0;
      }
    }
  }
  gameCnt++;
});

// while (gameCnt != 10) {}
