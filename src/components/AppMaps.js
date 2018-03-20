import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Map from '../components/Map'
import Places from '../components/Places'

export class AppMaps extends Component {
	render() {
		const location = {
			lat: 59.955413,
			lng: 30.337844
		}
		const markers = [
			{
				location:{
					lat: 59.955413,
					lng: 30.337844
				}
			}
		]
		return (
			<div>
				This is the React App!
				
				<div style={{width:300, height:600}}>
					<Map center={location} markers={markers}/>
				</div>

				<Places />
			</div>
			)
	}
}

export default AppMaps
//ReactDOM.render(<AppMaps />, document.getElementById('app'));
