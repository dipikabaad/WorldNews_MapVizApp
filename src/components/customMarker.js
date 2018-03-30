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

/*
51.16052269999999 71.4703558
51.24904032496312 71.49522618213327
51.329410581690226 71.5684970663904
51.39385228047448 71.6858673559565
51.435362815065375 71.84009952713836
51.44811408134037 72.02131605270064
51.427801067464884 72.21747374128003
*/

export class CustomMarker extends React.PureComponent {
  state = {
    isMarkerShown: false,
    markers:[{'key':0,'lat':51.16052269999999,'lng':71.4703558, 'show':false},{'key':1,'lat':48.80621619608289,'lng':73.51209539155603},
{'key':2,'lat':51.329410581690226,'lng':71.5684970663904, 'show':false},{'key':3,'lat':51.427801067464884,'lng':72.21747374128003, 'show':false}
]
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
