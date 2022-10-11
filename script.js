const quotes = [
  "A ship in port is safe, but that is not what ships are built for",
  "The more I study, the more insatiable do I feel my genius for it to be",
  "We have tended to forget that no computer will ever ask a new question",
  "Computing is too important to be left to men",
  "That brain of mine is something more than merely mortal, as time will show",
  "You can be anything you want to be, but you have to work at it",
];

let words = [];
let wordIndex = 0;
let startTime = 0;

const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");

document.getElementById("start").addEventListener("click", () => {
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  words = quote.split(" ");
  wordIndex = 0;

  const spanWords = words.map(function (word) {
    return `<span>${word} </span>`;
  });

  quoteElement.innerHTML = spanWords.join("");
  quoteElement.childNodes[0].className = "highlight";
  messageElement.innerText = "";

  typedValueElement.value = "";
  typedValueElement.focus();
  startTime = new Date().getTime();
});

typedValueElement.addEventListener("input", () => {
  const currentWord = words[wordIndex];
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    const elapsedTime = new Date().getTime() - startTime;
    const message = `CONGRATULATIONS! You finished in ${
      elapsedTime / 1000
    } seconds.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    typedValueElement.value = "";
    wordIndex++;

    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }

    quoteElement.childNodes[wordIndex].className = "highlights";
  } else if (currentWord.startsWith(typedValue)) {
    typedValueElement.className = "";
  } else {
    typedValueElement.className = "error";
  }
});
