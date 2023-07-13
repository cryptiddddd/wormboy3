/*
a function to create a window thingy, cuz i may use that for multiple scripts and i don't wanna rewrite it. also shortcut.

written in typescript, compiled in tsc.

this file written by WORMBOY!!!!
*/

/**
 * checks if a window exists and brings it to front if it does.
 * technically could be used for plenty of other elements atm... but the intended use it with a window thingy.
 * @param winID id of the desired window
 * @returns true if the window exists, false otherwise.
 */
function getExistingWin(winID: string): boolean {
    let wrapper = document.getElementById(winID);
    
    // imaginary click.
    if (wrapper) {
        wrapper.onmousedown(null);
    }

    return wrapper != null;
}

/**
 * creates one of those little window thingies, complete with draggability.
 * to add content: append children to the last element child.
 * @param headerText window title text
 * @returns a window wrapper structure.
 */
function makeWinElement(headerText: string): HTMLElement {
    // create wrapper.
    let wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    wrapper.setAttribute("onmousedown", "bringToFront(this);");

    // create title
    let title = document.createElement("div");
    title.classList.add("title");
    title.setAttribute("onmousedown", "makeDraggable(this);")

    let titleSpan = document.createElement("span");
    titleSpan.innerText = headerText;

    // create content.
    let content = document.createElement("div");
    content.classList.add("content");
    content.scrollTop = 0;

    // put them together
    title.appendChild(titleSpan);
    wrapper.appendChild(title);
    wrapper.appendChild(content);

    return wrapper;
}

export { 
    getExistingWin,
    makeWinElement
 };
