"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelize = void 0;
/**
 * Camelize string
 */
var camelizeRE = /-(\w)/g;
var camelize = function (str) {
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; });
};
exports.camelize = camelize;
