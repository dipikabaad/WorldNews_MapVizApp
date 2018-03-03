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
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
      /*clickedMarkers.forEach(function(cm){
	console.log(cm.position.lat)
	console.log(cm.position.lng)
	console.log("=====================")
      })*/
      //console.log(_.chain(clickedMarkers).countBy("title").value())
    },
  }),
  withStateHandlers((i) => ({
   isOpen: _.range(1093).map(() => { return false; })
  }),
  {
    onToggleOpen: ({isOpen})=>(index)=>({
       isOpen:isOpen.map((val,i)=>{console.log(index);return (index==i?!val:false)}) 
  })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 33.247875, lng: -83.441162 }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
      maxZoom={5}     
    >
      {props.markers.map((marker,i) => (
        <Marker
          key={i}
          position={{ lat: marker.lat, lng: marker.lng}}
          title={marker.category}
          onClick={()=>props.onToggleOpen(i)}
	>
      {props.isOpen[i] && <InfoBox
        onCloseClick={()=>props.onToggleOpen(i)}
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div style={{position:'relative', backgroundColor: 'black', padding: '10px', width:'400px', height:'100%', fontSize: '16px', color: '#FFFFFF' }}>
            <p style={{fontWeight:'bold',marginTop:'2px'}}>{marker.title}</p><p style={{fontSize:'10px', fontWeight:'italic'}}>{marker.category}</p>
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
    const url = './data.json'

    fetch(url)
      .then(res => res.json())
      .then(data => {
	console.log(data[0]);
        this.setState({ markers: data.slice(0,50)});
      });
  }

  render() {
    return (
      <MapWithAMarkerClusterer markers={this.state.markers} />
    )
  }
}

