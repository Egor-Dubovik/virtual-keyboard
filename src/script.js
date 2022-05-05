
// import { Post } from "@models/post";
// import logo from "./assets/images/webpack-logo";
// import "./models/babel";

import { storage } from "./js_models/localStorage";
import { createElement } from "./js_models/createElement";
import languges from "./assets/languges.json";
import "./style/style.scss";


// localStorage and language -------------------------------------------------------

storage.set("lang", "en");


// create elements -----------------------------------------------------------------
const body = document.body;
let allElements = [];

const dataSet = {
	"parent": "body",
	"keycode": "KeyA",
	"isFn": "false"
}
createElement("div", ["wraper", "wrap"], allElements, dataSet);


// console.log(allElements);
allElements.forEach(el => body.append(el));


// body.addEventListener("keyup", (e) => {
// 	console.log(e.code, e.key);
// })

// const langg = languges.en;

// for (let key in langg) {
// 	console.log(langg[key]);
// }
// console.log();