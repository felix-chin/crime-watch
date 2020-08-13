import React from 'react';

export default class IncidentMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { crimes: [], coords: [] };
    this.googleMapContainerRef = React.createRef();
    this.displayMarkers = this.displayMarkers.bind(this);
  }

  displayMarkers() {
    const coords = this.state.coords;

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
      organized: '../images/crimes/organized-crime-small.png',
      other: '../images/crimes/other-small.png',
      property: '../images/crimes/property-small.png',
      publicOrder: '../images/crimes/public-order-small.png',
      violent: '../images/crimes/violent-small.png',
      whiteCollar: '../images/crimes/white-collar-small.png'
    };

    coords.forEach(coord => {
      this.marker = new google.maps.Marker({
        position: { lat: coord.lat, lng: coord.lng },
        map: this.map,
        icon: icons[typeMap[coord.type]]
      });

    });
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.googleMapContainerRef.current, {
      zoom: 16,
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      },
      disableDefaultUI: true
    });

    this.setState({ coords: [{ lat: this.props.lat, lng: this.props.lng, type: this.props.type }] });

  }

  render() {
    return (
      <div>
        <div className="d-flex position-absolute" style={{ zIndex: 1 }}>
        </div>
        <div
          ref={this.googleMapContainerRef}
          style={{ height: '50vh' }}
          className="d-flex" >
          {this.displayMarkers()}
        </div>
      </div>
    );
  }
}
