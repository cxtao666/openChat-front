(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MyLibrary = {}));
})(this, (function (exports) { 'use strict';

	var chatName = 'chatApp';
	var docName = 'cloudDoc';

	exports.chatName = chatName;
	exports.docName = docName;

}));
