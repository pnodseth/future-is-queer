import './style.css'
import words from "./words.json"
import {getWords} from "./public/firebase.js";

const wordEl = document.querySelector(".change-word");
const button = document.querySelector("button")

let allWords = [...words];

let isShuffling = false;

async function shuffleWords() {
    const randomElement = allWords[Math.floor(Math.random() * allWords.length)];

    const shuffled = shuffleArray([...words, randomElement])
    const half = shuffled.splice(0,12);
    for (let word of half) {
        await waitForMs(180);
        wordEl.innerHTML = word;
    }

    // Then display the new word
    // Also, remove the used words so it's not reused.
    // When all words have been used, reset so all words are shown again
    if (allWords.length === 0) {
        allWords = [...words];
    }
    wordEl.innerHTML = randomElement

    const idx = allWords.indexOf(randomElement);
    allWords.splice(idx, 1)
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





