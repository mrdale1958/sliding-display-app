import React from 'react';

class Template extends React.Component {
    constructor() {
        super();
        this.state = {color: "red"};
        this.handleClick = this.handleClick.bind(this);
    }
  
    componentDidMount() {
        let sliderHandle = document.getElementById("slider-handle");
        //slider.addEventListener("click", moveDisplay);
        window.addEventListener("drag", dragDisplay);
        window.addEventListener("dragstart", dragDisplay);
        window.addEventListener("dragend", dragDisplay);
        window.addEventListener('mousedown', startDrag);
        window.addEventListener('mouseup', endDrag);
        document.addEventListener('mousemove', dragDisplay);
    }

    startDrag(e){
        scrubbing = true;
        offset = [
            sliderHandle.offsetLeft - e.clientX,
            sliderHandle.offsetTop - e.clientY
        ];
    }   
    
    endDrag(e){
        scrubbing = false;
        offset = [
            sliderHandle.offsetLeft - e.clientX,
            sliderHandle.offsetTop - e.clientY
        ];
    }   
    
    componentWillUnmount() {
        let sliderHandle = document.getElementById("slider-handle");
        //slider.addEventListener("click", moveDisplay);
        window.removeEventListener("drag", dragDisplay);
        window.removeEventListener("dragstart", dragDisplay);
        window.removeEventListener("dragend", dragDisplay);
        window.removeEventListener('mousedown', startDrag);  
        window.removeEventListener('mouseup', endDrag);
        window.removeEventListener('mousemove', dragDisplay);
    }

    handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }
    
	
	
	mouseMoveDisplay(event) {
		event.preventDefault();
		if (scrubbing) {
			mousePosition = {
	
				x : event.clientX,
				y : event.clientY
	
			};
			let newX = (mousePosition.x + offset[0]);
			slideDisplay(newX);
			sliderHandle.style.left =  newX + 'px';
			//div.style.top  = (mousePosition.y + offset[1]) + 'px';
		}
	} 
    
    dragDisplay(event) {
        //console.log('drag', event.type, event);
        if (event.type === 'mousedown') {
            console.log (event.type);
            this.setState({scrubbing: true})
        } else if (event.type === 'mousemove' && scrubbing == true) {
            console.log (event.movementX);
            const rect = event.target.getBoundingClientRect();
                
            let currentX = rect.left;
            currentX += event.movementX;
            let newX = Math.max(0, Math.min(90000, currentX));
            event.target.style.left = newX;
            
        } else if (event.type === 'mouseup') {
            console.log (event.type);
            scrubbing = false;
        } 
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
