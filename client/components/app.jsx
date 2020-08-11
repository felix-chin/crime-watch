import React from 'react';
import SingleIncident from './single-incident';
import Map from './map';
import EditProfile from './edit-profile';
import CrimeRateList from './crime-rate-list';
import SearchPage from './search';
import HeatMap from './heat-map';
import CrimeDetailsList from './crime-details-list';
import NavBar from './navbar';
// import Login from './login';
import Compare from './compare';
import CompareRateList from './compare-rate-list';
// import Bookmarks from './bookmarks-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'search',
        params: {}
      },
      users: [],
      stats1: [],
      stats2: []
    };
    this.setView = this.setView.bind(this);
    this.getStats1 = this.getStats1.bind(this);
    this.getStats2 = this.getStats2.bind(this);
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
    // fetch('/api/users')
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({ users: data });
    //   });
  }

  getStats1(location) {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => this.setState({ stats1: data }))
      .catch(err => console.error(err));
  }

  getStats2(location) {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => this.setState({ stats2: data }))
      .catch(err => console.error(err));
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
      renderPage = <SearchPage getStats={this.getStats1} setView={this.setView}/>;
    } else if (view === 'compare') {
      renderPage = <Compare getStats1={this.getStats1} getStats2={this.getStats2} setView={this.setView} />;
    } else if (view === 'compare-rate-list') {
      renderPage = <CompareRateList locations={this.state.view.params} stats1={this.state.stats1} stats2={this.state.stats2} setView={this.setView} />;
    } else if (view === 'crime-rates') {
      renderPage = <CrimeRateList stats={this.state.stats1} setView={this.setView}/>;
    } else if (view === 'crime-details') {
      renderPage = <CrimeDetailsList setView={this.setView} type={this.state.view.params.type} />;
    } else if (view === 'map') {
      renderPage = <Map setView={this.setView}/>;
    } else if (view === 'heat-map') {
      renderPage = <HeatMap setView={this.setView}/>;
    } else if (view === 'edit-profile') {
      renderPage = <EditProfile edit={this.editProfile} />;
    } else if (view === 'incident') {
      renderPage = <SingleIncident setView={this.setView}
        time={this.state.view.params.time}
        address={this.state.view.params.address}
        description={this.state.view.params.description}
        lat={this.state.view.params.lat}
        lng={this.state.view.params.lng}
        type={this.state.view.params.type}/>;
    }
    return (
      <>
        <div>
          {/* <Login /> */}
          {renderPage}
          {/* <Bookmarks /> */}
        </div>
        <NavBar view={this.state.view.name} setView={this.setView} />
      </>
    );
  }
}
