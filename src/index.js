import React from 'react';
import {render} from 'react-dom';

import {App} from './components/App';
import {MyFancyComponent} from './components/reactMap';

import {Router, Route, hashHistory} from 'react-router';

window.React = React;

render (
	<Router history={hashHistory}>
		<Route path="/" component={MyFancyComponent} />
	</Router>,
	document.getElementById("map-container")
)

