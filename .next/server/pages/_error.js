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
exports.id = "pages/_error";
exports.ids = ["pages/_error"];
exports.modules = {

/***/ "(pages-dir-node)/./amplify/config.js":
/*!***************************!*\
  !*** ./amplify/config.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   API: () => (/* binding */ API),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var aws_amplify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-amplify */ \"aws-amplify\");\n/* harmony import */ var _aws_amplify_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/api */ \"@aws-amplify/api\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([aws_amplify__WEBPACK_IMPORTED_MODULE_0__, _aws_amplify_api__WEBPACK_IMPORTED_MODULE_1__]);\n([aws_amplify__WEBPACK_IMPORTED_MODULE_0__, _aws_amplify_api__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n// amplify/config.js\n\n\nconst amplifyConfig = {\n    aws_project_region: 'eu-west-2',\n    aws_cloud_logic_custom: [\n        {\n            name: 'ScheduleDeviceAPI',\n            endpoint: 'https://84xlf53soa.execute-api.eu-west-2.amazonaws.com/dev',\n            region: 'eu-west-2'\n        }\n    ]\n};\naws_amplify__WEBPACK_IMPORTED_MODULE_0__.Amplify.configure(amplifyConfig);\nconsole.log('AmplifyAPI from config:', _aws_amplify_api__WEBPACK_IMPORTED_MODULE_1__);\nconst API = _aws_amplify_api__WEBPACK_IMPORTED_MODULE_1__.API;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (amplifyConfig);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2FtcGxpZnkvY29uZmlnLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDa0I7QUFDUztBQUUvQyxNQUFNRSxnQkFBZ0I7SUFDcEJDLG9CQUFvQjtJQUNwQkMsd0JBQXdCO1FBQ3RCO1lBQ0VDLE1BQU07WUFDTkMsVUFBVTtZQUNWQyxRQUFRO1FBQ1Y7S0FDRDtBQUNIO0FBQ0FQLGdEQUFPQSxDQUFDUSxTQUFTLENBQUNOO0FBQ2xCTyxRQUFRQyxHQUFHLENBQUMsMkJBQTRCVCw2Q0FBVUE7QUFDM0MsTUFBTVUsTUFBTVYsaURBQWMsQ0FBQztBQUNsQyxpRUFBZUMsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxIUFxcRG9jdW1lbnRzXFxZZWFyIDNcXENvbXB1dGluZyBQcm9qZWN0XFxXZWJBcHBcXGFtcGxpZnlcXGNvbmZpZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhbXBsaWZ5L2NvbmZpZy5qc1xyXG5pbXBvcnQgeyBBbXBsaWZ5IH0gZnJvbSAnYXdzLWFtcGxpZnknO1xyXG5pbXBvcnQgKiBhcyBBbXBsaWZ5QVBJIGZyb20gJ0Bhd3MtYW1wbGlmeS9hcGknO1xyXG5cclxuY29uc3QgYW1wbGlmeUNvbmZpZyA9IHtcclxuICBhd3NfcHJvamVjdF9yZWdpb246ICdldS13ZXN0LTInLFxyXG4gIGF3c19jbG91ZF9sb2dpY19jdXN0b206IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ1NjaGVkdWxlRGV2aWNlQVBJJyxcclxuICAgICAgZW5kcG9pbnQ6ICdodHRwczovLzg0eGxmNTNzb2EuZXhlY3V0ZS1hcGkuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb20vZGV2JyxcclxuICAgICAgcmVnaW9uOiAnZXUtd2VzdC0yJyxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuQW1wbGlmeS5jb25maWd1cmUoYW1wbGlmeUNvbmZpZyk7XHJcbmNvbnNvbGUubG9nKCdBbXBsaWZ5QVBJIGZyb20gY29uZmlnOicgLCBBbXBsaWZ5QVBJKTtcclxuZXhwb3J0IGNvbnN0IEFQSSA9IEFtcGxpZnlBUEkuQVBJO1xyXG5leHBvcnQgZGVmYXVsdCBhbXBsaWZ5Q29uZmlnOyJdLCJuYW1lcyI6WyJBbXBsaWZ5IiwiQW1wbGlmeUFQSSIsImFtcGxpZnlDb25maWciLCJhd3NfcHJvamVjdF9yZWdpb24iLCJhd3NfY2xvdWRfbG9naWNfY3VzdG9tIiwibmFtZSIsImVuZHBvaW50IiwicmVnaW9uIiwiY29uZmlndXJlIiwiY29uc29sZSIsImxvZyIsIkFQSSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./amplify/config.js\n");

