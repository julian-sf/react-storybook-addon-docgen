"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Shape = _interopRequireDefault(require("./Shape"));

var _OneOfType = _interopRequireDefault(require("./OneOfType"));

var _ArrayOf = _interopRequireDefault(require("./ArrayOf"));

var _ObjectOf = _interopRequireDefault(require("./ObjectOf"));

var _OneOf = _interopRequireDefault(require("./OneOf"));

var _InstanceOf = _interopRequireDefault(require("./InstanceOf"));

var _Signature = _interopRequireDefault(require("./Signature"));

var _Literal = _interopRequireDefault(require("./Literal"));

var _proptypes = require("./proptypes");

// propType -> Component map - these are a bit more complex prop types to display
var propTypeComponentMap = new Map([['shape', _Shape.default], ['union', _OneOfType.default], ['arrayOf', _ArrayOf.default], ['objectOf', _ObjectOf.default], // Might be overkill to have below proptypes as separate components *shrug*
['literal', _Literal.default], ['enum', _OneOf.default], ['instanceOf', _InstanceOf.default], ['signature', _Signature.default]]);

var PrettyPropType = function PrettyPropType(props) {
  var propType = props.propType,
      depth = props.depth;

  if (!propType) {
    return _react.default.createElement("span", null, "unknown");
  }

  var _ref = propType || {},
      name = _ref.name;

  if (propTypeComponentMap.has(name)) {
    var Component = propTypeComponentMap.get(name);
    return _react.default.createElement(Component, {
      propType: propType,
      depth: depth
    });
  } // Otherwise, propType does not have a dedicated component, display proptype name by default


  return _react.default.createElement("span", null, name);
};

PrettyPropType.displayName = 'PrettyPropType';
PrettyPropType.defaultProps = {
  propType: null,
  depth: 1
};
PrettyPropType.propTypes = {
  propType: _proptypes.TypeInfo,
  depth: _propTypes.default.number
};
var _default = PrettyPropType;
exports.default = _default;