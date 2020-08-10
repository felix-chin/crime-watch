import React from 'react';
import Header from './Header';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], activeUser: '' };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data });
      });
  }

  render() {
    return (
      <>
        <div className='container login-container btn-color'>

          <div className='main'>
            <div className="logo">
              <img className="logo" src="../images/logo.png"></img>
            </div>
            <header className="header d-flex justify-content-center">
              <h1 className="login-title">Crime <span className="crime-icon"><i className="fas fa-search" style={{ color: 'black' }}></i></span> Watch</h1>
            </header>
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </div>

        </div>
      </>
    );
  }
}
