import './assets/css/normalize.css'
import './assets/css/style.css'
import originalWordArray from "./words.json"
import {getWords} from "./public/firebase.js";
import {simulateMouseClick, setRandomFont, simulateMouseMoveToInitial} from "./fonts.js";

const wordEl = document.querySelector(".change-word");
const button = document.querySelector("button")

let wordsRemaining = [...originalWordArray];

let isShuffling = false;

async function shuffleWords() {
    // Find a random word that will be displayed after the shuffle
    const randomElement = wordsRemaining[Math.floor(Math.random() * wordsRemaining.length)];
    await simulateMouseClick();
    simulateMouseMoveToInitial()

    // Shuffle the array
    const shuffled = shuffleArray([...originalWordArray, randomElement])
    const half = shuffled.splice(0,12);

    const timeBetweenWords = 180;

    for (let word of half) {
        await waitForMs(timeBetweenWords);
        setRandomFont();
        wordEl.innerHTML = word;
    }

    // Then display the new word
    // Also, remove the used words so it's not reused.
    // When all words have been used, reset so all words are shown again
    wordEl.innerHTML = randomElement

    if (wordsRemaining.length === 0) {
        wordsRemaining = [...originalWordArray];
    }

    const idx = wordsRemaining.indexOf(randomElement);
    wordsRemaining.splice(idx, 1)
}

async function setupWordShuffle() {

    button.addEventListener("click", async () => {
        // shuffle the array of all words, that should be tweened before end word is displayed
        if (!isShuffling) {
            isShuffling = true;
            await shuffleWords();
            isShuffling = false;
        }

    })

    document.addEventListener("keypress", async (e) => {
        if (e.key === "Enter") {
            if (!isShuffling) {
                isShuffling = true;
                await shuffleWords();
                isShuffling = false;
            }
        }
    })
}

async function waitForMs(delayMs) {
    return new Promise(res => {
        setTimeout(() => {
            res()
        }, delayMs)
    })
}

setupWordShuffle()

function shuffleArray(array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
        // Pick a remaining element
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}


/*const words2 = await getWords();
console.log("words: ", words2)*/





