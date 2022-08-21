const fontsArr = ["Aveneur", "Baunk", "BROKAT_BY_BOAFFF", "Chemre", "FT88-Italic", "Greca", "KOUVA GLORIN", "Ladi-Weak", "Personify", "Pilowlava-Regular", "Tumb-Regular", "Zighead"]
const r = document.querySelector(':root');

export function setRandomFont() {
    const randomElement = fontsArr[Math.floor(Math.random() * fontsArr.length)];

    r.style.setProperty('--current-font', randomElement);
}