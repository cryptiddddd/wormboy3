/**
code for wormboyIII's art gallery!!!

written in typescript, compiled with tsc.

this file written by WORMBOY!@!!!!!!h!K1l1
*/

import { fetchJSON } from "./get_data.js";

interface GalleryItem {
    altText: string,
    date: string,
    filePath: string,
    id: number,
    title: string,
    modelCredit: string | null
};

const GALLERY_PATH = "assets/images/gallery/";

const gallery = document.getElementById("gallery");
const galleryDisplay = document.getElementById("image-display");

// display elements.
const displayTitle = document.getElementById("highlight-title");
const displayImg = (document.getElementById("highlight-img") as HTMLImageElement);
const displayCaption = document.getElementById("highlight-caption");

const zoomOverlay = document.getElementById("zoom-overlay");

var galleryData: GalleryItem[];
var currentID: number;


/**
 * sets the gallery display to a given image.
 * @param artID id of the art piece ot highlight.
 */
function setHighlight(artID: number) {
    let piece = galleryData[artID];
    
    displayImg.src = `${GALLERY_PATH}${piece.filePath}`;
    displayImg.alt = piece.altText;
    
    // note: later, convert the date to local.
    displayTitle.innerText = piece.title;
    
    let date = new Date(piece.date);
    displayCaption.innerText = ``;

    currentID = artID; // remember it
};

(window as any).setHighlight = setHighlight; // gotta be accessible.

/**
 * rotates the highlight by the given count.
 * @i the number 
 */
(window as any).rotateHighlight = function (i: number): void {
    let nextID = currentID + i;

    // correct to the functional range
    if (nextID == galleryData.length) nextID = 0;
    else if (nextID <= 0) nextID = galleryData.length - 1;

    setHighlight(nextID);
};

// zooming function
(window as any).zoomIn = function (element: HTMLImageElement) {
    (zoomOverlay.firstElementChild as HTMLImageElement).src = element.src;
    zoomOverlay.style.display = "flex";

    document.body.style.overflow = "hidden";
};


/**
 * 
 * @param data json data returned from fetchJSON.
 */
function loadGallery(data: any): void {
    galleryData = (data.gallery as GalleryItem[]);

    for (let piece of galleryData) {
        let image = document.createElement("img");

        // element setup.
        image.alt = piece.altText;
        image.src = `${GALLERY_PATH}${piece.filePath}`;
        image.title = piece.title;

        // event setup.
        image.setAttribute("onmouseover", `setHighlight(${piece.id});`)
        image.setAttribute("onclick", "zoomIn(this);");

        // add to document.
        gallery.appendChild(image);
    }

    let randomDefault = Math.floor(Math.random() * galleryData.length);
    setHighlight(randomDefault); // set default
}

fetchJSON("assets/data/images.json", loadGallery);
