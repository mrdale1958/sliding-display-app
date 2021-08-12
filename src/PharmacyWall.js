import React from 'react';
// import CenturyMarker from './CenturyMarker.js';
import GuideGrid from './GuideGrid.js';
import Year from './Year.js';

class PharmacyWall extends React.Component {
    constructor() {
      super();
      this.state = {color: "red"};
    }
    sortEventsByYear(database) {
      let sortedByYear = database.sort((a,b) => (a.EXTENDED_YEAR > b.EXTENDED_YEAR) ? 1 : -1);
	    let uniqueExtendedYears = new Set();
	    for (var event of sortedByYear) {
		    uniqueExtendedYears.add(event.EXTENDED_YEAR);
      }
      
      let yearCount = uniqueExtendedYears.size;
      return([sortedByYear, yearCount]);
    }
   
    buildDivs(database, position) {
      const timelineDiv = [];
      let lastYear = 0;
      let currentYear = [];
      for (var event in  database) {
        let eventData = database[event];
        if ( String(lastYear).slice(0,2) !== String(eventData.YEAR).slice(0,2)) {
          // timelineDiv.push(<CenturyMarker 
          //         key = {String(eventData.YEAR).slice(0,2) + '00' } 
          //         id = {String(eventData.YEAR).slice(0,2) + '00' }
          //         position = {Number(eventData.TickPosInInches) * this.props.configData.clickDensity} />);
//parseInt(yearToPosition(this.props.eventData.YEAR).slice(0,-2)) - 5 + "px"}
          //lastYear = eventData.YEAR;
        }

        /*  pass 1 - last year is 0; enqueue current event
            pass 2 - last year is 1590; render previous queue; enqueue current event
        */
        if ( lastYear !== eventData.EXTENDED_YEAR) {
          if ( currentYear.length === 0 ) { // first time through 
            currentYear = [ eventData ];
          } else {
            let event0 = currentYear[0];
            timelineDiv.push(<Year 
                              key = {lastYear} 
                              id = {lastYear} 
                              position = {Number(event0.TickPosInInches) * this.props.configData.clickDensity} 
                              yearsEvents = { currentYear }
                              sliderPosition = {this.props.sliderPosition}
                              configData={this.props.configData}/>);
            currentYear = [ eventData ];
          }
        } else {
          currentYear.push(eventData);
        }
        //debugger;
        lastYear = eventData.EXTENDED_YEAR;

        
      }
      return( timelineDiv );
    }

    render() {
      let [sortedData] = this.sortEventsByYear(this.props.db)   
// need to use yearCount for distribution? something else
      let divs = this.buildDivs(sortedData, this.props.sliderPosition);
     
        return (
            <div id='PharmacyWall'>
            {divs}
            <GuideGrid configData={this.props.configData} />
            </div>
        );
  }
}

export default PharmacyWall;
