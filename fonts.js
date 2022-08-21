const fontsArr = ["Aveneur", "Baunk", "BROKAT_BY_BOAFFF", "Chemre", "FT88-Italic", "Greca", "KOUVA GLORIN", "Ladi-Weak", "Personify", "Pilowlava-Regular", "Tumb-Regular", "Zighead"]
const r = document.querySelector(':root');
const cursor = document.querySelector(".cursor");
const button = document.querySelector("button");

const buttonPos = button.getBoundingClientRect();
const buttonCenterX = buttonPos.x + buttonPos.width / 2;
const buttonCenterY = buttonPos.y + buttonPos.height / 2;


export function setRandomFont() {
    const randomElement = fontsArr[Math.floor(Math.random() * fontsArr.length)];

    r.style.setProperty('--current-font', randomElement);
}


export function simulateMouseClick() {
    return new Promise(res => {
        const transitionTime = 1000;

        cursor.style.left = buttonCenterX + "px";
        cursor.style.top = buttonCenterY - 20 + "px";
        setTimeout(() => {
            res()
        }, transitionTime)

    })
}

export function simulateMouseMoveToInitial() {
    const initialXArr = ["40vw", "50vw", "43vw", "45vw", "10vw", "55vw", "30vw", "32vw", "34vw"]
    const initialPosY = "80vh"
    const waitBeforeMoveMs = 1000;

    setTimeout(() => {
        cursor.style.left = initialXArr[Math.floor(Math.random() * initialXArr.length)];
        cursor.style.top = initialPosY;

    }, waitBeforeMoveMs)

}