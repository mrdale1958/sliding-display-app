import React from 'react';

class GuideGrid extends React.Component {
  constructor() {
    super();
    this.state = {color: "red", timePosition: 0};
  }
  render() {
    return (
        <div>
        <div className= {"guideline"} style={{left:this.props.configData.leftEdge}}/>
        <div className= {"guideline"} style={{left:this.props.configData.yearTrigger}}/>
        <div className= {"guideline"} style={{left:this.props.configData.labelTrigger}}/>
        <div className= {"guideline"} style={{left:this.props.configData.contentTrigger}}/>
        <div className= {"guideline"} style={{left:this.props.configData.screenWidth - this.props.configData.contentTrigger}}/>
        <div className= {"guideline"} style={{left:this.props.configData.screenWidth - this.props.configData.labelTrigger}}/>
        <div className= {"guideline"} style={{left:this.props.configData.screenWidth - this.props.configData.yearTrigger}}/>
        <div className= {"guideline"} style={{left:this.props.configData.rightEdge}}/>
            
        &nbsp;
        </div>
    );
  }
}

export default GuideGrid;
