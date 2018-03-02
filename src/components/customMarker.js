import React from "react"
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {InfoBox} from "react-google-maps/lib/components/addons/InfoBox"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyA6PS9lTvK3KUejjIr7Kg3IBrfvBuyW9WM&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers((i) => ({
    //isOpen: false,
   isOpen: _.range(2).map(() => { return false; })
  }), 
  {
    onToggleOpen: ({isOpen})=>(index)=>({
       isOpen: isOpen.map((val,i)=>{return (index==i?!val:false)}),
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
        <div style={{position:'relative', backgroundColor: 'black', padding: '10px', width:'400px', height:'100%', fontSize: '16px', color: '#FFFFFF' }}>
            <p style={{fontWeight:'bold',marginTop:'2px'}}>This is the headline of a news article bla bla bla bnla asadfasfasffzdfagaewgwegwrgqwrg </p><p style={{fontSize:'10px', fontWeight:'italic'}}>Sports</p>
            <div style={{float:'left',marginRight:'15px'}}><img src="./images/infobox.png" height="50px" width="70px" /></div>Hello, Kaohsiung! Always specify both the height and width attributes for images. If height and width are set, the space required for the image is reserved when the page is loaded. However, without these attributes, the browser does not know the size of the image, and cannot reserve the appropriate space to it. The effect will be that the page layout will change during loading (while the images load).      
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
