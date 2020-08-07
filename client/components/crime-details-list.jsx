import React from 'react';
import CrimeDetailsListItem from './crime-details-list-item'

export default class CrimeDetailsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    fetch('/api/crime-details')
      .then(res => res.json())
      .then(data => this.setState({ stats: data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>test</div>
    )
  }
}
