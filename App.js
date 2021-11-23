import React from 'react';

import { Switch, BrowserRouter, Route } from 'react-router-dom';


//import Loading from './Loading';
import Home from './Home';
//import { hot } from "react-hot-loader/root";



window.addEventListener('beforeunload', event => {
	event.preventDefault();
	window.localStorage.clear();	
	
});

function App() {

	return(
		<BrowserRouter>
			<div>
				<Switch>
					<Route  path="/" component={Home} />
				</Switch>
			</div>
			
		</BrowserRouter>
	);
}
export default App;