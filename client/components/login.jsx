import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], activeUser: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ activeUser: event.target.value });
  }

  handleSubmit(event) {
    alert('User:' + this.state.value);
    event.preventDefault();
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
            <form className='d-flex justify-content-center mt-3' onSubmit={this.handleSubmit}>
              <select style={{ fontSize: '24px' }} className='select-option btn btn-lg btn-group dropdown' type="button" value={this.state.activeUser} onChange={this.handleChange}>
                <option style={{ fontSize: '12px' }} className='dropdown-item' value="Select User">Select User</option>
                <option style={{ fontSize: '12px' }} className='dropdown-item' value="Uzair Ashraf">Uzair Ashraf</option>
                <option style={{ fontSize: '12px' }} className='dropdown-item' value="Tim Davis">Tim Davis</option>
                <option style={{ fontSize: '12px' }} className='dropdown-item' value="Guy Fieri">Guy Fieri</option>
              </select>

            </form>
            <div className='d-flex justify-content-center mt-5'>
              <button className='btn btn-lg login-btn'>Login</button>
            </div>
          </div>

        </div>
      </>
    );
  }
}
