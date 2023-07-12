/*
functions for grabbing json data off the wormboy3 site for the wormboy3 site.

written in typescript, compiled with tsc.

this file written by wormboy.
*/

/**
 * this function grabs a json and then feeds its data into a callback.
 * @param file_name local json to fetch.
 * @param callback a callback to feed the data into.
 */
function fetchJSON(file_name: string, callback: Function): void {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function(): void {
        console.log(`data fetched from ${file_name}!`);
        callback(JSON.parse(this.responseText));
    };

    xmlhttp.open("GET", file_name);
    xmlhttp.send();
}

export {
    fetchJSON
};
