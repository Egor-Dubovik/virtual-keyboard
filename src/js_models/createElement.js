export const createElement = (name, content, classes, arr, attrData) => {
	const element = document.createElement(name);

	classes.forEach(elClass => element.classList.add(elClass));

	if (attrData && element.classList.contains("keyboard__key")) {
		let { letter, parent = "body", shift = false, isFn = false } = attrData;

		element.dataset.parent = parent;
		element.dataset.letter = letter ? letter : null;
		element.dataset.shift = shift ? shift : letter;
		// if (isFn) element.dataset.isFn = isFn;
	}

	if (content) element.innerHTML = content;

	arr.push(element);
}

