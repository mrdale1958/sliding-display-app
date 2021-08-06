import React from 'react';


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
class Year extends React.Component {
    
    render() {
        return (
            <div className='century' style={{left: this.props.position}}>
            <h2>Hi, I am a CenturyMarker!</h2>

            </div>
        );
  }
}

export default Year;
