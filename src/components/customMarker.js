import React from "react"
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {InfoBox} from "react-google-maps/lib/components/addons/InfoBox"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyA6PS9lTvK3KUejjIr7Kg3IBrfvBuyW9WM&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers((i) => ({
    //isOpen: false,
   isOpen: _.range(2).map(() => { return false; })
  }), 
  {
    onToggleOpen: ({isOpen})=>(index)=>({
       isOpen: isOpen.map((val,i)=>{return (index==i?!val:val)}),
    })
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
	  onClick={()=>props.onToggleOpen(marker.key)}
        >
      {props.isOpen[marker.key] && <InfoBox
        onCloseClick={()=>props.onToggleOpen(marker.key)}
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            Hello, Kaohsiung!
          </div>
        </div>
      </InfoBox>}
    </Marker>
      ))}
   
  </GoogleMap>
)

export class CustomMarker extends React.PureComponent {
  state = {
    isMarkerShown: false,
    markers:[{'key':0,'lat':-34.416,'lng':150.644, 'show':false},{'key':1,'lat':-34.916,'lng':150.644}]
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
        markers={this.state.markers}
      />
    )
  }
}
