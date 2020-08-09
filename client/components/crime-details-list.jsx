import React from 'react';
import CrimeDetailsHeading from './crime-details-heading';
import CrimeDetailsListItem from './crime-details-list-item';
import typeMap from '../../shared/type-map';

export default class CrimeDetailsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents: []
    };
  }

  componentDidMount() {
    this.getIncidents();
  }

  getIncidents() {
    const type = this.props.type;
    fetch('/api/crime-details')
      .then(res => res.json())
      .then(data => {
        const incidentsList = [];
        data.forEach(incident => {
          if (typeMap[incident.incident_offense_description] === type) {
            incidentsList.push(incident);
          }
        });
        this.setState({ incidents: incidentsList });
      })
      .catch(err => console.error(err));
  }

  render() {
    const type = this.props.type;
    const setView = this.props.setView;
    const incidents = this.state.incidents;
    let image;
    let heading;
    switch (type) {
      case 'violent':
        image = './images/crimes/violent.png';
        heading = 'Violent';
        break;
      case 'property':
        image = './images/crimes/property.png';
        heading = 'Property';
        break;
      case 'publicOrder':
        image = './images/crimes/public-order.png';
        heading = 'Public Order';
        break;
      case 'whiteCollar':
        image = './images/crimes/white-collar.png';
        heading = 'White Collar';
        break;
      case 'organized':
        image = './images/crimes/organized-crime.png';
        heading = 'Organized';
        break;
      case 'highTech':
        image = './images/crimes/high-tech.png';
        heading = 'High Tech';
        break;
      default:
        image = './images/crimes/other.png';
        heading = 'Other';
    }
    const renderIncidents = incidents.map((incident, i) => {
      const date = incident.incident_date;
      const newDate = date.slice(0, date.indexOf('T'));
      return (
        <CrimeDetailsListItem
          key={i}
          setView={() => setView('incident', {})}
          date={newDate}
          address={incident.incident_address}
          detail={incident.incident_offense_description} />
      );
    });
    return (
      <div className="container pt-3">
        <span onClick={() => setView('crime-rates')} className="mx-3 text-muted cursor-pointer back">Back</span>
        <h1 className="mt-2 mb-4 text-center quantico-font">Crime Details</h1>
        <CrimeDetailsHeading image={image} heading={heading} />
        <div className="mx-3">
          {renderIncidents}
        </div>
      </div>
    );
  }
}
