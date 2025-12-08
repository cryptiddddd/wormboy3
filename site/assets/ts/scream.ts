/*
creates new screams for scream.html, and explodes/destroys them. i made this because it's nice to say things and then make it go away forever.

written in typescript, compiled with tsc.

file written by wormboy!!!
*/

// helper funcs to plug in later

function explodeIt(woe: HTMLElement): void {


    miseryVoid.removeChild(woe);
}


// constants / real variables
const woeInput = document.getElementById("woe-input") as HTMLInputElement;
const woeBtn = document.getElementById("woe-btn") as HTMLButtonElement;

const miseryVoid = document.getElementById("container") as HTMLDivElement;


// connect the woe-input text box to the yell button--autoclick and enabling the button.
woeInput.addEventListener("keyup", event => {
    // autoclick
    if ((event as KeyboardEvent).key === "Enter") {
        woeBtn.click(); 
    
        event.preventDefault();
    } 

    // the button is disabled if there's nothing written.
    woeBtn.disabled = woeInput.value.trim() === "";
});

/**
 * adds input to the container.
 */
(window as any).addScream = function () {
    // protection
    if (woeInput === null || woeInput.value === "") return;

    let newWoe = document.createElement("button");
    newWoe.classList.add("woe");
    let woeText = document.createElement("span");


    // build button
    newWoe.addEventListener("click", () => explodeIt(newWoe));

    // grab user text and reset.
    woeText.innerText = woeInput.value;
    woeInput.value = "";
    
    // build and add
    newWoe.appendChild(woeText);
    miseryVoid.appendChild(newWoe);
};


/**
 * clears all input.
*/
(window as any).clearVoid = function () {
    if (miseryVoid.childElementCount == 0) return;

    miseryVoid.innerHTML = "";
};


/**
 * toggles the aside's visibility.
*/
(window as any).toggleAside = function () {
    // get the aside 
    let asideElem = document.getElementById("privacy-statement");

    // toggle it, babey 
    if (asideElem.style.display === "block") {
        asideElem.style.display = "none";
    } else { // the only other expected possibility is "" [unset] or "none" [set in the previous line.]
        asideElem.style.display = "block";
    }
};
