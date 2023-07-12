/*
functions for grabbing json data off the wormboy3 site for the wormboy3 site.

written in typescript, compiled with tsc.

this file written by wormboy.
*/
function fetchJSON(file_name: string, callback: Function): void {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function(): void {
        callback(JSON.parse(this.responseText));
    };

    xmlhttp.open("GET", file_name);
    xmlhttp.send();
}

export {
    fetchJSON
};
