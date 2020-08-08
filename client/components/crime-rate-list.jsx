import React from 'react';
import CrimeRateListItem from './crime-rate-list-item';

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
    const statsObj = this.state.stats;
    const crimeRateListItems = Object.keys(statsObj).map((item, i) => {
      return (
        <CrimeRateListItem
          key={i}
          image={statsObj[item].image}
          crimeType={statsObj[item].crimeType}
          rate={statsObj[item].rate} />
      );
    });
    return (
      <div className="container">
        <h1 className="text-center quantico-font">Crime Rates</h1>
        <div>
          {crimeRateListItems}
        </div>
      </div>
    );
  }
}
