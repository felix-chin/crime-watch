import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <>
        <div className="text-center">
          <img className="logo" src="../images/logo.png" />
          <h1 className="crime-watch-title">Crime<i className="fas fa-search" style={{ color: 'black' }}></i>Watch</h1>
        </div>
      </>

    );
  }
}

export default Header;
