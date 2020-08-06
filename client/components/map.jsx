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
          const cityCoords = { lat: latitude, lng: longitude, type: data.incidents[i].incident_offense_description, icon: '' };
          cityArray.push(cityCoords);
        }
        this.setState({ crimes: data.incidents, coords: cityArray });
      });
  }

  displayMarkers() {
    const coords = this.state.coords;

    // for (let i = 0; i < crimes.length; i++) {
    //   this.infoWindowText =
    //     ` Date: ${crimes[i].incident_date}<br />
    //      @ ${crimes[i].incident_address}<br />
    //      Description: ${crimes[i].incident_offense_description}
    //     `;
    // }
    // this.infoWindow = new google.maps.InfoWindow({
    //   content: this.infoWindowText
    // });

    const typeMap = {
      'Theft From Motor Vehicle': 'property',
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
      organized: '../images/crimes/organized_crime_small.png',
      other: '../images/crimes/other-small.png',
      property: '../images/crimes/property-small.png',
      publicOrder: '../images/crimes/public-order-small.png',
      violent: '../images/crimes/violent-small.png',
      whiteCollar: '../images/crimes/white-collar-small.png'
    };

    coords.map(coord => {
      this.marker = new google.maps.Marker({
        position: { lat: coord.lat, lng: coord.lng },
        map: this.map,
        icon: icons[typeMap[coord.type]]
      });
      // .addListener('click', () => {
      //   this.infoWindow.open(this.map, this.marker);
      //   setTimeout(() => { this.infoWindow.close(); }, 5000);
      // });
    });
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
    this.getData();
  }

  render() {
    return (
      <div
        ref={this.googleMapContainerRef}
        style={{ width: '2000px', height: '600px' }}
      >{this.displayMarkers()}</div>
    );
  }
}
