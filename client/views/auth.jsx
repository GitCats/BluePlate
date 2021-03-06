var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');
var Link = require('react-router').Link;

/*
By default the modal is anchored to document.body. All of the following overrides are available.

* element
Modal.setAppElement(appElement);

* query selector - uses the first element found if you pass in a class.
Modal.setAppElement('#your-app-element');

*/

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    fontFamily            : 'Roboto, sans-serif',
    fontWeight            : '500',
    fontSize              : '1.2em',    
    backgroundColor       : 'rgba(224, 224, 224, .9)'
  }
};


var Auth = React.createClass({

  render: function() {
    return (
      <div>
        <br/>
        <nav className='navbar navbar-default'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <Link to='/'><span className='navbar-brand glyphicon glyphicon-home' onClick={this.props.navToHome} /></Link>
              <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
              </button>
            </div>
            <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
              <ul className='nav navbar-nav navbar-left'>
                <li><UserSignup userAuth={this.props.userAuth} 
                      setUserAuthState={this.props.setUserAuthState} 
                      history={this.props.history}
                      className='sr-only' /></li>
                <li><UserLogin  userAuth={this.props.userAuth} 
                      setUserAuthState={this.props.setUserAuthState} 
                      history={this.props.history} /></li>
                <li><Links userLink={this.props.userLink} 
                      ownerLink={this.props.ownerLink} 
                      undoLink={this.props.undoLink} /></li>
                <li><Logout logoutLink={this.props.logoutLink} 
                      setLogoutUpdate={this.props.setLogoutUpdate} /></li>
              </ul>
              <OwnerAuth ownerAuth={this.props.ownerAuth} 
                setOwnerAuthState={this.props.setOwnerAuthState}
                history={this.props.history} />
            </div>
          </div>
        </nav>
      </div>
    )
  }
});

var UserSignup = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },

  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },

  signUp: function(e) {
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if (!email || !password) {
      alert('You must complete the form to sign up.')
      return;
    }
    var signUpRequest = { email: email, password: password };
    $.ajax({
      url: 'api/login/signup',
      dataType: 'text',
      type: 'POST',
      data: signUpRequest,
      success: function(res) {
        var response = JSON.parse(res);
        localStorage.setItem('user', signUpRequest.email);
        localStorage.setItem('token', response.token);
        localStorage.setItem('expires', response.expires);
        localStorage.setItem('user_id', response.id);
        this.closeModal();
        this.props.setUserAuthState();
        this.props.history.push('/userprofile');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('XHR:', xhr, '\nstatus:', status, '\nError:', err.toString());
        this.setState({email: '', password: ''});
        xhr.status === 401 ? alert('Someone already signed up with that email address.') : null;
      }.bind(this)
    });
  },

  render: function() {
    if (this.props.userAuth) {
      return (
        <span>
          <a onClick={this.openModal}>Sign Up</a>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles} >
            <br/>
            <img src='client/assets/x-sm-gray.png' onClick={this.closeModal} style={{float: 'right', maxWidth: '10px', cursor: 'pointer' }} />
            <br/>
            <h2>Sign Up for Notifications</h2>
            <form className='signupForm' onSubmit={this.signUp}>
              Email: <input
                      className='email'
                      type='email'
                      size='24'
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                      /><br/>
              Password: <input
                        className='password'
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        type='password'
                        /><br/><br/>
              <input type='submit' value='Sign Up' /><br/><br/>
            </form>
          </Modal>
        </span>
      )
    } else {
      return (
        <span />
      )
    }
  }
});

var UserLogin = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },

  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },

  login: function(e) {
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if (!email || !password) {
      alert('You must complete the form to log in.')
      return;
    }
    var loginRequest = { email: email, password: password };
    $.ajax({
      url: 'api/login/signin',
      dataType: 'text',
      type: 'POST',
      data: loginRequest,
      success: function(res) {
        var response = JSON.parse(res);
        localStorage.setItem('user', loginRequest.email);
        localStorage.setItem('user_id', response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('expires', response.expires);
        this.closeModal();
        this.props.setUserAuthState();
        this.props.history.push('/userprofile');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('XHR:', xhr, '\nstatus:', status, '\nError:', err.toString());
        this.setState({email: '', password: ''});
        xhr.status !== 200 ? alert('Incorrect username or password.') : null;
      }.bind(this)
    });
  },

  render: function() {
    if (this.props.userAuth) {
      return (
        <span>
        <a onClick={this.openModal}>Sign In</a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <br/>
          <img src='client/assets/x-sm-gray.png' onClick={this.closeModal} style={{float: 'right', maxWidth: '10px', cursor: 'pointer' }} />
          <br/>
          <h2>Log In to Manage Notifications</h2>
          <form className='loginForm' onSubmit={this.login}>
            Email: <input
                    className='email'
                    type='email'
                    size='24'
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    /><br/>
            Password: <input
                      className='password'
                      value={this.state.password}
                      type='password'
                      onChange={this.handlePasswordChange}
                      /><br/><br/>
            <input type='submit' value='Log In' /><br/><br/>
          </form>
        </Modal>
        </span>
      )
    } else {
      return (
        <span />
      )
    }
  }
});

