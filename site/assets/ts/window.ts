/*
a function to create a window thingy, cuz i may use that for multiple scripts and i don't wanna rewrite it. also shortcut.

written in typescript, compiled in tsc.

this file written by WORMBOY!!!!
*/

/**
 * creates one of those little window thingies, complete with draggability.
 * to add content: append children to the last element child.
 * @param headerText window title text
 * @param cls a list of css classes to add. optional.
 * @returns a window wrapper structure.
 */
function makeWinElement(headerText: string, cls?: string[]): HTMLElement {
    // create wrapper.
    let wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    if (cls.length > 0) {
        for (let className of cls) {
            wrapper.classList.add(className);
        }
    }
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

export { makeWinElement };
