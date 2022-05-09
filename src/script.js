import { Keyboard } from "./js_models/Keybooard";
import { createElement } from "./js_models/creation_funсts/createElement";
import { createArrOfSomeElms } from "./js_models/creation_funсts/createArrOfSomeElms";
import { displayElms } from "./js_models/displayElms";
import "./style/style.scss";




// first render  -----------------------------------------------------------------
const keybooard = new Keyboard();
keybooard.setLang();

let layout = keybooard.createKeys(createElement);
let someElements = createArrOfSomeElms(createElement);

displayElms(someElements);
displayElms(layout);
keybooard.getСhangeableKeys();

//  ------------------------------------------------------------
const body = document.body;
const textarea = document.querySelector(".content__textarea");

body.addEventListener("keydown", listenKeyDown);
body.addEventListener("keyup", listenKeyUp);


function listenKeyDown(e) {
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
}

function listenKeyUp(e) {
	e.preventDefault();

	if (e.code === "Alt") keybooard.alt = false;
	if (e.code === "CapsLock") keybooard.changeCapsKyes();

	keybooard.removeInactiveKey(e.code);
}
