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
    this.saveSearch = this.saveSearch.bind(this);
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
    const profile = this.props.profile;
    this.saveSearch(profile.userId);
    getStats('la');

    Geocode.setApiKey('AIzaSyC37G_TaabnjhwNuCove5iXzL_qQmS7X7E');
    Geocode.setLanguage('en');

    const location = this.state.location;
    const coords = [];
    Geocode.fromAddress(location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        coords.push(lat, lng);
        getCoords(coords);
        setView('map', {});
      },
      error => {
        console.error(error);
      }
    );
    this.setState({ coords: coords });
  }

  saveSearch(userId) {
    fetch(`/api/searches/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location: this.state.location })
    })
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className='container mt-2 mb-5'>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group inp-group-max border border-secondary rounded" style={{ zIndex: 1 }}>
            <input
              className="form-control"
              type="text"
              name="location"
              value={this.state.location}
              placeholder="Enter location"
              required
              autoComplete="off"
              onChange={this.handleChange} />
            <div className="input-group-append">
              <button type="submit" className="d-flex align-items-center btn btn-color input-group-append">
                <i className="fas fa-search fa-fw search-button" ></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
