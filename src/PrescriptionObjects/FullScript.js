import React from 'react';

class FullScript extends React.Component {
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
          <div className={this.props.className + " " + this.categoryToClassname(this.props.eventData['CATEGORY'])}>
            <div>
              <span className='event-year'>{this.props.eventData['YEAR']}</span>
              <span className='event-location'>{this.props.eventData['COUNTRY']}</span>
            </div>
            <div className='event-heading'>
              {this.props.eventData['EVENT']}
            </div>
            { if (this.props.eventData['SIGNIFICANCE'] != "") }
                <div className='event-body'>
                {this.props.eventData['SIGNIFICANCE']}
            </div>
          </div>
      );
  }
}

export default FullScript;
