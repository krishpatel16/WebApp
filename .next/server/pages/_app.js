/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./amplify/config.js":
/*!***************************!*\
  !*** ./amplify/config.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   API: () => (/* binding */ API),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var aws_amplify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-amplify */ \"aws-amplify\");\n/* harmony import */ var _aws_amplify_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/api */ \"@aws-amplify/api\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([aws_amplify__WEBPACK_IMPORTED_MODULE_0__, _aws_amplify_api__WEBPACK_IMPORTED_MODULE_1__]);\n([aws_amplify__WEBPACK_IMPORTED_MODULE_0__, _aws_amplify_api__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n// amplify/config.js\n\n\nconst amplifyConfig = {\n    aws_project_region: 'eu-west-2',\n    aws_cloud_logic_custom: [\n        {\n            name: 'ScheduleDeviceAPI',\n            endpoint: 'https://84xlf53soa.execute-api.eu-west-2.amazonaws.com/dev',\n            region: 'eu-west-2'\n        }\n    ]\n};\naws_amplify__WEBPACK_IMPORTED_MODULE_0__.Amplify.configure(amplifyConfig);\nconsole.log('AmplifyAPI from config:', _aws_amplify_api__WEBPACK_IMPORTED_MODULE_1__);\nconst API = _aws_amplify_api__WEBPACK_IMPORTED_MODULE_1__.API;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (amplifyConfig);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2FtcGxpZnkvY29uZmlnLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDa0I7QUFDUztBQUUvQyxNQUFNRSxnQkFBZ0I7SUFDcEJDLG9CQUFvQjtJQUNwQkMsd0JBQXdCO1FBQ3RCO1lBQ0VDLE1BQU07WUFDTkMsVUFBVTtZQUNWQyxRQUFRO1FBQ1Y7S0FDRDtBQUNIO0FBQ0FQLGdEQUFPQSxDQUFDUSxTQUFTLENBQUNOO0FBQ2xCTyxRQUFRQyxHQUFHLENBQUMsMkJBQTRCVCw2Q0FBVUE7QUFDM0MsTUFBTVUsTUFBTVYsaURBQWMsQ0FBQztBQUNsQyxpRUFBZUMsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxIUFxcRG9jdW1lbnRzXFxZZWFyIDNcXENvbXB1dGluZyBQcm9qZWN0XFxXZWJBcHBcXGFtcGxpZnlcXGNvbmZpZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhbXBsaWZ5L2NvbmZpZy5qc1xyXG5pbXBvcnQgeyBBbXBsaWZ5IH0gZnJvbSAnYXdzLWFtcGxpZnknO1xyXG5pbXBvcnQgKiBhcyBBbXBsaWZ5QVBJIGZyb20gJ0Bhd3MtYW1wbGlmeS9hcGknO1xyXG5cclxuY29uc3QgYW1wbGlmeUNvbmZpZyA9IHtcclxuICBhd3NfcHJvamVjdF9yZWdpb246ICdldS13ZXN0LTInLFxyXG4gIGF3c19jbG91ZF9sb2dpY19jdXN0b206IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ1NjaGVkdWxlRGV2aWNlQVBJJyxcclxuICAgICAgZW5kcG9pbnQ6ICdodHRwczovLzg0eGxmNTNzb2EuZXhlY3V0ZS1hcGkuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb20vZGV2JyxcclxuICAgICAgcmVnaW9uOiAnZXUtd2VzdC0yJyxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuQW1wbGlmeS5jb25maWd1cmUoYW1wbGlmeUNvbmZpZyk7XHJcbmNvbnNvbGUubG9nKCdBbXBsaWZ5QVBJIGZyb20gY29uZmlnOicgLCBBbXBsaWZ5QVBJKTtcclxuZXhwb3J0IGNvbnN0IEFQSSA9IEFtcGxpZnlBUEkuQVBJO1xyXG5leHBvcnQgZGVmYXVsdCBhbXBsaWZ5Q29uZmlnOyJdLCJuYW1lcyI6WyJBbXBsaWZ5IiwiQW1wbGlmeUFQSSIsImFtcGxpZnlDb25maWciLCJhd3NfcHJvamVjdF9yZWdpb24iLCJhd3NfY2xvdWRfbG9naWNfY3VzdG9tIiwibmFtZSIsImVuZHBvaW50IiwicmVnaW9uIiwiY29uZmlndXJlIiwiY29uc29sZSIsImxvZyIsIkFQSSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./amplify/config.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/global.css */ \"(pages-dir-node)/./styles/global.css\");\n/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_global_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var aws_amplify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aws-amplify */ \"aws-amplify\");\n/* harmony import */ var _amplify_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../amplify/config */ \"(pages-dir-node)/./amplify/config.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([aws_amplify__WEBPACK_IMPORTED_MODULE_2__, _amplify_config__WEBPACK_IMPORTED_MODULE_3__]);\n([aws_amplify__WEBPACK_IMPORTED_MODULE_2__, _amplify_config__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\naws_amplify__WEBPACK_IMPORTED_MODULE_2__.Amplify.configure(_amplify_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\nfunction MyApp({ Component, pageProps }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)({\n        \"MyApp.useEffect\": ()=>{\n            if (false) {}\n            const isLoggedIn = !!localStorage.getItem('username');\n            const role = localStorage.getItem('userRole');\n            if (!isLoggedIn && router.pathname !== '/') {\n                router.replace('/');\n            }\n            if (isLoggedIn && router.pathname === '/') {\n                router.replace('/home');\n            }\n            if ((role === 'Family' || role === 'Guest') && router.pathname === '/chart') {\n                router.replace('/home');\n            }\n        }\n    }[\"MyApp.useEffect\"], [\n        router\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\HP\\\\Documents\\\\Year 3\\\\Computing Project\\\\WebApp\\\\pages\\\\_app.js\",\n        lineNumber: 35,\n        columnNumber: 10\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQThCO0FBQ1E7QUFDSTtBQUNSO0FBQ007QUFFeENBLGdEQUFPQSxDQUFDSSxTQUFTLENBQUNILHVEQUFTQTtBQUVaLFNBQVNJLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDcEQsTUFBTUMsU0FBU0wsc0RBQVNBO0lBRXhCRCxnREFBU0E7MkJBQUM7WUFDUixJQUFJLEtBQXVELEVBQUUsRUFJNUQ7WUFFRCxNQUFNVyxhQUFhLENBQUMsQ0FBQ0YsYUFBYUcsT0FBTyxDQUFDO1lBQzFDLE1BQU1DLE9BQU9KLGFBQWFHLE9BQU8sQ0FBQztZQUVsQyxJQUFJLENBQUNELGNBQWNMLE9BQU9RLFFBQVEsS0FBSyxLQUFLO2dCQUMxQ1IsT0FBT1MsT0FBTyxDQUFDO1lBQ2pCO1lBRUEsSUFBSUosY0FBY0wsT0FBT1EsUUFBUSxLQUFLLEtBQUs7Z0JBQ3pDUixPQUFPUyxPQUFPLENBQUM7WUFDakI7WUFFQSxJQUFJLENBQUNGLFNBQVMsWUFBWUEsU0FBUyxPQUFNLEtBQU1QLE9BQU9RLFFBQVEsS0FBSyxVQUFVO2dCQUMzRVIsT0FBT1MsT0FBTyxDQUFDO1lBQ2pCO1FBQ0Y7MEJBQUc7UUFBQ1Q7S0FBTztJQUVYLHFCQUFPLDhEQUFDRjtRQUFXLEdBQUdDLFNBQVM7Ozs7OztBQUNqQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxIUFxcRG9jdW1lbnRzXFxZZWFyIDNcXENvbXB1dGluZyBQcm9qZWN0XFxXZWJBcHBcXHBhZ2VzXFxfYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbC5jc3MnO1xyXG5pbXBvcnQgeyBBbXBsaWZ5IH0gZnJvbSAnYXdzLWFtcGxpZnknO1xyXG5pbXBvcnQgYXdzY29uZmlnIGZyb20gJy4uL2FtcGxpZnkvY29uZmlnJztcclxuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XHJcblxyXG5BbXBsaWZ5LmNvbmZpZ3VyZShhd3Njb25maWcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgIXdpbmRvdy5fX2NsZWFyZWRMb2dpbikge1xyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcm5hbWUnKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJSb2xlJyk7XHJcbiAgICAgIHdpbmRvdy5fX2NsZWFyZWRMb2dpbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNMb2dnZWRJbiA9ICEhbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJuYW1lJyk7XHJcbiAgICBjb25zdCByb2xlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJSb2xlJyk7XHJcblxyXG4gICAgaWYgKCFpc0xvZ2dlZEluICYmIHJvdXRlci5wYXRobmFtZSAhPT0gJy8nKSB7XHJcbiAgICAgIHJvdXRlci5yZXBsYWNlKCcvJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4gJiYgcm91dGVyLnBhdGhuYW1lID09PSAnLycpIHtcclxuICAgICAgcm91dGVyLnJlcGxhY2UoJy9ob21lJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKChyb2xlID09PSAnRmFtaWx5JyB8fCByb2xlID09PSAnR3Vlc3QnKSAmJiByb3V0ZXIucGF0aG5hbWUgPT09ICcvY2hhcnQnKSB7XHJcbiAgICAgIHJvdXRlci5yZXBsYWNlKCcvaG9tZScpO1xyXG4gICAgfVxyXG4gIH0sIFtyb3V0ZXJdKTtcclxuXHJcbiAgcmV0dXJuIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz47XHJcbn1cclxuIl0sIm5hbWVzIjpbIkFtcGxpZnkiLCJhd3Njb25maWciLCJ1c2VFZmZlY3QiLCJ1c2VSb3V0ZXIiLCJjb25maWd1cmUiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInJvdXRlciIsIndpbmRvdyIsIl9fY2xlYXJlZExvZ2luIiwibG9jYWxTdG9yYWdlIiwicmVtb3ZlSXRlbSIsImlzTG9nZ2VkSW4iLCJnZXRJdGVtIiwicm9sZSIsInBhdGhuYW1lIiwicmVwbGFjZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/global.css":
/*!***************************!*\
  !*** ./styles/global.css ***!
  \***************************/
/***/ (() => {



/***/ }),

/***/ "@aws-amplify/api":
/*!***********************************!*\
  !*** external "@aws-amplify/api" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = import("@aws-amplify/api");;

/***/ }),

/***/ "aws-amplify":
/*!******************************!*\
  !*** external "aws-amplify" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = import("aws-amplify");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("(pages-dir-node)/./pages/_app.js")));
module.exports = __webpack_exports__;

})();