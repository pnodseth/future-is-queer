import './assets/css/normalize.css'
import './assets/css/input.css'
import {submitWord} from "./public/firebase.js";


let word = "";
const wordEl = document.querySelector("#word");
const buttons = document.querySelectorAll("button")


buttons.forEach(btn => {
    btn.addEventListener("click", async (e) => {
        if (btn?.id === "submit" && word.length > 0) {
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



