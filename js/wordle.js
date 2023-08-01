const answer = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "Game is over";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:30vh; left:35vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    attempts += 1;
    index = 0;
    if (attempts === 6) return gameover();
  };

  const handleEnterKey = () => {
    let correctAnswer = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const letter = block.innerText;
      const keyBoard = document.querySelector(
        `.key-block[data-key='${letter}']`
      );
      const answerLetter = answer[i];
      if (letter === answerLetter) {
        correctAnswer += 1;
        block.style.background = "#6aaa64";
        keyBoard.style.background = "#6aaa64";
      } else if (answer.includes(letter)) {
        block.style.background = "#c9b458";
        keyBoard.style.background = "#c9b458";
      } else {
        block.style.background = "#787c7e";
        keyBoard.style.background = "#787c7e";
      }

      block.style.color = "white";
    }

    if (correctAnswer === 5) gameover();
    nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
      preBlock.style.border = "1px solid rgba(0,0,0,0.1)";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;

    if (event.keyCode === 8) handleBackspace();
    else if (index === 5) {
      if (event.keyCode === 13) handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.style.fontWeight = 700;
      thisBlock.style.fontSize = "40px";
      thisBlock.innerText = key;
      thisBlock.style.border = "1px solid lightgray";
      // 혹은 index += 1, index = index + 1, index++
      index += 1;
    }
  };
  const startTimer = () => {
    const start_time = new Date();

    function cal_time() {
      const now_time = new Date();
      const duration = new Date(now_time - start_time);
      const minute = duration.getMinutes().toString().padStart(2, "0");
      const second = duration.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector(".board-time");
      timeDiv.innerText = `${minute}:${second}`;
    }

    timer = setInterval(cal_time, 1000);
  };

  const detectAlphabet = () => {
    for (j = 0; j <= 25; j++) {
      const alphabets = [
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M",
      ];
      const keyBlock = document.querySelector(
        `.key-block[data-key='${alphabets[j]}']`
      );

      const handleClick = () => {
        if (index === 5) return;
        const thisBlock = document.querySelector(
          `.board-block[data-index='${attempts}${index}']`
        );
        thisBlock.innerText = keyBlock.innerText;
        thisBlock.style.fontWeight = 700;
        thisBlock.style.fontSize = "40px";
        thisBlock.style.border = "1px solid lightgray";
        index += 1;
      };
      keyBlock.addEventListener("click", handleClick);
    }
  };

  const enterClick = document.querySelector(
    `.key-block__enter[data-key='ENTER']`
  );

  enterClick.addEventListener("click", handleEnterKey);

  const delClick = document.querySelector(`.key-block__del[data-key='del']`);
  delClick.addEventListener("click", handleBackspace);
  detectAlphabet();
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

// 로직을 구현하는  함수 호출
appStart();

// 키보드에도 동일하게 표시 완료
// 키보드 클릭으로 입력 완료
// 애니메이션 효과 모르겠음
