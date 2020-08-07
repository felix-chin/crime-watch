import React from 'react';
import Map from './map';
import EditProfile from './edit-profile';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    // this.getStats = this.getStats.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  componentDidMount() {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data });
      });
  }

  editProfile(userId) {
    const currentUsers = this.state.users;
    const id = parseInt(userId, 10);
    const updatedProfile = currentUsers.filter(user => user.userId !== userId);
    fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(() => {
        this.setState({ users: updatedProfile });
      });
  }

  render() {
    return (
      <div>
        <EditProfile edit={this.editProfile}/>
        {/* <Map /> */}
      </div>
    );
  }
}
