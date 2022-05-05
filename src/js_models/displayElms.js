export const displayElms = (allElements) => {
	allElements.forEach(el => {
		const selector = el.dataset.parent;
		const parent = document.querySelector(selector) || document.querySelector(`.${selector}`);

		if (parent) parent.append(el);
	})
}
