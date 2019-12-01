import React, { Component } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import { Icon } from 'semantic-ui-react';
import colors from '../styles/colors';
import '../styles/timeline/VerticalTimeline.css';
import '../styles/timeline/VerticalTimelineElement.css';
class CausePageTimeline extends Component {
  onClick = () => {
    console.log('clicked');
  };

  formatDate = date => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  renderPrimaryElement = (data, index) => {
    return (
      <VerticalTimelineElement
        key={index}
        date={this.formatDate(data.createdDate)}
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
        <div onClick={this.onClick}>
          <h3 className="vertical-timeline-element-title">
            Subject: <span style={{ color: 'white' }}>{data.subject}</span>
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Sender:{' '}
            <span style={{ color: 'white' }}>
              {data.user.firstName} {data.user.lastName}
            </span>
          </h4>
          <p>
            <Icon name="user" />: {data.donorEmails.length}{' '}
          </p>
        </div>
      </VerticalTimelineElement>
    );
  };

  renderSecondaryElement = (data, index) => {
    return (
      <VerticalTimelineElement
        key={index}
        date={this.formatDate(data.createdDate)}
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
        <div onClick={this.onClick}>
          <h3 className="vertical-timeline-element-title">
            Subject: <span style={{ color: 'white' }}>{data.subject}</span>
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Sender:{' '}
            <span style={{ color: 'white' }}>
              {data.user.firstName} {data.user.lastName}
            </span>
          </h4>
          <p>
            <Icon name="user" />: {data.donorEmails.length}{' '}
          </p>
        </div>
      </VerticalTimelineElement>
    );
  };

  renderTimelineElements = () => {
    const result = [];
    this.props.approvedEmails.map((email, i) => {
      if (i % 2 === 0) {
        result.push(this.renderPrimaryElement(email, i));
      } else {
        result.push(this.renderSecondaryElement(email, i));
      }
    });
    return result;
  };

  render = () => {
    return <VerticalTimeline>{this.renderTimelineElements()}</VerticalTimeline>;
  };
}

export default CausePageTimeline;
