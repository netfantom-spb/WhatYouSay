import { IConfig } from '../../Config'

export const config: IConfig = {
    pages: [
        {
            url: /https:\/\/www.leumi.co.il/,
            rules: [
                {
                    $: '#enter_your_account > div.includeLink > a',
                    _: 'Войти'
                },
                {
                    $: '#enter_create_account > div.includeLink > a',
                    _: 'Откыть счет'
                },
                {
                    $: 'ul.inner_menu.iconMenu',
                    rules: [
                        {
                            $: '#header_talk_dropdown > button',
                            _: 'Связаться'
                        }
                    ],
                    wait: true
                }
            ],
        },
    ]
}