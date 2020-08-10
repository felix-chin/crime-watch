import React from 'react';
import CrimeRateListItem from './crime-rate-list-item';
import SearchBar from './search-bar';

export default class CrimeRateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {}
    };
  }

  componentDidMount() {
    this.getStats();
  }

  getStats() {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => this.setState({ stats: data }))
      .catch(err => console.error(err));
  }

  render() {
    const setView = this.props.setView;
    const statsObj = this.state.stats;
    const crimeRateListItems = Object.keys(statsObj).map((item, i) => {
      return (
        <CrimeRateListItem
          key={i}
          setView={() => setView('crime-details', { type: item })}
          image={statsObj[item].image}
          crimeType={statsObj[item].crimeType}
          rate={statsObj[item].rate} />
      );
    });
    return (
      <div className="container">
        <SearchBar setView={this.props.setView}/>
        <h1 className="my-4 text-center quantico-font">Crime Rates</h1>
        <div className="mx-3">
          {crimeRateListItems}
        </div>
      </div>
    );
  }
}
