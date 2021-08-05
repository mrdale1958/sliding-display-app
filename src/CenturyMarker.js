import React from 'react';

class CenturyMarker extends React.Component {
    
    render() {
        return (
            <div className='century' style={{left: this.props.position}}>
            <h2>Hi, I am a CenturyMarker!</h2>

            </div>
        );
  }
}

export default CenturyMarker;
