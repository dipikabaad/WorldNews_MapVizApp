var _=require('lodash');
import React from 'react';
const fetch = require("isomorphic-fetch");
const {compose, withProps, withHandlers, withStateHandlers} = require("recompose");
import {InfoBox} from "react-google-maps/lib/components/addons/InfoBox"


const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA6PS9lTvK3KUejjIr7Kg3IBrfvBuyW9WM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
      console.log(_.chain(clickedMarkers).countBy("title").value())
    },
  }),
  withStateHandlers((i) => ({
   isOpen: _.range(1093).map(() => { return false; })
  }),
  {
    onToggleOpen: ({isOpen})=>(index)=>({
       isOpen:isOpen.map((val,i)=>{return (index==i?!val:false)}) 
  })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map((marker,i) => (
        <Marker
          key={i}
          position={{ lat: marker.latitude, lng: marker.longitude}}
          title={marker.category}
          onClick={()=>props.onToggleOpen(i)}
	>
      {props.isOpen[i] && <InfoBox
        onCloseClick={()=>props.onToggleOpen(i)}
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div style={{position:'relative', backgroundColor: 'black', padding: '10px', width:'400px', height:'100%', fontSize: '16px', color: '#FFFFFF' }}>
            <p style={{fontWeight:'bold',marginTop:'2px'}}>{marker.title}</p><p style={{fontSize:'10px', fontWeight:'italic'}}>Sports</p>
            <div style={{float:'left',marginRight:'15px'}}><img src={marker.urlToImage} height="50px" width="70px" /></div>{marker.description} 
        </div>
      </InfoBox>}
        </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

export class Cluster extends React.PureComponent {
  componentWillMount() {
    this.setState({ markers: [] })
  }

  componentDidMount() {
    const url = [
      // Length issue
      'https://gist.githubusercontent.com',
      '/farrrr/dfda7dd7fccfec5474d3',
      '/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json'
    ].join("")

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data.photos });
      });
  }

  render() {
    return (
      <MapWithAMarkerClusterer markers={this.state.markers} />
    )
  }
}

//<Cluster />
