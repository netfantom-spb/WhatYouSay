export interface IConfig {
    pages: IPage[]
}

export interface IPage {
    url?: RegExp,
    rules: IRule[]
}

export interface IRule {
    $: string | ISelector,
    _?: string | IAction,
    rules?: IRule[],
    wait?: boolean | IWait
}

export interface ISelector {
    selector: string,
    type?: 'one' | 'all'
}

export interface IAction {
    type: 'textContent' | 'value',
    text: string |
    {
        en?: string,
        ru?: string
    }
}

export interface IWait {
    timeout: number,
    retry: number
} 
