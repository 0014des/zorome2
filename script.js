let autoRolling = false;
let history = [];
const sound = document.getElementById("success-sound");

const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("go-home").addEventListener("click", () => {
  alert("ホーム画面なんれあるわけないだろｗ");
});

function rollOnce() {
  if (autoRolling) return;
  const result = rollDice();
  const isZoro = isZorome(result);
  updateResultMessage(result, isZoro);
}

function startAutoRoll() {
  if (autoRolling) return;
  autoRolling = true;
  setResult("ゾロ目が出るまで振り続けています...", "black");

  const interval = setInterval(() => {
    const result = rollDice();
    if (isZorome(result)) {
      clearInterval(interval);
      autoRolling = false;
      updateResultMessage(result, true);
    }
  }, 200);
}

function rollDice() {
  const container = document.getElementById("dice-container");
  const count = parseInt(document.getElementById("dice-count").value);
  const result = [];
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const value = Math.floor(Math.random() * 6) + 1;
    result.push(value);

    const dice = document.createElement("div");
    dice.className = "dice";
    dice.textContent = diceFaces[value - 1]; // Unicode 絵柄
    container.appendChild(dice);
  }

  addToHistory(result);
  return result;
}

function isZorome(arr) {
  return arr.every(val => val === arr[0]);
}

function updateResultMessage(result, isZoro) {
  if (isZoro) {
    setResult(`🎉 ゾロ目成功！出目は ${diceFaces[result[0] - 1]}！`, "green");
    sound.currentTime = 0;
    sound.play();
  } else {
    const readable = result.map(v => diceFaces[v - 1]).join(", ");
    setResult(`出目: ${readable}（ゾロ目ではありません）`, "black");
  }
}

function setResult(text, color) {
  const msg = document.getElementById("result-message");
  msg.textContent = text;
  msg.style.color = color;
}

function addToHistory(result) {
  const historyList = document.getElementById("history-list");
  const readable = result.map(v => diceFaces[v - 1]).join(", ");
  history.unshift(readable);
  if (history.length > 100) history.pop();

  historyList.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}
