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
    const setView = this.props.setView;
    return (
      <div className="container nav-padding" >
        <div className='back-button-container mt-2'>
          <span onClick={() => setView('profile', {})} className="cursor-pointer back">
            <i className="fa fa-arrow-left fa-lg" aria-hidden="true"></i>
          </span>
        </div>
        <div className="d-flex justify-content-center mt-4 mb-4" >
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
