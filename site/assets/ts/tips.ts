/**
code to load and format tips.json to fill out tips.html!

written in typescript, compiled with tsc.

this file written by... WORMBOY!!!!
*/
import { fetchJSON, fetchTXT, recentEntry } from "./get_data.js";
import { getQueries, isEmpty, QueryDict } from "./parse_query.js";


// define data structures. article data is the smallest structure...
interface ArticleData {
    category: string,
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
        timestamp.appendChild(document.createElement("br"));
        
        let span = document.createElement("span");
        span.classList.add("whisper");
        span.innerText = `last edited ${data.dateModified}`;

        timestamp.appendChild(span);
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
    title.id = "read-more";
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

function loadCategory(category: CategoryData): void {
    let title = document.createElement("h1");
    title.classList.add("centered");
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
function makeNav(data: TipsDoc): void {
    let nav = document.getElementById("tips-nav");
    
    let categories = Object.keys(data);

    // populate!
    for (let cat of categories) {
        let link = document.createElement("a");
        link.href = `?c=${cat}`;
        link.innerText = cat;
        link.classList.add("nav-category");

        let listItem = document.createElement("li");
        listItem.appendChild(link);

        // populate links to all individual articles.
        let submenu = document.createElement("ul");
        for (let art of data[cat].index) {
            let sublink = document.createElement("a");
            sublink.href = `?c=${cat}&a=${art.id}`;
            sublink.innerText = art.title;

            let sublistItem = document.createElement("li");
            sublistItem.appendChild(sublink);

            submenu.appendChild(sublistItem);
        }

        if (data[cat].index.length > 0) listItem.appendChild(submenu);

        nav.appendChild(listItem);
    }
}

/**
 * populates the breadcrumbs with query data. called post-validation.
 * @param queries user's queries, validated.
 */
function fillBreadcrumbs(queries: QueryDict) {
    let bread = document.getElementById("breadcrumbs");

    let categoryLink = document.createElement("a");
    categoryLink.href = `/tips.html?c=${queries.c}`;
    categoryLink.innerText = queries.c;

    bread.appendChild(categoryLink);

    bread.innerHTML += "/";

    if ("a" in queries) {
        let articleLink = document.createElement("span");
        articleLink.innerText = queries.a;
        bread.appendChild(articleLink);
    }
}


/**
 * reveals the default page when no query is given.
 */
function showDefault(data: TipsDoc): void {
    makeNav(data);

    let entries: ArticleData[] = [];

    for (let category in data) {
        entries = entries.concat(data[category].index);
    }

    let mostRecent = recentEntry((entries as unknown as Record<string, string>[])) as ArticleData; // funny workaround but alright.
    
    // show + create page.
    let tipsDiv = document.getElementById("tips-default");
    
    let ad = document.createElement("p");
    ad.classList.add("centered");

    let splash = document.createElement("span");
    splash.classList.add("new");
    splash.innerText = "newest tip:"

    let link = document.createElement("a");
    link.href = `?c=${mostRecent.category}&a=${mostRecent.id}`;
    link.innerText = mostRecent.title;

    ad.appendChild(splash); 
    ad.innerHTML += " ";
    ad.appendChild(link);
    tipsDiv.appendChild(ad);

    tipsDiv.style.display = "block";
}


/**
 * called at the end of the script to get tips.html set up!
 * @param rawData raw json collected from xhttp request.
 */
function setup(rawData: TipsDoc): void {
    //  get all categories.
    let categories = Object.keys(rawData);
    
    // parse queries.
    var query = getQueries();
    
    // exit... unless.. what does the default page look like again? probably just toggle a display thingy.
    if (isEmpty(query)) {
        // page setup.
        showDefault(rawData);
        return;
    }

    // validate... if invalid, it just ignores it for now.
    let hasCategory = "c" in query && categories.includes(query.c);
    let hasArticle = hasCategory && "a" in query && Number(query.a) < rawData[query.c].index.length;
    
    // fill breadcrumbs in!
    fillBreadcrumbs(query);
    
    // call the appropriate function!!! 
    if (hasArticle && hasCategory) {
        loadArticle(rawData[query.c].index[rawData[query.c].index.length - 1 - Number(query.a)]);
    } else if (hasCategory) {
        loadCategory(rawData[query.c]);
    } else {
        tipsError();
    }
}


// RUN!
fetchJSON("assets/data/tips.json", setup);
