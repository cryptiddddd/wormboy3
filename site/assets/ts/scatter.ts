/**
when linked in html, this file will automatically scatter any element with the class "randomPos". and by scatter, i mean set its top and right properties to a random percentage, within a safe range.

written in typescript, compiled with tsc.

this file written by WORMY BOY!!!
*/
/**
 * for use with oen dimension at a time.
 * @param parent the width OR height of the parent element.
 * @param child the width OR height of the child element.
 * @return returns a random position 
 */
function randomPos(parent: number, child: number): number {
    let limit = parent - child;

    return Math.random() * limit;
}


let elements = document.getElementsByClassName("randomPos");

for (let elem of elements) {
    let leftVal = randomPos(document.body.offsetWidth, (elem as HTMLElement).offsetWidth);
    let topVal = randomPos(document.body.offsetHeight, (elem as HTMLElement).offsetHeight);

    (elem as HTMLElement).style.left = leftVal + "px";
    (elem as HTMLElement).style.top = topVal + "px";
}