import React from 'react';
import './SlidingDisplay.css';
import MovingBackground from './MovingBackground.js';
import Lanes from './Lanes.js';
import PharmacyWall from './PharmacyWall.js';
import MouseSlider from './MouseSlider.js';
import PhidgetSlider from './PhidgetSlider.js';

class SlidingDisplay extends React.Component {
  
  //state = {
  //  sliderPosition: "",
  // }

  handleMouseCallback = (positionData) =>{
    this.setState({sliderPosition: positionData})
  }
  handlePhidgetCallback = (positionData) =>{
    this.setState({sliderPosition: positionData})
  }

  render(){
    const {position} = 0; //this.state.sliderPosition;
    return(
        
      <div className="SlidingDisplay">
        <MovingBackground sliderPosition = {position} />
        <Lanes />
        <PharmacyWall sliderPosition = {position} />
        <MouseSlider id='mouseSlider' positionCallback = {this.handleMouseCallback} />
        <PhidgetSlider id='phidgetSlider' positionCallback = {this.handlePhidgetCallback}/>
      </div>
    );
  }
}

export default SlidingDisplay;
