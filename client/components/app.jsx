import React from 'react';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
    this.getStats = this.getStats.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  getStats() {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        const typeMap = {
          'Theft From Motor Vehicle': 'vehicleRelated',
          'All Other Larceny': 'theft',
          'Simple Assault': 'assault',
          'Destruction/Damage/Vandalism of Property': 'vandalism',
          'Motor Vehicle Theft': 'vehicleRelated',
          'Aggravated Assault': 'assault',
          'Burglary/Breaking & Entering': 'theft',
          'Domestic Violence/Simple Assault': 'assault'
        };
        const statsObj = {
          vehicleRelated: 0,
          assault: 0,
          vandalism: 0,
          theft: 0,
          homicide: 0,
          other: 0
        };
        data.forEach(stat => {
          if (stat.type in typeMap) {
            statsObj[typeMap[stat.type]] += stat.count;
          } else {
            statsObj.other += stat.count;
          }
        });
        // data.forEach(item => {
        //   switch(item.type) {
        //     case "Theft From Motor Vehicle":
        //       statsObj.vehicleRelated += item.count;
        //       break;
        //     case "All Other Larceny":
        //       statsObj.theft += item.count;
        //       break;
        //     case "Simple Assault":
        //       statsObj.assault += item.count;
        //       break;
        //     case "Destruction/Damage/Vandalism of Property":
        //       statsObj.vandalism += item.count;
        //       break;
        //     case "Motor Vehicle Theft":
        //       statsObj.vehicleRelated += item.count;
        //       break;
        //     case "Aggravated Assault":
        //       statsObj.assault += item.count;
        //       break;
        //     case "Burglary/Breaking & Entering":
        //       statsObj.theft += item.count;
        //       break;
        //     case "Domestic Violence/Simple Assault":
        //       statsObj.assault += item.count;
        //       break;
        //     case "Robbery":
        //       statsObj.theft += item.count;
        //       break;
        //     case "All Other Offense":
        //       statsObj.other += item.count;
        //       break;
        //     case "Identity Theft":
        //       statsObj.theft += item.count;
        //       break;
        //     case "Shoplifting":
        //       statsObj.theft += item.count;
        //       break;
        //     case "Intimidation":
        //       statsObj.other += item.count;
        //       break;
        //     case "Weapon Law Violations":
        //       statsObj.other += item.count;
        //       break;
        //     case "False Pretenses/Swindle/Confidence Game":
        //       statsObj.other += item.count;
        //       break;
        //     case "Trespass of Real Property":
        //       statsObj.other += item.count;
        //       break;
        //     case "Domestic Violence/Aggravated Assault":
        //       statsObj.assault += item.count;
        //       break;
        //     case "Child Abuse/Simple/Psychological abuse":
        //       statsObj.other += item.count;
        //       break;
        //     case "Rape":
        //       statsObj.other += item.count;
        //       break;
        //     case "Counterfeiting/Forgery":
        //       statsObj.other += item.count;
        //       break;
        //     case "Embezzlement":
        //       statsObj.other += item.count;
        //       break;
        //     case "Sexual Battery":
        //       statsObj.other += item.count;
        //       break;
        //     case "Stolen Property Offenses":
        //       statsObj.theft += item.count;
        //       break;
        //     case "Sex Offense/All Other":
        //       statsObj.other += item.count;
        //       break;
        //     case "Murder & Non-negligent Manslaughter":
        //       statsObj.homicide += item.count;
        //       break;
        //     default:
        //       statsObj.other += item.count;
        //   }
        // })
      });
  }

  render() {
    return this.state.isLoading
      ? <h1>Testing connections...</h1>
      : <h1>{ this.state.message.toUpperCase() }</h1>;
  }
}
