import React from 'react';

export default class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { crimes: [], coords: [] };
    this.googleMapContainerRef = React.createRef();
    this.displayHeatMap = this.displayHeatMap.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData() {
    fetch('/api/crimes')
      .then(response => response.json())
      .then(data => {
        const cityArray = [];
        for (let i = 0; i < data.incidents.length; i++) {
          const latitude = data.incidents[i].incident_latitude;
          const longitude = data.incidents[i].incident_longitude;
          const cityCoords = [latitude, longitude];
          cityArray.push(cityCoords);
        }
        this.setState({ crimes: data.incidents, coords: cityArray });
      });
  }

  displayHeatMap() {
    const coords = this.state.coords;

    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: coords.map(coord => {
        return new google.maps.LatLng(coord[0], coord[1]);
      }),
      map: this.map,
      radius: 40,
      opacity: 0.4
    });
  }

  componentDidMount() {
    /* global google */
    // marking as global because it should be in a script tag in the HTML file!
    const coords = this.state.coords;

    this.map = new google.maps.Map(this.googleMapContainerRef.current, {
      zoom: 10,
      center: {
        lat: 34.052235,
        lng: -118.243683
      },
      // mapTypeId: 'satellite',
      disableDefaultUI: true
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
        <button className="standardMapView roboto-font" style={{ zIndex: 1 }}>Standard Map</button>
        <div
          ref={this.googleMapContainerRef}
          style={{ width: '100vw', height: '100vh' }}
          className="d-flex"
        >
          {this.displayHeatMap()}
        </div>
      </>

    );
  }
}
