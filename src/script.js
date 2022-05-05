import { createElement } from "./js_models/createElement";
import { storage } from "./js_models/localStorage";
import { Keyboard } from "./js_models/keybooard";
import languges from "./assets/languges.json";

import "./style/style.scss";


// localStorage and language -------------------------------------------------------

let currentLang = storage.get("language") ? storage.get("language") : "en";
storage.set("language", "en");






// create elements -----------------------------------------------------------------
const body = document.body;
let allElements = [];

const createArrAllElements = () => {
	createElement("div", null, ["wraper"], allElements, { parent: "body" });
	createElement("section", null, ["content"], allElements, { parent: "wraper" });
	createElement("textarea", null, ["textarea"], allElements, { parent: "content" });
	createElement("div", null, ["keyboard"], allElements, { parent: "content" });

	const keybooard = new Keyboard(currentLang);
	const layout = keybooard.createKeys(languges, createElement);
	allElements = allElements.concat(layout);

	createElement("footer", null, ["footer"], allElements, { parent: "wraper" });
}
createArrAllElements();

allElements.forEach(el => console.log(el))

// console.log(allElements);
// allElements.forEach(el => body.append(el));


// body.addEventListener("keyup", (e) => {
// 	console.log(e.code, e.key);
// })

