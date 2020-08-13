import React from 'react';
import Geocode from 'react-geocode';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      coords: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit() {
    event.preventDefault();
    const getStats = this.props.getStats;
    const setView = this.props.setView;
    const getCoords = this.props.getCoords;
    getStats(this.state.location);
    setView('crime-rates', {});
    // needs method to post search location to Search History database

    Geocode.setApiKey('AIzaSyCC9N0oTNTZ8FTEfuuTFDj3hb3Eby1vt_w');
    Geocode.setLanguage('en');
    Geocode.enableDebug();

    // Get latidude & longitude from address.
    const location = this.state.location;
    const coords = [];
    Geocode.fromAddress(location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        coords.push(lat, lng);
        getCoords(coords);
      },
      error => {
        console.error(error);
      }
    );
    this.setState({ coords: coords });
  }

  saveSearch() {
    fetch(`/api/searches/${1}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.location)
    })
      .then(res => res.json())
      .then()
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className={this.props.className + ' container my-4'}>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group border border-secondary rounded" style={{ zIndex: 1 }}>
            <input className="form-control" type="text" name="location" value={this.state.location} placeholder="Enter location" required onChange={this.handleChange} />
            <div className="input-group-append">
              <button type="submit" className="d-flex align-items-center btn bg-color input-group-append">
                <i className="fas fa-search fa-fw search-button" ></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
