import React from 'react';
import CrimeRateList from './crime-rate-list';
import Map from './map';
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
      location: ''
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
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
    } else if (view === 'crime-details') {
      renderPage = <CrimeDetailsList setView={this.setView} type={this.state.view.params.type} />;
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
