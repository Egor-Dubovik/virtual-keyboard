export class Keyboard {
	constructor(language) {
		this.lang = language;
		this.startUnicode = language === "en" ? 97 : 1072;
		this.lastUnicode = language === "en" ? 122 : 1103;
		this.changeKeys = [];
		this.keys = [];
		this.caps = false;
		this.ctrl = false;
		this.alt = false;

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
	checkFnKeys(keyCode) {
		// switch (currentKey.dataset.isFn)


		if (keyCode === "CapsLock") this.changeCapsKyes();
		if (keyCode.match(/Shift/)) this.changeShiftKyes();


	}

	changeCapsKyes() {

		if (!this.caps) {
			this.caps = true

			this.changeKeys.forEach(key => {
				let unicode = key.dataset.letter.charCodeAt(0);

				if (unicode >= this.startUnicode && unicode <= this.lastUnicode) {
					key.textContent = key.dataset.shift;
				} else {
					key.textContent = key.dataset.letter;
				}
			});
		} else {
			this.caps = false;

			this.changeKeys.forEach(key => {
				let unicode = key.dataset.letter.charCodeAt(0);

				if (unicode >= this.startUnicode && unicode <= this.lastUnicode) {
					key.textContent = key.dataset.letter;
				}
			});
		}

	}

	changeShiftKyes(remove = false) {

		this.changeKeys.forEach(key => {

			if (this.caps) {
				let unicode = key.dataset.letter.charCodeAt(0);

				if (unicode >= this.startUnicode && unicode <= this.lastUnicode) {
					conditionalChangeKeys(key, remove, true);
				} else {
					conditionalChangeKeys(key, remove, false);
				}
				return;
			}

			conditionalChangeKeys(key, remove, false);

		});
	}

	removeInactiveKey(keyCode) {
		if (keyCode.match(/Shift/)) this.changeShiftKyes(true);
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