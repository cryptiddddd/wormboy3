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

/**
 * finds the most recent entry in an array of objects.
 * @param index the array of objects. default is "dateCreated" cuz that's my own standard.
 * @param dateProperty the name of the date property
 */
function recentEntry(index: Record<string, string>[], dateProperty: string = "dateCreated"): Object {
    let recent: Object;
    let minDiff = Infinity; // the smallest difference between today's date and any record. 

    let today = new Date();
    
    let difference, current; // loop vars
    for (let obj of index) {
        current = new Date(obj[dateProperty]);
        console.log(current);
        difference = today.getTime() - current.getTime();

        if (difference < minDiff) {
            minDiff = difference;
            recent = obj;
        }
        console.log(minDiff);
    }
    // theoretically, by the end, we should have the most recent.
    return recent;
}


export {
    fetchJSON,
    fetchTXT,
    recentEntry
};
