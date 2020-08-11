import React from 'react';
import BookmarkItem from './bookmark-item';

export default function BookmarkList(props) {
  const bookmarks = props.bookmarks;
  const bookmarkListItems = bookmarks.map((bookmark, i) => {
    const details = bookmark.incident_offense_description;
    const date = bookmark.incident_date;
    const newDate = date.slice(0, date.indexOf('T'));
    const address = bookmark.incident_address;

    return (
      <BookmarkItem
        key={i}
        date={newDate}
        details={details}
        address={address} />
    );
  });

  return (
    <>
      {bookmarkListItems}
    </>
  );
}
