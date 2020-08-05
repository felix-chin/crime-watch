import React from 'react';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { crimes: [], coords: [] };
    this.googleMapContainerRef = React.createRef();

    this.getData = this.getData.bind(this);
    this.displayMarkers = this.displayMarkers.bind(this);
  }

  getData() {
    fetch('/api/crimes')
      .then(response => response.json())
      .then(data => {
        const cityArray = [];
        for (let i = 0; i < data.incidents.length; i++) {
          const latitude = data.incidents[i].incident_latitude;
          const longitude = data.incidents[i].incident_longitude;
          const cityCoords = { lat: latitude, lng: longitude };
          cityArray.push(cityCoords);
        }
        this.setState({ crimes: data.incidents, coords: cityArray });
      });
  }

  displayMarkers() {
    const coords = this.state.coords;
    coords.map(coord => {
      this.marker = new google.maps.Marker({
        position: { lat: coord.lat, lng: coord.lng },
        map: this.map,
        icon: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Ball-Pink-icon.png'
      });
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
  }

  render() {
    return (
      <div
        ref={this.googleMapContainerRef}
        style={{ width: '800px', height: '600px' }}
      >{this.displayMarkers()}</div>
    );
  }
}
