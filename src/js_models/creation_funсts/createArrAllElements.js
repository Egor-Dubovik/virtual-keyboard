import { Keyboard } from "../Keybooard";
import { createElement } from "./createElement";
import languges from "../../assets/languges";

export const createArrOfAllElms = (arr, currentLang) => {
	createElement("div", null, ["wraper"], arr, { parent: "body" });
	createElement("section", null, ["content"], arr, { parent: "wraper" });
	createElement("h1", "Virtual Keyboard", ["content__title"], arr, { parent: "section" });
	createElement("textarea", null, ["content__textarea"], arr, { parent: "content" });
	createElement("div", null, ["content__keyboard", "keyboard"], arr, { parent: "content" });

	const keybooard = new Keyboard(currentLang);
	const layout = keybooard.createKeys(languges, createElement);
	arr = arr.concat(layout);


	createElement("p", "The keyboard was created in the Windows OS", ["content__description"], arr, { parent: "content" });
	createElement("p", "To switch the language combination: shift + alt", ["content__switch-lang"], arr, { parent: "content" });
	createElement("footer", null, ["footer"], arr, { parent: "wraper" });

	return arr;
}