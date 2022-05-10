export const createArrOfSomeElms = (createElement) => {
	let arr = [];

	createElement("div", null, ["wraper"], arr, { parent: "body" });
	createElement("section", null, ["content"], arr, { parent: "wraper" });
	createElement("h1", "Virtual Keyboard", ["content__title"], arr, { parent: "section" });
	createElement("textarea", null, ["content__textarea"], arr, { parent: "content" });
	createElement("div", null, ["content__keyboard", "keyboard"], arr, { parent: "content" });
	createElement("p", "The keyboard was created in the Windows OS", ["content__description"], arr, { parent: "content" });
	createElement("p", "To switch the language combination: CTRL + ALT", ["content__switch-lang"], arr, { parent: "content" });
	createElement("p", "Manage color of keyboard:", ["content__manage-color"], arr, { parent: "content" });
	createElement("input", null, ["content__input-color"], arr, { parent: "content" }, { type: "color" });

	return arr;
}