/***/ }),

/***/ "(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F_error&preferredRegion=&absolutePagePath=private-next-pages%2F_error&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F_error&preferredRegion=&absolutePagePath=private-next-pages%2F_error&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   getServerSideProps: () => (/* binding */ getServerSideProps),\n/* harmony export */   getStaticPaths: () => (/* binding */ getStaticPaths),\n/* harmony export */   getStaticProps: () => (/* binding */ getStaticProps),\n/* harmony export */   reportWebVitals: () => (/* binding */ reportWebVitals),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   unstable_getServerProps: () => (/* binding */ unstable_getServerProps),\n/* harmony export */   unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),\n/* harmony export */   unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),\n/* harmony export */   unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),\n/* harmony export */   unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/pages/module.compiled */ \"(pages-dir-node)/./node_modules/next/dist/server/route-modules/pages/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(pages-dir-node)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(pages-dir-node)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! private-next-pages/_document */ \"(pages-dir-node)/./pages/_document.js\");\n/* harmony import */ var private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! private-next-pages/_app */ \"(pages-dir-node)/./pages/_app.js\");\n/* harmony import */ var private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! private-next-pages/_error */ \"(pages-dir-node)/./node_modules/next/dist/pages/_error.js\");\n/* harmony import */ var private_next_pages_error__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__]);\nprivate_next_pages_app__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n// Import the app and document modules.\n\n\n// Import the userland code.\n\n// Re-export the component (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'default'));\n// Re-export methods.\nconst getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'getStaticProps');\nconst getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'getStaticPaths');\nconst getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'getServerSideProps');\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'config');\nconst reportWebVitals = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'reportWebVitals');\n// Re-export legacy methods.\nconst unstable_getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticProps');\nconst unstable_getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticPaths');\nconst unstable_getStaticParams = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticParams');\nconst unstable_getServerProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerProps');\nconst unstable_getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerSideProps');\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES,\n        page: \"/_error\",\n        pathname: \"/_error\",\n        // The following aren't used in production.\n        bundlePath: '',\n        filename: ''\n    },\n    components: {\n        // default export might not exist when optimized for data only\n        App: private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n        Document: private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n    },\n    userland: private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__\n});\n\n//# sourceMappingURL=pages.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtcm91dGUtbG9hZGVyL2luZGV4LmpzP2tpbmQ9UEFHRVMmcGFnZT0lMkZfZXJyb3ImcHJlZmVycmVkUmVnaW9uPSZhYnNvbHV0ZVBhZ2VQYXRoPXByaXZhdGUtbmV4dC1wYWdlcyUyRl9lcnJvciZhYnNvbHV0ZUFwcFBhdGg9cHJpdmF0ZS1uZXh0LXBhZ2VzJTJGX2FwcCZhYnNvbHV0ZURvY3VtZW50UGF0aD1wcml2YXRlLW5leHQtcGFnZXMlMkZfZG9jdW1lbnQmbWlkZGxld2FyZUNvbmZpZ0Jhc2U2ND1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdGO0FBQ2hDO0FBQ0U7QUFDMUQ7QUFDeUQ7QUFDVjtBQUMvQztBQUNzRDtBQUN0RDtBQUNBLGlFQUFlLHdFQUFLLENBQUMscURBQVEsWUFBWSxFQUFDO0FBQzFDO0FBQ08sdUJBQXVCLHdFQUFLLENBQUMscURBQVE7QUFDckMsdUJBQXVCLHdFQUFLLENBQUMscURBQVE7QUFDckMsMkJBQTJCLHdFQUFLLENBQUMscURBQVE7QUFDekMsZUFBZSx3RUFBSyxDQUFDLHFEQUFRO0FBQzdCLHdCQUF3Qix3RUFBSyxDQUFDLHFEQUFRO0FBQzdDO0FBQ08sZ0NBQWdDLHdFQUFLLENBQUMscURBQVE7QUFDOUMsZ0NBQWdDLHdFQUFLLENBQUMscURBQVE7QUFDOUMsaUNBQWlDLHdFQUFLLENBQUMscURBQVE7QUFDL0MsZ0NBQWdDLHdFQUFLLENBQUMscURBQVE7QUFDOUMsb0NBQW9DLHdFQUFLLENBQUMscURBQVE7QUFDekQ7QUFDTyx3QkFBd0Isa0dBQWdCO0FBQy9DO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhLDhEQUFXO0FBQ3hCLGtCQUFrQixtRUFBZ0I7QUFDbEMsS0FBSztBQUNMLFlBQVk7QUFDWixDQUFDOztBQUVELGlDIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnZXNSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvcGFnZXMvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBob2lzdCB9IGZyb20gXCJuZXh0L2Rpc3QvYnVpbGQvdGVtcGxhdGVzL2hlbHBlcnNcIjtcbi8vIEltcG9ydCB0aGUgYXBwIGFuZCBkb2N1bWVudCBtb2R1bGVzLlxuaW1wb3J0ICogYXMgZG9jdW1lbnQgZnJvbSBcInByaXZhdGUtbmV4dC1wYWdlcy9fZG9jdW1lbnRcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwicHJpdmF0ZS1uZXh0LXBhZ2VzL19hcHBcIjtcbi8vIEltcG9ydCB0aGUgdXNlcmxhbmQgY29kZS5cbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJwcml2YXRlLW5leHQtcGFnZXMvX2Vycm9yXCI7XG4vLyBSZS1leHBvcnQgdGhlIGNvbXBvbmVudCAoc2hvdWxkIGJlIHRoZSBkZWZhdWx0IGV4cG9ydCkuXG5leHBvcnQgZGVmYXVsdCBob2lzdCh1c2VybGFuZCwgJ2RlZmF1bHQnKTtcbi8vIFJlLWV4cG9ydCBtZXRob2RzLlxuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1Byb3BzID0gaG9pc3QodXNlcmxhbmQsICdnZXRTdGF0aWNQcm9wcycpO1xuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1BhdGhzID0gaG9pc3QodXNlcmxhbmQsICdnZXRTdGF0aWNQYXRocycpO1xuZXhwb3J0IGNvbnN0IGdldFNlcnZlclNpZGVQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAnZ2V0U2VydmVyU2lkZVByb3BzJyk7XG5leHBvcnQgY29uc3QgY29uZmlnID0gaG9pc3QodXNlcmxhbmQsICdjb25maWcnKTtcbmV4cG9ydCBjb25zdCByZXBvcnRXZWJWaXRhbHMgPSBob2lzdCh1c2VybGFuZCwgJ3JlcG9ydFdlYlZpdGFscycpO1xuLy8gUmUtZXhwb3J0IGxlZ2FjeSBtZXRob2RzLlxuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFN0YXRpY1Byb3BzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTdGF0aWNQcm9wcycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFN0YXRpY1BhdGhzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTdGF0aWNQYXRocycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFN0YXRpY1BhcmFtcyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U3RhdGljUGFyYW1zJyk7XG5leHBvcnQgY29uc3QgdW5zdGFibGVfZ2V0U2VydmVyUHJvcHMgPSBob2lzdCh1c2VybGFuZCwgJ3Vuc3RhYmxlX2dldFNlcnZlclByb3BzJyk7XG5leHBvcnQgY29uc3QgdW5zdGFibGVfZ2V0U2VydmVyU2lkZVByb3BzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTZXJ2ZXJTaWRlUHJvcHMnKTtcbi8vIENyZWF0ZSBhbmQgZXhwb3J0IHRoZSByb3V0ZSBtb2R1bGUgdGhhdCB3aWxsIGJlIGNvbnN1bWVkLlxuZXhwb3J0IGNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IFBhZ2VzUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLlBBR0VTLFxuICAgICAgICBwYWdlOiBcIi9fZXJyb3JcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL19lcnJvclwiLFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGFyZW4ndCB1c2VkIGluIHByb2R1Y3Rpb24uXG4gICAgICAgIGJ1bmRsZVBhdGg6ICcnLFxuICAgICAgICBmaWxlbmFtZTogJydcbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgLy8gZGVmYXVsdCBleHBvcnQgbWlnaHQgbm90IGV4aXN0IHdoZW4gb3B0aW1pemVkIGZvciBkYXRhIG9ubHlcbiAgICAgICAgQXBwOiBhcHAuZGVmYXVsdCxcbiAgICAgICAgRG9jdW1lbnQ6IGRvY3VtZW50LmRlZmF1bHRcbiAgICB9LFxuICAgIHVzZXJsYW5kXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZXMuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F_error&preferredRegion=&absolutePagePath=private-next-pages%2F_error&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/global.css */ \"(pages-dir-node)/./styles/global.css\");\n/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_global_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var aws_amplify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aws-amplify */ \"aws-amplify\");\n/* harmony import */ var _amplify_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../amplify/config */ \"(pages-dir-node)/./amplify/config.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([aws_amplify__WEBPACK_IMPORTED_MODULE_2__, _amplify_config__WEBPACK_IMPORTED_MODULE_3__]);\n([aws_amplify__WEBPACK_IMPORTED_MODULE_2__, _amplify_config__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\naws_amplify__WEBPACK_IMPORTED_MODULE_2__.Amplify.configure(_amplify_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\nfunction MyApp({ Component, pageProps }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)({\n        \"MyApp.useEffect\": ()=>{\n            if (false) {}\n            const isLoggedIn = !!localStorage.getItem('username');\n            const role = localStorage.getItem('userRole');\n            if (!isLoggedIn && router.pathname !== '/') {\n                router.replace('/');\n            }\n            if (isLoggedIn && router.pathname === '/') {\n                router.replace('/home');\n            }\n            if ((role === 'Family' || role === 'Guest') && router.pathname === '/chart') {\n                router.replace('/home');\n            }\n        }\n    }[\"MyApp.useEffect\"], [\n        router\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\HP\\\\Documents\\\\Year 3\\\\Computing Project\\\\WebApp\\\\pages\\\\_app.js\",\n        lineNumber: 35,\n        columnNumber: 10\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQThCO0FBQ1E7QUFDSTtBQUNSO0FBQ007QUFFeENBLGdEQUFPQSxDQUFDSSxTQUFTLENBQUNILHVEQUFTQTtBQUVaLFNBQVNJLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDcEQsTUFBTUMsU0FBU0wsc0RBQVNBO0lBRXhCRCxnREFBU0E7MkJBQUM7WUFDUixJQUFJLEtBQXVELEVBQUUsRUFJNUQ7WUFFRCxNQUFNVyxhQUFhLENBQUMsQ0FBQ0YsYUFBYUcsT0FBTyxDQUFDO1lBQzFDLE1BQU1DLE9BQU9KLGFBQWFHLE9BQU8sQ0FBQztZQUVsQyxJQUFJLENBQUNELGNBQWNMLE9BQU9RLFFBQVEsS0FBSyxLQUFLO2dCQUMxQ1IsT0FBT1MsT0FBTyxDQUFDO1lBQ2pCO1lBRUEsSUFBSUosY0FBY0wsT0FBT1EsUUFBUSxLQUFLLEtBQUs7Z0JBQ3pDUixPQUFPUyxPQUFPLENBQUM7WUFDakI7WUFFQSxJQUFJLENBQUNGLFNBQVMsWUFBWUEsU0FBUyxPQUFNLEtBQU1QLE9BQU9RLFFBQVEsS0FBSyxVQUFVO2dCQUMzRVIsT0FBT1MsT0FBTyxDQUFDO1lBQ2pCO1FBQ0Y7MEJBQUc7UUFBQ1Q7S0FBTztJQUVYLHFCQUFPLDhEQUFDRjtRQUFXLEdBQUdDLFNBQVM7Ozs7OztBQUNqQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxIUFxcRG9jdW1lbnRzXFxZZWFyIDNcXENvbXB1dGluZyBQcm9qZWN0XFxXZWJBcHBcXHBhZ2VzXFxfYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbC5jc3MnO1xyXG5pbXBvcnQgeyBBbXBsaWZ5IH0gZnJvbSAnYXdzLWFtcGxpZnknO1xyXG5pbXBvcnQgYXdzY29uZmlnIGZyb20gJy4uL2FtcGxpZnkvY29uZmlnJztcclxuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XHJcblxyXG5BbXBsaWZ5LmNvbmZpZ3VyZShhd3Njb25maWcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgIXdpbmRvdy5fX2NsZWFyZWRMb2dpbikge1xyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcm5hbWUnKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJSb2xlJyk7XHJcbiAgICAgIHdpbmRvdy5fX2NsZWFyZWRMb2dpbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNMb2dnZWRJbiA9ICEhbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJuYW1lJyk7XHJcbiAgICBjb25zdCByb2xlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJSb2xlJyk7XHJcblxyXG4gICAgaWYgKCFpc0xvZ2dlZEluICYmIHJvdXRlci5wYXRobmFtZSAhPT0gJy8nKSB7XHJcbiAgICAgIHJvdXRlci5yZXBsYWNlKCcvJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzTG9nZ2VkSW4gJiYgcm91dGVyLnBhdGhuYW1lID09PSAnLycpIHtcclxuICAgICAgcm91dGVyLnJlcGxhY2UoJy9ob21lJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKChyb2xlID09PSAnRmFtaWx5JyB8fCByb2xlID09PSAnR3Vlc3QnKSAmJiByb3V0ZXIucGF0aG5hbWUgPT09ICcvY2hhcnQnKSB7XHJcbiAgICAgIHJvdXRlci5yZXBsYWNlKCcvaG9tZScpO1xyXG4gICAgfVxyXG4gIH0sIFtyb3V0ZXJdKTtcclxuXHJcbiAgcmV0dXJuIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz47XHJcbn1cclxuIl0sIm5hbWVzIjpbIkFtcGxpZnkiLCJhd3Njb25maWciLCJ1c2VFZmZlY3QiLCJ1c2VSb3V0ZXIiLCJjb25maWd1cmUiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInJvdXRlciIsIndpbmRvdyIsIl9fY2xlYXJlZExvZ2luIiwibG9jYWxTdG9yYWdlIiwicmVtb3ZlSXRlbSIsImlzTG9nZ2VkSW4iLCJnZXRJdGVtIiwicm9sZSIsInBhdGhuYW1lIiwicmVwbGFjZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_document.js":
/*!****************************!*\
  !*** ./pages/_document.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Document)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ \"(pages-dir-node)/./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction Document() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                    href: \"https://fonts.googleapis.com/css?family=Poppins\",\n                    rel: \"stylesheet\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\HP\\\\Documents\\\\Year 3\\\\Computing Project\\\\WebApp\\\\pages\\\\_document.js\",\n                    lineNumber: 7,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\HP\\\\Documents\\\\Year 3\\\\Computing Project\\\\WebApp\\\\pages\\\\_document.js\",\n                lineNumber: 6,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\HP\\\\Documents\\\\Year 3\\\\Computing Project\\\\WebApp\\\\pages\\\\_document.js\",\n                        lineNumber: 10,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\HP\\\\Documents\\\\Year 3\\\\Computing Project\\\\WebApp\\\\pages\\\\_document.js\",\n                        lineNumber: 11,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\HP\\\\Documents\\\\Year 3\\\\Computing Project\\\\WebApp\\\\pages\\\\_document.js\",\n                lineNumber: 9,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\HP\\\\Documents\\\\Year 3\\\\Computing Project\\\\WebApp\\\\pages\\\\_document.js\",\n        lineNumber: 5,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19kb2N1bWVudC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBNkQ7QUFFOUMsU0FBU0k7SUFDdEIscUJBQ0UsOERBQUNKLCtDQUFJQTs7MEJBQ0gsOERBQUNDLCtDQUFJQTswQkFDSCw0RUFBQ0k7b0JBQUtDLE1BQUs7b0JBQWtEQyxLQUFJOzs7Ozs7Ozs7OzswQkFFbkUsOERBQUNDOztrQ0FDQyw4REFBQ04sK0NBQUlBOzs7OztrQ0FDTCw4REFBQ0MscURBQVVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQUluQiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxIUFxcRG9jdW1lbnRzXFxZZWFyIDNcXENvbXB1dGluZyBQcm9qZWN0XFxXZWJBcHBcXHBhZ2VzXFxfZG9jdW1lbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHRtbCwgSGVhZCwgTWFpbiwgTmV4dFNjcmlwdCB9IGZyb20gJ25leHQvZG9jdW1lbnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRG9jdW1lbnQoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxIdG1sPlxyXG4gICAgICA8SGVhZD5cclxuICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVBvcHBpbnNcIiByZWw9XCJzdHlsZXNoZWV0XCIgLz5cclxuICAgICAgPC9IZWFkPlxyXG4gICAgICA8Ym9keT5cclxuICAgICAgICA8TWFpbiAvPlxyXG4gICAgICAgIDxOZXh0U2NyaXB0IC8+XHJcbiAgICAgIDwvYm9keT5cclxuICAgIDwvSHRtbD5cclxuICApO1xyXG59Il0sIm5hbWVzIjpbIkh0bWwiLCJIZWFkIiwiTWFpbiIsIk5leHRTY3JpcHQiLCJEb2N1bWVudCIsImxpbmsiLCJocmVmIiwicmVsIiwiYm9keSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_document.js\n");

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

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F_error&preferredRegion=&absolutePagePath=private-next-pages%2F_error&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();