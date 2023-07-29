/**
this file automatically fills in buttons on all my main pages cuz i'm TIRED OF COPYPASTING!!!

originally written in typescript, compiled with tsc.

this code written by WORM BOY!!!!!
 */
import { fetchJSON } from "./get_data.js";

// this interface makes typescript happy.
interface ExpectedContent {
    [index: string]: string[][];
}

/**
 * this function populates a given div with the given images.
 * @param 
 */
function fillButtonDiv(divId: string, imageData: string[][]): void {
    let div = document.getElementById(divId);

    // then do a for loop....
    for (let info of imageData) {
        let newA = document.createElement("a");
        newA.href = info[1];

        let newImg = document.createElement("img");
        newImg.src = info[0].startsWith("http") ? info[0] : `assets/images/buttons/${info[0]}`

        // optional alt text
        if (info.length == 3) newImg.alt = info[2];

        // place everything.
        newA.appendChild(newImg);
        div.appendChild(newA);
    }
}

/**
 * this function is used as a callback for fetchJSON()
 * @param data fetched json data.
 */
function placeButtons(data: ExpectedContent) {
    fillButtonDiv("friend-buttons", data["friendButtons"]);
    fillButtonDiv("other-buttons", data["otherButtons"]);
}

// call the json
fetchJSON("assets/data/images.json", placeButtons);
