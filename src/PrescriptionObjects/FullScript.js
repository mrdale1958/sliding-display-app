import React from 'react';

class FullScript extends React.Component {
    constructor() {
        super();
        this.state = {color: "red", timePosition: 0};
      }
    render() {
        return (
            <div>
            <h2>Hi, I am a Template!</h2>
            <h2>I am a {this.props.color} FullScript!</h2>
            <h2>I am a {this.state.color} FullScript!</h2>
            </div>
        );
  }
}

export default FullScript;
