"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
test('camelize function test', function () {
    var foo1 = 'get-element-by-id';
    var foo2 = 'Aaa-bbb-ccc';
    var ret1 = util_1.camelize(foo1);
    var ret2 = util_1.camelize(foo2);
    expect(ret1).toBe('getElementById');
    expect(ret2).toBe('AaaBbbCcc');
});
