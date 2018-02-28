import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyA6PS9lTvK3KUejjIr7Kg3IBrfvBuyW9WM&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
          {props.markers.map(marker => (
        <Marker
          key={marker.key}
          icon={{url:'./images/icon.png'}}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
   
  </GoogleMap>
)

export class CustomMarker extends React.PureComponent {
  state = {
    isMarkerShown: false,
    markers:[{'key':1,'lat':-34.416,'lng':150.644},{'key':2,'lat':-34.516,'lng':150.644}]
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        markers={this.state.markers}
      />
    )
  }
}
