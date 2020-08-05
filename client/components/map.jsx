import React from 'react';
// import assault from './assault.png';
// import homicide from './homicide.png';
// import vehicleRelated from './vehicle-related.png';
// import theft from './theft.png';
// import vandalism from './vandalism.png';
// import other from './other.png';



export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { crimes: [], coords: [] };
    this.googleMapContainerRef = React.createRef();

    this.getData = this.getData.bind(this);
    this.displayMarkers = this.displayMarkers.bind(this);
    this.checkCrimeType = this.checkCrimeType.bind(this);
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
    const iconMarker = this.checkCrimeType();
    coords.map(coord => {
      this.marker = new google.maps.Marker({
        position: { lat: coord.lat, lng: coord.lng },
        map: this.map,
        icon: iconMarker
      });
    });
  }

  checkCrimeType() {
    const crime = this.state.crimes;
    const typeMap = {
      'Property': 'propertyCrime',
      'Disorderly': 'publicOrderCrime',
      'THEFT': 'properyCrime',
      'SEX': 'violentCrime',
      'ASSAULT': 'violentCrime',
      'BURGLARY': 'properyCrime',
      'VANDALISM': 'propertyCrime',
      'CRIMINAL THREATS': 'violentCrime',
      'SHOPLIFTING': 'propertyCrime',
      'INTIMATE PARTNER': 'violentCrime',
      'BRANDISH WEAPON': 'organizedCrime',
      'VEHICLE THEFT': 'properyCrime',
      'OTHER': 'otherCrime',
      'Suspicious': 'otherCrime',
      'Assault': 'violentCrime',
      'Larceny': 'propertyCrime',
      'Vandalism': 'propertyCrime',
      'Arson': 'propertyCrime',
      'Robbery': 'propertyCrime',
      'Other': 'otherCrime',
      'Tresspass': 'propertyCrime',
      'Embezzlement': 'whiteCollarCrime',
      'Non-Criminal': 'otherCrime',
      'Drug Violation': 'publicOrderCrime',
      'Fraud': 'whiteCollarCrime',
      'Manslaughter': 'violentCrime',
      'Intimidation': 'violentCrime',
      'Warrent': 'otherCrime',
      'Fire Report': 'otherCrime',
      'Breaking': 'propertyCrime',
      'STOLEN': 'propertyCrime',
      'BATTERY': 'violentCrime',
      'ROBBERY': 'propertyCrime',
      ''
    };
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
