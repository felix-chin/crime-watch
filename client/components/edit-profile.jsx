import React from 'react';

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      defaultLocation: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const profile = this.props.profile;
    this.setState({
      name: profile.name,
      defaultLocation: profile.defaultLocation
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const setView = this.props.setView;
    const profile = this.props.profile;
    const editProfile = this.props.edit;
    editProfile(profile.userId, this.state);
    setView('profile', {});
  }

  render() {
    const { name, defaultLocation } = this.state;
    const profile = this.props.profile;
    let profilePic;
    if (profile.userId === 1) {
      profilePic = './images/uzair.png';
    } else if (profile.userId === 2) {
      profilePic = './images/tim.png';
    } else if (profile.userId === 3) {
      profilePic = './images/guy.jpg';
    }
    return (
      <>
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="mt-5 mb-4 quantico-font">Edit Profile</h1>
            <img className="profile-pic mb-3" src={profilePic}></img>
            <h5 className="mb-4 roboto-font">{profile.username}</h5>
          </div>
          <form className="container justify-content-center align-items-center" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="h5 roboto-font">Name:</label>
              <br />
              <input onChange={this.handleChange} type="text" value={name} name="name" id="name" className="mb- form-control"></input>
            </div>
            <div className="form-group">
              <label className="h5 roboto-font">Default Location:</label>
              <br />
              <input onChange={this.handleChange} type="text" value={defaultLocation} name="defaultLocation" id="defaultLocation" className="mb-3 form-control"></input>
            </div>
            <br />
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-color roboto-font">Update Profile</button>
            </div>
          </form>
        </div>
      </>
    );

  }
}
