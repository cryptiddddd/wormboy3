/*
houses a function that will randomly place every element in a given class.

written in typescript, compiled with tsc.

this file is WROMBOY'S!!!
*/

(window as any).placeRandom = function placeRandom(className: string): void {
    for (let element of document.getElementsByClassName(className)) {
        element.style.left = (Math.random() * 100) % 80 + "%";
        element.style.top = (Math.random() * 100) % 70 + "%";
        // ugh nevermind... LATER!!!!!!
    }
}
