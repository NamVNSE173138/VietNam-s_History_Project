import React from 'react';
import VerticalTimeline from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const Timeline = ({ events }) => {
  return (
    <VerticalTimeline>
      {events.map((event) => (
        <VerticalTimeline.Element
          key={event.date}
          date={event.date}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          dateClassName="timeline-date"
        >
          <h3 className="timeline-title">{event.title}</h3>
          <p className="timeline-description">{event.description}</p>
        </VerticalTimeline.Element>
      ))}
    </VerticalTimeline>
  );
};

export default Timeline;
