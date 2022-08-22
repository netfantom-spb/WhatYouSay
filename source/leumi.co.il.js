console.log('💈 Content script loaded for', chrome.runtime.getManifest().name);
async function init() {
	try {
		updateInnerText([
			'#enter_your_account > div.includeLink > a',
			'#enter_create_account > div.includeLink > a',
		], [
			'Войти',
			'Открыть счет',
		]);

		{
			const int = setInterval(() => {
				const menu = document.querySelector('ul.inner_menu.iconMenu');
				if (menu) {
					clearInterval(int);
					menu.querySelector('#header_talk_dropdown > button').textContent = 'Связаться';
					menu.querySelector('#header_talk_dropdown > button').setAttribute('style', 'font-size: 16px!important');
					menu.querySelector('#myUser1StAccess').textContent = 'Доступность';
					menu.querySelector('ul.inner_menu.iconMenu > li:nth-child(2) > a').textContent = 'Филиалы';
				}
			}, 1000);
		}

		{
			const int = setInterval(
				() => {
					const container = document.querySelector('.contactUsContainer ');
					if (container) {
						clearInterval(int);
						const menu = container.querySelector('.contactUsContainer ul');
						const labels = ['Переписка с банкиром', 'Звонок из приложения', 'Обратный звонок', null, 'Записаться на прием'];
						const menuItems = menu.querySelectorAll('li > a div.relatedLinkPic');

						for (const [index, item] of menuItems.entries()) {
							if (labels[index]) {
								item.textContent = labels[index];
							}
						}

						container.querySelector('.ContactLinksTitle').textContent = 'Связаться';
					}
				},
				1000,
			);
		}
	} catch (error) {
		console.error(error);
	}
}

function updateInnerText(selectors, titles) {
	console.log(selectors);
	for (const [index, selector] of selectors.entries()) {
		const element = document.querySelector(selector);
		if (element) {
			element.textContent = titles[index];
		}
	}
}

init();
