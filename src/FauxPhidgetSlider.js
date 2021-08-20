import React, { useEffect }  from 'react';



const FauxPhidgetSlider = (props) => {
    const [position, setPosition] = useState(0);
    const [fauxPhidgetConfig, setFauxPhidgetConfig] = useState(props.fauxPhidgetConfig);
    const [running, setRunning] = useState(false);
    
    
    

   
    useEffect(() => {
        window.addEventListener('keyup', handleKey);
   
        // cleanup this component
        return () => {
        window.removeEventListener('keyup', handleKey);
        };
    }, []);  

    useEffect(() => {
        window.addEventListener('mouseup', handleClick);
    
        // cleanup this component
        return () => {
        window.removeEventListener('mouseup', handleClick);
        };
    }, []); 

    const handleKey = (e) => {

    const handleClick = (e) => {
        if (typeof e === 'object') {
            switch (e.keyCode) {
              case '+':
                  let newRunningState = ! this.state.running;
                this.setState(prevState => ({running : newRunningState}))
                break;
            //   case 1:
            //     log.textContent = 'Middle button clicked.';
            //     break;
            //   case 2:
            //     log.textContent = 'Right button clicked.';
            //     break;
            //   default:
            //     log.textContent = `Unknown button code: ${e.button}`;
            }
          } 
          if (this.state.running) {

          }
    }

    updatePosition() {
        let newX = this.state.position + this.state.fauxPhidgetConfig.slideIncrement;
        if ( newX < 0) {
            console.log('0000000000000',newX);
            newX = 0;
        } else if (newX>maxClicks) {
            console.log('===============',newX);
            //encoder0.setPosition(maxClicks);
            newX=maxClicks;
        }
        this.setState(prevState => ({position :  newX}));
        this.props.positionCallback(this.state.position);
    }

    handleKey(e) {
        this.props.fauxPhidgetConfig(this.state.fauxPhidgetConfig);
    }

    
        return (
           
        );
  }
}

export default FauxPhidgetSlider;

