import './assets/css/normalize.css'
import './assets/css/style.css'
import {getWords, subscribeToUpdates} from "./public/firebase.js";
import {simulateMouseClick, setRandomFont, simulateMouseMoveToInitial} from "./fonts.js";
import {setRandomColorPair} from "./colors.js";
const beep = "./assets/beeps.mp3"

/* Setup Audio */
const audio = new Audio("/beeps.mp3");
audio.load();

const wordEl = document.querySelector(".word");
const button = document.querySelector("button")

let allWordsMainList = [];
let wordsRemaining = [];

let isShuffling = false;

// Subscribe to new words from firebase
subscribeToUpdates(whenNewWordSubmitted);

async function whenNewWordSubmitted(word) {
    /* Add the new word to list of all words*/
    allWordsMainList.push(word);

    // Make a copy of all words, and shuffle them, and only use 12 of the words for displaying random words.
    const shuffled = shuffleArray([...allWordsMainList])
    const half = shuffled.splice(0, 12);

    const timeBetweenWords = 180;
    audio.play();
    for (let w of half) {
        await waitForMs(timeBetweenWords);
        setRandomFont();
        wordEl.innerHTML = w.toUpperCase();
    }

    // Then display the submitted word
    wordEl.innerHTML = word.toUpperCase()
    setRandomColorPair();
    audio.pause();
}



async function shuffleWords() {
    // Check if remaining word List is empty, and repopulate if necessary
    if (wordsRemaining.length === 0) {
        wordsRemaining = [...allWordsMainList];
    }

    // Find a random word that will be displayed after the shuffle
    const randomElement = wordsRemaining[Math.floor(Math.random() * wordsRemaining.length)];
    await simulateMouseClick();
    audio.play();
    setRandomColorPair();
    simulateMouseMoveToInitial()

    // Make a copy of all words, shuffle them and use 12 of the words
    const shuffled = shuffleArray([...allWordsMainList, randomElement])
    const half = shuffled.splice(0, 12);

    const timeBetweenWords = 180;

    for (let word of half) {
        await waitForMs(timeBetweenWords);
        setRandomFont();
        wordEl.innerHTML = word.toUpperCase();
    }

    // Then display the new word

    wordEl.innerHTML = randomElement.toUpperCase()
    setRandomColorPair();
    audio.pause()


    // Also, remove the used words so it's not reused.
    const idx = wordsRemaining.indexOf(randomElement);
    wordsRemaining.splice(idx, 1)

    // Check if remaining word List is empty, and repopulate if necessary
    if (wordsRemaining.length === 0) {
        wordsRemaining = [...allWordsMainList];
    }
}

async function setupWordShuffle() {
    allWordsMainList = await getWords();
    wordsRemaining = [...allWordsMainList];

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

setupWordShuffle().then()








