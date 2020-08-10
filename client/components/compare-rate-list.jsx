import React from 'react';
import CompareRateListItem from './compare-rate-list-item';
export default class CompareRateList extends React.Component {
  render() {
    const locations = this.props.locations;
    const setView = this.props.setView;
    const statsObj1 = this.props.stats1;
    const statsObj2 = this.props.stats2;
    for (const key in statsObj2) {
      statsObj1[key].rate2 = statsObj2[key].rate;
    }
    const compareRateListItems = Object.keys(statsObj1).map((item, i) => {
      return (
        <CompareRateListItem
          key={i}
          image={statsObj1[item].image}
          crimeType={statsObj1[item].crimeType}
          rate1={statsObj1[item].rate}
          rate2={statsObj1[item].rate2} />
      );
    });
    return (
      <div className="container pt-2">
        <span onClick={() => setView('compare')} className="mx-3 text-muted cursor-pointer back">Back</span>
        <h1 className="mt-1 text-center quantico-font">Crime Comparison</h1>
        <div className="mb-2">
          <h4 className="text-center roboto-font font-size-compare"><span className="col-5 text-center">{locations.location1}</span> vs <span className="col-5 text-center">{locations.location2}</span></h4>
        </div>
        <div>
          {compareRateListItems}
        </div>
      </div>
    );
  }
}
