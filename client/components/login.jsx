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
    event.preventDefault();
    const setView = this.props.setView;
    const getProfile = this.props.getProfile;
    getProfile(this.state.activeUser);
    setView('search', {});
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
            <div className="ml-2">
              <img className="logo" src="../images/logo.png"></img>
            </div>
            <header className="header d-flex justify-content-center">
              <h1 className="login-title">Crime<i className="fas fa-search" style={{ color: 'black' }}></i>Watch</h1>
            </header>
            <form className='d-flex flex-column justify-content-center align-items-center mt-3' onSubmit={this.handleSubmit}>
              <p>Select user to log in</p>
              <select style={{ fontSize: '18px' }} className='select-option btn btn-group dropdown roboto-font w-75' type="button" value={this.state.activeUser} required onChange={this.handleChange}>
                <option style={{ fontSize: '12px' }} className='dropdown-item' value="" disabled >Select User</option>
                <option style={{ fontSize: '12px' }} className='dropdown-item' value="1">ashraf_animelover</option>
                <option style={{ fontSize: '12px' }} className='dropdown-item' value="2">final_boss</option>
                <option style={{ fontSize: '12px' }} className='dropdown-item' value="3">I_LikeFood</option>
              </select>
              <div className='mt-5'>
                <button className='roboto-font btn login-btn'>Log In</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
