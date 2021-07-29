import React from 'react';

class DateLabel extends React.Component {
    constructor() {
        super();
        this.state = {color: "red", timePosition: this.props.timePosition};
      }
    render() {
        return (
            <div>
            <h2>Hi, I am a Template!</h2>
            <h2>I am a {this.props.color} DateLabel!</h2>
            <h2>I am a {this.state.color} DateLabel!</h2>
            </div>
        );
  }
}

export default DateLabel;
