//might not need all of these - only $ react, reactdom, auth, link from SO
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link
var IndexLink = require('react-router').IndexLink;

var App = React.createClass({
  render: function() {
    return (
      <div className="logoDiv">
        <IndexLink to='/'><img src="client/assets/blueplate.png" className="bluePlateLogo" /></IndexLink>
        {this.props.children}
      </div>
    );
  }
});


module.exports = App;

