export class Keyboard {
	constructor(language) {
		this.lang = language;
		this.startUnicode = language === "en" ? 97 : 1072;
		this.lastUnicode = language === "en" ? 122 : 1103;
		this.changeKeys = [];
		this.fnKeys = ["Tab", "CapsLock", "Shift", "Control", "Alt", "Backspace", "Enter", "Delete", "ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"];
		this.keys = [];
		this.caps = false;
		this.shift = false;
		this.ctrl = false;
		this.alt = false;
		this.output = [];
		this.cursorPos = 0;
	}

	createKeys(languges, createElement) {
		let layoutLang = languges[this.lang];

		for (let key in layoutLang) {
			const keyObj = layoutLang[key];
			const classes = ["keyboard__key"];
			const content = keyObj.letter;

			if (key.match(/Arrow/)) classes.push("_move-cursor");

			if (key === "Delete" || key === "Backspace") {
				classes.push("_del-symbol");
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
		let symbol = key.dataset.letter;

		if (this.shift) symbol = key.dataset.shift;

		if (this.caps && this.checkCapsKey(key)) {
			symbol = key.dataset.shift;
		}

		if (this.caps && this.shift) {
			if (this.checkCapsKey(key)) symbol = key.dataset.letter;
		}

		if (keyCode.match(/Arrow/) || keyCode === "Enter" || keyCode === "Tab") {
			this.moveСarriage(textarea, keyCode);
		}

		if (keyCode === "Backspace") this.eraseSymbol(textarea);

		if (keyCode === "Delete") this.delSymbol(textarea);

		if (key.dataset.isFn === "false") {
			textarea.value = textarea.value.substring(0, this.cursorPos) + symbol + textarea.value.substring(this.cursorPos);
			this.cursorPos += 1;

			textarea.setSelectionRange(this.cursorPos, this.cursorPos);
			textarea.focus();

			console.log(this.cursorPos);
		}
	}

	moveСarriage(textarea, keyCode) {
		textarea.focus();

		if (keyCode === "ArrowLeft") {
			if (textarea.value[this.cursorPos - 1]) this.cursorPos -= 1;
			textarea.setSelectionRange(this.cursorPos, this.cursorPos);
			console.log(this.cursorPos);
		}

		if (keyCode === "ArrowRight") {
			textarea.setSelectionRange(this.cursorPos, this.cursorPos);

			if (textarea.value[this.cursorPos]) this.cursorPos += 1;
			console.log(this.cursorPos);
		}

		if (keyCode === "ArrowUp") {
			const positionFromLeft = textarea.value.slice(0, this.cursorPos).match(/(\n).*$(?!\1)/g) || [[1]];

			if (textarea.value[this.cursorPos - 1]) {
				this.cursorPos -= positionFromLeft[0].length;
			}

			textarea.setSelectionRange(this.cursorPos, this.cursorPos);
			console.log(this.cursorPos);
		}

		if (keyCode === "ArrowDown") {
			const positionFromLeft = textarea.value.slice(this.cursorPos).match(/^.*(\n).*(?!\1)/) || [[1]];

			if (textarea.value[this.cursorPos]) {
				this.cursorPos += positionFromLeft[0].length;
				textarea.setSelectionRange(this.cursorPos, this.cursorPos);
			}

			console.log(positionFromLeft);
			console.log(this.cursorPos);
		}

		if (keyCode === "Enter") {
			textarea.value = textarea.value.substring(0, this.cursorPos) + "\n" + textarea.value.substring(this.cursorPos);
			this.cursorPos += 1;

			textarea.setSelectionRange(this.cursorPos, this.cursorPos);
			console.log(this.cursorPos);
		}

		if (keyCode === "Tab") {
			textarea.value += "\t";
			this.cursorPos += 1;
			console.log(this.cursorPos);
		}
	}

	eraseSymbol(textarea) {
		if (textarea.value.length > 0) {
			this.cursorPos -= 1;
			textarea.value = textarea.value.slice(0, this.cursorPos) + textarea.value.slice(this.cursorPos + 1);
			textarea.setSelectionRange(this.cursorPos, this.cursorPos);
		}

		console.log(this.cursorPos);
	}

	delSymbol(textarea) {
		if (textarea.value[this.cursorPos]) {
			textarea.value = textarea.value.slice(0, this.cursorPos) + textarea.value.slice(this.cursorPos + 1);
			textarea.setSelectionRange(this.cursorPos, this.cursorPos);
		}

		console.log(this.cursorPos);
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
		let unicode = key.dataset.letter.charCodeAt(0);

		if (unicode >= this.startUnicode && unicode <= this.lastUnicode) {
			return true;
		}

		return false;
	}


	removeInactiveKey(keyCode) {
		if (keyCode.match(/Shift/)) {
			this.changeShiftKyes(true);
			this.shift = false;
		}
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