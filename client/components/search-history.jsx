import React from 'react';
import SearchHistoryList from './search-history-list';
import ProfileDrawer from './profile-drawer';

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
      <>
        <ProfileDrawer setView={this.props.setView} />
        <div className="container" >
          <h1 className="quantico-font text-center mt-5 mb-3">Search History</h1>
          <div>
            <SearchHistoryList searches={this.state.searches} />
          </div>
        </div>
      </>
    );
  }
}
