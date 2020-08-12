import React from 'react';
import BookmarkList from './bookmark-list';

export default class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allBookmarks: [], userId: null, userBookmarks: [] };
    this.getUserBookmarks = this.getUserBookmarks.bind(this);
  }

  componentDidMount() {
    fetch('/api/bookmarks')
      .then(response => response.json())
      .then(data => {
        this.setState({ allBookmarks: data });
      })
      .catch(err => console.error(err));
    this.getUserBookmarks();
  }

  getUserBookmarks() {
    const dataArray = [];
    fetch(`/api/bookmarks/${2}`)
      .then(response => response.json())
      .then(data => {
        data.map(incident => {
          const newBookmark = incident.incident;
          dataArray.push(newBookmark);
        });
        this.setState({ userBookmarks: dataArray, userId: data[0].userId });
      });
  }

  render() {
    return (
      <>
        <div className="container ">
          <header className='d-flex justify-content-center mt-3'>
            <h1 className="quantico-font w-50 text-center">Bookmarked Incidents</h1>
          </header>
          <div className='row mt-3 align-items-center roboto-font'>
            <BookmarkList bookmarks={this.state.userBookmarks} />
          </div>
        </div>
      </>
    );
  }
}
