
// import { Post } from "@models/post";
// import logo from "./assets/images/webpack-logo";
// import "./models/babel";

import { storage } from "./js_models/localStorage";
// import { createElement } from "./js_models/createElement";
import languges from "./assets/languges.json";
import "./style/style.scss";



storage.set("lang", "en");



const body = document.body;
let allElements = [];


// createElement("div", ["wraper", "wrap"], allElements);


// console.log(allElements);
allElements.forEach(el => body.append(el));


body.addEventListener("keyup", (e) => {
	console.log(e.code, e.key);
})

// const langg = languges.en;

// for (let key in langg) {
// 	console.log(langg[key]);
// }
// console.log();