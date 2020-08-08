import React from 'react';
import Map from './map';
import EditProfile from './edit-profile';
// import CrimeRateList from './crime-rate-list';
import SearchPage from './search';
import HeatMap from './heat-map';

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

  editProfile(profile) {
    fetch(`/api/users/${6}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    })
      .then(response => response.json())
      .then(updatedProfile => {
        const newUsers = this.state.users.map(user => {
          if (user.userId === 6) {
            return updatedProfile;
          } else {
            return user;
          }
        });
        this.setState({ users: newUsers });
      });
  }

  render() {
    return (
      <div>
        <HeatMap />
        {/* <EditProfile edit={this.editProfile} /> */}
        {/* <Map /> */}
      </div>

    );
  }
}
