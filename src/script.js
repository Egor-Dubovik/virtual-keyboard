import { storage } from "./js_models/localStorage";
import { Keyboard } from "./js_models/Keybooard";
import { createElement } from "./js_models/creation_funсts/createElement";
import { createArrOfAllElms } from "./js_models/creation_funсts/createArrAllElements";
import { displayElms } from "./js_models/displayElms";
import languges from "./assets/languges";
import "./style/style.scss";


// localStorage and language -------------------------------------------------------

let currentLang = storage.get("language") ? storage.get("language") : "ru";
storage.set("language", "ru");


// work with elements -----------------------------------------------------------------

let allElements = [];

const keybooard = new Keyboard(currentLang);
const layout = keybooard.createKeys(languges, createElement);

allElements = createArrOfAllElms(allElements, createElement);
allElements = allElements.concat(layout);

displayElms(allElements);
keybooard.getСhangeableKeys();

// keyboard interaction ------------------------------------------------------------

const body = document.body;
const textarea = document.querySelector(".content__textarea");


body.addEventListener("keydown", (e) => {
	e.preventDefault();

	if (e.code.match(/Shift/)) keybooard.changeShiftKyes()
	keybooard.displaySymbols(e.code, textarea);
});

body.addEventListener("keyup", (e) => {
	e.preventDefault();

	if (e.code === "CapsLock") keybooard.changeCapsKyes();
	keybooard.removeInactiveKey(e.code);
});

// console.log(allElements);
// allElements.forEach(el => console.log(el));


// body.addEventListener("keyup", (e) => {
// 	console.log(e.code, e.key);
// })

