import React from 'react';

export default class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { crimes: [], coords: [] };
    this.googleMapContainerRef = React.createRef();

    this.getData = this.getData.bind(this);
    this.getPoints = this.getPoints.bind(this);
  }

  getData() {
    fetch('/api/crimes')
      .then(response => response.json())
      .then(data => {
        const cityArray = [];
        for (let i = 0; i < data.incidents.length; i++) {
          const latitude = data.incidents[i].incident_latitude;
          const longitude = data.incidents[i].incident_longitude;
          const cityCoords = { lat: latitude, lng: longitude, type: data.incidents[i].incident_offense_description, icon: '' };
          cityArray.push(cityCoords);
        }
        this.setState({ crimes: data.incidents, coords: cityArray });
      });
  }

  getPoints() {
    const gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];

    const coords = this.state.coords;
    for (let i = 0; i < coords.length; i++) {
      return [
        new google.maps.LatLng(coords[i].lat, coords[i].lng)
      ];
    }
  }

  componentDidMount() {
    /* global google */
    // marking as global because it should be in a script tag in the HTML file!
    this.map = new google.maps.Map(this.googleMapContainerRef.current, {
      zoom: 13,
      center: {
        lat: 34.052235,
        lng: -118.243683
      },
      disableDefaultUI: true
    });
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      // data: this.getPoints(),
      map: this.map
    });
    this.getData();
  }

  render() {
    return (
      <>
        <div className="d-flex p-4 input-group input-group-lg md-form form-sm form-2 position-absolute" style={{ zIndex: 1 }}>
          <input className="form-control my-0 py-1 red-border shadow" type="text" placeholder="Search" aria-label="Search"></input>
          <div className="input-group-append">
            <span className="input-group-text red lighten-3" id="basic-text1"><i className="fas fa-search text-grey"
              aria-hidden="true"></i></span>
          </div>
        </div>
        <div
          ref={this.googleMapContainerRef}
          style={{ width: '100vw', height: '100vh' }}
          className="d-flex"
        >
        </div>
      </>

    );
  }
}
