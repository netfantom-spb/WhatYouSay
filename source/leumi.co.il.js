import optionsStorage from './options-storage.js';

console.log('💈 Content script loaded for', chrome.runtime.getManifest().name);
async function init() {
	// const options = await optionsStorage.getAll();
	// const color = 'rgb(' + options.colorRed + ', ' + options.colorGreen + ',' + options.colorBlue + ')';
	// const text = options.text;
	// const notice = document.createElement('div');
	// notice.innerHTML = text;
	// document.body.prepend(notice);
	// notice.id = 'text-notice';
	// notice.style.border = '2px solid ' + color;
	// notice.style.color = color;
	//document.body.style.direction = 'ltr';

	try {

		// document.querySelector('#enter_your_account > div.includeLink > a').innerText = 'Войти';
		// document.querySelector('#enter_create_account > div.includeLink > a').innerText = 'Открыть счет';
		updateInnerText([
			'#enter_your_account > div.includeLink > a',
			'#enter_create_account > div.includeLink > a'
		], [
			'Войти',
			'Открыть счет'
		]);

		{
			let int = setInterval(() => {
				let menu = document.querySelector('ul.inner_menu.iconMenu');
				if (menu) {
					clearInterval(int);
					menu.querySelector('#header_talk_dropdown > button').innerText = 'Связаться';
					menu.querySelector('#header_talk_dropdown > button').setAttribute('style', 'font-size: 16px!important');
					menu.querySelector('#myUser1StAccess').innerText = 'Доступность';
					menu.querySelector('ul.inner_menu.iconMenu > li:nth-child(2) > a').innerText = 'Филиалы';
				}
			}, 1000);

		}

		{
			let int = setInterval(() => {
				let container = document.querySelector('.contactUsContainer ');
				if (container) {
					clearInterval(int);
					let menu = container.querySelector('.contactUsContainer ul');
					let labels = ['Переписка с банкиром', 'Звонок из приложения', 'Обратный звонок', null, 'Записаться на прием'];
					let menuItems = menu.querySelectorAll('li > a div.relatedLinkPic');
					menuItems.forEach((item, index) => {
						if (labels[index]) {
							item.innerText = labels[index];
						}
					});
					container.querySelector('.ContactLinksTitle').innerText = 'Связаться';
					//container.querySelector('.ContactLinksTitle').style.fontSize = '10px';
				}
			}, 1000);
		}


	}
	catch (err) {
		console.error(err);
	};
}

function updateInnerText(elementsPath, titles) {
	elementsPath.forEach((path, index) => {
		let elem = document.querySelector(path);
		if (elem && elem.innerText) {
			elem.innerText = titles[index];
		}
	});
}

init();
