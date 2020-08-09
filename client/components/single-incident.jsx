import React from 'react';
import IncidentMap from './map-single-incident';

class SingleIncident extends React.Component {

  // backButton () {

  // }

  // save () {

  // }

  render() {
    return (
      <div className="container">
        <button className="backButton">Back</button>
        <header className="row justify-content-center">
          <h1>Incident</h1>
          <span><button className="bk"><i className="far fa-bookmark bk"></i></button></span>
        </header>
        <div className="row">
          <div className="main col align-self-end flex-container">
            <div className="time-address flex1">
              <div className="time">
                  12/30/2019 2:01 AM
              </div>
              <div className="address">
                  @ 1231 S Hill St.
              </div>
            </div>
            <div className="description flex3">
              A wife hits her husband because of his bad choice for a dinner
            </div>
            <div className="flex2">
              <IncidentMap lat={34.0719} lng={-118.3635} type={'Simple Assault'}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleIncident;
