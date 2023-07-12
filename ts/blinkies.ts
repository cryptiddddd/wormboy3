/*
populates the blinkie widget with blinkies, for wormboy3 on neocities.

written in typescript, compiled with tsc.

this file written by wormboy.
 */
import { fetchJSON } from "./get_data.js";

interface AssetIndex {
    blinkies: Array<string>,
};

function blinkieCallback(data: AssetIndex) {
    // div.content element
    let container: Element = document.getElementById("blinkie-wrapper");
    
    // todo: shuffle the array

    // for each blinkie, add an img.
    data.blinkies.forEach(fileName => {
        let newImg = document.createElement("img");
        newImg.src = `assets/blinkies/${fileName}`
        newImg.classList.add("blinkie");

        // add to container.
        container.appendChild(newImg);
    });
}


// usage: body onload
(window as any).populateBlinkes = function populateBlinkies(): void {
    fetchJSON("../assets/index.json", blinkieCallback);
};
