import React from 'react';

class Template extends React.Component {
    constructor() {
        super();
        this.state = {color: "red"};
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
