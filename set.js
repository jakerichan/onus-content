/**
 * Module dependencies
 */

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var register = require('./registry').register;
var unregister = require('./registry').unregister;
var Tunnel = require('react-tunnels').Tunnel
var Set = createReactClass({
  propTypes: {
    prepend: PropTypes.bool,
    append: PropTypes.bool,
    id: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired
  },
  componentWillUnmount: function() {
    unregister(this.props.id, this.props.priority);
  },
  render: function() {
    var _props = this.props
    var location = _props.prepend ? 1 : _props.append ? 2 : 0
    register(_props.id, _props.children, _props.priority, location)

    return React.createElement(Tunnel, _props);
  }
});

exports = module.exports = Set;
exports['default'] = Set;
