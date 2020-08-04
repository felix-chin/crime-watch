import React from "react"

export default class Map extends React.Component {
  constructor(props) {
    super(props)
    this.googleMapContainerRef = React.createRef()
  }

  componentDidMount() {
    /* global google */
    // marking as global because it should be in a script tag in the HTML file!
    this.map = new google.maps.Map(this.googleMapContainerRef.current, {
      zoom: 16,
      center: {
        lat: 43.642567,
        lng: -79.387054
      },
      disableDefaultUI: true
    })
  }

  render() {
    return (
      <div
        ref={this.googleMapContainerRef}
        style={{ width: "400px", height: "300px" }}
      />
    )
  }
}
