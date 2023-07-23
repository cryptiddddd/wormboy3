/**
written to handle url query parsing for wormboy3. in any other case, i'd do this serverside, but alas! written for import.

written in typscript, compiled with tsc.

this file written by wormboy!!!
*/

// NOTE: ...... I REALIZED THERE'S A BUILT IN WAY TO DO THIS. OOPS. WILL FIX.

// query inspired by python dicts, as i need to access them by string.
interface QueryDict {
    [index: string]: string;
}

/**
 * checks if an object is empty. can be used for other things, but i'm throwing it here for now.
 * @param test the object to test
 * @return true if the object has no properties. false otherwise.
 */
function isEmpty(test: Object): boolean {
    for (let i in test) {
        if (i !== "") return false;
    }
    return true;
}

/**
 * translates the ?x=y&a=b query into an object.
 */
function getQueries(): QueryDict {
    let vars = {} as QueryDict;
    
    // get the query--cut off the leading '?'
    let query = window.location.search.substring(1);

    let pairs = query.split("&");

    for (let pair of pairs) {
        let sep = pair.split("=");
        vars[sep[0]] = sep[1];    
    }
    
    return vars;
}

export {
    getQueries,
    isEmpty,
    QueryDict
};
