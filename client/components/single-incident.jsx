import React from 'react';
import IncidentMap from './map-single-incident';

class SingleIncident extends React.Component {

  constructor(props) {
    super(props);
    this.state = { userId: 2, isBookmarked: null, bookmarkId: null };
  }

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
        <span className="back text-muted mt-4 pointer" onClick={() => this.props.setView('crime-details', { type: this.props.type })}>Back</span>
        <header className="row justify-content-center align-items-center">
          <h1 className="quantico-font">Incident</h1>
          <div onClick={this.handleBookmark.bind(this)} className="position-absolute bookmark pointer">
            {
              this.state.isBookmarked
                ? <img src="./images/bookmark_blue.png" className="images-compare" /> : <img src="./images/bookmark.png" className="images-compare" />
            }
          </div>
        </header>
        <div className="d-flex flex-column main-wrapper">
          <div className="d-flex flex-column justify-content-space flex-grow-0 my-2">
            <h5 className="roboto-font">{this.props.offenseDescription}</h5>
            <p className="roboto-font">Incident occured on {this.props.date}</p>
            <p className="roboto-font"><span className="font-weight-bold">Location:</span><br /> {this.props.address}</p>
            <p className="roboto-font mb-2"><span className="font-weight-bold">Description:</span><br />{this.props.description}</p>
          </div>
          <IncidentMap lat={this.props.lat} lng={this.props.lng} type={this.props.offenseDescription} />
        </div>
      </div>
    );
  }
}

export default SingleIncident;
