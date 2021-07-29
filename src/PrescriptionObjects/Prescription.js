import React from 'react';
import Dot from './Dot.js';
import DateLabel from './DateLabel.js';
import FullLabel from './FullLabel.js';
import FullScript from './FullScript.js';

class Prescription extends React.Component {
    constructor() {
        super();
        this.state = {color: "red", 
                      timePosition: this.props.timePosition,
                      };
      }
    render() {
      if (this.props.zones) {
        
      }
        return (
            <div>
            <h2>Hi, I am a Template!</h2>
            <h2>I am a {this.props.color} Prescription!</h2>
            <h2>I am a {this.state.color} Prescription!</h2>
            </div>
        );
  }
}

export default Prescription;
