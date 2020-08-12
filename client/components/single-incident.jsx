import React from 'react';
import IncidentMap from './map-single-incident';
// import { response } from 'express';

class SingleIncident extends React.Component {

  constructor(props) {
    super(props);
    this.state = { userId: 2, isBookmarked: null, bookmarkId: null };
  }

  // backButton () {

  // }

  // save () {

  // }

  componentDidMount() {
    let isBookmarked = false;
    let bookmarkId = null;
    fetch(`/api/bookmarks/${this.state.userId}`)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].incident.incident_code === this.props.code) {
            isBookmarked = true;
            bookmarkId = data[i].bookmarkId;
            break;
          }
        }
        this.setState({ isBookmarked: isBookmarked, bookmarkId: bookmarkId });
      });
  }

  handleBookmark() {
    if (this.state.isBookmarked) {
      fetch(`api/bookmarks/${this.state.bookmarkId}`, {
        method: 'DELETE'
      })
        .then(() => {
          this.setState({ isBookmarked: false, bookmarkId: null });
        });

    } else {
      fetch(`/api/bookmarks/${this.state.userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incident_offense_description: this.props.offenseDescription,
          incident_date: this.props.date,
          incident_address: this.props.address,
          incident_code: this.props.code
        })
      })
        .then(response => response.json())
        .then(data => {
          this.setState({ isBookmarked: true, bookmarkId: data.bookmarkId });
        });
    }
  }

  render() {

    return (
      <div className="container">
        <button className="backButton" onClick={() => this.props.setView('crime-details', { type: this.props.type })}>Back</button>
        <header className="row justify-content-center">
          <h1>Incident</h1>
          <button className="bk noselect" onClick={this.handleBookmark.bind(this) }>
            {this.state.isBookmarked ? <i className="fas fa-bookmark "></i>
              : <i className="far fa-bookmark "></i>}
          </button>
        </header>
        <div className="row">
          <div className="flex-container">
            <div className="des flex1">
              <div className="time">
                {this.props.date}
              </div>
              <div className="address">
                {this.props.address}
              </div>
            </div>
            <div className="des flex3">
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
