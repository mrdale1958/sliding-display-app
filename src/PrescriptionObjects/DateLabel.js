import React from 'react';

class DateLabel extends React.Component {
  constructor() {
    super();
    this.state = {color: "red", timePosition: 0};
  }
  categoryToClassname(category) {
    let retVal = category.replace(/[ /]/g, "_").toLowerCase();
    //console.log(category,retVal);
    return retVal;
  } 
  render() {
    return (
      <div className={"event-date " + this.categoryToClassname(this.props.eventData['CATEGORY'])}>
        <div>
          <span className='event-year'>{this.props.eventData['YEAR']}</span>
          <span className='event-location'>{this.props.eventData['COUNTRY']}</span>
        </div>
      </div>         );
  }
}

export default DateLabel;
