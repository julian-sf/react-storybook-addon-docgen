"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _PrettyPropType = _interopRequireDefault(require("./PrettyPropType"));

var _proptypes = require("./proptypes");

var OneOfType = function OneOfType(_ref) {
  var propType = _ref.propType;
  var propTypes = (0, _proptypes.getPropTypes)(propType);
  return _react.default.createElement("span", null, propTypes.map(function (value, i) {
    return [_react.default.createElement(_PrettyPropType.default, {
      key: i,
      propType: value
    }), i < propTypes.length - 1 ? _react.default.createElement("span", {
      key: "".concat(i, "-separator")
    }, " | ") : null];
  }).reduce(function (acc, tuple) {
    return acc.concat(tuple);
  }, []));
};

OneOfType.propTypes = {
  propType: _proptypes.TypeInfo.isRequired
};
var _default = OneOfType;
exports.default = _default;