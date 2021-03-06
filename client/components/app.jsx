import React from 'react';
import SingleIncident from './single-incident';
import Map from './map';
import EditProfile from './edit-profile';
import CrimeRateList from './crime-rate-list';
import SearchPage from './search';
import HeatMap from './heat-map';
import CrimeDetailsList from './crime-details-list';
import NavBar from './navbar';
import Login from './login';
import Compare from './compare';
import CompareRateList from './compare-rate-list';
import Bookmarks from './bookmarks';
import SearchHistory from './search-history';
import Profile from './profile';
import Disclaimer from './disclaimer';
import Loader from './loader';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'login',
        params: {}
      },
      profile: {},
      stats: [],
      coords: [],
      disclaimer: true,
      loading: false
    };
    this.setView = this.setView.bind(this);
    this.getStats = this.getStats.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.closeDisclaimer = this.closeDisclaimer.bind(this);
  }

  getCoords(coordsArray) {
    this.setState({ coords: coordsArray });
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      },
      loading: false
    });
  }

  getStats(location) {
    this.setState({ loading: true }, () => {
      fetch(`/api/stats/${location}`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            stats: data
          });
        })
        .catch(err => console.error(err));
    });
  }

  getProfile(userId) {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          profile: data
        });
      })
      .catch(err => console.error(err));
  }

  editProfile(userId, profile) {
    fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          profile: data
        });
      })
      .catch(err => console.error(err));
  }

  closeDisclaimer() {
    this.setState({ disclaimer: false });
  }

  render() {
    const view = this.state.view.name;
    let renderPage;
    let renderNavBar;
    if (view === 'login') {
      renderPage = <Login getProfile={this.getProfile} setView={this.setView}/>;
    } else if (view === 'search') {
      renderPage = <SearchPage profile={this.state.profile} getStats={this.getStats} setView={this.setView} getCoords={this.getCoords}/>;
    } else if (view === 'compare') {
      renderPage = <Compare getStats={this.getStats} setView={this.setView} />;
    } else if (view === 'compare-rate-list') {
      renderPage = <CompareRateList locations={this.state.view.params} stats={this.state.stats} setView={this.setView} />;
    } else if (view === 'crime-rates') {
      renderPage = <CrimeRateList stats={this.state.stats} setView={this.setView}/>;
    } else if (view === 'crime-details') {
      renderPage = <CrimeDetailsList setView={this.setView} type={this.state.view.params.type} />;
    } else if (view === 'map') {
      renderPage = <Map setView={this.setView} mapCenter={this.state.coords}/>;
    } else if (view === 'heat-map') {
      renderPage = <HeatMap setView={this.setView} mapCenter={this.state.coords}/>;
    } else if (view === 'profile') {
      renderPage = <Profile profile={this.state.profile} setView={this.setView} getProfile={this.getProfile}/>;
    } else if (view === 'edit-profile') {
      renderPage = <EditProfile profile={this.state.profile} edit={this.editProfile} setView={this.setView}/>;
    } else if (view === 'incident') {
      renderPage = <SingleIncident setView={this.setView}
        date={this.state.view.params.date}
        address={this.state.view.params.address}
        description={this.state.view.params.description}
        lat={this.state.view.params.lat}
        lng={this.state.view.params.lng}
        type={this.state.view.params.type}
        code={this.state.view.params.code}
        offenseDescription={this.state.view.params.offenseDescription}
        profile={this.state.profile} />;
    } else if (view === 'search-history') {
      renderPage = <SearchHistory profile={this.state.profile} setView={this.setView}/>;
    } else if (view === 'bookmarks') {
      renderPage = <Bookmarks profile={this.state.profile} setView={this.setView}/>;
    }
    if (this.state.view.name !== 'login' && this.state.view.name !== 'search') {
      renderNavBar = <NavBar view={this.state.view.name} setView={this.setView} />;
    }

    return (
      <>
        { this.state.disclaimer &&
          <Disclaimer closeDisclaimer={this.closeDisclaimer} />
        }
        { this.state.loading
          ? <Loader />
          : <div>{renderPage}</div>
        }
        {renderNavBar}
      </>
    );
  }
}
