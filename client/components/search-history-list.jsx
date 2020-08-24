import React from 'react';
import SearchHistoryListItem from './search-history-list-item';

export default function SearchHistoryList(props) {
  const searches = props.searches;
  const searchHistoryListItems = searches.map((search, i) => {
    const timestamp = search.createdAt;
    const date = timestamp.slice(0, timestamp.indexOf('T'));
    const time = timestamp.slice(timestamp.indexOf('T') + 1, timestamp.indexOf('.'));
    return (
      <SearchHistoryListItem
        key={i}
        location={search.location}
        date={date}
        time={time} />
    );
  });
  return (
    <ol className="crime-details-list">
      {searchHistoryListItems}
    </ol>
  );
}
