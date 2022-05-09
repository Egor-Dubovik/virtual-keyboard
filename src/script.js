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
body.addEventListener("pointerdown", listenKeyDown);
body.addEventListener("pointerup", listenKeyUp);

function gg(e) {
	e.preventDefault();
	console.log(e.target.dataset.code);
}

function listenKeyDown(e) {
	let keyCode = e.code ? keyCode = e.code : keyCode = e.target.dataset.code;
	e.preventDefault();

	if (!!keyCode) {
		if (keyCode.match(/Shift/)) keybooard.changeShiftKyes()
		keybooard.displaySymbols(keyCode, textarea);
		switchAnimationKey(keyCode, true);
	}
}

function listenKeyUp(e) {
	let keyCode = e.code ? keyCode = e.code : keyCode = e.target.dataset.code;
	e.preventDefault();

	if (!!keyCode) {
		if (keyCode === "Alt") keybooard.alt = false;
		if (keyCode === "CapsLock") keybooard.changeCapsKyes();

		if (keybooard.alt && keybooard.ctrl) {
			keybooard.changeLang();
			const newLayout = keybooard.createKeys(createElement);

			document.querySelector(".keyboard").innerHTML = "";
			displayElms(newLayout);
			keybooard.getСhangeableKeys();
		}

		keybooard.removeInactiveKey(keyCode);
		switchAnimationKey(keyCode, false);
	}
}

function switchAnimationKey(keyCode, add) {
	const key = document.querySelector(`div[data-code="${keyCode}"]`);
	if (key) {
		add ? key.classList.add("active") : key.classList.remove("active");
	}
}