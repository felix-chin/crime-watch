import React from 'react';
import typeMap from '../../shared/type-map';
export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crimes: [],
      coords: [],
      mapCenter: []
    };
    this.googleMapContainerRef = React.createRef();
    this.getData = this.getData.bind(this);
    this.displayMarkers = this.displayMarkers.bind(this);
    this.displayCenter = this.displayCenter.bind(this);
    this.displayInfoWindowText = this.displayInfoWindowText.bind(this);
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

        this.setState({ crimes: data.incidents, coords: cityArray }, this.displayMarkers);
      });
  }

  displayMarkers() {
    const coords = this.state.coords;

    const icons = {
      highTech: '../images/crimes/high-tech-small.png',
      organized: '../images/crimes/organized-crime-small.png',
      other: '../images/crimes/other-small.png',
      property: '../images/crimes/property-small.png',
      publicOrder: '../images/crimes/public-order-small.png',
      violent: '../images/crimes/violent-small.png',
      whiteCollar: '../images/crimes/white-collar-small.png'
    };

    coords.forEach((coord, index) => {
      new google.maps.Marker({
        position: { lat: coord.lat, lng: coord.lng },
        map: this.map,
        icon: icons[typeMap[coord.type]]
      })
        .addListener('click', event => {
          const infoWindow = new google.maps.InfoWindow({
            content: this.displayInfoWindowText(index)
          });
          infoWindow.setPosition(event.latLng);
          infoWindow.open(this.map);
          setTimeout(() => { infoWindow.close(); }, 5000);
        });
    });
  }

  componentDidMount() {
    /* global google */
    // marking as global because it should be in a script tag in the HTML file!
    this.map = new google.maps.Map(this.googleMapContainerRef.current, {
      zoom: 13,
      center: { lat: 34.03079, lng: -118.14373 },
      disableDefaultUI: true
    });

    this.getData();
    this.setState({ mapCenter: this.props.mapCenter });
  }

  displayInfoWindowText(crimeIndex) {
    const crimes = this.state.crimes;
    const date = crimes[crimeIndex].incident_date;
    const newDate = date.slice(0, date.indexOf('T'));
    return `<div class='info-window'>
              <h6 class='info-window-title'>Incident</h6>
              <div class='info-window-text-descriptions'><b class='info-window-text'>Date:</b> ${newDate}</div>
              <div class='info-window-text-descriptions'><b class='info-window-text'>Address:</b> ${crimes[crimeIndex].incident_address}</div>
              <div class='info-window-text-descriptions'><b class='info-window-text'>Description:</b> ${crimes[crimeIndex].incident_offense_description}</div>
            </div>
           `;
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
        <i className="fa fa-arrow-left fa-2x mt-3 backToDetails pointer" aria-hidden="true" onClick={() => this.props.setView('crime-rates', { type: this.props.type })}></i>
        <button onClick={() => setView('heat-map', {})} className="standardMapView shadow roboto-font" style={{ zIndex: 1 }}>View Heat Map</button>
        <div
          ref={this.googleMapContainerRef}
          style={{ width: '100vw', height: '100vh' }}
          className="d-flex">
          {this.displayCenter()}
        </div>
      </>

    );
  }
}