var OwnerAuth = React.createClass({

  getInitialState: function() {
    return { modal1IsOpen: false, modal2IsOpen: false };
  },

  openModal1: function() {
    this.setState({modal1IsOpen: true});
  },

  openModal2: function() {
    this.setState({modal2IsOpen: true});
  },

  closeModal1: function() {
    this.setState({modal1IsOpen: false});
  },

  closeModal2: function() {
    this.setState({modal2IsOpen: false});
  },

  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },

  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },

  ownerLogin: function(e) {
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if (!email || !password) {
      alert('You must complete the form to log in.')
      return;
    }
    var ownerLoginRequest = { username: email, password: password };
    $.ajax({
      url: 'api/owner/login',
      dataType: 'text',
      type: 'POST',
      data: ownerLoginRequest,
      success: function(res) {
        var response = JSON.parse(res);
        localStorage.setItem('user', ownerLoginRequest.username);
        localStorage.setItem('restaurant_id', response.restaurant_id);
        localStorage.setItem('token', response.token);
        localStorage.setItem('expires', response.expires);
        this.closeModal2();
        this.props.setOwnerAuthState();
        this.props.history.push('/ownerprofile');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('XHR:', xhr, '\nstatus:', status, '\nError:', err.toString());
        this.setState({email: '', password: ''});
        xhr.status !== 200 ? alert('Incorrect username or password.') : null;
      }.bind(this)
    });
  },

  render: function() {
    if (this.props.ownerAuth) {
      return (
        <ul className='nav navbar-nav navbar-right'>
          <li className='dropdown'>
          <a className='dropdown-toggle' 
             data-toggle='dropdown' role='button' 
             aria-haspopup='true' aria-expanded='false'>Restaurant Owners <span className='caret'></span></a>
            <ul className='dropdown-menu'>
              <li><span>
                    <a onClick={this.openModal1}>Sign Up</a>
                    <Modal
                      isOpen={this.state.modal1IsOpen}
                      onRequestClose={this.closeModal1}
                      style={customStyles} >
                      <img src='client/assets/x-sm-gray.png' onClick={this.closeModal1} style={{float: 'right', maxWidth: '10px', cursor: 'pointer' }} />
                      <h2>Call us at (512) 555-5555 to register an account.</h2>
                    </Modal>
                  </span></li>
              <li><span>
                    <a onClick={this.openModal2}>Sign In</a>
                    <Modal
                      isOpen={this.state.modal2IsOpen}
                      onRequestClose={this.closeModal2}
                      style={customStyles} >
                      <br/>
                      <img src='client/assets/x-sm-gray.png' onClick={this.closeModal2} style={{float: 'right', maxWidth: '10px', cursor: 'pointer' }} />
                      <br/>
                      <h2>Log In to Manage Deals</h2>
                      <form className='loginForm' onSubmit={this.ownerLogin}>
                        Email: <input
                                className='email'
                                value={this.state.email}
                                size='24'
                                type='email'
                                onChange={this.handleEmailChange}
                                /><br/>
                        Password: <input
                                  className='password'
                                  value={this.state.password}
                                  type='password'
                                  onChange={this.handlePasswordChange}
                                  /><br/><br/>
                        <input type='submit' value='Log In' /><br/><br/>
                      </form>
                    </Modal>
                  </span></li>
            </ul>
          </li>
        </ul>
      )
    } else {
      return (
        <span />
      )
    }
  }
});

var Links = React.createClass({

  render: function() {
    if (this.props.ownerLink && !this.props.userLink) {
      return (
        <Link to='/ownerprofile' onClick={this.props.undoLink} className='navbar-brand'>Restaurant Profile</Link>
      )
    } else if (this.props.userLink && !this.props.ownerLink) {
      return (
        <Link to='/userprofile' onClick={this.props.undoLink} className='navbar-brand'>Preferences</Link>
      )
    } else {
      return (
        <span />
      )
    }
  }
});

var Logout = React.createClass({

  signout: function() {
    localStorage.clear();
    this.props.setLogoutUpdate();
  },

  render: function() {
    if (this.props.logoutLink) {
      return (
        <Link to='/' onClick={this.signout} className='navbar-brand'>Logout</Link>
      )
    } else {
      return (
        <span />
      )
    }
  }
});

module.exports.auth = Auth;

