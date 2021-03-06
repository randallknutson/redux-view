'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class(props, context) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props, context));

    _this.component = _react2.default.createElement('div', null);

    _this.initialize = function () {};

    _this.terminate = function () {};

    _this.componentWillMount = function () {
      _this.initialize(_this.store, _this.props);
    };

    _this.componentWillReceiveProps = function (_ref) {
      var params = _ref.params,
          location = _ref.location;

      // If params or location have changed we are on a new page.
      if (!(0, _isEqual2.default)(params, _this.props.params) || location !== _this.props.location) {
        _this.terminate(_this.store, _this.props);
        _this.initialize(_this.store, _this.props);
      }
    };

    _this.componentWillUnmount = function () {
      _this.terminate(_this.store, _this.props);
    };

    _this.render = function () {
      var Component = _this.connect(_this.mapStateToProps, _this.mapDispatchToProps, _this.mergeProps, _this.options)(_this.component);
      return _react2.default.createElement(Component, _this.props);
    };

    _this.store = context.store;

    _this.connect = _this.connect || _reactRedux.connect;
    return _this;
  }

  return _class;
}(_react.Component);

_class.contextTypes = {
  store: _propTypes2.default.object
};
exports.default = _class;