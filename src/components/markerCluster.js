var _=require('lodash');
import React from 'react';
const fetch = require("isomorphic-fetch");

const {compose, withProps, withHandlers, withStateHandlers,withState} = require("recompose");
import {InfoBox} from "react-google-maps/lib/components/addons/InfoBox";
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import {CoolPieChart} from "./CoolPieChart"
import {ToolTip} from './ToolTip'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

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
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  
  }),
  withState('m', 'setM', ''),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      //console.log(m)
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
      
      //console.log(m)
      //console.log(_.chain(clickedMarkers).countBy("title").value())
    },
    onMarkerClustererMouseOver: props =>(markerClusterer)=> event => {
      console.log(markerClusterer);
      props.setM('dfsd');
    }
  }),

  withStateHandlers((i) => ({
   isOpen: _.range(1093).map(() => { return false; }),
   isPaneOpen: false,
   business : 0,
   sports: 0,
   technology: 0,
   general: 0,
   entertainment: 0,
   isPie: false
  }),
  {
    onToggleOpen: ({isOpen})=>(index)=>({
       isOpen:isOpen.map((val,i)=>{console.log(index);return (index==i?!val:false)}) 
  }),
    onPaneToggle: ({isPaneOpen})=>()=>({
	isPaneOpen: !isPaneOpen
    }),
    onMCOver: ({business, sports, technology, general, entertainment, isPie})=>(markerClusterer)=>(
    {
      //newEle: markerClusterer.getMarkers()
      isPie: true,

      business: (_.chain(markerClusterer.getMarkers()).countBy("title").value()['business']),
      sports: (_.chain(markerClusterer.getMarkers()).countBy("title").value()['sports']),
      technology: (_.chain(markerClusterer.getMarkers()).countBy("title").value()['technology']),
      general: (_.chain(markerClusterer.getMarkers()).countBy("title").value()['general']),
      entertainment: (_.chain(markerClusterer.getMarkers()).countBy("title").value()['entertainment']),
      //chartData: [{title: 'business', value:business, color:'#22594e'}, {title: 'business', value:business, color:'#22594e'},
      //{title: 'business', value:business, color:'#22594e'}, {title: 'business', value:business, color:'#22594e'}, {title: 'business', value:business, color:'#22594e'}]
  }),
    onMCOut: ({isPie}) => () =>({
        //business: markers1.filter((x) => {return x.category=='business'}).length,
        //sports: markers1.filter((x) =>{return x.category=='sports'}).length,
        //technology: markers1.filter((x) =>{return x.category=='technology'}).length,
        //general: markers1.filter((x) =>{return x.category=='general'}).length,
        //entertainment: markers1.filter((x) =>{return x.category=='entertainment'}).length,
        isPie: false
        
    }),
  }),
  withScriptjs,
  withGoogleMap
)(props =>

<div>
 {props.isPie && <ToolTip
          top="500" 
          left="500"
        >
          <CoolPieChart business={props.business} sports={props.sports} general={props.general} entertainment={props.general} technology={props.technology}/>
        </ToolTip>}
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
      onMouseOver={props.onMCOver}
      onMouseOut={props.onMCOut}
    
      title="cluster"
    >
     
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
  constructor(props){
    super(props);
    this.state = ({ markers:[], markers1:[], key:'All Categories'});

    this.handleNavChange = this.handleNavChange.bind(this);
  }
  componentWillMount() {
    this.setState({ markers: []})
  }

  componentDidMount() {
    const url = './data.json'

    fetch(url)
      .then(res => res.json())
      .then(data => {
	console.log(data[0]);
        this.setState({ markers: data, markers1:data });
      });

    Modal.setAppElement(this.el);
  }
  handleNavChange(event) {
    if (event != "All Categories") {
      this.setState({key: event});
      this.setState({ value: event, 
        markers1: this.state.markers.filter((x) => {return x.category==event})
      });
    }
    else
    {
      this.setState({key: "All Categories"});
      this.setState({value: event, markers1: this.state.markers});
    }
  }
   /*handleSubmit(event) {
    this.setState({markers1: this.state.markers.filter((x) => {return x.category=='business'})});
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }*/
  render() {
    return (<div>
  <Navbar inverse collapseOnSelect style={{margin:0, width:'100%'}}>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home" style={{fontWeight: 'bold', fontSize: '40px'}}>News App</a>
    </Navbar.Brand>
  </Navbar.Header>
  <Navbar.Collapse >
  <Nav pullRight >

    <NavDropdown eventKey={3} title={this.state.key} id="basic-nav-dropdown" onSelect={this.handleNavChange}>
      <MenuItem eventKey="All Categories" >All Categories</MenuItem>
      <MenuItem eventKey="general">general</MenuItem>
      <MenuItem eventKey="business">business</MenuItem>
      <MenuItem eventKey="sports">sports</MenuItem>
      <MenuItem eventKey="technology">technology</MenuItem>
      <MenuItem eventKey="entertainment">entertainment</MenuItem>
    </NavDropdown>
  </Nav>
  </Navbar.Collapse>
</Navbar>

      <MapWithAMarkerClusterer markers={this.state.markers1} />
      </div>
    )
  }
}

