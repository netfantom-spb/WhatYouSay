import {IConfig} from '../../Config'

export const config: IConfig = {
    pages: [
        {
            url: /https:\/\/mac\.maccabi4u\.co\.il/,
            rules: [
                {
                    $: '#enter_your_account > div.includeLink > a',
                    _: 'Войти'
                },
                {
                    $: '#enter_create_account > div.includeLink > a',
                    _: 'Откыть счет'
                },
            ],
        },
    ]
}