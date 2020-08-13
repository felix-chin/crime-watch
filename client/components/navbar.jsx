import React from 'react';

export default function NavBar(props) {
  const setView = props.setView;
  const view = props.view;
  let search;
  let place;
  let user;
  if (view === 'map' || view === 'heat-map') {
    search = './images/search.png';
    place = './images/place_black.png';
    user = './images/user.png';
  } else if (view === 'profile' || view === 'edit-profile' || view === 'search-history' || view === 'bookmarks') {
    search = './images/search.png';
    place = './images/place.png';
    user = './images/user_black.png';
  } else if (view === 'search') {
    search = './images/search_black.png';
    place = './images/place.png';
    user = './images/user.png';
  } else {
    search = './images/search_black.png';
    place = './images/place.png';
    user = './images/user.png';
  }
  return (
    <nav className="navbar fixed-bottom nav">
      <div className="container d-flex flex-row justify-content-between px-5">
        <img
          src={search}
          onClick={() => setView('search', {})}
          className="nav-icon cursor-pointer" />
        <img
          src={place}
          onClick={() => setView('map', {})}
          className="nav-icon cursor-pointer" />
        <img
          src={user}
          onClick={() => setView('profile', {})}
          className="nav-icon cursor-pointer" />
      </div>
    </nav>
  );
}
