import React from 'react';



class PhidgetSlider extends React.Component {
    constructor() {
        let phidget22 = window.phidget22;
        super();
        const phidgetObject = new phidget22.Connection(8089, 'localhost');
        
        const phidgetEncoder = new phidget22.Encoder();
        this.state = {color: "red", conn: phidgetObject, encoder: phidgetEncoder};
    this.buildPhidgetConnection = this.buildPhidgetConnection.bind(this);

      }

    componentDidMount() {
        console.log(this.state, this.state.conn, this.state.encoder);
        this.state.conn.connect().then(this.buildPhidgetConnection)
		.catch(error=>console.log(error));;
    }
    buildPhidgetConnection() {
        var encoder0 = this.state.encoder;
        const updateSlider = this.props.positionCallback;
        const maxClicks = this.props.configData.availableClicks;
        encoder0.onPositionChange = function onEncoder0_PositionChange(positionChange, timeChange, indexTriggered) {
            let newX = encoder0.getPosition();
            console.log('PositionChange: ', positionChange.toString(),newX);
            if (newX < 0) {
                console.log('0000000000000',newX);
                encoder0.setPosition(0);
                newX=0;
            } else if (newX>maxClicks) {
                console.log('===============',newX);
                encoder0.setPosition(maxClicks);
                newX=maxClicks;
            }
            //console.log('++++++++++',newX);
            updateSlider(newX);
            //console.log('----------',newX);

        };
    
        encoder0.onDetach = function(ch) {
            console.log(encoder0 + ' detached');
        };
        encoder0.onError = function(ch) {
            console.log(encoder0 + ' error');
        };
        encoder0.open((openEncoder) => {updateSlider(openEncoder.getPosition())})
        .catch(function (err) {
            console.log('failed to open the channel:' + err);
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

export default PhidgetSlider;
