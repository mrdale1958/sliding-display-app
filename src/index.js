import React from 'react';
import ReactDOM from 'react-dom';
import SlidingDisplay from './SlidingDisplay';
import reportWebVitals from './reportWebVitals';
import { readCSVfile }  from './csvreader.js'


let incomingURL = window.location.href;
//console.log(incomingURL);

let travelDistance = 157.4; // inches ... 6.674 screen widtha
let clickDensity = 320; //clicks per inch
let availableClicks = clickDensity * travelDistance;  // 50373
let timelineData = {};
let layout = 'nonlinear';// square, log, superlog, linear
let startYear = 1590;
let lastYear = startYear;
let endYear = 2021;
let ticksPerYear = 154;
let scrubbing = false;
let offset = [0,0];
let mousePosition;
let sortedByYear = {};
let yearCount = 0;
let maxClicks = (endYear - startYear) * ticksPerYear;
let timelineDivs = {};
let yearTrigger = 0;
let labelTrigger = 0;
let contentTrigger = 0;
let yearLaneWidth = window.innerWidth/20;
let leftEdge = 0; //yearLaneWidth;
let rightEdge = window.innerWidth - yearLaneWidth - 100;


fetch('Pharmacy History noquotes.tsv')
	.then((response) => {
    	//response => response.clone.text();
		//console.log(response);
		return response.text();
	})
	.then((mydata) => {
		console.log("raw timeline: " + mydata);
		timelineData = readCSVfile(mydata);
		console.log("timelineData: " + timelineData);
		runExhibit(timelineData);

	});

 
function runExhibit(timelineData) {
  ReactDOM.render(
    <React.StrictMode>
      <SlidingDisplay db={timelineData}/>
    </React.StrictMode>,
    document.getElementById('timeline-block')
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}
