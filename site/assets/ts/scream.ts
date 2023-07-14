/*
creates new screams for scream.html, and explodes/destroys them. i made this because it's nice to say things and then make it go away forever.

written in typescript, compiled with tsc.

file written by wormboy!!!
*/
let woeInput = document.getElementById("woe-input") as HTMLInputElement;
let woeBtn = document.getElementById("woe-btn") as HTMLButtonElement;

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
(window as any).addScream = function addScream() {
    // protection
    if (woeInput == null || woeInput.value == "") return;

    let newWoe = document.createElement("div");

    // grab user text and reset.
    newWoe.innerText = woeInput.value;
    woeInput.value = "";
    
    // add
    document.getElementById("container").appendChild(newWoe);
};


/**
 * clears all input.
*/
(window as any).clearVoid = function clearVoid() {
    let container = document.getElementById("container");

    if (container.childElementCount == 0) return;

    container.innerHTML = "";
};


/**
 * toggles the aside's visibility.
*/
(window as any).toggleAside = function toggleAside() {
    // get the aside 
    let asideElem = document.getElementById("privacy-statement");

    // toggle it, babey 
    if (asideElem.style.display === "block") {
        asideElem.style.display = "none";
    } else { // the only other expected possibility is "" [unset] or "none" [set in the previous line.]
        asideElem.style.display = "block";
    }
};
