/**
 * gpu.js
 * http://gpu.rocks/
 *
 * GPU Accelerated JavaScript
 *
 * @version 1.2.0
 * @date Fri Apr 27 2018 19:37:56 GMT+0200 (CEST)
 *
 * @license MIT
 * The MIT License
 *
 * Copyright (c) 2018 gpu.js Team
 */
"use strict";(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UtilsCore = require("./utils-core");

module.exports = function () {
	function GPUCore() {
		_classCallCheck(this, GPUCore);
	}

	_createClass(GPUCore, null, [{
		key: "validateKernelObj",


		value: function validateKernelObj(kernelObj) {

			if (kernelObj === null) {
				throw "KernelObj being validated is NULL";
			}

			if (typeof kernelObj === "string") {
				try {
					kernelObj = JSON.parse(kernelObj);
				} catch (e) {
					console.error(e);
					throw "Failed to convert KernelObj from JSON string";
				}

				if (kernelObj === null) {
					throw "Invalid (NULL) KernelObj JSON string representation";
				}
			}

			if (kernelObj.isKernelObj !== true) {
				throw "Failed missing isKernelObj flag check";
			}

			return kernelObj;
		}


	}, {
		key: "loadKernelObj",
		value: function loadKernelObj(kernelObj, inOpt) {

			kernelObj = validateKernelObj(kernelObj);
		}
	}]);

	return GPUCore;
}();
},{"./utils-core":2}],2:[function(require,module,exports){
'use strict';


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UtilsCore = function () {
	function UtilsCore() {
		_classCallCheck(this, UtilsCore);
	}

	_createClass(UtilsCore, null, [{
		key: 'isCanvas',





		value: function isCanvas(canvasObj) {
			return canvasObj !== null && canvasObj.nodeName && canvasObj.getContext && canvasObj.nodeName.toUpperCase() === 'CANVAS';
		}


	}, {
		key: 'isCanvasSupported',
		value: function isCanvasSupported() {
			return _isCanvasSupported;
		}


	}, {
		key: 'initCanvas',
		value: function initCanvas() {
			if (!_isCanvasSupported) {
				return null;
			}

			var canvas = document.createElement('canvas');

			canvas.width = 2;
			canvas.height = 2;

			return canvas;
		}




	}, {
		key: 'isWebGl',
		value: function isWebGl(webGlObj) {
			return webGlObj && typeof webGlObj.getExtension === 'function';
		}


	}, {
		key: 'isWebGlSupported',
		value: function isWebGlSupported() {
			return _isWebGlSupported;
		}
	}, {
		key: 'isWebGlDrawBuffersSupported',
		value: function isWebGlDrawBuffersSupported() {
			return _isWebGlDrawBuffersSupported;
		}


	}, {
		key: 'initWebGlDefaultOptions',
		value: function initWebGlDefaultOptions() {
			return {
				alpha: false,
				depth: false,
				antialias: false
			};
		}


	}, {
		key: 'initWebGl',
		value: function initWebGl(canvasObj) {

			if (typeof _isCanvasSupported !== 'undefined' || canvasObj === null) {
				if (!_isCanvasSupported) {
					return null;
				}
			}

			if (!UtilsCore.isCanvas(canvasObj)) {
				throw new Error('Invalid canvas object - ' + canvasObj);
			}

			var webGl = canvasObj.getContext('experimental-webgl', UtilsCore.initWebGlDefaultOptions()) || canvasObj.getContext('webgl', UtilsCore.initWebGlDefaultOptions());

			if (webGl) {
				webGl.OES_texture_float = webGl.getExtension('OES_texture_float');
				webGl.OES_texture_float_linear = webGl.getExtension('OES_texture_float_linear');
				webGl.OES_element_index_uint = webGl.getExtension('OES_element_index_uint');
			}

			return webGl;
		}


	}, {
		key: 'initWebGl2',
		value: function initWebGl2(canvasObj) {

			if (typeof _isCanvasSupported !== 'undefined' || canvasObj === null) {
				if (!_isCanvasSupported) {
					return null;
				}
			}

			if (!UtilsCore.isCanvas(canvasObj)) {
				throw new Error('Invalid canvas object - ' + canvasObj);
			}

			return canvasObj.getContext('webgl2', UtilsCore.initWebGlDefaultOptions());
		}
	}]);

	return UtilsCore;
}();


var _isCanvasSupported = typeof document !== 'undefined' ? UtilsCore.isCanvas(document.createElement('canvas')) : false;
var _testingWebGl = UtilsCore.initWebGl(UtilsCore.initCanvas());
var _isWebGlSupported = UtilsCore.isWebGl(_testingWebGl);
var _isWebGlDrawBuffersSupported = _isWebGlSupported && Boolean(_testingWebGl.getExtension('WEBGL_draw_buffers'));

if (_isWebGlSupported) {
	UtilsCore.OES_texture_float = _testingWebGl.OES_texture_float;
	UtilsCore.OES_texture_float_linear = _testingWebGl.OES_texture_float_linear;
	UtilsCore.OES_element_index_uint = _testingWebGl.OES_element_index_uint;
} else {
	UtilsCore.OES_texture_float = false;
	UtilsCore.OES_texture_float_linear = false;
	UtilsCore.OES_element_index_uint = false;
}

module.exports = UtilsCore;
},{}],3:[function(require,module,exports){
'use strict';

var GPUCore = require("./core/gpu-core");
if (typeof module !== 'undefined') {
	module.exports = GPUCore;
}
if (typeof window !== 'undefined') {
	window.GPUCore = GPUCore;
	if (window.GPU === null) {
		window.GPU = GPUCore;
	}
}
},{"./core/gpu-core":1}]},{},[3]);
