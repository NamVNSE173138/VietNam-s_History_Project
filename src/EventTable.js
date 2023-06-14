import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventTable = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        
      try {
        const response = await axios.get('https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event')
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Location</th>
          <th>Description</th>
          <th>Timeline</th>
          <th>Dynasty</th>
          <th>Event ID</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <tr key={event.eventID}>
            <td>{event.eventName}</td>
            <td>{event.location}</td>
            <td>{event.description}</td>
            <td>{event.timeline}</td>
            <td>{event.dynasty}</td>
            <td>{event.eventID}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
