import { render } from '@testing-library/react';
import React from 'react';
import MouseSlider from './MouseSlider.js';
import PhidgetSlider from './PhidgetSlider.js';


handleMouseCallback = (positionData) =>{
    this.setState({sliderPosition: positionData})
  }
  handlePhidgetCallback = (positionData) =>{
    this.setState({sliderPosition: positionData})
  }
  function slideDisplay(location) {
	let slider = document.getElementById("slider");
	let absoluteYear = Math.max(-window.innerWidth/2, Math.min(maxClicks, 
		maxClicks - 
		(
			maxClicks * 
			(
				slider.scrollWidth - location
			) 
			/ 
			slider.scrollWidth
			)
		)
	);
	let timelineDiv = document.getElementById("timeline-block");
	timelineDiv.style.left = - absoluteYear + "px";
	adjustDivPresentations(- absoluteYear);
}
function slideDisplayAbsolute(location) {
	let timelineDiv = document.getElementById("timeline-block");
	timelineDiv.style.left = location + "px";
	adjustDivPresentations(location);

}

function fixScrollTicks() {
	let ticks = document.getElementsByClassName('event-scroll-tick');
	yearCount = 0;
	for (var tick=0; tick< ticks.length; tick ++) {
		let percent = yearToPercent((ticks[tick].style.left).slice(0,-2));
		ticks[tick].style.left = percent;
		yearCount += 1;
	}
	//console.log("yearcount = " + yearCount);

}
function dragDisplay(event) {
	//console.log('drag', event.type, event);
	if (event.type === 'mousedown') {
		console.log (event.type);
		scrubbing = true;
	} else if (event.type === 'mousemove' && scrubbing == true) {
		console.log (event.movementX);
		const rect = event.target.getBoundingClientRect();
			
		let currentX = rect.left;
		currentX += event.movementX;
		let newX = Math.max(0, Math.min(90000, currentX));
		event.target.style.left = newX;
		
	} else if (event.type === 'mouseup') {
		console.log (event.type);
		scrubbing = false;
	} 
}

  render() {
      return(
          <div>
            <MouseSlider id='mouseSlider' positionCallback = {this.handleMouseCallback} slideDisplay = {slideDisplay}/>
            <PhidgetSlider id='phidgetSlider' positionCallback = {this.handlePhidgetCallback} />
        </div>
      )
  }