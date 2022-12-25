import { IConfig, IPage, IRule, ISelector, IWait, IAction } from './Config'
import _ from "lodash";

export default function SitesWorker(url: string, config: IConfig) {
    for (let page of config.pages) {
        if (url.match(<RegExp>page.url)) {
            console.log('URL "%s" matches "%S"', url, page.url);
            proceedPage(page)
                .then(() => {
                    console.log('Finished with page "%s"', url);
                })
        }
    }

    async function proceedPage(page: IPage): Promise<any> {
        const rules = page.rules;
        if (_.isArray(rules) &&
            (rules.length > 0)) {
            return proceedRules(rules)
        }

    }

    async function proceedRules(rules: IRule[]): Promise<any> {
        if (_.isArray(rules) &&
            (rules.length > 0))
            return Promise.allSettled(
                rules.map(rule => proceedRule(rule))
            )

    }

    async function proceedRule(rule: IRule, container?: Element): Promise<any> {
        console.debug('Proceed rule', rule);
        return waitFor(rule.$, rule?.wait || false)
            .then(element => {
                if (element) {
                    console.log('Found element');
                    if (rule._) {
                        applyAction(element, rule._);
                    }
                    else if (rule.rules) {
                        return Promise.allSettled(
                            rule.rules.map(rule => proceedRule(rule))
                        )

                    }
                }
                else {
                    console.warn('Didn\'t find an element', rule.$);
                }
            })
    }

    async function waitFor(selector: string | ISelector, wait: boolean | IWait): Promise<NodeListOf<Element> | Element | null> {
        let [timeout, retry]: [number, number] = [0, 1],
            element: NodeListOf<Element> | Element | null = null;

        console.debug('waitFor function');
        if (wait) {
            // Default wait for 1s and retry 3 times
            [timeout, retry] = [1000, 3];
            // ...or get it from config
            if (_.isObject(wait)) {
                ({ timeout, retry } = wait);
            }
        }

        console.log(`Waiting for element for ${timeout / 1000} seconds and retry ${retry} times`);
        for (let i = 0; i < retry; i++) {
            console.debug(`${i + 1} of ${retry}`);
            element = await (
                new Promise(resolve => {
                    setTimeout(() => {
                        const element = findElement(selector);
                        console.log(element);
                        if (element) {
                            console.debug('Have found an element!')
                            resolve(element);
                        }
                        else {
                            console.debug('Element was not found.');
                            resolve(null);
                        }
                    }, timeout);
                })
            );
            if (element)
                break;
        }
        return element;
    }

    function findElement(selector: string | ISelector): NodeListOf<Element> | Element | null {
        if (_.isString(selector)) {
            return document.querySelector(selector);
        }
        else if (_.isObject(selector)) {
            if (selector?.type == 'all') {
                return document.querySelectorAll(selector.selector);
            }
            else {
                return document.querySelector(selector.selector);
            }
        }
        return null;
    }

    function applyAction(element: any, action: string | IAction) {
        console.log('applyAction');
        if (_.isString(action)) {
            if (_.isArrayLikeObject(element)) {
                //fo
                console.log('Apply action from array like object');
            }
            else {
                console.log('Apply action for single element');
                element.textContent = action;
            }
        }
    }

}