import React from 'react';

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      defaultLocation: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.edit(this.state);
  }

  render() {
    const { name, defaultLocation } = this.state;
    return (
      <>
        <div className="container">
          <div className="row d-flex mt-3">
            <div className="w-60 mx-auto">
              <h1 className="mb-5 quantico-font">Edit Profile</h1>
              <img className="profilePic" src="../images/guy.jpg"></img>
              <p className="mb-5 h5 roboto-font">@ashraf_animelover</p>
            </div>
            <form className="container justify-content-center">
              <div className="w-100 form-group form-group-lg">
                <label className="h5 roboto-font">Name:</label><br></br>
                <input onChange={this.handleChange} type="text" value={name} name="name" id="name" className="mb-4 form-control form-control-lg"></input>
              </div>
              <div className="w-100 form-group form-group-lg">
                <label className="h5 roboto-font">Default Location:</label><br></br>
                <input onChange={this.handleChange} type="text" value={defaultLocation} name="defaultLocation" id="defaultLocation" className="mb-4 form-control form-control-lg"></input>
              </div><br></br>
              <div className="d-flex justify-content-center">
                <button onClick={this.handleSubmit} type="submit" className="btn btn-lg btn-color roboto-font">Update Profile</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );

  }
}
