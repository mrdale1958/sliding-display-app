import { readCSVfile }  from './csvreader.js'

let incomingURL = window.location.href;
console.log(incomingURL);

let timelineData = {};

//fetch('videofiles.txt')
fetch('Pharmacy History Timeline.tsv')
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

let layout = 'linear';
let startYear = 1590;
let ticksPerYear = 200;
 

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function moveDisplay(location) {

}

function yearToPosition(year) {
    yearNumber = parseInt(year);
    var retVal=0;
    if (layout === 'linear') {
        retVal = (yearNumber - startYear) * ticksPerYear;
    }
    return retVal;
}

function buildDiv(eventData) {
    var newDiv = document.createElement("div");
    newDiv.classList.add(eventData['Category']);
    newDiv.classList.add('eventBlock');
    newDiv.style.left = yearToPosition(eventData['Year']);
    var dateDiv = document.createElement("div");
    dateDiv.innerHTML = eventData['Year'];
    newDiv.appendChild(dateDiv);
    var headingDiv = document.createElement("div");
    headingDiv.innerHTML = eventData['Event'];
    newDiv.appendChild(headingDiv);
    var locationDiv = document.createElement("div");
    locationDiv.innerHTML = eventData['Country'];
    newDiv.appendChild(locationDiv);
    var bodyDiv = document.createElement("div");
    bodyDiv.innerHTML = eventData['Significance'];
    newDiv.appendChild(bodyDiv);
    return newDiv;
}

function buildDivs(database) {
    var timelineDiv = document.getElementById("timeline-block");
    for (var event in  database) {
        var newDiv = buildDiv(database[event]);
        timelineDiv.appendChild(newDiv);
    }
}

function runExhibit(database) {
	datum = chooseLine();
	let videos = chooseVideos(layout.length, datum['Verb']);
	queuedVideos = [];
	videosToQueue = videos.length;
	let videodiv = document.getElementById('video-block');
	videodiv.innerHTML = populateVideoDivs(videos, layout);
	let delayedVideoDivs = document.getElementsByClassName("delayed-video");
	for (var delayedVideoDiv = 0;  delayedVideoDiv < delayedVideoDivs.length; delayedVideoDiv++) {
		let newVideoDiv = delayedVideoDivs[delayedVideoDiv].getElementsByTagName('video')[0];
		if (videoSource != 'vimeo') {
			newVideoDiv.oncanplaythrough = enqueueVideo ; 
		}
	}
	let textdiv = document.getElementById('quote-text');
	textdiv.classList.remove('short','middle','long');
	textdiv.classList.add(datum['Type']);
	textdiv.innerHTML = populateTextDiv(datum['Quote'] );
	textdiv.setAttribute("alt", datum['Title']);
	textdiv.setAttribute("title", datum['Title']);
	//if (datum['Quote'].length > 100) textdiv.classList.add('smaller');
	textdiv.classList.toggle('m-fadeOut');
	textdiv.classList.toggle('m-fadeIn');
		setTimeout(fadeText, 27000);
}

