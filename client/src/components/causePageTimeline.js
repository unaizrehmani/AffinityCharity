import React, { Component } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import colors from '../styles/colors';
import '../styles/timeline/VerticalTimeline.css';
import '../styles/timeline/VerticalTimelineElement.css';


class CausePageTimeline extends Component {
    render = () => {
        return (
           <VerticalTimeline>
               <VerticalTimelineElement
                date="2011 - present"
                contentStyle={{
                    background: colors.primaryAccent,
                    border: `1px ${colors.secondary} solid`
                }}
                contentArrowStyle={{
                    borderRight: `10px ${colors.secondaryAccent} solid`
                }}
               >
                   what up
               </VerticalTimelineElement>
               <VerticalTimelineElement
                date="2008 - 2011"
                contentStyle={{
                    background: "blue"
                }}
               >
                   what up
               </VerticalTimelineElement>
           </VerticalTimeline>
        );
    }
}

export default CausePageTimeline;