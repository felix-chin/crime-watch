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
    const profile = this.props.profile;
    let isBookmarked = false;
    let bookmarkId = null;
    fetch(`/api/bookmarks/${profile.userId}`)
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
    const profile = this.props.profile;
    if (this.state.isBookmarked) {
      fetch(`api/bookmarks/${this.state.bookmarkId}`, {
        method: 'DELETE'
      })
        .then(() => {
          this.setState({ isBookmarked: false, bookmarkId: null });
        });

    } else {
      fetch(`/api/bookmarks/${profile.userId}`, {
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
      <div className="container pt-3">
        <span className="back text-muted mt-4" onClick={() => this.props.setView('crime-details', { type: this.props.type })}>Back</span>
        <header className="row justify-content-center">
          <h1 className="quantico-font">Incident</h1>
          <button className="bk noselect" onClick={this.handleBookmark.bind(this) }>
            {this.state.isBookmarked ? <i className="fas fa-bookmark "></i>
              : <i className="far fa-bookmark "></i>}
          </button>
        </header>
        <div className="d-flex flex-column justify-content-space my-2">
            <h5 className="roboto-font">{this.props.offenseDescription}</h5>
          <p className="time roboto-font">Incident occured on {this.props.date}</p>
          <p className="address roboto-font">Location : {this.props.address}</p>
          <p className="roboto-font my-2">{this.props.description}</p>
        </div>
        <div>
          <IncidentMap lat={this.props.lat} lng={this.props.lng} type={this.props.offenseDescription} />
        </div>
      </div>
    );
  }
}

export default SingleIncident;
