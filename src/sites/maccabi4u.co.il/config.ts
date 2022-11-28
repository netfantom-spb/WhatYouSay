import {IConfig} from '../../Config'

export const config: IConfig = {
    pages: [
        {
            url: /https:\/\/leumi\.co\.il/,
            rules: [
                {
                    $: '.login .boxShadow > h2',
                    _: 'Тест'
                },
            ],
        },
    ]
}