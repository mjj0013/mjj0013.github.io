//import React from 'react';

import Layout from './Layout';
//import {Header, Container, Divider } from 'semantic-ui-react';

import './layout.css';

class Home {
	constructor(props) {
		super(props);

		
		this.mouseClickHandler = this.mouseClickHandler.bind(this);

		
		this.toggleSettings = this.toggleSettings.bind(this);
		this.toggleCalculator = this.toggleCalculator.bind(this);
	
		this.getChildContext = this.getChildContext.bind(this);
		
		
		this.state = { activeIndex: 0 }
	}


	mouseClickHandler = (canvas,e) =>{
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        console.log("Mouse click.. x: " + x + ", y: " + y)
        
    }
	toggleCalculator() {
		let w = document.getElementById("cw");
        if(w.style.display=="none" || w.style.display=='') {
			
            w.style.display="block";
			window.setInterval(w.updateAnswer, 1000);
        }
        else { w.style.display="none"; }
	}

	toggleSettings(e) {
		
		
		let w = document.getElementById("sw");
		
        if(w.style.display=="none" || w.style.display=='') { w.style.display="block"; }
        else { w.style.display="none"; }
		if(e.target.id=="calcSettingsButton") {		//settings request came from calculator
			console.log("calculator button requested settings")
			console.log(document.getElementById('elementSettingsPage'));
			this.currentFocusedElement = "calc";
		}

		if(e.target.id=="homeSettingsButton") {		//settings request came from Home Page
			console.log("home button requested settings")
		}
	}
	render() {
		return (
			<div id="homeRoot">
				<Layout id="homeLayout" className="homeLayout" title="Home" description="asdfasfd">
					<Header as="h2">This is the home page</Header>
					<p>This is a description about the home page.</p>
					
				</Layout>
				
				
				
			</div>
			
		  );
	}
}

export default Home;


