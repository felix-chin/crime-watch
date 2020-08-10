import React from 'react';
import SearchBar from './search-bar';
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
    for (let i = 0; i < coords.length; i++) {
      this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: [new google.maps.LatLng(coords[i][0], coords[i][1])],
        map: this.map,
        radius: 30
      });
    }
  }

  componentDidMount() {
    /* global google */
    // marking as global because it should be in a script tag in the HTML file!
    // const coords = this.state.coords;

    this.map = new google.maps.Map(this.googleMapContainerRef.current, {
      zoom: 13,
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
    const setView = this.props.setView;
    return (
      <>
        <SearchBar className="py-4 position-absolute" />
        <button onClick={() => setView('map', {})} className="standardMapView roboto-font" style={{ zIndex: 1 }}>Standard Map</button>
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
