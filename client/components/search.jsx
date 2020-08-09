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
        <form className="form-group location" onSubmit={this.handleSubmit}>
          <div className="input-group row">
            <input type="text" className="form-control " name="location" placeholder="Enter location" onChange={this.handleChange} />
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
