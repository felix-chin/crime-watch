import React from 'react';
import CrimeDetailsListItem from './crime-details-list-item';

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
      'Murder & Non-negligent Manslaughter': 'violent'
    };
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
    const setView = this.props.setView;
    const incidents = this.state.incidents;
    const renderIncidents = incidents.map((incident, i) => {
      const date = incident.incident_date;
      const newDate = date.slice(0, date.indexOf('T'));
      return (
        <CrimeDetailsListItem
          key={i}
          setView={() => setView('incident')}
          date={newDate}
          address={incident.incident_address}
          detail={incident.incident_offense_description} />
      );
    });
    return (
      <div className="container pt-3">
        <span onClick={() => setView('crime-rates')} className="mx-3 text-muted cursor-pointer back">Back</span>
        <h1 className="mt-2 mb-4 text-center quantico-font">Crime Details</h1>
        <div className="mx-3">
          {renderIncidents}
        </div>
      </div>
    );
  }
}
