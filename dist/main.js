/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_randomArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/randomArray */ \"./js/randomArray.js\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/style.css */ \"./css/style.css\");\n\n\n'use strict';\n\nvar quantityCards;\nvar element = document.querySelector('.modal__select');\nvar cards = {\n  4: [2, 2],\n  8: [2, 4],\n  12: [3, 4],\n  16: [4, 4]\n}; // функция формирует содержимое модельного окна\n\nvar tempModalWindow = function tempModalWindow(options) {\n  return \"<div class=\\\"modal\\\">\\n          <h2 class=\\\"modal__title\\\">\\u0418\\u0413\\u0420\\u0410 \\u041F\\u0410\\u0420\\u042B</h2>\\n          <form action=\\\"/\\\" class=\\\"modal__form\\\">\\n            <div class=\\\"madal__wrap\\\">\\n              <span class=\\\"modal__choosetext\\\">\\u0412\\u044B\\u0431\\u0435\\u0440\\u0435\\u0442\\u0435 \\u043A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E \\u043F\\u0430\\u0440</span>\\n              <select class=\\\"modal__select\\\" name=\\\"select\\\" id=\\\"select\\\">\\n                \".concat(options, \"\\n              </select>\\n            </div>\\n            <button class=\\\"modal__btn\\\">\\u041D\\u0430\\u0447\\u0430\\u0442\\u044C \\u0438\\u0433\\u0440\\u0443</button>\\n          </form>\\n        </div>\");\n}; // фукция формирует необходимое количество options\n\n\nvar options = function options() {\n  var listItems = Object.keys(cards).reduce(function (acc, item) {\n    return acc += \"<option class=\\\"modal__option\\\" value=\\\"\".concat(item, \"\\\">\").concat(item, \"</option>\");\n  }, '');\n  return listItems;\n}; // Функция рендерит модальное окно\n\n\nfunction renderModal(string) {\n  document.querySelector('.main').innerHTML = string;\n} // запускаем рендер модального окна\n\n\nrenderModal(tempModalWindow(options())); // обработчик для модального окна\n\ndocument.body.addEventListener('submit', function (ev) {\n  ev.preventDefault();\n  var target = ev.target;\n  var selected = document.querySelector('.modal__select').options.selectedIndex;\n\n  if (target.classList.contains('modal__form')) {\n    quantityCards = document.querySelector('.modal__select').options[selected].value;\n    target.parentNode.closest('.modal').remove();\n    renderModal(cardBuilder(quantityCards, cards));\n  }\n}); // функция формирует карточки\n\nvar cardBuilder = function cardBuilder(quantity, object) {\n  var tableArray = object[quantity]; // возвращает объект с количеством строк и ячеек\n  //! формируем див, или любой другой тэг, так как нужно передать строку внутри, а если не оборачивать в див, то потеряется сама таблица\n\n  var div = document.createElement('div');\n  var table = document.createElement('table');\n  table.classList.add('table');\n  var th = '';\n\n  for (var i = 0; i < tableArray[1]; i++) {\n    th += \"<th class=\\\"th\\\"></th>\";\n  }\n\n  var tRow = '';\n\n  for (var _i = 0; _i < tableArray[0]; _i++) {\n    tRow += \"<tr class=\\\"tr\\\">\".concat(th, \"</tr>\");\n  }\n\n  table.innerHTML = tRow;\n  div.appendChild(table); //todo рандомно добавить дата атрибут к каждой карточке, а возможно и сделать такие аттрибуты парными\n\n  var randomSetArray = (0,_js_randomArray__WEBPACK_IMPORTED_MODULE_0__.randomArray)(quantityCards);\n  console.log(randomSetArray);\n  var indexOfArray = 0;\n  table.querySelectorAll('th').forEach(function (item) {\n    item.dataset.value = \"\".concat(randomSetArray[indexOfArray++]);\n  });\n  return div.innerHTML;\n};\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./js/randomArray.js":
/*!***************************!*\
  !*** ./js/randomArray.js ***!
  \***************************/
/*! namespace exports */
/*! export randomArray [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"randomArray\": function() { return /* binding */ randomArray; }\n/* harmony export */ });\n // функция готовит массив с необходимым количеством рандомных чисел по паре, располагая в разных частях массива\n\nfunction randomArray(cards) {\n  var setItems = [];\n  var randomSetArray = [];\n  var length = cards / 2;\n\n  for (var i = 1; i <= length; i++) {\n    setItems.push(i);\n  }\n\n  while (randomSetArray.length < cards) {\n    var index = setItems[random(setItems)];\n\n    if (filterPairs(randomSetArray, index)) {\n      continue;\n    } else {\n      randomSetArray.push(index);\n    }\n  }\n\n  return randomSetArray;\n} // функция возвращает из массива рандомно ИНДЕКС\n\nvar random = function random(array) {\n  return Math.floor(Math.random() * array.length);\n}; // функция проверяет есть ли в массиве два одинаковых элемента, возвращает true или false\n\n\nvar filterPairs = function filterPairs(array, element) {\n  var elementsNumber = array.filter(function (el) {\n    return el === element;\n  }).length;\n\n  if (elementsNumber === 2) {\n    return true;\n  }\n\n  return false;\n};\n\n//# sourceURL=webpack:///./js/randomArray.js?");

/***/ }),

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./css/style.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["../node_modules/@babel/polyfill/lib/index.js","vendors-node_modules_babel_polyfill_lib_index_js"],
/******/ 			["./index.js","vendors-node_modules_babel_polyfill_lib_index_js"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = function() {
/******/ 		
/******/ 		};
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = function() {
/******/ 		
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		__webpack_require__.x = function() {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = function() {
/******/ 		
/******/ 			}
/******/ 			chunkLoadingGlobal = chunkLoadingGlobal.slice();
/******/ 			for(var i = 0; i < chunkLoadingGlobal.length; i++) webpackJsonpCallback(chunkLoadingGlobal[i]);
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			var executeModules = data[3];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback;
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;