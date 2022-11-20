import {IConfig} from '../../Config'

export const config: IConfig = {
    pages: [
        {
            url: /https:\/\/mac\.maccabi4u\.co\.il/,
            rules: [
                {
                    $: '.login .boxShadow > h2',
                    _: 'Тест'
                },
            ],
        },
    ]
}