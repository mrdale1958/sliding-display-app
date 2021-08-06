import React from 'react';
import Prescription from './PrescriptionObjects/Prescription.js';


class PharmacyWall extends React.Component {
    constructor() {
      super();
      this.state = {color: "red"};
    }

    function NumberList(props) {
      const numbers = props.numbers;
      const listItems = numbers.map((number) =>
        // Correct! Key should be specified inside the array.
        <ListItem key={number.toString()} value={number} />
      );
      return (
        <ul>
          {listItems}
        </ul>
      );
    }
    
    const numbers = [1, 2, 3, 4, 5];
    ReactDOM.render(
      <NumberList numbers={numbers} />,
      document.getElementById('root')
    );
    buildDivs(database, position) {
      const timelineDiv = [];
      let lastYear = 0;
      for (var event in  database) {
        let eventData = database[event];
        if ( String(lastYear).slice(0,2) != String(eventData.YEAR).slice(0,2)) {
          timelineDiv.append(<CenturyMarker position = {eventData.TickPosInInches} />);
//parseInt(yearToPosition(this.props.eventData.YEAR).slice(0,-2)) - 5 + "px"}
          //lastYear = eventData.YEAR;
          lastYear = eventData.EXTENDED_YEAR;
        }
        timelineDiv.append(<Year id = {eventData.EXTENDED_YEAR} position = {eventData.TickPosInInches} />);

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
          //console.log('\t'+ eventData.EXTENDED_YEAR+ '\t'+ parseInt(newPosition.slice(0,-2))+ '\t'+ (parseInt(newPosition.slice(0,-2))/320+11.8) + '\t');
          yearCount += 1;
        } 
        let categoryDivs = yearDiv.getElementsByClassName(categoryToClassname(eventData.CATEGORY));
        let categoryDiv;
        if (categoryDivs.length != 1) {
          categoryDiv = document.createElement("div");
          categoryDiv.classList.add('category-block');
          categoryDiv.classList.add(categoryToClassname(eventData.CATEGORY) + "_top");
          yearDiv.appendChild(categoryDiv);
          
        } else {
          categoryDiv = categoryDivs[0];
        }
            categoryDiv.appendChild(newDiv);
        }
    }
    }
    render() {
      let divs = buildDivs(this.props.db, this.props.sliderPosition)
        return (
            <div>
            <h2>Hi, I am a PharmacyWall!</h2>
            <h2>I am a {this.props.color} Car!</h2>
            <h2>I am a {this.state.color} Car!</h2>
            <Prescription />
            </div>
        );
  }
}

export default PharmacyWall;
