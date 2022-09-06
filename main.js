import './assets/css/normalize.css'
import './assets/css/style.css'
import {getWords} from "./public/firebase.js";
import {simulateMouseClick, setRandomFont, simulateMouseMoveToInitial} from "./fonts.js";
import {setRandomColorPair} from "./colors.js";

const wordEl = document.querySelector(".word");
const button = document.querySelector("button")



/* TEMP WHILE ADJUSTING FONT SIZES*/
/*let tempIdx = 0;
const btn = document.querySelector("#temp")
btn.addEventListener("click", nextFont)

function nextFont() {
    const r = document.querySelector(':root');
    tempIdx++
    if (tempIdx >= fontsArr.length) tempIdx = 0;
    const nextFont = fontsArr[tempIdx];
    console.log("FONT: ", nextFont.font)
    console.log("SIZE: ", nextFont.size)
    r.style.setProperty('--current-font', nextFont.font);
    r.style.setProperty('--font-size', nextFont.size);
    r.style.setProperty('--font-top-adjust', nextFont.top);

}

const btn2 = document.querySelector("#temp2")
btn2.addEventListener("click", prevFont)

function prevFont() {
    const r = document.querySelector(':root');
    tempIdx--
    if (tempIdx < 0) tempIdx = fontsArr.length - 1;
    const prevFont = fontsArr[tempIdx];
    console.log("FONT: ", prevFont.font)
    console.log("SIZE: ", prevFont.size)
    r.style.setProperty('--current-font', prevFont.font);
    r.style.setProperty('--font-size', prevFont.size);
    r.style.setProperty('--font-top-adjust', prevFont.top);

}*/

let wordsImported;
let wordsRemaining;

let isShuffling = false;

async function shuffleWords() {
    // Find a random word that will be displayed after the shuffle
    const randomElement = wordsRemaining[Math.floor(Math.random() * wordsRemaining.length)];
    await simulateMouseClick();
    setRandomColorPair();
    simulateMouseMoveToInitial()

    // Shuffle the array
    const shuffled = shuffleArray([...wordsImported, randomElement])
    const half = shuffled.splice(0, 12);

    const timeBetweenWords = 180;

    for (let word of half) {
        await waitForMs(timeBetweenWords);
        setRandomFont();
        wordEl.innerHTML = word.toUpperCase();
    }

    // Then display the new word
    // Also, remove the used words so it's not reused.
    // When all words have been used, reset so all words are shown again
    wordEl.innerHTML = randomElement.toUpperCase()
    setRandomColorPair();

    if (wordsRemaining.length === 0) {
        wordsRemaining = [...wordsImported];
    }

    const idx = wordsRemaining.indexOf(randomElement);
    wordsRemaining.splice(idx, 1)
}

async function setupWordShuffle() {
    wordsImported = await getWords();
    wordsRemaining = [...wordsImported];

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

function interSectionObserver() {
    let options = {
        root: document.querySelector('.button-container'),
        rootMargin: '0px',
        threshold: 1.0
    }



    let observer = new IntersectionObserver(() => {
        console.log("i was intersected")

    }, options);

    let target = document.querySelector('.cursor');
    observer.observe(target);
}

interSectionObserver()

setupWordShuffle().then()








