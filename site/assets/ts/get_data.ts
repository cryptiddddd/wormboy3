/*
functions for grabbing json data off the wormboy3 site for the wormboy3 site. made to import.

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

/**
 * this function grabs a txt and gives its data to a callback. [or, it grabs a file and returns its raw contents.]
 * @param file_name name of the txt file to fetch.
 * @param callback callback to feed the txt contents into.
 */
function fetchTXT(file_name: string, callback: Function): void {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function(): void {
      callback(xmlhttp.responseText);
    }

    xmlhttp.open('GET', file_name);
    xmlhttp.send();
}

export {
    fetchJSON,
    fetchTXT
};
