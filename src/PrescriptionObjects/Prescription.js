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
      if (this.props.zones) {
        
      }
        return (
          <div>
            <div>
            <h2>Hi, I am a dot-sized Prescription!</h2>
            <h2>I am a {this.props.color} Prescription!</h2>
            <h2>I am a {this.state.color} Prescription!</h2>
            <Dot />
            </div>
            <div>
            <h2>Hi, I am a Datelable-sized Prescription!</h2>
            <h2>I am a {this.props.color} Prescription!</h2>
            <h2>I am a {this.state.color} Prescription!</h2>
            <DateLabel />
            </div>
            <div>
            <h2>Hi, I am a FullLabel-sized Prescription!</h2>
            <h2>I am a {this.props.color} Prescription!</h2>
            <h2>I am a {this.state.color} Prescription!</h2>
            <FullLabel />
            </div>
            <div>
            <h2>Hi, I am a Full-sized Prescription!</h2>
            <h2>I am a {this.props.color} Prescription!</h2>
            <h2>I am a {this.state.color} Prescription!</h2>
            <FullScript />
            </div>
          </div>
        );
  }
}

export default Prescription;
