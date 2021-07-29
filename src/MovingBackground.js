import React from 'react';
import BackgroundGraphic from './Timeline 11 ARTscreen versiondm.svg';

class Template extends React.Component {
    constructor() {
        super();
        this.state = {color: "red"};
      }
    render() {
        return (
          <div className="printed-graphic">
          {/* <object id="printed-svg-object" data="Timeline 11 ARTscreen versiondm.svg" type="image/svg+xml"> 
            <img src="background.jpg" />
          </object>	 */}
          <img src={BackgroundGraphic} 	id="printed-svg-object" alt='John Mattos background graphic'/>	
        </div>
        );
  }
}

export default Template;
