export class Keyboard {
	constructor(language) {
		this.lang = language;
		this.keys = [];
	}

	createKeys(languges, createElement) {
		let layoutLang = languges[this.lang];

		for (let key in layoutLang) {
			const keyObj = layoutLang[key];
			console.log();
			const classes = !key.match(/row\d/) ? ["keyboard__key"] : ["keyboard__row", key];
			const content = keyObj.letter;

			createElement("div", content, classes, this.keys, keyObj);
		}
		return this.keys;
	}
}

