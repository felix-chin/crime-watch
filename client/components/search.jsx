import React from 'react';
import Header from './header';
import SearchBar from './search-bar';

function SearchPage(props) {
  const setView = props.setView;
  return (
    <div className="main">
      <Header />
      <div className='d-flex flex-column justify-content-center align-items-center mt-3'>
        <p>Welcome</p>
      </div>
      <div className='container'>
        <SearchBar
          profile={props.profile}
          getStats={props.getStats}
          setView={props.setView}
          getCoords={props.getCoords} />
      </div>

      <div className="d-flex justify-content-center">
        <button
          type="button"
          onClick={() => setView('compare', {})}
          className="btn btn-color">Compare two locations</button>
      </div>
    </div>
  );
}

export default SearchPage;
