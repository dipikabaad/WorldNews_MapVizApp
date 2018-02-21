import {Component} from 'react';
import {GoogleApiComponent, GoogleApiWrapper} from 'google-maps-react';
import {Map} from './Map';


export class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			"temp":"abc"
		}
	}

	render(){

		console.log(this.props.google);
		const style = {
			width : '100vw',
			height: '100vh'
		}
		return(
			<div style = {style}>
			<Map google={this.props.google} zoom={5}>
			</Map>
			</div>
		)

	}
	

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAkWNzguOVksu6AvNYpz9DxP71NElW40aw'
})(App)


