import './assets/css/normalize.css'
import './assets/css/input.css'
import {submitWord} from "./public/firebase.js";
import {fontsArr} from "./fonts.js";

const r = document.querySelector(':root');

let word = "";
const wordEl = document.querySelector("#word");
const buttons = document.querySelectorAll("button")


const showSplashScreen = (word) => {
    const inputScreenEl = document.querySelector(".input-screen")
    const messageEl = document.querySelector("#thank-you-message")

    messageEl.innerHTML = word
    inputScreenEl.style.display = "none";
    messageEl.style.display = "flex";

    setTimeout(() => {
        inputScreenEl.style.display = "block";
        messageEl.style.display = "none";
    }, 8000)

    // set a new input font
    const randomElement = fontsArr[Math.floor(Math.random() * fontsArr.length)];
    r.style.setProperty('--current-font', randomElement.font);



}


buttons.forEach(btn => {
    btn.addEventListener("click", async (e) => {
        if (btn?.id === "submit" && word.length > 0) {
            showSplashScreen(word)
            await submitWord(word)
            word = "";
            wordEl.innerHTML = word
            return
        }
        if (e.target.classList.contains("button-del") && word.length === 0) {

        } else if (e.target.classList.contains("button-del") && word.length > 0) {
            word = word.slice(0, word.length - 1)
            wordEl.innerHTML = word + "<span id='point'>.</span>";

        } else if (word.length >= 20) {

        } else {
            const letter = e.target.innerHTML
            word = word + letter;

            wordEl.innerHTML = word + "<span id='point'>.</span>";
        }
    })
})



