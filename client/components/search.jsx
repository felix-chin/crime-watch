import React from 'react';
import Header from './Header';
import SearchBar from './search-bar';

function SearchPage(props) {
  return (
    <div className="main">
      <Header />
      <SearchBar setView={props.setView}/>
      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-primary btn-color" >Compare two locations</button>
      </div>
    </div>
  );
}

export default SearchPage;
