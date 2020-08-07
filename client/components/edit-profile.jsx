import React from 'react';

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      defaultLocation: null
    };
  }

  render() {

    return (
      <>
        <div>
          <img src="../images/guy.jpg"></img>
          <p>@ashraf_animelover</p>
        </div>
        <form>
          <div>
            <label></label>
            <input></input>
          </div>
          <div>
            <label></label>
            <input></input>
          </div>
        </form>
      </>
    );

  }
}
