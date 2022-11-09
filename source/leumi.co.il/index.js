import {waitForContainer, updateInnerText} from '../common.js';
import homepage from './homepage.js';

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

	// Translate "Contact us" submenu
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

	homepage.init();
}

init();
