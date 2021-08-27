import React from 'react';
import Category from './Category.js';

class Year extends React.Component {
    
    
    buildDivs(database, position, mode) {
        const eventsByCategory = {};
        for (var event in  database) {
            let eventData = database[event];
            if (eventsByCategory[eventData.CATEGORY]) {
                eventsByCategory[eventData.CATEGORY].push(eventData);
            } else {
                eventsByCategory[eventData.CATEGORY] = [ eventData];
            }
        }
        const yearDiv = Object.keys(eventsByCategory).map((category) =>
            
            <Category  key = {category} 
                        id = {category} 
                        eventDisplayMode = {mode}
                        categoryEvents = { eventsByCategory[category] } 
                        configData = {this.props.configData}/>);
        
        return( yearDiv );
    }

    render() {
        let mode = "none";
        let divs = <div>&nbsp;</div>
        let currentScreenPosition = this.props.position - this.props.sliderPosition;
        if ( currentScreenPosition >= this.props.configData.leftEdge) {
            if (currentScreenPosition > this.props.configData.yearTrigger) {
                if (currentScreenPosition > this.props.configData.labelTrigger) {
                    if (currentScreenPosition > this.props.configData.contentTrigger) {
                        if (currentScreenPosition > this.props.configData.screenWidth - this.props.configData.contentTrigger) {
                            if (currentScreenPosition > this.props.configData.screenWidth - this.props.configData.labelTrigger) {
                                if (currentScreenPosition > this.props.configData.screenWidth - this.props.configData.yearTrigger) {
                                    if (currentScreenPosition < this.props.configData.rightEdge ) {
                                        mode = "dot";
                                    }									
                                } else {
                                    mode = "date";
                                }
                            } else {
                                mode = "label";
                            }
                        } else {
                            mode = "full";
                        }
                    } else {
                        mode = "label";
                    }				
                } else {
                    mode = "date";
                }
            } else {
                mode = "dot";
            } 
        } 
            
        
        if ( mode !== "none" ) {
            divs = this.buildDivs(this.props.yearsEvents, this.props.sliderPosition, mode)
        }
        return (
          <div className = 'year' 
                id = {this.props.id} 
                style={{left: currentScreenPosition}}>
          {divs}
          </div>
        );
    }  
}

export default Year;
