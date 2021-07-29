import React from 'react';
import Prescription from './PrescriptionObjects/Prescription.js';

class PharmacyWall extends React.Component {
    constructor() {
        super();
        this.state = {color: "red"};
      }
    render() {
        return (
            <div>
            <h2>Hi, I am a Template!</h2>
            <h2>I am a {this.props.color} Car!</h2>
            <h2>I am a {this.state.color} Car!</h2>
            </div>
        );
  }
}

export default PharmacyWall;
