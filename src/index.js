import React from 'react';
import {render} from 'react-dom';

import {App,Map} from './components/App';

import {Router, Route, hashHistory} from 'react-router';

window.React = React;

render (
	<Router history={hashHistory}>
		<Route path="/" component={App} />
	</Router>,
	document.getElementById("map-container")
)
