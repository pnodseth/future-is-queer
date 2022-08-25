export const fontsArr = [{font: "Aveneur", size: "120px", top: "0px"}, {font: "Baunk", size: "120px", top: "16px"}, {font: "BROKAT_BY_BOAFFF", size: "220px", top: "-90px"}, {font: "Chemre", size: "120px", top: 0}, {font: "FT88-Italic", size: "120px", top: 0}, {font: "Greca", size: "120px", top: "16px"}, {font: "KOUVA GLORIN", size: "120px", top: "20px"}, {font: "Ladi-Weak", size: "120px",top: "20px"}, {font: "Personify", size: "120px", top: "12px"}, {font: "Pilowlava-Regular", size: "120px", top: 0}, {font: "Tumb-Regular", size: "120px", top: "12px"}, {font: "Zighead", size: "120px", top: "20px"}]
// size basefont: Aveneur

const r = document.querySelector(':root');
const cursor = document.querySelector(".cursor");
const button = document.querySelector("button");

const buttonPos = button.getBoundingClientRect();
const buttonCenterX = buttonPos.x + buttonPos.width / 2;
const buttonCenterY = buttonPos.y + buttonPos.height / 2;


export function setRandomFont() {
        const randomElement = fontsArr[Math.floor(Math.random() * fontsArr.length)];

    r.style.setProperty('--current-font', randomElement.font);
    r.style.setProperty('--font-size', randomElement.size);
    r.style.setProperty('--font-top-adjust', randomElement.top);
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