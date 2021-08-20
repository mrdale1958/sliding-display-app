import React from 'react';
import ReactDOM from 'react-dom';
import SlidingDisplay from './SlidingDisplay';
import reportWebVitals from './reportWebVitals';
import { readCSVfile }  from './csvreader.js'
import BackgroundGraphic from './Timeline 11 ARTscreen versiondm.svg';
import registerServiceWorker from './registerServiceWorker';


let config = {
	incomingURL:window.location.href,
	travelDistance : 157.4, // inches ... 6.674 screen widtha
	clickDensity : 255, //clicks per inch
	availableClicks :  39863,
	timelineData : {},
	layout : 'nonlinear',// square, log, superlog, linear
	startYear : 1590,
	lastYear : 2021,
	endYear : 2021,
	ticksPerYear : 154,
	printedGraphicOffset : -1920,
	screenWidth : 3840,

	sortedByYear : {},
	yearCount : 0,
	maxClicks : 0,
	timelineDivs : {},
	yearTrigger : 600,
	labelTrigger : 1100,
	contentTrigger : 1600,
	yearLaneWidth : window.innerWidth/20,
	labelWidth : 300,
	rightEdge : 3840,
	leftEdge : 0,
	backgroundGraphic: BackgroundGraphic,
};
config.lastYear = config.startYear;
config.availableClicks = config.clickDensity * config.travelDistance; // 39863
config.maxClicks = (config.endYear - config.startYear) * config.ticksPerYear;
config.rightEdge = window.innerWidth - config.yearLaneWidth - 100;  // why was this soooo off?
config.leftEdge = 0 + config.labelWidth;
config.rightEdge = config.screenWidth - config.labelWidth; 


fetch('Pharmacy History noquotes.tsv')
	.then((response) => {
    	//response => response.clone.text();
		//console.log(response);
		return response.text();
	})
	.then((mydata) => {
		//console.log("raw timeline: " + mydata);
		let timelineData = readCSVfile(mydata);
		//console.log("timelineData: " + timelineData);
		runExhibit(timelineData);

	});

 
function runExhibit(timelineData) {
  ReactDOM.render(
    <React.StrictMode>
      <SlidingDisplay db={timelineData} configData={config} />
    </React.StrictMode>,
    document.getElementById('timeline-block')
  );
  registerServiceWorker();

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}
