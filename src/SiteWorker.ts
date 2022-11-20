import { IConfig, IPage, IRule, ISelector, IAction } from './Config'
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

    async function proceedRule(rule: IRule): Promise<void> {
        return;
    }
}