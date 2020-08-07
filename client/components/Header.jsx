import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <h1 className="crime">Crime <span className="crime-icon"><i className="fas fa-search"></i></span> Watch</h1>
      </header>
    );
  }
}

export default Header;
