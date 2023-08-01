/*
this file is a modified version of what i wrote for other members of the webring!

initially written in typescript, compiled.

written by.... WORMBOY!
*/

import { fetchJSON } from "./get_data.js";

// interfaces for typescript.
interface MemberData {
    index: number,
    button: string | null,
    moniker: string,
    url: string
}

// memberpackage being the whole package, memberdata being for a single member.
interface MemberPackage {
    member: MemberData,
    next: MemberData,
    previous: MemberData,
    webring: object;
}

// begin config variables.
const WRAPPER_ID = "focbwr";

const AUTOSTYLE = true;
const CSS_DIR = "https://friends-of-cranebot.pages.dev/assets/css/widget.css";
const VERBOSE = false;

// end config variables.

var widgetWrapper = document.getElementById(WRAPPER_ID);

/**
 * builds and places the webring's widget on the page.
 * @param memberPackage complete set of expected member data.
 */
function createWidget(memberPackage: MemberPackage): void {
    widgetWrapper.innerHTML = `<div id="focbwr-inner">
    <p>friends of cranebot!</p>
    <div>
        <a href="${memberPackage.previous.url}">\u27F5 prev</a>
        <a href="https://friends-of-cranebot.pages.dev/api/random/">random</a>
        <a href="${memberPackage.next.url}">next \u27F6</a>
    </div>
</div>`

    if (AUTOSTYLE) {
        let link = document.createElement("link");
        link.rel= "stylesheet";
        link.href = CSS_DIR;

        document.head.appendChild(link);
    }
}

function onFetch(jsonResponse: {status: number, message: string, data: MemberPackage}): void {
    if (jsonResponse.status == 200) return createWidget(jsonResponse.data);

    // otherwise...
    console.error(`${jsonResponse.status} ${jsonResponse.message}`);
};

fetchJSON("https://friends-of-cranebot.pages.dev/api/members/wormboy", onFetch);
