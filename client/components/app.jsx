import React from 'react';

import CrimeRateList from './crime-rate-list';

import Map from './map';
import EditProfile from './edit-profile';
import CrimeRateList from './crime-rate-list';

import SearchPage from './search';
import CrimeDetailsList from './crime-details-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: {
        name: 'search',
        params: {}
      },
      users: [],
      location: ''
    };
    this.setView = this.setView.bind(this);
    this.getStats = this.getStats.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });



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
    const view = this.state.view.name;
    let renderPage;
    if (view === 'search') {
      renderPage = <SearchPage setView={this.setView}/>;
    } else if (view === 'crime-rates') {
      renderPage = <CrimeRateList setView={this.setView}/>;
    } else if (view === 'crime-details') {
      renderPage = <CrimeDetailsList setView={this.setView} type={this.state.view.params.type} />;
    } else if (view === 'map') {
      renderPage = <Map />;
    }
    return (
      <div>

        {renderPage}
        <EditProfile edit={this.editProfile} />
      </div>
    );
  }
}
