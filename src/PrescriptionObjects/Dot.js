import React from 'react';

class Dot extends React.Component {
    constructor() {
        super();
        this.state = {color: "red", timePosition: 0};
      }
    render() {
        return (
            <div>
            <h2>Hi, I am a Template!</h2>
            <h2>I am a {this.props.color} Dot!</h2>
            <h2>I am a {this.state.color} Dot!</h2>
            </div>
        );
  }
}

export default Dot;
