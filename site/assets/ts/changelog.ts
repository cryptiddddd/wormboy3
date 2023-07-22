/*
formats data from ../data/changelog.json to html in order to create an active changelog on the wormboy3 neocities.

written in typescript, compiled with tsc.

this file written by wormboy. 
*/
import { fetchJSON } from "./get_data.js";
import { getExistingWin, makeWinElement } from "./window.js";

// interface for each item of changelog.json.
interface UpdateLog {
    date: string,
    title: string,
    body: string,
    gitCommit: string, // this would be a url to the full update code notes.
    id: number, // what # update is this, the higher number the newer.
    isMajor: boolean // not in use yet, but will be.
};


/**
 * if hashed, an update page will automatically open.
 */
function autoOpen(): void {
    // get changelog div and count elements.
    let changelog = document.getElementById("changelog-wrapper");
    let logCount = changelog.childElementCount;

    let query = document.location.hash.substring(1);

    // no worries, nothing to do. if there is no query or the query is not a number, or out of range.
    if (query === "" || isNaN(Number(query)) || Number(query) >= logCount) return; 

    // otherwise, calculate index.
    let idx = logCount - Number(query) - 1; // calculate index, keeping in mind they are listed in reverse order.

    // click it
    let anchor = changelog.children[idx].lastElementChild as HTMLAnchorElement;
    anchor.click();
}

(window as any).autoOpen = autoOpen;


/**
 * populates the changelog. 
 * @param maxEntries maximum # of entries to add to the log. if -1, no limit. otherwise, a limit will not raise error if there are not enough entries.
 */
(window as any).populateChangelog = function (maxEntries: number, viewDetails: boolean = false): void {
    // first get the changelog window content field
    let container: HTMLElement = document.getElementById("changelog-wrapper");
    
    // define what we are going to do when we get the data.
    function changelogCallback(log: UpdateLog[]): void {
        // limit the number of entries, unless told otherwise.
        if (maxEntries != -1) {
            log.splice(maxEntries);
        }
        
        // build the entry things....
        for (let entry of log) {
            // this sequence creates a div>span.whisper + some text
            let div = document.createElement("div");
            
            let dateSpan = document.createElement("span");
            dateSpan.classList.add(entry.isMajor? "major-update" : "whisper");
            
            dateSpan.innerHTML = entry.date + ":";

            div.appendChild(dateSpan);
            div.innerHTML += ` ${entry.title} `;

            // if enabled, add the detail link. 
            // expectation: only set to true for the changelog page -- on any other page, the window will link to the changelog page.
            if (viewDetails) {
                let testLink = document.createElement("a");
                testLink.setAttribute("onclick", `createEntryWin(${JSON.stringify(entry)});`);
                testLink.innerText = "view";
    
                div.appendChild(testLink);
            }
            
            container.appendChild(div);
        }
        
        // after everything.. check if any update is hashed.
        autoOpen();
    }

    // get the data.
    fetchJSON("assets/data/changelog.json", changelogCallback); // woof, learned something: relative to the html page...
};


/**
 * creates a whole new window for the specific entry.
 * @param entry updatelog entry data for this specific window.
 */
(window as any).createEntryWin = function (entry: UpdateLog): void {
    // first check if it exists, and exit early if it does.
    let winID = `update-${entry.id}`;
    if (getExistingWin(winID)) return;

    // shortcut to make the wrapper.
    let wrapper = makeWinElement(winID);
    wrapper.id = winID;
    wrapper.classList.add("update-win");

    // create content
    let updateTitleP = document.createElement("h1");
    updateTitleP.innerText = entry.title;

    let updateBodyP = document.createElement("p");
    updateBodyP.innerHTML = entry.body;

    let updateLink = document.createElement("a");
    updateLink.href = entry.gitCommit;
    updateLink.target = "_blank";
    updateLink.innerText = "view code notes on github";

    // put it all together
    wrapper.lastElementChild.appendChild(updateTitleP);
    wrapper.lastElementChild.appendChild(updateBodyP);
    wrapper.lastElementChild.appendChild(updateLink);

    // and toss it somewhere random on the page!
    wrapper.style.left = (Math.random() * 100) % 80 + "%";
    wrapper.style.top = (Math.random() * 100) % 70 + "%";

    // insert before footer, for mobile viewer convenience.
    let footer = document.getElementById("footer-win");
    document.body.lastElementChild.insertBefore(wrapper, footer);
};
