console.log('💈 Content script loaded for', chrome.runtime.getManifest().name);
async function init() {
	/**
	 * All pages
	 */
	// Translate top menu
	waitForContainer('ul.inner_menu.iconMenu')
		.then(container => {
			updateInnerText(
				[
					'#header_talk_dropdown > button',
					'#myUser1StAccess',
					'ul.inner_menu.iconMenu > li:nth-child(2) > a',
				],
				['Связаться', 'Доступность', 'Филиалы'],
				container,
			);
			container
				.querySelector('#header_talk_dropdown > button')
				.setAttribute('style', 'font-size: 16px!important');
		})
		.catch(error => {
			console.error(error);
		});

	// Translate "Contac us" submenu
	waitForContainer('.contactUsContainer')
		.then(container => {
			updateInnerText(
				[
					'ul li:nth-child(1) > a div.relatedLinkPic',
					'ul li:nth-child(3) > a div.relatedLinkPic',
					'ul li:nth-child(4) > a div.relatedLinkPic',
					'ul li:nth-child(6) > a div.relatedLinkPic',
					'.ContactLinksTitle',
				],
				[
					'Переписка с банкиром',
					'Звонок из приложения',
					'Обратный звонок',
					'Записаться на прием',
					'Связаться',
				],
				container,
			);
		})
		.catch(error => {
			console.error(error);
		});

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
}

/**
 * Update the inner text for given selectors in given container
 * @param {Array<string>} selectors
 * @param {Array<string>} titles
 * @param {Element} container
 */
function updateInnerText(selectors, titles, container = undefined) {
	for (const [index, selector] of selectors.entries()) {
		const element = (container ?? document).querySelector(selector);
		if (element) {
			element.textContent = titles[index];
		} else {
			console.warn(`Update text error: container '${selector}' not found`);
		}
	}
}

/**
 * Wait for element on the page
 * @param {string} selector
 * @param {integer} delay
 * @param {integer} retryCount
 * @returns
 */
async function waitForContainer(selector, delay = 1000, retryCount = 3) {
	let counter = 0;
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			if (++counter >= retryCount) {
				clearInterval(interval);
				reject(
					new Error(
						`Container '${selector}' not found after ${counter} retries`,
					),
				);
			}

			const container = document.querySelector(selector);
			if (container) {
				clearInterval(interval);
				resolve(container);
			}
		}, delay);
	});
}

init();
