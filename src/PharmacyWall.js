import React from 'react';
import CenturyMarker from './CenturyMarker.js';
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
          timelineDiv.push(<CenturyMarker 
                  key = {String(eventData.YEAR).slice(0,2) + '00' } 
                  id = {String(eventData.YEAR).slice(0,2) + '00' }
                  position = {Number(eventData.TickPosInInches) * this.props.configData.clickDensity} />);
//parseInt(yearToPosition(this.props.eventData.YEAR).slice(0,-2)) - 5 + "px"}
          //lastYear = eventData.YEAR;
        }
        if ( lastYear !== eventData.EXTENDED_YEAR) {
          timelineDiv.push(<Year 
                              key = {eventData.EXTENDED_YEAR} 
                              id = {eventData.EXTENDED_YEAR} 
                              position = {Number(eventData.TickPosInInches) * this.props.configData.clickDensity} 
                              yearsEvents = { currentYear }
                              sliderPosition = {this.props.sliderPosition}
                              configData={this.props.configData}/>);
          currentYear = [ eventData ];
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
            </div>
        );
  }
}

export default PharmacyWall;
