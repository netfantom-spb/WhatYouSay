import _ from "lodash";



/*
const url = window.location.href;
for (let page of config.pages) {
    if (url.match(<RegExp>page.url)) {
        console.log('URL "%s" matches "%S"', url, page.url);
        if (page.rules.length) {
            Promise.allSettled(
                page.rules.map(rule => runRule(rule))
            )
                .then(() => {
                    console.log('All rules was processed')
                })
        }

        async function runRule(rule: IRule, container: Element | null = null): Promise<any> {
            const selector = rule.$,
                childrenRules = rule.rules,
                action = rule._;

            console.log(rule);
            // find elem        
            let elems;
            {
                // Cheks if ISelector
                if (_.isObject(selector) && (<ISelector>selector).selector) {
                    // Checks all elements
                    if (selector?.type == 'all') {
                        elems = document.querySelectorAll(selector.selector);
                    }
                    // one element
                    else {
                        elems = document.querySelector(selector.selector);
                    }
                }
                // Not ISelector but plain element
                else {
                    elems = document.querySelector(<string>selector);
                }
            }
            console.log(elems);

            // List of elems
            if (_.isArrayLike(elems)) {
                for (let elem of elems) {
                    if (_.isString(action)) {
                        elem.textContent = action;
                    }
                }
            }
            else {
                const elem = elems;
                if (_.isString(action)) {
                    elem.textContent = action;
                }
            }


            //const elem = document.querySelector

            //
            // if(rule._ && rule._.length) {
            //     return runRule()
            // }
        }
    }
    else {
        console.log('URL "%s" DOESN\'T match "%s"', url, page.url);
    }
}

*/
