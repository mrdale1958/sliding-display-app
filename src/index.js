import React from 'react';
import ReactDOM from 'react-dom';
import SlidingDisplay from './SlidingDisplay';
import reportWebVitals from './reportWebVitals';
import { readCSVfile }  from './csvreader.js'
import BackgroundGraphic from './Timeline 11 ARTscreen versiondm.svg';


let config = {
	incomingURL:window.location.href,
	travelDistance : 157.4, // inches ... 6.674 screen widtha
	clickDensity : 320, //clicks per inch
	availableClicks : 0,  // 50373
	timelineData : {},
	layout : 'nonlinear',// square, log, superlog, linear
	startYear : 1590,
	lastYear : 2021,
	endYear : 2021,
	ticksPerYear : 154,

	sortedByYear : {},
	yearCount : 0,
	maxClicks : 0,
	timelineDivs : {},
	yearTrigger : 0,
	labelTrigger : 0,
	contentTrigger :0,
	yearLaneWidth : window.innerWidth/20,
	leftEdge : 0, 
	rightEdge : 0, 
	backgroundGraphic: BackgroundGraphic;
};
config.lastYear = config.startYear;
config.availableClicks = config.clickDensity * config.travelDistance; // 50373
config.maxClicks = (config.endYear - config.startYear) * config.ticksPerYear;
config.rightEdge = window.innerWidth - config.yearLaneWidth - 100;


fetch('Pharmacy History noquotes.tsv')
	.then((response) => {
    	//response => response.clone.text();
		//console.log(response);
		return response.text();
	})
	.then((mydata) => {
		console.log("raw timeline: " + mydata);
		let timelineData = readCSVfile(mydata);
		console.log("timelineData: " + timelineData);
		runExhibit(timelineData);

	});

 
function runExhibit(timelineData) {
  ReactDOM.render(
    <React.StrictMode>
      <SlidingDisplay db={timelineData} configData={config} />
    </React.StrictMode>,
    document.getElementById('timeline-block')
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}
