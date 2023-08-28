/**
this file uses MY OWN API!!!!!! to load my top 5 most recent favorite artists, and displays them on a page.

originally written in typescript, compiled npx tsc

this file written........ by worm. perhaps copypasted from my own freebies.
 */

import { fetchJSON } from "./get_data.js";

// api response 
interface WormResponse {
    status: number;
    message: string;
    data?: any;
}

// data models.
interface ImageData {
    height: number;
    url: string;
    width: number;
}

interface ArtistData {
    genres: string[]; // list of all their listed genres.
    image: ImageData; // url to their cover image, the largest one. oops!
    name: string;
    spotifyURL: string; // url to the artist's spotify page.
}

interface AlbumData {
    artwork: ImageData; // url to 640px album art
    name: string;
    releaseDate: string; // album's release date
    trackCount: number; // how many tracks total
}

interface TrackData {
    album: AlbumData; // data on the album
    artists: string[]; // list of names of artists
    name: string; // name of the song
    spotifyURL: string; // url to the song
    trackNumber: number; // # on the album 
}


/**
 * this function quickly validates a response, and prints an error messge if invalid
 * @param response json response from http request.
 */
function validate(response: WormResponse): boolean {
    let isValid = response.status == 200;
    if (!isValid) {
        console.error(`${response.status}! ${response.message}`);
    }

    return isValid;
}


/**
 * this function places my top 5 recent fav artists on a page in a nice lil list.
 * @param elementID the element to place the list into
 * @param type defaults to artists, alternate valid value is "tracks"
 */
function favArtists(elementID: string, type: string = "artists"): void {
    // get element
    var element = document.getElementById(elementID);

    // function that displays received items.
    function displayItems(response: WormResponse,): void {
        if (!validate(response)) { return; }

        let list = document.createElement("ol");
        list.classList.add("music-list");
        
        // note: this could, in reality, also be receiving artist data. but i only use values that i know both have :]
        for (let item of (response.data.items as TrackData[])) {
            let newElem = document.createElement("li");
            
            let link = document.createElement("a");
            link.href = item.spotifyURL;
            link.innerText = item.name;
    
            newElem.appendChild(link);
            list.appendChild(newElem);
        }
    
        element?.replaceChildren(list);
    }
    
    fetchJSON(`http://music.wormboy-api.workers.dev/api/64e7bee69d1f7c28529187ea/top/${type}?limit=5&time_range=short_term`, displayItems);
}


/**
 * this function creates a collage of my most recently played tracks.
 * @param elementID the id to place all the images in.
 */
function recentlyPlayedCollage(elementID: string, limit: number): void {
    var element = document.getElementById(elementID);

    function createImages(response: WormResponse): void {
        if (!validate(response)) { return; }

        for (let item of (response.data.items as TrackData[])) {
            let newElem = document.createElement("img");

            newElem.src = item.album.artwork.url;
            newElem.alt = `${item.artists[0]} - ${item.album.name}`;

            element.appendChild(newElem);
        }
    }
    
    fetchJSON(`http://music.wormboy-api.workers.dev/api/64e7bee69d1f7c28529187ea/recently_played?limit=${limit}`, createImages);
}

(window as any).favArtists = favArtists;
(window as any).recentlyPlayedCollage = recentlyPlayedCollage;
