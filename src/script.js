import { Keyboard } from "./js_models/Keybooard";
import { createElement } from "./js_models/creation_funсts/createElement";
import { createArrOfSomeElms } from "./js_models/creation_funсts/createArrOfSomeElms";
import { displayElms } from "./js_models/displayElms";
import "./style/style.scss";


// localStorage and language -------------------------------------------------------





// work with elements -----------------------------------------------------------------

const keybooard = new Keyboard();
keybooard.setLang();
let layout = keybooard.createKeys(createElement);

let someElements = createArrOfSomeElms(createElement);

displayElms(someElements);
displayElms(layout);

keybooard.getСhangeableKeys();

// keyboard interaction ------------------------------------------------------------

const body = document.body;
const textarea = document.querySelector(".content__textarea");


body.addEventListener("keydown", (e) => {
	e.preventDefault();

	if (e.code.match(/Shift/)) keybooard.changeShiftKyes()
	keybooard.displaySymbols(e.code, textarea);

	if (keybooard.alt && keybooard.ctrl) {
		keybooard.changeLang();
		const newLayout = keybooard.createKeys(createElement);

		document.querySelector(".keyboard").innerHTML = "";
		displayElms(newLayout);
		keybooard.getСhangeableKeys();
	}


});

body.addEventListener("keyup", (e) => {
	e.preventDefault();

	if (e.code === "Alt") keybooard.alt = false;
	if (e.code === "CapsLock") {
		keybooard.changeCapsKyes();
		console.log("yes");
	}
	keybooard.removeInactiveKey(e.code);
});

// console.log(allElements);
// allElements.forEach(el => console.log(el));


// body.addEventListener("keyup", (e) => {
// 	console.log(e.code, e.key);
// })

