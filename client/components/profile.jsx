import React from 'react';
import ProfileDrawer from './profile-drawer';

export default class Profile extends React.Component {
  componentDidMount() {
    const profile = this.props.profile;
    this.props.getProfile(profile.userId);
  }

  render() {
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
        <ProfileDrawer setView={this.props.setView} />
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="quantico-font my-5">Profile</h1>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img src={profilePic} alt="profile-pic" className="profile-pic mt-5 mb-3" />
              <h5 className="mb-4">@{profile.username}</h5>
              <h5>Name: {profile.name}</h5>
              <h5>Location: {profile.defaultLocation}</h5>
            </div>
          </div>
        </div>
      </>
    );
  }
}
