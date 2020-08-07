import React from 'react';
import CrimeRateList from './crime-rate-list';
import Map from './map';
import SearchPage from './search';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'search',
        params: {}
      },
      location: ''
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    // fetch('/api/health-check')
    //   .then(res => res.json())
    //   .then(data => this.setState({ message: data.message || data.error }))
    //   .catch(err => this.setState({ message: err.message }))
    //   .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  render() {
    const view = this.state.view.name;
    let renderPage;
    if (view === 'search') {
      renderPage = <SearchPage setView={this.setView}/>;
    } else if (view === 'crime-rates') {
      renderPage = <CrimeRateList setView={this.setView}/>;
    } else if (view === 'map') {
      renderPage = <Map />;
    }
    return (
      <div>
        {renderPage}
      </div>
    );
  }
}
