import React from 'react';
import BookmarkList from './bookmark-list';
import ProfileDrawer from './profile-drawer';

export default class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBookmarks: [],
      userId: null,
      userBookmarks: []
    };
    this.getUserBookmarks = this.getUserBookmarks.bind(this);
  }

  componentDidMount() {
    fetch('/api/bookmarks')
      .then(response => response.json())
      .then(data => {
        this.setState({
          allBookmarks: data
        });
      })
      .catch(err => console.error(err));
    this.getUserBookmarks();
  }

  getUserBookmarks() {
    const profile = this.props.profile;
    const dataArray = [];
    fetch(`/api/bookmarks/${profile.userId}`)
      .then(response => response.json())
      .then(data => {
        data.map(incident => {
          const newBookmark = incident.incident;
          dataArray.push(newBookmark);
        });
        this.setState({
          userBookmarks: dataArray,
          userId: profile.userId
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <ProfileDrawer setView={this.props.setView} />
        <div className="container ">
          <h1 className="quantico-font text-center mt-5 mb-3">Bookmarked Incidents</h1>
          <BookmarkList bookmarks={this.state.userBookmarks} />
        </div>
      </>
    );
  }
}
