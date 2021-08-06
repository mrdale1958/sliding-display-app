import React from 'react';
import Dot from './Dot.js';
import DateLabel from './DateLabel.js';
import FullLabel from './FullLabel.js';
import FullScript from './FullScript.js';

class Prescription extends React.Component {
    constructor() {
        super();
        this.state = {color: "red", 
                      timePosition: 0,
                      };
      }
    render() {
      let modalDiv;
      if (this.props.mode === "dot") {
        modalDiv = <Dot eventData = {this.props.eventData}/>
      } else if (this.props.mode === "date") {
        modalDiv = <DateLabel eventData = {this.props.eventData}/>
      } else if (this.props.mode === "label") {
        modalDiv = <FullLabel eventData = {this.props.eventData}/>
      } else if (this.props.mode === "full") {
        modalDiv = <FullScript eventData = {this.props.eventData}/>
      } 
        return (
          <div className='Prescription'>
            {modalDiv}
            
          </div>
        );
  }
}

export default Prescription;
