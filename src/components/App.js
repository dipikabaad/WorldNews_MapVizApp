import {Component} from 'react';
import { ReactDOM } from 'react-dom';
//import {GoogleMapReact, maps, Marker, InfoWindow, GoogleApiComponent, GoogleApiWrapper} from 'google-maps-react';
//import {Map} from '../components/Map';
//import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
export class App extends Component {

 
  render() {
    return (
      <div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAkWNzguOVksu6AvNYpz9DxP71NElW40aw' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text={'Kreyser Avrora'}
        />
      </GoogleMapReact>
      </div>
    );
  }
}
App.defaultProps = {
	center: {lat: 59.95, lng: 30.33},
    zoom: 11
}
/*export class App extends Component {
	
	render() {
	  const style = {
      width: '100vw',
      height: '100vh'

    }
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
        <div style={style}>
        	//<Map google={this.props.google} />
        	<GoogleMapReact></GoogleMapReact>
        </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAkWNzguOVksu6AvNYpz9DxP71NElW40aw'
})(App)

App.defaultProps = {
	center: {lat: 40.73, lng:-73.93},
	zoom: 12
}*/


