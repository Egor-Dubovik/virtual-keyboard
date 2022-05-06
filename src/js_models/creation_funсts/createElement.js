export const createElement = (name, content, classes, arr, attrData) => {
	const element = document.createElement(name);

	classes.forEach(elClass => element.classList.add(elClass));

	if (attrData) {
		let { code, letter, parent = "body", shift = false, isFn = false } = attrData;

		element.dataset.code = code;
		element.dataset.parent = parent;
		element.dataset.letter = letter;
		element.dataset.shift = shift ? shift : letter;


		if (isFn) element.dataset.isFn = isFn;
	}

	if (content) element.innerHTML = content;

	arr.push(element);
}

