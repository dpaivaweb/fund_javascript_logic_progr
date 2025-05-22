const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");//
const hintText = document.querySelector(".hint-text b");

/*let currentWord;
let correctLetters = [];
let wrongGuessCount;
const maxGuesses = 6;*/

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "./assets/image/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(letter => {
        if (letter === " ") {
            return `<li class="letter space"> </li>`;
        } else {
            return `<li class="letter"></li>`;
        }
    }).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word.toUpperCase();
    hintText.innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    const modalText = isVictory ? `Você encontrou a palavra:` : 'A palavra correta era:';
    // 
    gameModal.querySelector("img").src = `./assets/image/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Parabéns!' : 'Fim de Jogo!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

const initGame = (button, clickedLetter) => {
    const upperClickedLetter = clickedLetter.toUpperCase();
    button.disabled = true;

    /**/
    if (currentWord.includes(upperClickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === upperClickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        // 
        hangmanImage.src = `./assets/image/hangman-${wrongGuessCount}.svg`;
    }
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false); // Se atingiu o máximo de erros, chama gameOver com false (derrota).
    const totalLetters = [...currentWord].filter(l => l !== " ").length;
    if (wordDisplay.querySelectorAll(".guessed").length === totalLetters) return gameOver(true);
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    const letter = String.fromCharCode(i).toUpperCase();
    button.innerText = letter;
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, letter));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);