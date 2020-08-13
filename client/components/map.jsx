import React from 'react';
// import SearchBar from './search-bar';
export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { crimes: [], coords: [], mapCenter: [] };
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
    const typeMap = {
      'Theft From Motor Vehicle': 'property',
      'Theft From Building': 'property',
      'Suspicious Activity/All Other': 'other',
      'Family Offenses/All Other': 'other',
      'Negligent Manslaughter': 'violent',
      'All Other Larceny': 'property',
      'Simple Assault': 'violent',
      'Destruction/Damage/Vandalism of Property': 'property',
      'Motor Vehicle Theft': 'property',
      'Aggravated Assault': 'violent',
      'Burglary/Breaking & Entering': 'property',
      'Domestic Violence/Simple Assault': 'violent',
      Robbery: 'property',
      'Identity Theft': 'whiteCollar',
      Shoplifting: 'property',
      Intimidation: 'organized',
      'Weapon Law Violations': 'organized',
      'False Pretenses/Swindle/Confidence Game': 'whiteCollar',
      'Trespass of Real Property': 'property',
      'Domestic Violence/Aggravated Assault': 'violent',
      'Child Abuse/Simple/Psychological abuse': 'violent',
      Rape: 'violent',
      'Counterfeiting/Forgery': 'whiteCollar',
      'Human Trafficking, Commercial Sex Acts': 'organized',
      'Human Trafficking, Involuntary Servitude': 'organized',
      'Assisting or Promoting Prostitution': 'organized',
      Embezzlement: 'whiteCollar',
      'Sexual Battery': 'violent',
      'Stolen Property Offenses': 'property',
      'Drug Equipment Violations': 'publicOrder',
      Drunkenness: 'publicOrder',
      Arson: 'property',
      'Drug/Narcotic Violations': 'publicOrder',
      'Disorderly Conduct': 'publicOrder',
      'Driving Under the Influence': 'publicOrder',
      'Kidnapping/Abduction': 'organized',
      'Extortion/Blackmail': 'highTech',
      'Curfew/Loitering/Vagrancy Violations': 'publicOrder',
      'Hacking/Computer Invasion': 'highTech',
      'Credit Card/Automated Teller Machine Fraud': 'highTech',
      'Murder & Non-negligent Manslaughter': 'violent',
      'Child Abuse/Sexual abuse': 'violent',
      'All Other Offenses': 'other',
      'Sexual Assault With An Object': 'violent'
    };

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
      center: { lat: 37.09024, lng: -95.712891 },
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
        {/* <SearchBar className="py-4 position-absolute" getCoords={this.props.getCoords} /> */}
        <button onClick={() => setView('heat-map', {})} className="standardMapView shadow roboto-font" style={{ zIndex: 1 }}>View Heat Map</button>
        <div
          ref={this.googleMapContainerRef}
          style={{ width: '100vw', height: '100vh' }}
          className="d-flex"
        >
          {this.displayCenter()}
        </div>
      </>

    );
  }
}
