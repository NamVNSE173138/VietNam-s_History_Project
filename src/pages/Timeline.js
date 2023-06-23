import React from 'react';
import SliderComponent from '../components/Timelines/Slider2';
import Timeline from '../components/Timelines/Timeline2';

const App = () => {
  const timelineData = [
    { date: '2022-01-01', title: 'Event 1', description: 'Description 1' },
    { date: '2022-02-01', title: 'Event 2', description: 'Description 2' },
    { date: '2022-03-01', title: 'Event 3', description: 'Description 3' },
    // Thêm các sự kiện khác vào đây
  ];

  return (
    <SliderComponent>
      <Timeline events={timelineData} />
    </SliderComponent>
  );
};

export default App;
