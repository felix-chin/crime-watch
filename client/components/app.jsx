import React from 'react';
import Map from './map';
import EditProfile from './edit-profile';

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
    // fetch('/api/health-check')
    //   .then(res => res.json())
    //   .then(data => this.setState({ message: data.message || data.error }))
    //   .catch(err => this.setState({ message: err.message }))
    //   .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    return (
      <div>
        <EditProfile />
        {/* <Map /> */}
      </div>
    );
  }
}
