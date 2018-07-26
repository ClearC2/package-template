'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PackageSubcomponent = undefined;

var _PackageSubcomponent = require('./PackageSubcomponent');

Object.defineProperty(exports, 'PackageSubcomponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PackageSubcomponent).default;
  }
});

var _PackageComponent = require('./PackageComponent');

var _PackageComponent2 = _interopRequireDefault(_PackageComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PackageComponent2.default;