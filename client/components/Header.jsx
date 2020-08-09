import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <>
        <div className="logo">
          <img className="logo" src="../images/logo.png"></img>
        </div>
        <header className="header d-flex justify-content-center">
          <h1 className="crime-watch-title">Crime <span className="crime-icon"><i className="fas fa-search" style={{ color: 'black' }}></i></span> Watch</h1>
        </header>
      </>

    );
  }
}

export default Header;
