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
        <button className="backButton" onClick={() => this.props.setView('crime-details', { type: this.props.type })}>Back</button>
        <header className="row justify-content-center">
          <h1>Incident</h1>
          <span><button className="bk"><i className="far fa-bookmark bk"></i></button></span>
        </header>
        <div className="row">
          <div className="flex-container">
            <div className="time-address flex1">
              <div className="time">
                {this.props.time}
              </div>
              <div className="address">
                {this.props.address}
              </div>
            </div>
            <div className="description flex3">
              {this.props.description}
            </div>
            <div className="flex2">
              <IncidentMap lat={this.props.lat} lng={this.props.lng} type={'Simple Assault'}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleIncident;
