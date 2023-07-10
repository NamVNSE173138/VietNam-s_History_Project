import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Table } from "react-bootstrap";
import { Form, InputGroup, Button, Modal } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const Events = () => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");
  const [dysnaty, setDysnaty] = useState("");
  const [image, setImage] = useState("");
  const [grade, setGrade] = useState("");
  const [eventID, setEventID] = useState("");

  const handleClose = () => {
    setShow(false);
    resetForm();
  };
  const handleShow = () => setShow(true);

  const resetForm = () => {
    setEventName("");
    setLocation("");
    setDescription("");
    setTimeline("");
    setDysnaty("");
    setImage("");
    setGrade("");
    setEventID("");
  };

  const onFinish = async (e) => {
    e.preventDefault();

    try {
      const [eventNameResponse, eventIDResponse] = await Promise.all([
        axios.get(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event?userName=${eventName}`
        ),
        axios.get(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event?eventID=${eventID}`
        ),
      ]);

      if (
        eventNameResponse.data.some((event) => event.eventName === eventName)
      ) {
        alert(
          `The event name "${eventName}" already exists. Please choose a different event name.`
        );
        return;
      }

      if (eventIDResponse.data.some((event) => event.eventID === eventID)) {
        alert(
          `The event ID "${eventID}" already exists. Please choose a different event ID.`
        );
        return;
      }
    } catch (error) {
      console.error("Error checking fields:", error);
    }

    const newEvent = {
      eventName: eventName,
      location,
      description,
      timeline,
      dysnaty,
      image,
      grade,
      eventID: eventID,
    };

    try {
      const response = await axios.post(
        "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event",
        newEvent
      );
      console.log("Event created successfully:", response.data);
      alert(`The event "${eventName}" was created successfully!`);
      handleClose();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event"
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const deleteEvent = async (id) => {
    try {
      const response = await axios.delete(
        `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event/${id}`
      );
      if (response.status === 200) {
        setEvents(events.filter((event) => event.eventID !== id));
      } else {
        console.error("Error deleting event:", response);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <Box m="20px">
      <h1>Event</h1>
      <Button
        onClick={handleShow}
        className="nextButton text-bg-warning mb-2 fw-bold fs-6"
      >
        <i style={{ marginRight: "10px" }} className="fa fa-plus"></i>
        <AddIcon />
        Add event
      </Button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm sự kiện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFinish}>
            <Form.Group className="mb-3" controlId="eventName">
              <Form.Label>Sự kiện</Form.Label>
              <Form.Control
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Tên sự kiện"
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="location">
                <Form.Label>Địa điểm</Form.Label>
                <Form.Control
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Vd: Gia Định..."
                />
              </Form.Group>

              <Form.Group as={Col} controlId="dysnaty">
                <Form.Label>Thời kỳ</Form.Label>
                <Form.Control
                  value={dysnaty}
                  onChange={(e) => setDysnaty(e.target.value)}
                  placeholder="Vd: Nhà Nguyễn..."
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="timeline">
                <Form.Label>Thời gian</Form.Label>
                <Form.Control
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  placeholder="Vd: 1859..."
                />
              </Form.Group>

              <Form.Group as={Col} controlId="grade">
                <Form.Label>Lớp</Form.Label>
                <Form.Control
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="Vd: 8..."
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Tư liệu</Form.Label>
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Link ảnh</Form.Label>
              <Form.Control
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="ad@..."
              />
            </Form.Group>
            <Form.Group className="md-3" controlId="eventID">
              <Form.Label>ID</Form.Label>
              <Form.Control
                value={eventID}
                onChange={(e) => setEventID(e.target.value)}
                placeholder="Khác với ID đã có"
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Hủy
              </Button>
              <Button variant="primary" type="submit">
                Thêm
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <Form>
        <InputGroup className="my-3">
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Events"
          />
        </InputGroup>
      </Form>
      <Box>
        <Table striped bordered hover>
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Grade</th>
              <th>Dynasty</th>
              <th>Timeline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events
              .filter((event) => {
                return search.toLowerCase() === ""
                  ? event
                  : event.eventName.toLowerCase().includes(search);
              })
              .map((event) => (
                <tr key={event.eventID}>
                  <td>{event.eventID}</td>
                  <td>{event.eventName}</td>
                  <td>{event.location}</td>
                  <td>{event.grade}</td>
                  <td>{event.dysnaty}</td>
                  <td>{event.timeline}</td>
                  <td className="d-flex justify-content-around">
                    <button className="btn btn-outline-warning">Edit</button>
                    <button
                      onClick={() => deleteEvent(event.eventID)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                    <button className="btn btn-outline-info">Detail</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Events;
