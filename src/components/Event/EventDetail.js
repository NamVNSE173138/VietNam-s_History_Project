import axios from "axios";
import { useParams } from "react-router-dom"; // Import the useParams hook from react-router-dom
import { useState, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
// ...

const EventDetail = () => {
  const { eventID } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event/${eventID}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEvent();
  }, [eventID]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event">
      <h2>Event Detail</h2>
      <p>Event Name: {event.eventName}</p>
      <p>Location: {event.location}</p>
      <p>Description: {event.description}</p>
      {/* Display other event details */}
    </div>
  );
};

export default EventDetail;
