const quotes = [
  "Things are only impossible until they are not",
  "It is possible to commit no errors and still lose. That is not a weakness. That is life",
  "There is a way out of every box, a solution to every puzzle; it is just a matter of finding it",
  "Without freedom of choice there is no creativity",
  "Logic is the beginning of wisdom, not the end",
  "Improve a mechanical device and you may double productivity. But improve yourself, you gain a thousandfold",
  "Compassion: that is the one thing no machine ever had. Maybe it is the one thing that keeps us ahead of them",
];

const mainText = document.getElementById("main-text");
const order = document.getElementById("imperative");
const instruct = document.getElementById("instruction");
const gameText = document.getElementById("game-text");
const quote = document.getElementById("quote");
const message = document.getElementById("message");

let wordQueue;
let highlightPosition;
let startTime;

pageLoad();

function pageLoad() {
  document.body.className = "";
  order.textContent =
    "Practice your typing skills with a quote from Star Trek.";

  let btn = document.createElement("button");
  btn.type = "button";
  btn.className = "button";
  btn.textContent = "Start game";
  btn.id = "start";
  mainText.appendChild(btn);

  let rocket = document.createElement("i");
  rocket.className = "rocket";
  rocket.value = "";
  btn.appendChild(rocket);

  let input = document.createElement("input");
  input.type = "text";
  input.value = "";
  input.id = "typed-value";

  let reload = document.createElement("button");
  reload.type = "button";
  reload.className = "button";
  reload.textContent = "Play again?";
  reload.id = "restart";

  btn.addEventListener("click", startGame);

  function reLoad(act) {
    quote.textContent = "";
    message.textContent = "";
    gameText.removeChild(reload);

    document.body.className = "";

    mainText.style.height = "35%";
    instruct.style.visibility = "visible";

    gameText.style.height = "25%";
    gameText.style.justifyContent = "space-between";

    quote.type = "";
    quote.className = "";

    pageLoad();
  }

  function startGame() {
    input.addEventListener("input", checkInput);
    setTimeout(() => {
      console.log("Game started!");

      order.textContent = "Type as fast as you can!";

      const quoteIndex = Math.floor(Math.random() * quotes.length);
      const quoteText = quotes[quoteIndex];

      wordQueue = quoteText.split(" ");
      quote.innerHTML = wordQueue
        .map((word) => `<span>${word}</span>`)
        .join("");

      highlightPosition = 0;
      quote.childNodes[highlightPosition].className = "highlight";

      startTime = new Date().getTime();

      btn.removeChild(rocket);
      mainText.removeChild(btn);
      mainText.style.height = "15%";
      instruct.style.visibility = "hidden";
      gameText.appendChild(input);
    }, 800);
  }

  function checkInput() {
    const currentWord = wordQueue[0]
      .replaceAll(".", "")
      .replaceAll(",", "")
      .replaceAll(";", "")
      .replaceAll(":", "");
    const typedValue = input.value.trim();

    if (currentWord !== typedValue) {
      input.className = currentWord.startsWith(typedValue) ? "" : "error";
      return;
    }

    wordQueue.shift();
    input.value = "";
    quote.childNodes[highlightPosition].className = "";

    if (wordQueue.length === 0) {
      gameOver();
      return;
    }

    highlightPosition++;
    quote.childNodes[highlightPosition].className = "highlight";
  }

  function gameOver() {
    gameText.removeChild(input);

    order.textContent = "";

    const elapsedTime = new Date().getTime() - startTime;

    document.body.className = "winner";

    gameText.style.height = "40%";
    gameText.style.justifyContent = "space-evenly";

    quote.type = "span";
    quote.className = "congrats";
    quote.textContent = `Congratulations!`;

    message.textContent = `You finished in ${elapsedTime / 1000} seconds.`;

    gameText.appendChild(reload);
  }

  reload.addEventListener("click", reLoad);
}
