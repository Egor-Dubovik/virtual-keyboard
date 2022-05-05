
// import { Post } from "@models/post";
// import logo from "./assets/images/webpack-logo";
// import "./models/babel";

import languges from "./assets/languges.json";
import { createElement } from "./js_models/createElement";
import { storage } from "./js_models/localStorage";
import { Keyboard } from "./js_models/keybooard";
//
import "./style/style.scss";


// localStorage and language -------------------------------------------------------

let currentLang = storage.get("language") ? storage.get("language") : "en";
storage.set("language", "en");



let keybooard = new Keyboard(currentLang);
console.log();
let layout = keybooard.createKeys(languges, createElement)

layout.forEach(el => console.log(el))

// create elements -----------------------------------------------------------------
const body = document.body;
let allElements = [];

// const dataSet = {
// 	"parent": "body",
// 	"keycode": "KeyA",
// 	"isFn": "false"
// }
// createElement("div", ["wraper", "wrap"], allElements, dataSet);


// console.log(allElements);
// allElements.forEach(el => body.append(el));


// body.addEventListener("keyup", (e) => {
// 	console.log(e.code, e.key);
// })

// const langg = languges.en;

// for (let key in langg) {
// 	console.log(langg[key]);
// }
// console.log();