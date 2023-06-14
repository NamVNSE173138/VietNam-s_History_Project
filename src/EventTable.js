import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventTable = () => {
  const [events, setEvents] = useState([]);
  const [editingID, setEditingID] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (eventID) => {
    setEditingID(eventID);
    setEditedData(events.find(event => event.eventID === eventID));
  };

  const handleDone = async () => {
    try {
      // Make a PUT request to update the edited event
      await axios.put(`https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event/${editingID}`, editedData);
      
      // Update the data in the local state if the API request is successful
      const updatedEvents = events.map(event =>
        event.eventID === editingID ? editedData : event
      );
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  
    setEditingID(null);
    setEditedData({});
  };

  const handleCancel = () => {
    setEditingID(null);
    setEditedData({});
  };

  const handleDelete = (eventID) => {
    // Handle the delete action for the given eventID
    const updatedEvents = events.filter(event => event.eventID !== eventID);

    // Save the updated data to the API or perform other actions as needed
    // ...

    setEvents(updatedEvents);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Location</th>
          <th>Description</th>
          <th>Timeline</th>
          <th>Dynasty</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <tr key={event.eventID}>
            <td>
              {editingID === event.eventID ? (
                <input
                  type="text"
                  name="eventName"
                  value={editedData.eventName || ''}
                  onChange={handleInputChange}
                />
              ) : (
                event.eventName
              )}
            </td>
            <td>
              {editingID === event.eventID ? (
                <input
                  type="text"
                  name="location"
                  value={editedData.location || ''}
                  onChange={handleInputChange}
                />
              ) : (
                event.location
              )}
            </td>
            <td>
              {editingID === event.eventID ? (
                <input
                  type="text"
                  name="description"
                  value={editedData.description || ''}
                  onChange={handleInputChange}
                />
              ) : (
                event.description
              )}
            </td>
            <td>
              {editingID === event.eventID ? (
                <input
                  type="text"
                  name="timeline"
                  value={editedData.timeline || ''}
                  onChange={handleInputChange}
                />
              ) : (
                event.timeline
              )}
            </td>
            <td>
              {editingID === event.eventID ? (
                <input
                  type="text"
                  name="dynasty"
                  value={editedData.dynasty || ''}
                  onChange={handleInputChange}
                />
              ) : (
                event.dynasty
              )}
            </td>
            <td>
              {editingID === event.eventID ? (
                <input
                  type="image"
                  name="image"
                  value={editedData.image || ''}
                  onChange={handleInputChange}
                />
              ) : (
                <img src={event.image}/>
              )}
            </td>
            <td>
              {editingID === event.eventID ? (
                <>
                  <button onClick={handleDone}>Done</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(event.eventID)}>Edit</button>
                  <button onClick={() => handleDelete(event.eventID)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
