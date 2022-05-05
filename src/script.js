import { storage } from "./js_models/localStorage";
import { createArrOfAllElms } from "./js_models/creation_funсts/createArrAllElements";
import { displayElms } from "./js_models/displayElms";
import "./style/style.scss";


// localStorage and language -------------------------------------------------------

let currentLang = storage.get("language") ? storage.get("language") : "en";
storage.set("language", "en");


// work with elements -----------------------------------------------------------------

let allElements = [];
allElements = createArrOfAllElms(allElements, currentLang);

displayElms(allElements);

//-------------------------------------------------------------------------------------



// console.log(allElements);
// allElements.forEach(el => console.log(el));


// body.addEventListener("keyup", (e) => {
// 	console.log(e.code, e.key);
// })

