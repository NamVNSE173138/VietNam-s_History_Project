import React from "react";

const EventDetailPage = () => {
  const event = {
    title: "Event Title",
    time: "December 22, 1999",
    images: [
      "https://i.pinimg.com/564x/8e/81/53/8e8153f8bd9eecfc9939f49202742464.jpg",
      "https://i.pinimg.com/564x/8e/81/53/8e8153f8bd9eecfc9939f49202742464.jpg",
    ],
    description: "Event description ở đây nha",
  };

  return (
    <div>
      <h1>{event.title}</h1>
      <p>Time: {event.time}</p>
      <div>
        {event.images.map((image, index) => (
          <img key={index} src={image} alt={`Event Image ${index}`} />
        ))}
      </div>
      <p>{event.description}</p>
    </div>
  );
};

export default EventDetailPage;
