/**
 * Update the inner text for given selectors in given container
 * @param {Array<string>} selectors
 * @param {Array<string>} titles
 * @param {Element} container
 */
export function updateInnerText(selectors, titles, container = undefined) {
	for (const [index, selector] of selectors.entries()) {
		const elements = (container ?? document).querySelectorAll(selector);
		if (elements && elements.length) {
			elements.forEach((element) => {
				element.textContent = titles[index];
			});
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
export async function waitForContainer(selector, delay = 1000, retryCount = 3) {
	return new Promise((resolve, reject) => {
		let counter = 1;
		// Try to find container immideately
		const container = document.querySelector(selector);
		if (container) {
			resolve(container);
		} else {
			// Retry to find it with given delay
			const interval = setInterval(() => {
				if (++counter >= retryCount) {
					clearInterval(interval);
					reject(
						new Error(
							`Container '${selector}' not found after ${counter} retries`
						)
					);
				}

				const container = document.querySelector(selector);
				if (container) {
					clearInterval(interval);
					resolve(container);
				}
			}, delay);
		}
	});
}
