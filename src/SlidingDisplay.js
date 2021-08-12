import React from 'react';
import './SlidingDisplay.css';
import MovingBackground from './MovingBackground.js';
import Lanes from './Lanes.js';
import PharmacyWall from './PharmacyWall.js';
//import MouseSlider from './MouseSlider.js';
import PhidgetSlider from './PhidgetSlider.js';
import BackgroundGraphic from './Timeline 15 ART 1900fix.svg';

class SlidingDisplay extends React.Component {
  
  constructor() {
    super();
    this.state = {
        sliderPosition: -1920
    };
    this.handlePhidgetCallback = this.handlePhidgetCallback.bind(this);
    //this.handleMouseCallback = this.handleMouseCallback.bind(this);
}
//state = {
  //  sliderPosition: "",
  // }

 /*  handleMouseCallback = (positionData) =>{
    this.setState((state, props) => {
      return {sliderPosition: positionData};
    });
  } */
  handlePhidgetCallback = (positionData) =>{
    console.log('phidget callback',positionData);
    this.setState((state, props) => {
      return {sliderPosition: positionData - 1920};
    });
  }

  render(){
    return(
        
      <div className="SlidingDisplay">
        <MovingBackground image = {BackgroundGraphic} alttext='John Mattos background graphic' configData={this.props.configData} sliderPosition = {this.state.sliderPosition}  />
        <Lanes />
        <PharmacyWall sliderPosition = {this.state.sliderPosition} db={this.props.db} configData={this.props.configData} />
{/*         <MouseSlider id='mouseSlider' positionCallback = {this.handleMouseCallback} />
 */}       <PhidgetSlider id='phidgetSlider' positionCallback = {this.handlePhidgetCallback} configData={this.props.configData} />
      </div>
    );
  }
}

export default SlidingDisplay;
