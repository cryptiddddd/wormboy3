/**
code to load and format tips.json to fill out tips.html!

written in typescript, compiled with tsc.

this file written by... WORMBOY!!!!
*/
import { fetchJSON, fetchTXT } from "./get_data.js";
import { getQueries, isEmpty } from "./parse_query.js";


// define data structures. article data is the smallest structure...
interface ArticleData {
    id: number,
    dateCreated: string,
    dateModified: string,
    title: string,
    contentPath: string,
    readMore: Array<Array<string>> 
}

// which makes up a categorydata structure...
interface CategoryData {
    name: string,
    description: string,
    index: ArticleData[]
}

// which make up the tipsdoc structure.
interface TipsDoc {
    [index: string]: CategoryData
}

// invisible div waiting for an article, if applicable.
let articleDiv = document.getElementById("article");


// trying to run hljs
function callHLJS(): void {
    let callScript: HTMLScriptElement = document.createElement("script");
    callScript.innerText = "hljs.highlightAll();";

    document.head.appendChild(callScript);
}


/* FOR AN ERROR */
function tipsError(): void {
    let message = document.createElement("p");
    message.classList.add("error");
    message.innerText = "uh oh... issuy";

    articleDiv.appendChild(message);
}

/* FOR LOADING AN ARTICLE*/

/**
 * creates the article heading.
 * @param data article data
 * @return no return, just edits the document.
 */
function fillArticleHeader(data: ArticleData): void {
    // create time notes
    let timestamp = document.createElement("p");
    timestamp.classList.add("timestamp");

    timestamp.innerText = `posted on ${data.dateCreated}`;

    if (data.dateModified) {
        timestamp.innerText += `, last edited ${data.dateModified}`;
    }


    // create title
    let title = document.createElement("h1");
    title.innerText = data.title;

    articleDiv.appendChild(timestamp);
    articleDiv.appendChild(title);

}

/**
 * creates the article's read more section.
 * @param data article data.
 * @return no return, just edits the document.
 */
function fillArticleReadmore(data: ArticleData): void {
    // create title
    let title = document.createElement("h2");
    title.innerText = "read more:";

    let readList = document.createElement("ul");
    // create links
    for (let pair of data.readMore) {
        let item = document.createElement("li");
        let link = document.createElement("a");
        link.href = pair[1];
        link.innerText = pair[0];
        link.target = "_blank";

        item.appendChild(link);
        readList.appendChild(item);
    }

    articleDiv.appendChild(title);
    articleDiv.appendChild(readList);
}


/**
 * called if an article is queried to build the given article.
 * @param article article data.
 * @return no return, just edits the document.
 */
function loadArticle(article: ArticleData): void {    
    // fill out header
    fillArticleHeader(article);
    
    // fill out article body
    function buildArticle(data: string): void {
        // fill data.
        articleDiv.innerHTML += data;

        // then create readmore section.
        fillArticleReadmore(article);

        // then attempt to run the hljs command
        callHLJS();
    }

    // fetch txt [html] for article building..
    fetchTXT(article.contentPath, buildArticle);
}

/* FOR LOADING A CATEGORY */

// todo: a function that fills out the category index.
function loadCategory(category: CategoryData): void {
    let title = document.createElement("h1");
    title.innerText = `${category.name} advice`;

    let description = document.createElement("p");
    description.innerText = category.description;

    let index = document.createElement("ul");

    for (let article of category.index) {
        let item = document.createElement("li");
        let link = document.createElement("a");
        link.href = `?c=${category.name}&a=${article.id}`;
        link.innerText = article.title;

        // add
        item.appendChild(link);
        index.appendChild(item);
    }
    // add!
    articleDiv.appendChild(title);
    articleDiv.appendChild(description);
    articleDiv.appendChild(index);
}

/**
 * populates the existing nav element
 * @param categories an array of names of categories.
 */
function makeNav(categories: string[]) {
    let nav = document.getElementById("tips-nav");
    
    if (categories.length == 0) {
        // figure out how to raise the error and exit code.
        return;
    }

    // populate!
    for (let cat of categories) {
        let elem = document.createElement("a");
        elem.href = `?c=${cat}`;
        elem.innerText = cat;

        nav.appendChild(elem);
    }
}


/**
 * reveals the default page when no query is given.
 */
function showDefault() {
    document.getElementById("tips-default").style.display = "block";
}


/**
 * called at the end of the script to get tips.html set up!
 * @param rawData raw json collected from xhttp request.
 */
function setup(rawData: TipsDoc): void {
    //  get all categories.
    let categories = Object.keys(rawData);
    
    // page setup.
    makeNav(categories);

    // parse queries.
    var query = getQueries();
    
    // exit... unless.. what does the default page look like again? probably just toggle a display thingy.
    if (isEmpty(query)) {
        showDefault();
        return;
    }

    // validate... if invalid, it just ignores it for now.
    let hasCategory = "c" in query && categories.includes(query.c);
    let hasArticle = "a" in query && Number(query.a) < rawData[query.c].index.length;
    
    // call the appropriate function!!! 
    if (hasArticle && hasCategory) {
        loadArticle(rawData[query.c].index[Number(query.a)]);
    } else if (hasCategory) {
        loadCategory(rawData[query.c]);
    } else {
        tipsError();
    }
}


// RUN!
fetchJSON("assets/data/tips.json", setup);
