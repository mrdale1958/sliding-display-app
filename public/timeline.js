import { readCSVfile }  from './csvreader.js'

let incomingURL = window.location.href;
console.log(incomingURL);

let travelDistance = 157.4; // inches ... 6.674 screen widtha
let clickDensity = 320; //clicks per inch
let availableClicks = clickDensity * travelDistance;  // 50373
let timelineData = {};
let layout = 'nonlinear';// square, log, superlog, linear
let startYear = 1590;
let lastYear = startYear;
let endYear = 2021;
let ticksPerYear = 320;
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
let yearLaneWidth = window.innerWidth/10;
let leftEdge = yearLaneWidth;
let rightEdge = window.innerWidth - yearLaneWidth;


//fetch('videofiles.txt')
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

 

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function moveDisplay(event) {
	console.log('click', event);
	let slider = document.getElementById("slider");
	let absoluteYear = maxClicks - (maxClicks * (slider.scrollWidth - event.layerX) / slider.scrollWidth);
	let timelineDiv = document.getElementById("timeline-block");
	timelineDiv.style.left = - absoluteYear + "px";

}

function clearYearDisplayClasses(yearDiv)  {
}
function adjustDivPresentations(location) {
	let yearDivs = document.getElementsByClassName("year");
	for (var yearDiv of yearDivs) {
		//console.log(yearDivs, yearDiv);
		
		if (yearDiv === undefined) {
			console.log(yearDivs, yearDiv);
			break;
		}
		if (yearDiv.classList === undefined) {
			console.log(yearDivs, yearDiv);
			break;
		}
		let eventDivs = yearDiv.getElementsByClassName("event-div");
		for (var eventDiv of eventDivs) {
			let dotDiv = eventDiv.getElementsByClassName("event-dot")[0];
			let dateDiv = eventDiv.getElementsByClassName("event-date")[0];
			let labelDiv = eventDiv.getElementsByClassName("event-label")[0];
			let contentDiv = eventDiv.getElementsByClassName("event-block")[0];
			//console.log(yearDiv, yearDiv.style.left);
			let yearDivLocOnScreen = parseInt(yearDiv.style.left.slice(0,-2)) + location;
			if (false && (yearDivLocOnScreen > 0) &&  (yearDivLocOnScreen < rightEdge) ){
				console.log(yearDiv.id, yearDivLocOnScreen,location,location + yearTrigger,location + labelTrigger,location + contentTrigger,
				rightEdge - contentTrigger, rightEdge - labelTrigger, rightEdge - yearTrigger, rightEdge);
			}
			if ( yearDivLocOnScreen < leftEdge) {
				dotDiv.style.display = "none";
				dateDiv.style.display = "none";
				labelDiv.style.display = "none";
				contentDiv.style.display = "none";
			} else {
				if (yearDivLocOnScreen > yearTrigger) {
					if (yearDivLocOnScreen > labelTrigger) {
						if (yearDivLocOnScreen > contentTrigger) {
							if (yearDivLocOnScreen > rightEdge - contentTrigger) {
								if (yearDivLocOnScreen > rightEdge - labelTrigger) {
									if (yearDivLocOnScreen > rightEdge - yearTrigger) {
										if (yearDivLocOnScreen > rightEdge ) {
											dotDiv.style.display = "none";
											dateDiv.style.display = "none";
											labelDiv.style.display = "none";
											contentDiv.style.display = "none";
										} else {
											dotDiv.style.display = "block";
											dateDiv.style.display = "none";
											labelDiv.style.display = "none";
											contentDiv.style.display = "none";
											//console.log(yearDiv.id, "right dot");

										}									
									} else {
										dotDiv.style.display = "none";
										dateDiv.style.display = "block";
										labelDiv.style.display = "none";
										contentDiv.style.display = "none";
										//console.log(yearDiv.id, "right date");
									}
								} else {
									dotDiv.style.display = "none";
									dateDiv.style.display = "none";
									labelDiv.style.display = "block";
									contentDiv.style.display = "none";
									//console.log(yearDiv.id, "right label");
								}
							} else {
								dotDiv.style.display = "none";
								dateDiv.style.display = "none";
								labelDiv.style.display = "none";
								contentDiv.style.display = "block";	
								//console.log(yearDiv.id, "content");
							}
						} else {
							dotDiv.style.display = "none";
							dateDiv.style.display = "none";
							labelDiv.style.display = "block";
							contentDiv.style.display = "none";
							//console.log(yearDiv.id, "left label");
						}				
					} else {
						dotDiv.style.display = "none";
						dateDiv.style.display = "block";
						labelDiv.style.display = "none";
						contentDiv.style.display = "none";
						//console.log(yearDiv.id, "left date");
					}
				} else {
					dotDiv.style.display = "block";
					dateDiv.style.display = "none";
					labelDiv.style.display = "none";
					contentDiv.style.display = "none";
					//console.log(yearDiv.id, "left dot");
				}
			} 
		}
	}
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
function sortEventsByYear(database) {
	//sortedByYear = database.sort((a,b) => (a.YEAR > b.YEAR) ? 1 : -1);
	sortedByYear = database.sort((a,b) => (a.EXTENDED_YEAR > b.EXTENDED_YEAR) ? 1 : -1);
	let uniqueExtendedYears = new Set();
	for (var event of sortedByYear) {
		uniqueExtendedYears.add(event.EXTENDED_YEAR);
	}
	yearCount = uniqueExtendedYears.size;
}

function yearToPosition(year) {
    let yearNumber = parseInt(year);
	let retVal=0;
	let deltaYears = yearNumber - startYear;
	let totalYears = endYear - startYear;
    if (layout === 'linear' || layout == null) {
		
        retVal = deltaYears * ticksPerYear;
    } else if (layout === 'square') {
        retVal = (totalYears - Math.pow(deltaYears,2)) * ticksPerYear;
    } else if (layout === 'log') {
        retVal = deltaYears * ticksPerYear * Math.log(deltaYears) / Math.log(totalYears) ;
    } else if (layout === 'superlog') {
        retVal = deltaYears * ticksPerYear * Math.pow((Math.log(deltaYears) / Math.log(totalYears)), 2) ;
    } else if (layout === 'nonlinear') {
		retVal = yearCount * ticksPerYear  ;
    } 
    return retVal + "px";
}
function yearToPercent(year) {
    let yearNumber = parseInt(year);
	let retVal=0;
	let deltaYears = yearNumber - startYear;
	let totalYears = endYear - startYear;
    if (layout === 'linear' || layout == null) {
		
        retVal = deltaYears * ticksPerYear;
    } else if (layout === 'square') {
        retVal = (totalYears - Math.pow(deltaYears,2)) * ticksPerYear;
    } else if (layout === 'log') {
        retVal = deltaYears * ticksPerYear * Math.log(deltaYears) / Math.log(totalYears) ;
    } else if (layout === 'superlog') {
        retVal = deltaYears * ticksPerYear * Math.pow((Math.log(deltaYears) / Math.log(totalYears)), 2) ;
    } else if (layout === 'nonlinear') {
		retVal = yearCount * ticksPerYear  ;
    } 
    return 100*(retVal/maxClicks) + "%";
}

function categoryToClassname(category) {
	let retVal = category.replace(/[ \/]/g, "_").toLowerCase();
	//console.log(category,retVal);
	return retVal;
}

function buildDotDiv(eventData) {
    let newDiv = document.createElement("div");
    //newDiv.classList.add(categoryToClassname(eventData['CATEGORY']));
    newDiv.classList.add('event-dot');
    
    return newDiv;
}

function buildDateDiv(eventData) {
    let newDiv = document.createElement("div");
    //newDiv.classList.add(categoryToClassname(eventData['CATEGORY']));
    newDiv.classList.add('event-date');
    newDiv.style.left = yearToPosition(eventData['YEAR']);
    let dateDiv = document.createElement("div");
    dateDiv.innerHTML = "<span class='event-year'>" + eventData['YEAR'] +"</span><span class='event-location'>" + eventData['COUNTRY'] + "</span>";
    newDiv.appendChild(dateDiv);
    
    return newDiv;
}

function buildLabelDiv(eventData) {
    let newDiv = document.createElement("div");
    //newDiv.classList.add(categoryToClassname(eventData['CATEGORY']));
    newDiv.classList.add('event-label');
    newDiv.style.left = yearToPosition(eventData['YEAR']);
    let dateDiv = document.createElement("div");
    dateDiv.innerHTML = "<span class='event-year'>" + eventData['YEAR'] +"</span><span class='event-location'>" + eventData['COUNTRY'] + "</span>";
    newDiv.appendChild(dateDiv);
    let headingDiv = document.createElement("div");
	headingDiv.classList.add('event-heading');
	headingDiv.innerHTML = eventData['EVENT'];
    newDiv.appendChild(headingDiv);
	
    return newDiv;
}

function buildContentDiv(eventData) {
    let newDiv = document.createElement("div");
    //newDiv.classList.add(categoryToClassname(eventData['CATEGORY']));
    newDiv.classList.add('event-block');
    newDiv.style.left = yearToPosition(eventData['YEAR']);
    let dateDiv = document.createElement("div");
    dateDiv.innerHTML = "<span class='event-year'>" + eventData['YEAR'] +"</span><span class='event-location'>" + eventData['COUNTRY'] + "</span>";
    newDiv.appendChild(dateDiv);
    let headingDiv = document.createElement("div");
	headingDiv.classList.add('event-heading');
	headingDiv.innerHTML = eventData['EVENT'];
    newDiv.appendChild(headingDiv);
	let bodyDiv = document.createElement("div");
	bodyDiv.classList.add('event-body');
    bodyDiv.innerHTML = eventData['SIGNIFICANCE'];
    newDiv.appendChild(bodyDiv);
    return newDiv;
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

function buildEventDiv(eventData) {
    let newDiv = document.createElement("div");
    newDiv.classList.add('event-div');
	newDiv.appendChild(buildDotDiv(eventData));
	newDiv.appendChild(buildDateDiv(eventData));
	newDiv.appendChild(buildLabelDiv(eventData));
	newDiv.appendChild(buildContentDiv(eventData));
	return newDiv;
}

function buildDivs(database) {
    let timelineDiv = document.getElementById("timeline-block");
    for (var event in  database) {
		let eventData = database[event];
		if ( String(lastYear).slice(0,2) != String(eventData.YEAR).slice(0,2)) {
			let centuryDiv = document.createElement("div");
			centuryDiv.classList.add('century');
			timelineDiv.appendChild(centuryDiv);
			centuryDiv.style.left = parseInt(yearToPosition(eventData.YEAR).slice(0,-2)) - 5 + "px";
			//lastYear = eventData.YEAR;
			lastYear = eventData.EXTENDED_YEAR;
		}
		let yearDiv = document.getElementById(eventData.EXTENDED_YEAR);
        let newDiv = buildEventDiv(database[event]);
		let newPosition =  yearToPosition(eventData.YEAR);
		if (yearDiv === null) {
			yearDiv = document.createElement("div");
			yearDiv.classList.add('year');
			//yearDiv.id = eventData.YEAR;
			yearDiv.id = eventData.EXTENDED_YEAR;
			timelineDiv.appendChild(yearDiv);
			yearDiv.style.left = newPosition;
			maxClicks = parseInt(newPosition.slice(0,-2)) + ticksPerYear;
			let scrollTick = document.createElement("div");
			scrollTick.classList.add('event-scroll-tick');
			let tickPosition =  eventData.YEAR;
			scrollTick.style.left = tickPosition + "px";
	        let slider = document.getElementById("slider");
	        slider.appendChild(scrollTick);
			//console.log(yearDiv.id, eventData.EXTENDED_YEAR, yearCount, parseInt(newPosition.slice(0,-2)), parseInt(newPosition.slice(0,-2))/320+11.8);
			console.log('\t'+ eventData.EXTENDED_YEAR+ '\t'+ parseInt(newPosition.slice(0,-2))+ '\t'+ (parseInt(newPosition.slice(0,-2))/320+11.8) + '\t');
			yearCount += 1;
		} 
		let categoryDivs = yearDiv.getElementsByClassName(categoryToClassname(eventData.CATEGORY));
		let categoryDiv;
		if (categoryDivs.length != 1) {
			categoryDiv = document.createElement("div");
			categoryDiv.classList.add('category-block');
			categoryDiv.classList.add(categoryToClassname(eventData.CATEGORY));
			yearDiv.appendChild(categoryDiv);
			
		} else {
			categoryDiv = categoryDivs[0];
		}
        categoryDiv.appendChild(newDiv);
    }
}

function runExhibit(database) {
	layout = getParameterByName('layout');
	let lanes = getParameterByName('lanes');
	let laneElements = document.getElementsByClassName('lane');
	let lanesDisplay = "none";
	if (lanes) {
		lanesDisplay = "block";
	} 
	for (var lane=0; lane< laneElements.length; lane ++) laneElements[lane].style.display = lanesDisplay;

	let laneLabelElements = document.getElementsByClassName('lane-label');
	let laneLabelsDisplay = "none";
	if (lanes) {
		laneLabelsDisplay = "block";
	} 
	for (var lane=0; lane< laneLabelElements.length; lane ++) laneLabelElements[lane].style.display = laneLabelsDisplay;

	let slider = document.getElementById("slider");
	let sliderHandle = document.getElementById("slider-handle");
	//slider.addEventListener("click", moveDisplay);
	sliderHandle.addEventListener("drag", dragDisplay);
	sliderHandle.addEventListener("dragstart", dragDisplay);
	sliderHandle.addEventListener("dragend", dragDisplay);
	sliderHandle.addEventListener('mousedown', function(e) {
		scrubbing = true;
		offset = [
			sliderHandle.offsetLeft - e.clientX,
			sliderHandle.offsetTop - e.clientY
		];
	}, true);
	
	document.addEventListener('mouseup', function() {
		scrubbing = false;
	}, true);
	
	document.addEventListener('mousemove', function(event) {
		event.preventDefault();
		if (scrubbing) {
			mousePosition = {
	
				x : event.clientX,
				y : event.clientY
	
			};
			let newX = (mousePosition.x + offset[0]);
			slideDisplay(newX);
			sliderHandle.style.left =  newX + 'px';
			//div.style.top  = (mousePosition.y + offset[1]) + 'px';
		}
	}, true);
	sortEventsByYear(database);
	ticksPerYear = availableClicks / (yearCount-1);
	yearCount = 0;
	let milestoneCount = 7;
	yearTrigger = 1 * document.body.clientWidth/milestoneCount;
	labelTrigger = 2 * document.body.clientWidth/milestoneCount;
	contentTrigger = 3 * document.body.clientWidth/milestoneCount;
	buildDivs(sortedByYear);
	fixScrollTicks();
	slideDisplayAbsolute(1920);

}

