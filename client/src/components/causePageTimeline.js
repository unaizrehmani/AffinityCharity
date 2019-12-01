import React, { Component } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import colors from '../styles/colors';
import '../styles/timeline/VerticalTimeline.css';
import '../styles/timeline/VerticalTimelineElement.css';

class CausePageTimeline extends Component {
  onClick = () => {
    console.log('clicked');
  };

  renderPrimaryElement = (data, index) => {
    return (
      <VerticalTimelineElement
        key={index}
        date="2011 - present"
        contentStyle={{
          background: colors.primaryAccent,
          border: `1px ${colors.secondary} solid`
        }}
        contentArrowStyle={{
          borderRight: `10px ${colors.secondaryAccent} solid`
        }}
        iconStyle={{
          background: `${colors.secondaryAccent}`,
          boxShadow: `0 0 0 4px ${colors.secondary}`
        }}
      >
        <div onClick={this.onClick}>primary</div>
      </VerticalTimelineElement>
    );
  };

  renderSecondaryElement = (data, index) => {
    return (
      <VerticalTimelineElement
        key={index}
        date="2008 - 2011"
        contentStyle={{
          background: colors.secondaryAccent,
          border: `1px ${colors.secondary} solid`
        }}
        contentArrowStyle={{
          borderRight: `10px ${colors.primaryAccent} solid`
        }}
        iconStyle={{
          background: `${colors.primaryAccent}`,
          boxShadow: `0 0 0 4px ${colors.secondary}`
        }}
      >
        <div onClick={this.onClick}>secondary</div>
      </VerticalTimelineElement>
    );
  };

  renderTimelineElements = () => {
    const result = [];
    for (let i = 0; i < 20; i++) {
      if (i % 2 === 0) {
        result.push(this.renderPrimaryElement(null, i));
      } else {
        result.push(this.renderSecondaryElement(null, i));
      }
    }
    return result;
  };

  render = () => {
    return <VerticalTimeline>{this.renderTimelineElements()}</VerticalTimeline>;
  };
}

export default CausePageTimeline;
