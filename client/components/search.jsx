import React from 'react';
import Header from './Header';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crime: []
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/search').then(
      data => data.json()
    ).then(
      json => {
        this.setState({ crime: json });
      }
    );
  }

  render() {
    return (
      <div className="main">
        <Header />
        <form className="form-group location" onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-group row">
            <input type="text" className="form-control " name="location" placeholder="Enter location" />
            <span>
              <input type="submit" className="btn btn-outline-dark"></input>
            </span>
          </div>
        </form>
        <button type="button" className="btn btn-primary two-location" >Compare two locations</button>
      </div>
    );
  }
}

export default SearchPage;
