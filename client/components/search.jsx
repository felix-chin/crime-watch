import React from 'react';
import Header from './Header';
import SearchBar from './search-bar';

function SearchPage(props) {
  return (
    <div className="main">
      <Header />
      <SearchBar setView={props.setView}/>
      <button type="button" className="btn btn-primary two-location">Compare two locations</button>
    </div>
  );
}

export default SearchPage;
