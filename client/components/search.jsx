import React from 'react';
import Header from './Header';
import SearchBar from './search-bar';

function SearchPage(props) {
  const setView = props.setView;
  return (
    <div className="main">
      <Header />
      <SearchBar getStats={props.getStats} setView={props.setView}/>
      <div className="d-flex justify-content-center">
        <button type="button" onClick={() => setView('compare', {})} className="btn btn-color">Compare two locations</button>
      </div>
    </div>
  );
}

export default SearchPage;
