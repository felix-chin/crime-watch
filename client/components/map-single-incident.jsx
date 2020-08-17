import React from 'react';
import typeMap from '../../shared/type-map';

export default class IncidentMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crimes: [],
      coords: []
    };
    this.googleMapContainerRef = React.createRef();
    this.displayMarkers = this.displayMarkers.bind(this);
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

    coords.forEach(coord => {
      this.marker = new google.maps.Marker({
        position: { lat: coord.lat, lng: coord.lng },
        map: this.map,
        icon: icons[typeMap[coord.type]]
      });

    });
  }

  componentDidMount() {
    /* global google */
    // marking as global because it should be in a script tag in the HTML file!
    this.map = new google.maps.Map(this.googleMapContainerRef.current, {
      zoom: 16,
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      },
      gestureHandling: 'cooperative',
      disableDefaultUI: true
    });

    this.setState({ coords: [{ lat: this.props.lat, lng: this.props.lng, type: this.props.type }] });

  }

  render() {
    return (
      <div
        ref={this.googleMapContainerRef}
        style={{ minHeight: '35vh' }}
        className="row flex-grow-1" >
        {this.displayMarkers()}
      </div>
    );
  }
}
