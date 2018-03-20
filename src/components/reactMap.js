import React from "react"
import { compose, withProps, withStateHandlers, withState } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyA6PS9lTvK3KUejjIr7Kg3IBrfvBuyW9WM&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
   withStateHandlers(() => ({
    isOpen: {},
  }), {
    onToggleOpen: ({ isOpen}) => (id) => ({
          isOpen: isOpen.map( (x, i) => {
            if (i == id) { return !x;}
            else {return x;}
          }),
        
    }),
    onIncrement: ({isOpen}) => (index) => ({
        isOpen: isOpen.map( (x, i) => {
            if (!(index in isOpen)) { return !x;}
            else {return x;}
          })
        ,
    }),

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
          
          onClick={() => props.onToggleOpen(marker.key)}
          >

        {props.isOpen[marker.key] &&
          <InfoWindow
        
        onCloseClick={() => props.onToggleOpen(marker.key)}
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            Hello, Kaohsiung!
          </div>
        </div>
      </InfoWindow>
                }
        </Marker>
      ))}
   
  </GoogleMap>
)

export class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
    
    markers:[{'key':0,'lat':-34.416,'lng':150.644},{'key':1,'lat':-34.516,'lng':150.644}]
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  /*handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }*/
  /*handleMarkerClick = ({id }) => {
    
    const items = this.state.isOpen;
    items[id] = isOpen[id] == true ? false : true;

    // update state
    this.setState({
        isOpen: items
    });
  }
*/
  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        
        
        markers={this.state.markers}
      />
    )
  }
}
