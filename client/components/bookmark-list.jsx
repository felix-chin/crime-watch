import React from 'react';
import BookmarkItem from './bookmark-item';

export default function BookmarkList(props) {
  const bookmarks = props.bookmarks;
  const bookmarkListItems = bookmarks.map((bookmark, i) => {
    const details = bookmark.incident_offense_description;
    const newDate = bookmark.incident_date;
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
