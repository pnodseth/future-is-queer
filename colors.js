const colorPairs = [
    {
        name: "base",
        txt: "#FFF",
        bg: "#000"
    },
    {
        name: "orange-pink",
        txt: "#F9C6E7",
        bg: "#FA5F00"
    },
    {
        name: "lightpink-orange",
        txt: "#FA5F00",
        bg: "#F9C6E7"
    },
    {
        name: "darkgreen-lightgreen",
        txt: "#E0E0E0",
        bg: "#06922D"
    },
    {
        name: "lightgreen-darkgreen",
        txt: "#06922D",
        bg: "#E0E0E0"
    },
    {
        name: "darkred-lightpink",
        txt: "#F9C6E7",
        bg: "#F93334"
    },
    {
        name: "lightpink-darkred",
        txt: "#F93334",
        bg: "#F9C6E7"
    },

]
export let currentPair = colorPairs.find(e => e.name === "base");
const r = document.querySelector(':root');

export function setRandomColorPair() {
    const filtered = colorPairs.filter(e => e.name !== currentPair.name)
    currentPair =  filtered[Math.floor(Math.random() * filtered.length)];

    console.log(currentPair)
    r.style.setProperty('--background', currentPair.bg);
    r.style.setProperty('--txt-color', currentPair.txt);

}

