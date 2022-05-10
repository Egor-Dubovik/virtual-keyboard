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

keybooard.checkColorKeys("colorKeys", keybooard.colorKeys);
keybooard.manageColor(keybooard.colorKeys);

// keyboard action ------------------------------------------------------------

const body = document.body;
const textarea = document.querySelector(".content__textarea");
const inputColor = document.querySelector(".content__input-color");

body.addEventListener("keydown", listenDownAction);
body.addEventListener("keyup", listenUpAction);
body.addEventListener("pointerdown", listenDownAction);
body.addEventListener("pointerup", listenUpAction);
inputColor.addEventListener("input", () => {
	keybooard.manageColor(inputColor.value);
	keybooard.setColorKeys("colorKeys", inputColor.value);
});

function listenDownAction(e) {
	let keyCode = e.code ? keyCode = e.code : keyCode = e.target.dataset.code;
	e.preventDefault();

	if (!!keyCode) {
		if (keyCode.match(/Shift/)) keybooard.changeShiftKyes()
		keybooard.displaySymbols(keyCode, textarea);
		switchAnimationKey(keyCode, true);
	}
}

function listenUpAction(e) {
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
			keybooard.manageColor(keybooard.colorKeys);
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

