export interface IConfig {
    pages: IPage[]
}

export interface IPage {
    url?: RegExp,
    rules: IRule[]
}

export interface IRule {
    $: string | ISelector,
    _: string | IAction,
    rules?: IRule[],
    wait?: boolean |
    {
        timeout: number,
        retry: number
    }
}

export interface ISelector {
    selector: string,
    type?: 'one' | 'all'
}

export interface IAction {
    type: 'innerText' | 'value',
    text: string |
    [
        {
            lang: string,
            value: TLang
        }
    ]
}

type TLang = 'en' | 'hr'; 