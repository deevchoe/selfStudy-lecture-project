let resultArea = document.getElementById("result-area");
let warningArea = document.getElementById("warning-area");
let chanceArea = document.getElementById("chance-area");

let userInput = document.getElementById("user-input");
let history = [];

let randomNum = 0;

let chance = 5;

let playButton = document.getElementById("start-button");

// playButton에 이벤트를 더해줘라..
/* addEventListner(이벤트 이름, 이벤트 발생 시 실행 함수)
이벤트 이름 : click 말고도 focus, mouseover 등등 다양한 이벤트가 올 수 있다.
*/
playButton.addEventListener("click", play);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

// 랜덤 번호를 뽑을 함수
function pickRandomNum() {
  // Math.random() : 랜덤한 숫자를 뽑을 수 있게 도와주는 함수. 0 ~ 1 사이의 숫자를 반환하기 때문에 결과가 소수점으로 나옴
  // 이때 1은 포함이 안돼는 1에 가까운 숫자를 반환
  // Math.floor() : 소수점 버림
  randomNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답 : " + randomNum);
}

function play() {
  let userNum = userInput.value;

  if (userNum < 1 || userNum > 100) {
    warningArea.textContent = "1과 100 사이 숫자를 입력해주세요.";
    warningArea.style.color = "red";
    return;
  } else {
    warningArea.style.color = "black";
  }

  if (history.includes(userNum)) {
    warningArea.innerHTML =
      "이미 입력한 숫자입니다. <br>다른 숫자를 입력해주세요.";
    warningArea.style.color = "red";
    return;
  }

  chance--;
  chanceArea.textContent = `남은 기회는 ${chance}번 입니다.`;
  if (randomNum < userNum) {
    resultArea.textContent = "Down!";
  } else if (randomNum > userNum) {
    resultArea.textContent = "Up!";
  } else {
    resultArea.textContent = "Win!";
    warningArea.textContent = "";
    chanceArea.textContent = "";
    playButton.textContent = "Replay";

    playButton.removeEventListener("click", play);
    playButton.addEventListener("click", reset);
    return;
  }
  history.push(userNum);
  // console.log(history);

  if (chance < 1) {
    resultArea.textContent = "Game Over..";
    warningArea.textContent = "";
    chanceArea.textContent = "기회가 모두 소진되었습니다.";
    playButton.textContent = "Replay";
    playButton.removeEventListener("click", play);
    playButton.addEventListener("click", reset);
  }
}

function reset() {
  pickRandomNum();

  // 초기화
  resultArea.textContent = "Up? Down!";
  warningArea.textContent = "1과 100 사이 숫자를 입력해주세요."; // 경고 메시지 초기화
  chanceArea.textContent = `기회는 5번 입니다.`;
  playButton.textContent = "Go!";
  userInput.value = "";
  history = []; // 입력 기록 초기화
  chance = 5; // 기회 초기화

  playButton.removeEventListener("click", reset);
  playButton.addEventListener("click", play);
}

pickRandomNum();
