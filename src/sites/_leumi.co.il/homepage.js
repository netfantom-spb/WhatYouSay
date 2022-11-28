import {updateInnerText} from '../../common.js';

const homepage = {
	async init() {
		/**
		 * Home poge
		 */
		updateInnerText(
			[
				'#enter_your_account > div.includeLink > a',
				'#enter_create_account > div.includeLink > a',
			],
			['Войти', 'Открыть счет'],
		);
	},
};

export default homepage;
