import React from 'react';
import {render} from 'react-dom';

import {App} from './components/App';
import {CustomMarker} from './components/customMarker';
import {Cluster} from './components/markerCluster';

import {Router, Route, hashHistory} from 'react-router';

window.React = React;

render (
	<Router history={hashHistory}>
		<Route path="/" component={CustomMarker} />
		<Route path="/c" component={Cluster} />
	</Router>,
	document.getElementById("map-container")
)

