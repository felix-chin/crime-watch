import React from 'react';

export default class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location1: '',
      location2: ''
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
    event.preventDefault();
    const getStats1 = this.props.getStats1;
    const getStats2 = this.props.getStats2;
    const setView = this.props.setView;
    getStats1(this.state.location1);
    getStats2(this.state.location2);
    setView('compare-rate-list', { location1: this.state.location1, location2: this.state.location2 });
  }

  render() {
    return (
      <div className="container">
        <h1 className="my-5 text-center quantico-font">Crime Comparison</h1>
        <form onSubmit={this.handleSubmit} className="container pt-2">
          <div className="form-group my-5 pt-3">
            <label htmlFor="location1" className="ml-2">Compare:</label>
            <input
              type="text"
              name="location1"
              value={this.state.location1}
              onChange={this.handleChange}
              placeholder="ex. Los Angeles"
              className="form-control border border-secondary rounded"
              required />
          </div>
          <div className="form-group mb-5">
            <label htmlFor="location2" className="ml-2">With:</label>
            <input
              type="text"
              name="location2"
              value={this.state.location2}
              onChange={this.handleChange}
              placeholder="ex. New York"
              className="form-control border border-secondary rounded"
              required />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-color">Compare</button>
          </div>
        </form>
      </div>
    );
  }
}
