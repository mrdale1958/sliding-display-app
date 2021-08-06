import React from 'react';
var phidget22 = require('phidget22');



class PhidgetSlider extends React.Component {
    constructor() {
        super();
        this.state = {color: "red", conn: new phidget22.Connection(5661, 'localhost')};
        this.state.conn.connect().then(this.buildPhidgetConnection);

      }
    buildPhidgetConnection() {
        var encoder0 = new phidget22.Encoder();

        encoder0.onPositionChange = function onEncoder0_PositionChange(positionChange, timeChange, indexTriggered) {
            console.log('PositionChange: ' + positionChange.toString())
            console.log('TimeChange: ' + timeChange.toString())
            console.log('IndexTriggered: ' + indexTriggered.toString())
            console.log('----------');
            let newX = encoder0.getPosition();
            if (newX < 0) {
                encoder0.setPosition(0);
                newX=0;
            } else if (newX>this.props.configData.maxClicks) {
                encoder0.setPosition(this.props.configData.maxClicks);
                newX=this.props.configData.maxClicks;
            }
            this.props.positionCallback(newX);

        };
    
        encoder0.open(5000).then(function() {
    
            setTimeout(function () {
                encoder0.close();
                process.exit(0);
            }, 5000);
        });       
    }
    render() {
        return (
            <div className="slider" >
                <div id={this.props.id}> &nbsp; </div>
            </div>

        );
  }
}

export default Template;
