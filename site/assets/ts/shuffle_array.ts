/**
this file shuffles an array

yaya yayayayyaa

written by worm boy
*/

// for now, nabbed from https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
function shuffle(list: Array<any>): void {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = list[i];
        list[i] = list[j];
        list[j] = temp;
      }
}

export { shuffle };
