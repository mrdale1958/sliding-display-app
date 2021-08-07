import React from 'react';



class PhidgetSlider extends React.Component {
    constructor() {
        let phidget22 = window.phidget22;
        super();
        const phidgetObject = new phidget22.Connection(8989, 'localhost');
        phidgetObject.connect()
        .then(()=>console.log('time to build a phidget interface'))
        .catch(error=>console.log(error))
        .finally(()=>console.log('done dying'));
        const phidgetEncoder = new phidget22.Encoder();
        this.state = {color: "red", conn: phidgetObject, encoder: phidgetEncoder};

      }

    componentDidMount() {
        console.log(this.state, this.state.conn, this.state.encoder);
        this.state.conn.connect().then(this.buildPhidgetConnection)
		.catch(function (err) {
			alert('failed to connect to server:' + err);
		});;
    }
    buildPhidgetConnection() {
        var encoder0 = this.state.encoder;

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
        })
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
