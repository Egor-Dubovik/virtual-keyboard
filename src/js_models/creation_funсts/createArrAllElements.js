import { Keyboard } from "../Keybooard";
import { createElement } from "./createElement";
import languges from "../../assets/languges";

export const createArrOfAllElms = (arr, currentLang) => {
	createElement("div", null, ["wraper"], arr, { parent: "body" });
	createElement("section", null, ["content"], arr, { parent: "wraper" });
	createElement("textarea", null, ["textarea"], arr, { parent: "content" });
	createElement("div", null, ["keyboard"], arr, { parent: "content" });

	const keybooard = new Keyboard(currentLang);
	const layout = keybooard.createKeys(languges, createElement);
	arr = arr.concat(layout);

	createElement("footer", null, ["footer"], arr, { parent: "wraper" });

	return arr;
}