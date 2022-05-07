export const createElement = (name, content, classes, arr, attrData) => {
	const element = document.createElement(name);

	classes.forEach(elClass => element.classList.add(elClass));

	if (attrData) {
		const { code, letter, parent = "body", shift, isFn } = attrData;

		element.dataset.parent = parent;
		if (code) element.dataset.code = code;
		if (letter) element.dataset.letter = letter;
		if (shift) element.dataset.shift = shift ? shift : letter;
		if (isFn) element.dataset.isFn = isFn;
	}

	if (content) element.innerHTML = content;
	arr.push(element);
}

