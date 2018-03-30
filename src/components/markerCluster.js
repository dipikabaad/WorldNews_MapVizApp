var _=require('lodash');
import React from 'react';
const fetch = require("isomorphic-fetch");

const {compose, withProps, withHandlers, withStateHandlers,withState} = require("recompose");
import {InfoBox} from "react-google-maps/lib/components/addons/InfoBox";
//import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import {CoolPieChart} from "./CoolPieChart"
import {ToolTip} from './ToolTip'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button, Modal} from 'react-bootstrap'

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
    loadingElement: <div style={{  marginTop: '0.5%',height: '100%'}} />,
    containerElement: <div style={{  height: '90%' }} />,
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
   isOpen: _.range(600).map(() => { return false; }),
   isPaneOpen: false,
   business : 0,
   sport: 0,
   tech: 0,
   politics: 0,
   entertainment: 0,
   isPie: false,
   showM: false,
   //newsUrl: {__html : '<iframe src="https://www.google.com" style={{height:"100%", width:"100%"}}/>'}
   newsUrl: ""
  }),
  {
    onToggleOpen: ({isOpen})=>(index)=>({
       isOpen:isOpen.map((val,i)=>{console.log(index);return (index==i?!val:false)}) 
  }),
    onPaneToggle: ({isPaneOpen})=>()=>({
	isPaneOpen: !isPaneOpen
    }),
    handleMShow: ({showM, newsUrl})=>(newsURL)=>({
        showM: true,
        newsUrl: newsURL
        //newsUrl: ([1].map((val,i) => {console.log(newsURL);return { __html : '<iframe src={'+ newsURL +'&output=embed'+ '} style={{height:"100%", width:"100%"}}/>'}}))[0]
    }),
    handleMClose: ({showM})=>()=>({
        showM: false
    }),
    onMCOver: ({business, sport, tech, politics, entertainment, isPie})=>(markerClusterer)=>(
    {
      //newEle: markerClusterer.getMarkers()
      isPie: true,

      business: (_.chain(markerClusterer.getMarkers()).countBy("title").value()['business']),
      sport: (_.chain(markerClusterer.getMarkers()).countBy("title").value()['sport']),
      tech: (_.chain(markerClusterer.getMarkers()).countBy("title").value()['tech']),
      politics: (_.chain(markerClusterer.getMarkers()).countBy("title").value()['politics']),
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
<Modal show={props.showM} onHide={props.handleMClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <iframe src={props.newsUrl} height="100%" width="100%" frameBorder="0"/>
            
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.handleMClose}>Close</Button>
          </Modal.Footer>
</Modal>
 {props.isPie && <ToolTip
          top="100" 
          left="50"
        >
          <CoolPieChart business={props.business} sport={props.sport} politics={props.politics} entertainment={props.general} tech={props.tech}/>
        </ToolTip>}
  <GoogleMap
    defaultZoom={2}
    defaultCenter={{ lat: 33.247875, lng: -83.441162 }}
    defaultOptions={{ styles: demoFancyMapStyles }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={50}
      maxZoom={10}    
      onMouseOver={props.onMCOver}
      onMouseOut={props.onMCOut}
    
      title="cluster"
    >
     
      {props.markers.map((marker,i) => (
        <Marker
          key={i}
          position={{ lat: marker.loc_info.lat, lng: marker.loc_info.lng}}
          title={marker.category}
          onClick={()=>props.onToggleOpen(i)}
          icon={{url:'./images/'+marker.category+'.png'}} 
	>
      {props.isOpen[i] && <InfoBox
        onCloseClick={()=>props.onToggleOpen(i)}
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div style={{position:'relative', backgroundColor: 'black', padding: '10px', width:'400px', height:'100%', fontSize: '15px', color: '#FFFFFF' }} onClick={() => props.handleMShow(marker.url)}>
            <p style={{fontWeight:'bold',marginTop:'2px', fontSize: '18px', color:'#00bfff'}}>{marker.title}</p><p style={{fontSize:'12px', fontWeight:'italic'}}>{marker.category}</p>
            <div style={{float:'left',marginRight:'15px'}}><img src={marker.thread.main_image} height="70px" width="70px"/></div>
            {marker.text.slice(0,150)+" ..."} 
            {(marker.thread.social.facebook.likes != 0) &&(<div style={{fontSize: '18px'}}> <img src='./images/fb.png' height="20px" width="20px"/>{ " " + marker.thread.social.facebook.likes}</div>)}
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
    this.state = ({ markers:[], markers1:[], key:'All Categories', value:''});

    this.handleNavChange = this.handleNavChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.setState({ markers: []})
  }

  componentDidMount() {
    const url = './all_data.json'

    fetch(url)
      .then(res => res.json())
      .then(data => {
	console.log(data[0]);
        this.setState({ markers: data, markers1:data });
      });

    //Modal.setAppElement(this.el);

  }
  handleSearch(e){
    this.setState({ value: e.target.value });
  }
  handleSubmit(e){
    console.log('Inside Submit' + e);
    e.preventDefault();

      this.setState({
        markers1: this.state.markers.filter((x) => {return (((x.text || "").toLowerCase()).includes((this.state.value).toLowerCase()) || ((x.title || "").toLowerCase()).includes((this.state.value).toLowerCase()));})
      });
  }
  handleNavChange(event) {
    if (event != "All Categories") {
      this.setState({ key: event, 
        markers1: this.state.markers.filter((x) => {return x.category==event})
      });
    }
    else
    {
      this.setState({key: "All Categories", markers1: this.state.markers});
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
      <Navbar.Form pullRight>
      <form onSubmit={this.handleSubmit}>
        <FormControl  type="text" placeholder="Type a Keyword" onChange={this.handleSearch} value={this.state.value}/><FormGroup>
      </FormGroup>{' '}
      <Button type="submit">Search</Button>
      </form>
    </Navbar.Form>
  <Nav pullRight >

    <NavDropdown eventKey={3} title={this.state.key} id="basic-nav-dropdown" onSelect={this.handleNavChange}>
      <MenuItem eventKey="All Categories" >All Categories</MenuItem>
      <MenuItem eventKey="politics">politics</MenuItem>
      <MenuItem eventKey="business">business</MenuItem>
      <MenuItem eventKey="sport">sports</MenuItem>
      <MenuItem eventKey="tech">technology</MenuItem>
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

