export const createElement = (name, classes, arr, attrData) => {
	const element = document.createElement(name);

	classes.forEach(elClass => element.classList.add(elClass));

	if (attrData) {
		let { parent = "body", keycode = false, isFn = false } = attrData;

		if (parent) element.dataset.parent = parent;
		if (keycode) element.dataset.keycode = keycode;
		if (isFn) element.dataset.isFn = isFn;


	}
	arr.push(element);
}

