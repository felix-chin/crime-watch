import React from 'react';

export default class ProfileDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(prevState => {
      return { isOpen: !prevState.isOpen };
    });
  }

  render() {
    const openedMenu = {
      bottom: '53px',
      transition: 'bottom 0.7s'
    };
    const closedMenu = {
      bottom: '-400px',
      transition: 'bottom 0.7s'
    };
    const isOpen = this.state.isOpen;
    const setView = this.props.setView;
    return (
      <>
        <i onClick={this.toggleMenu} className='fas fa-bars menu-icon ml-3 mt-3 position-fixed pointer' style={{ zIndex: 1 }}></i>
        { isOpen &&
          <div onClick={this.toggleMenu} className='position-fixed shade animate'></div>
        }
        <div className='d-flex flex-column justify-content-end align-items-center menu roboto-font text-white pt-3 pb-2' style={isOpen ? openedMenu : closedMenu}>
          <h3 onClick={() => setView('edit-profile', {})} className="pb-1 pointer">Edit Profile</h3>
          <h3 onClick={() => setView('search-history', {})} className="pb-1 pointer">Search History</h3>
          <h3 onClick={() => setView('bookmarks', {})} className="pb-1 pointer">Bookmarked Incidents</h3>
          <h3 onClick={() => setView('login', {})} className='pointer'>Log Out</h3>
        </div>
      </>
    );
  }
}
