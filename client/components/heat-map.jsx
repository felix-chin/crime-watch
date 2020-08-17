import React from 'react';
export default class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { crimes: [], coords: [], mapCenter: [] };
    this.googleMapContainerRef = React.createRef();
    this.displayHeatMap = this.displayHeatMap.bind(this);
    this.getData = this.getData.bind(this);
    this.displayCenter = this.displayCenter.bind(this);
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
    this.map = new google.maps.Map(this.googleMapContainerRef.current, {
      zoom: 10,
      center: {
        lat: 34.052235,
        lng: -118.243683
      },
      disableDefaultUI: true
    });
    this.getData();
    this.setState({ mapCenter: this.props.mapCenter });
  }

  displayCenter() {
    const mapCenter = this.state.mapCenter;
    for (let i = 0; i < mapCenter.length; i++) {
      this.map.setCenter({ lat: mapCenter[0], lng: mapCenter[1] });
    }
  }

  render() {
    const setView = this.props.setView;
    return (
      <>
        <button type="button" onClick={() => setView('map', {})} className="standardMapView shadow roboto-font" style={{ zIndex: 1 }}>View Crime Map</button>
        <div
          ref={this.googleMapContainerRef}
          style={{ width: '100vw', height: '100vh' }}
          className="d-flex"
        >
          {this.displayCenter()}
          {this.displayHeatMap()}
        </div>
      </>

    );
  }
}
