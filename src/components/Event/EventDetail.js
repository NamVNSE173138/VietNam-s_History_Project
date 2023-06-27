// import React from "react";

// const EventDetailPage = () => {
//   const event = {
//     title: "Event Title",
//     time: "December 22, 1999",
//     images: [
//       "https://i.pinimg.com/564x/8e/81/53/8e8153f8bd9eecfc9939f49202742464.jpg",
//       "https://i.pinimg.com/564x/8e/81/53/8e8153f8bd9eecfc9939f49202742464.jpg",
//     ],
//     description: "Event description ở đây nha",
//   };

//   return (
//     <div>
//       <h1>{event.title}</h1>
//       <p>Time: {event.time}</p>
//       <div>
//         {event.images.map((image, index) => (
//           <img key={index} src={image} alt={`Event Image ${index}`} />
//         ))}
//       </div>
//       <p>{event.description}</p>
//     </div>
//   );
// };

// export default EventDetailPage;

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
      <p>Event ID: {event.eventID}</p>
      <p>Event Name: {event.eventName}</p>
      <p>Description: {event.description}</p>
      {/* Display other event details */}
    </div>
  );
};

export default EventDetail;
