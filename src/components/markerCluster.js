var _=require('lodash');
import React from 'react';
const fetch = require("isomorphic-fetch");
const {compose, withProps, withHandlers, withStateHandlers} = require("recompose");
import {InfoBox} from "react-google-maps/lib/components/addons/InfoBox";
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';


const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const demoFancyMapStyles = require("./demoFancyMapStyles.json");

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
      
      //console.log(_.chain(clickedMarkers).countBy("title").value())
    },
    onMarkerClustererMouseOver: () => (markerClusterer) => {
      console.log("MOUSE HOVER")
    }
  }),
  withStateHandlers((i) => ({
   isOpen: _.range(1093).map(() => { return false; }),
   isPaneOpen: false
  }),
  {
    onToggleOpen: ({isOpen})=>(index)=>({
       isOpen:isOpen.map((val,i)=>{console.log(index);return (index==i?!val:false)}) 
  }),
    onPaneToggle: ({isPaneOpen})=>()=>({
	isPaneOpen: !isPaneOpen
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <div>
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 33.247875, lng: -83.441162 }}
    defaultOptions={{ styles: demoFancyMapStyles }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
      maxZoom={10}    
      onMouseOver={props.onMarkerClustererMouseOver}
      title="CLUSTER 1"
    >
     <p style={{backgroundColor:"black"}}> CLSUTER </p> 
      {props.markers.map((marker,i) => (
        <Marker
          key={i}
          position={{ lat: marker.lat, lng: marker.lng}}
          title={marker.category}
          onClick={()=>props.onToggleOpen(i)}
          icon={{url:'./images/'+marker.category+'.png'}} 
	>
      {props.isOpen[i] && <InfoBox
        onCloseClick={()=>props.onToggleOpen(i)}
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div style={{position:'relative', backgroundColor: 'black', padding: '10px', width:'400px', height:'100%', fontSize: '16px', color: '#FFFFFF' }}>
            <p style={{fontWeight:'bold',marginTop:'2px'}} onClick={props.onPaneToggle}>{marker.title}</p><p style={{fontSize:'10px', fontWeight:'italic'}}>{marker.category}</p>
            <div style={{float:'left',marginRight:'15px'}}><img src={marker.urlToImage} height="50px" width="70px" /></div>{marker.description} 
        </div>
      </InfoBox>}
        </Marker>
      ))}
    </MarkerClusterer>


   </GoogleMap>
            <SlidingPane
                isOpen={ props.isPaneOpen }
                title='Hey, it is optional pane title'
                from='left'
                width='200px'
                onRequestClose={props.onPaneToggle}>
                <div>And I am pane content on left.</div>
            </SlidingPane>
   </div>
);

export class Cluster extends React.PureComponent {
  componentWillMount() {
    this.setState({ markers: []})
  }

  componentDidMount() {
    const url = './data.json'

    fetch(url)
      .then(res => res.json())
      .then(data => {
	console.log(data[0]);
        this.setState({ markers: data });
      });

    Modal.setAppElement(this.el);
  }

  render() {
    return (
      <MapWithAMarkerClusterer markers={this.state.markers} />
    )
  }
}

