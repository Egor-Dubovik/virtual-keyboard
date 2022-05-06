export class Keyboard {
	constructor(language) {
		this.lang = language;
		this.keys = [];
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
}

