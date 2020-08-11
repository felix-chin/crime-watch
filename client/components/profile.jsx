import React from 'react';

export default function Profile(props) {
  const profile = props.profile;
  let profilePic;
  if (profile.userId === 1) {
    profilePic = './images/uzair.jpg';
  } else if (profile.userId === 2) {
    profilePic = './images/tim.jpg';
  } else if (profile.userId === 3) {
    profilePic = './images/guy.jpg';
  }
  return (
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
  );
}
