import { storage } from "../js_models/localStorage";
import listLanguges from "../assets/languges";
import lightenDarkenColor from "./lightenDarkenColor";

export class Keyboard {
	constructor() {
		this.languages = ["en", "ru"];
		this.currentLang = "en";
		this.startUnicode = 97;
		this.lastUnicode = 122;
		this.changeKeys = [];
		this.fnKeys = ["Tab", "CapsLock", "Shift", "Control", "Alt", "Backspace", "Enter", "Delete", "ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"];
		this.keys = [];
		this.caps = false;
		this.shift = false;
		this.ctrl = false;
		this.alt = false;
		this.cursorPos = 0;
		this.colorWasChanged = false;
	}

	changeUnicodeRange() {
		this.startUnicode = this.currentLang === "en" ? 97 : 1072;
		this.lastUnicode = this.currentLang === "en" ? 122 : 1103;
	}

	setLang() {
		if (!storage.get("language")) storage.set("language", this.languages[0]);
		this.currentLang = storage.get("language");
	}

	changeLang() {
		const arrLang = this.languages;

		for (let i = 0; i < arrLang.length; i++) {
			if (arrLang[i] === this.currentLang) {
				(i !== arrLang.length - 1) ? i++ : i = 0;
				this.currentLang = this.languages[i]
				storage.set("language", this.languages[i]);
			}
		}

		this.changeUnicodeRange();
	}

	createKeys(createElement) {
		const layoutLang = listLanguges[this.currentLang];
		this.keys = [];

		for (let key in layoutLang) {
			const keyObj = layoutLang[key];
			const classes = ["keyboard__key"];
			let content = keyObj.letter;

			if (this.caps && this.checkCapsKey(keyObj.letter)) {
				content = keyObj.shift;
			}

			createElement("div", content, classes, this.keys, keyObj);
		}
		return this.keys;
	}

	getСhangeableKeys() {
		this.changeKeys = document.querySelectorAll(`div[data-is-fn="false"]`);
	}

	displaySymbols(keyCode, textarea) {
		const key = document.querySelector(`div[data-code="${keyCode}"]`);

		if (key) {
			let symbol = key.dataset.letter;

			if (this.shift) symbol = key.dataset.shift;

			if (this.caps && this.checkCapsKey(key)) symbol = key.dataset.shift;

			if (this.caps && this.shift) {
				if (this.checkCapsKey(key)) symbol = key.dataset.letter;
			}

			if (keyCode.match(/Arrow/) || keyCode === "Enter" || keyCode === "Tab") {
				this.moveСarriage(textarea, keyCode);
			}

			if (keyCode === "Backspace") this.eraseSymbol(textarea);

			if (keyCode === "Delete") this.delSymbol(textarea);

			if (keyCode.match(/Alt/)) this.alt = true;
			if (keyCode.match(/Control/)) this.ctrl = true;

			if (key.dataset.isFn === "false") {
				textarea.value = textarea.value.substring(0, this.cursorPos) + symbol + textarea.value.substring(this.cursorPos);
				this.cursorPos += 1;

				textarea.setSelectionRange(this.cursorPos, this.cursorPos);
				textarea.focus();
			}
		}
	}

	moveСarriage(textarea, keyCode) {
		textarea.focus();

		if (keyCode === "ArrowLeft") {
			if (textarea.value[this.cursorPos - 1]) this.cursorPos -= 1;
			textarea.setSelectionRange(this.cursorPos, this.cursorPos);
		}

		if (keyCode === "ArrowRight") {
			textarea.setSelectionRange(this.cursorPos, this.cursorPos);
			if (textarea.value[this.cursorPos]) this.cursorPos += 1;
		}

		if (keyCode === "ArrowUp") {
			const positionFromLeft = textarea.value.slice(0, this.cursorPos).match(/(\n).*$(?!\1)/g) || [[1]];

			if (textarea.value[this.cursorPos - 1]) {
				this.cursorPos -= positionFromLeft[0].length;
			}

			textarea.setSelectionRange(this.cursorPos, this.cursorPos);
		}

		if (keyCode === "ArrowDown") {
			const positionFromLeft = textarea.value.slice(this.cursorPos).match(/^.*(\n).*(?!\1)/) || [[1]];

			if (textarea.value[this.cursorPos]) {
				this.cursorPos += positionFromLeft[0].length;
				textarea.setSelectionRange(this.cursorPos, this.cursorPos);
			}
		}

		if (keyCode === "Enter") {
			textarea.value = textarea.value.substring(0, this.cursorPos) + "\n" + textarea.value.substring(this.cursorPos);
			this.cursorPos += 1;

			textarea.setSelectionRange(this.cursorPos, this.cursorPos);
		}

		if (keyCode === "Tab") {
			textarea.value += "\t";
			this.cursorPos += 1;
		}
	}

	eraseSymbol(textarea) {
		if (textarea.value[this.cursorPos - 1]) {
			this.cursorPos -= 1;
			textarea.value = textarea.value.slice(0, this.cursorPos) + textarea.value.slice(this.cursorPos + 1);
			textarea.setSelectionRange(this.cursorPos, this.cursorPos);
		}
	}

	delSymbol(textarea) {
		if (textarea.value[this.cursorPos]) {
			textarea.value = textarea.value.slice(0, this.cursorPos) + textarea.value.slice(this.cursorPos + 1);
			textarea.setSelectionRange(this.cursorPos, this.cursorPos);
		}
	}

	changeCapsKyes() {
		if (!this.caps) {
			this.caps = true

			this.changeKeys.forEach(key => {
				if (this.checkCapsKey(key)) key.textContent = key.dataset.shift;
				else key.textContent = key.dataset.letter;
			});
		} else {
			this.caps = false;

			this.changeKeys.forEach(key => {
				if (this.checkCapsKey(key)) key.textContent = key.dataset.letter;
			});
		}
	}

	changeShiftKyes(remove = false) {
		this.shift = true;

		this.changeKeys.forEach(key => {
			if (this.caps) {
				if (this.checkCapsKey(key)) {
					conditionalChangeKeys(key, remove, true);
				} else {
					conditionalChangeKeys(key, remove, false);
				}
				return;
			}

			conditionalChangeKeys(key, remove, false);
		});
	}

	checkCapsKey(key) {
		let unicode = "";

		if (typeof key === "string") {
			unicode = key.charCodeAt(0);
		} else {
			unicode = key.dataset.letter.charCodeAt(0)
		}

		if (unicode >= this.startUnicode && unicode <= this.lastUnicode) {
			return true;
		}
		console.log();
		return false;
	}

	removeInactiveKey(keyCode) {
		if (keyCode.match(/Shift/)) {
			this.changeShiftKyes(true);
			this.shift = false;
		}

		if (keyCode.match(/Alt/)) this.alt = false;
		if (keyCode.match(/Control/)) this.ctrl = false;
	}

	manageColor(color) {
		this.colorWasChanged = true;
		const allKeys = document.querySelectorAll(".keyboard__key");

		allKeys.forEach(key => {
			key.style.backgroundColor = color;
			key.style.borderColor = color;

			if (key.dataset.isFn === "true") {
				key.style.backgroundColor = lightenDarkenColor(color, -30);
				key.style.borderColor = lightenDarkenColor(color, -30);
			}

		});
	}
}

function conditionalChangeKeys(key, remove, caps) {

	if (remove) {
		if (caps) key.textContent = key.dataset.shift;
		else key.textContent = key.dataset.letter;
	} else {
		if (caps) key.textContent = key.dataset.letter;
		else key.textContent = key.dataset.shift;
	}

}