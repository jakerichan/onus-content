/**
 * Module dependencies
 */

var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class')
var TunnelPlaceholder = require('react-tunnels').TunnelPlaceholder;
var findDeepest = require('./registry').findDeepest
var Get = createReactClass({
  propTypes: {
    id: PropTypes.string.isRequired
  },
  render: function () {
    var _props = this.props
    return React.createElement(TunnelPlaceholder, {
      id: _props.id,
      children: function(p) {
        if (p.items && p.items[0] && p.items[0].append) console.log(findDeepest(_props.id));
        return React.createElement(React.Fragment, {children: findDeepest(_props.id)})
      },
      multiple: true
    })
  }
});

exports = module.exports = Get;
exports.default = Get;
