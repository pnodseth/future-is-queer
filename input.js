import './assets/css/normalize.css'
import './assets/css/input.css'


let word = "";
const wordEl = document.querySelector("#word");
const buttons = document.querySelectorAll("button")


buttons.forEach(btn => {
    btn.addEventListener("click", e => {
        console.log(e.target.id)
        // console.log(e.target.innerHTML)
        if (e.target.id === "button-del" && word.length === 0) {
            return;
        }
        else if (e.target.id === "button-del" && word.length > 0) {
            word = word.slice(0, word.length - 1)
            wordEl.innerHTML = word + "<span id='point'>.</span>";
            return;
        }
        else if (word.length >= 20) {
            return;
        } else {
            const letter = e.target.innerHTML
            word = word + letter;

            wordEl.innerHTML = word + "<span id='point'>.</span>";
        }
    })
})

