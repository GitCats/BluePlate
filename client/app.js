var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var App = require('./views/main.jsx');
var AllDeals = require('./views/allDeals.jsx');
var OwnerProfile = require('./views/ownerProfile.jsx');
var UserProfile = require('./views/userProfile.jsx');


//The top level route will always be in view -- acts as a shell so needs a
//this.props.children where the other views will be switched in and out.
//IndexRoute is the default view - what you'd see if you went to that top-
//level URL. See render method in main.jsx.

ReactDOM.render((
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={AllDeals} />
      <Route path='ownerprofile' component={OwnerProfile} />
      <Route path='userprofile' component={UserProfile} />
    </Route>
  </Router>
),
document.getElementById('app'));
