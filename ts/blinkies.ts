/*
populates the blinkie widget with blinkies, for wormboy3 on neocities.

written in typescript, compiled with tsc.

this file written by wormboy.
 */
import { fetchJSON } from "./get_data.js";

interface AssetIndex {
    blinkies: Array<string>,
};


/**
 * expected usage: body onload.
 * this function populates the blinkie-wrapper [nested withiin the blinkie window] with the blinkies.
 */
(window as any).populateBlinkes = function populateBlinkies(): void {
    // get div.blinkie-wrapper element
    let container: HTMLElement = document.getElementById("blinkie-wrapper");

    // create callback
    function blinkieCallback(data: AssetIndex) {
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
    
    // now get that data
    fetchJSON("../assets/index.json", blinkieCallback);
};
