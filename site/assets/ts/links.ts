/*
this file populates my /links page, using the data from links.json

originally written in typescript, compiled with le npx tsc.

this code written by womrboy!!!
*/

import { fetchJSON } from "./get_data.js";


// single link data
interface Bookmark {
    comment: string;
    text: string;
    url: string;
    trueURL?: string;
}

interface BookmarkCategory {
    title: string;
    hashID: string;
    items: Bookmark[];
}


/**
 * creates the html for a single bookmark.
 * @param data data for a single "bookmark"
 * @returns detail/summary html element structure
 */
function buildSingleBookmark(data: Bookmark): HTMLElement {
    // create all elements.
    let detail = document.createElement("details");
    let summary = document.createElement("summary");

    let textDiv = document.createElement("div");
    let linkDiv = document.createElement("div");

    let linkAnchor = document.createElement("a");

    let comment = document.createElement("p");

    // start at the lowest level and fill in all data.
    linkAnchor.href = data.trueURL ? data.trueURL : data.url;
    linkAnchor.innerText = data.url;
    
    comment.innerHTML = data.comment;

    textDiv.innerText = data.text;
    linkDiv.appendChild(linkAnchor);

    // assemble
    summary.appendChild(textDiv);
    summary.appendChild(linkDiv);

    detail.appendChild(summary);
    detail.appendChild(comment);

    detail.classList.add("link-line");

    return detail; // all done :D!
}


/**
 * creates the html for an entire bookmark category.
 * @param data data for a single bookmark category.
 * @returns section html element
 */
function buildBookmarkCategory(data: BookmarkCategory): HTMLElement {
    // create elements
    let section = document.createElement("section");

    let titleWrapper = document.createElement("div");
    let title = document.createElement("div");

    title.innerText = data.title;

    titleWrapper.appendChild(title);
    titleWrapper.classList.add("bookmark-category");

    section.appendChild(titleWrapper);
    section.id = data.hashID;
    
    // build all items
    for (let item of data.items) {
        section.appendChild(buildSingleBookmark(item));
    }

    return section;
}


/**
 * builds the link to pop on the table of contents.
 * @param data data for a bookmark category.
 * @returns link for the data to place on the page.
 */
function buildCategoryLink(data: BookmarkCategory): HTMLElement {
    let link = document.createElement("a");

    link.href = `#${data.hashID}`;
    link.innerText = data.title;
    
    return link;
}

/**
 * populates the page will all the bookmark links.
 * @param data json data received from links.json
 */
function buildTable(data: BookmarkCategory[]): void {
    let directory = document.getElementById("toc");
    let table = document.getElementById("link-table");

    for (let item of data) {
        table.appendChild(buildBookmarkCategory(item));
        directory.appendChild(buildCategoryLink(item));
    }
}


// fetch and send callback
fetchJSON("assets/data/links.json", buildTable);
