import React from 'react';
import CrimeRateListItem from './crime-rate-list-item';

export default class CrimeRateList extends React.Component {
  render() {
    const setView = this.props.setView;
    const statsObj = this.props.stats;
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
        <h1 className="my-4 text-center quantico-font">Crime Rates</h1>
        <div className="mx-3">
          {crimeRateListItems}
        </div>
      </div>
    );
  }
}
