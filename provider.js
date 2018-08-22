/**
 * Module dependencies
 */

var React = require('react');
var createReactClass = require('create-react-class')
var TunnelProvider = require('react-tunnels').TunnelProvider

var Provider = createReactClass({
  render: function () {
    return React.createElement(TunnelProvider, this.props)
  }
});

exports = module.exports = Provider;
exports.default = Provider;
