/*
functionality for draggable "windows" on wormboy3 neocities.

written in typescript, compiled with tsc.

this file written by wormboy. 
 */
var cursorX: number; var cursorY: number; var highestZ: number = 1;
var xOffset: number; var yOffset: number;

var currentWrapper: HTMLElement = null;

// disables element dragging.
(window as any).closeDrag = function closeDrag(handle: HTMLElement): void {
    handle.setAttribute("onmouseup", "");

    xOffset = yOffset = null;
    currentWrapper = null;
};


// main attraction.
(window as any).makeDraggable = function makeDraggable(handle: HTMLElement): void {
    // the direct parent of the handling div should Always be the wrapper div.
    currentWrapper = handle.parentElement;

    // set its z-index to the top, if needed.
    if (currentWrapper.style.zIndex == "" || highestZ - 1 != Number(currentWrapper.style.zIndex)) {
        currentWrapper.style.zIndex = "" + highestZ;
        highestZ ++;
    }
    // if the current highest is only one higher than the wrapper's z, no need for adjustment

    // set global vars -- get difference between position and cursor.
    xOffset = currentWrapper.offsetLeft - cursorX;
    yOffset = currentWrapper.offsetTop - cursorY;

    // set onmouseup event [release].
    handle.setAttribute("onmouseup", "closeDrag(this);");
};


// track mouse position.
document.onmousemove = function(event) {
    cursorX = event.pageX;
    cursorY = event.pageY;

    if (currentWrapper === null) { return; }
    
    // if there is a current moving element: move it.
    let leftVal = event.pageX + xOffset;
    let topVal = event.pageY + yOffset;

    // correction -- top and left limits.
    if (leftVal < 0) leftVal = 0;
    if (topVal < 0) topVal = 0;

    // set positions.
    currentWrapper.style.left = leftVal + "px";
    currentWrapper.style.top = topVal + "px";  
};

// set up
let draggables = document.getElementsByClassName("title");

for (let e of draggables) {
    e.setAttribute("onmousedown", "makeDraggable(this);");
}
