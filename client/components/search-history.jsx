import React from 'react';
import SearchHistoryList from './search-history-list';

export default class SearchHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searches: []
    };
    this.getHistory = this.getHistory.bind(this);
  }

  componentDidMount() {
    this.getHistory();
  }

  getHistory() {
    const profile = this.props.profile;
    fetch(`/api/searches/${profile.userId}`)
      .then(res => res.json())
      .then(data => this.setState({ searches: data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container" >
        <div className="d-flex justify-content-center mt-5 mb-4" >
          <img src="./images/history.png" alt="search-history" className="mr-3 images" />
          <h1 className="quantico-font">Search History</h1>
        </div>
        <div>
          <SearchHistoryList searches={this.state.searches} />
        </div>
      </div>
    );
  }
}
