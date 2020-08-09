import React from 'react';
import Header from './Header';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit() {
    const setView = this.props.setView;
    setView('crime-rates', {});
    // needs method to post search location to Search History database
  }

  render() {
    return (
      <div className="main">
        <Header />
        <div className="p-4 input-group input-group-lg md-form form-sm form-2" style={{ zIndex: 1 }}>
          <input className="form-control my-0 py-1" type="text" placeholder="Enter Location" aria-label="Search"></input>
          <div className="input-group-append">
            <span className="input-group-text red lighten-3" id="basic-text1"><i onClick={this.handleSubmit} className="fas fa-search text-grey"
              aria-hidden="true"></i></span>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-primary btn-color" >Compare two locations</button>
        </div>

      </div>
    );
  }
}

export default SearchPage;
