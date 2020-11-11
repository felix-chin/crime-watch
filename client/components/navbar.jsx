import React from 'react';

export default function NavBar(props) {
  const setView = props.setView;
  const view = props.view;
  let search;
  let place;
  let stats;
  let user;
  if (view === 'map' || view === 'heat-map') {
    search = 'nav-icon';
    place = 'nav-icon-active';
    stats = 'nav-icon';
    user = 'nav-icon';
  } else if (view === 'profile' || view === 'edit-profile' || view === 'search-history' || view === 'bookmarks') {
    search = 'nav-icon';
    place = 'nav-icon';
    stats = 'nav-icon';
    user = 'nav-icon-active';
  } else if (view === 'search') {
    search = 'nav-icon-active';
    place = 'nav-icon';
    stats = 'nav-icon';
    user = 'nav-icon';
  } else {
    search = 'nav-icon';
    place = 'nav-icon';
    stats = 'nav-icon-active';
    user = 'nav-icon';
  }
  return (
    <nav className="navbar fixed-bottom nav">
      <div className="container px-4">
        {/* <img
          src={search}
          onClick={() => setView('search', {})}
          className="nav-icon cursor-pointer"
        /> */}
        {/* <img
          src={place}
          onClick={() => setView('map', {})}
          className="nav-icon cursor-pointer"
        /> */}
        <i onClick={() => setView('search', {})} className={'fas fa-search ' + search}></i>
        <i onClick={() => setView('map', {})} className={'fas fa-map-marker-alt ' + place}></i>
        <i onClick={() => setView('crime-rates', {})} className={'fas fa-chart-bar ' + stats }></i>
        <i onClick={() => setView('profile', {})} className={'fas fa-user ' + user}></i>
        {/* <img
          src={user}
          onClick={() => setView('profile', {})}
          className="nav-icon cursor-pointer"
        /> */}
      </div>
    </nav>
  );
}
