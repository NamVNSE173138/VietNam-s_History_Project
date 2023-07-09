import { Box } from "@mui/material";
import Header from "../../../components/admin/Header";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const Events = () => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    await fetch(
      `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event/${id}`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      if (response.status === 200) {
        setEvents(
          events.filter((event) => {
            return event.eventID !== id;
          })
        );
      } else {
        return;
      }
    });
  };

  return (
    <Box m="20px">
      <Header title="Event" subtitle="Managing Events" />
      <Button
        onClick={handleShow}
        className="nextButton text-bg-warning mb-2 fw-bold fs-6"
      >
        <i style={{ marginRight: "10px" }} class="fa fa-plus"></i>
        <AddIcon />
        Add event
      </Button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm sự kiện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="eventName">
              <Form.Label>Sự kiện</Form.Label>
              <Form.Control placeholder="Tên sự kiện" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="location">
                <Form.Label>Địa điểm</Form.Label>
                <Form.Control placeholder="Vd: Gia Định..." />
              </Form.Group>

              <Form.Group as={Col} controlId="dysnaty">
                <Form.Label>Thời kỳ</Form.Label>
                <Form.Control placeholder="Vd: Nhà Nguyễn..." />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="timeline">
                <Form.Label>Thời gian</Form.Label>
                <Form.Control placeholder="Vd: 1859..." />
              </Form.Group>

              <Form.Group as={Col} controlId="grade">
                <Form.Label>Lớp</Form.Label>
                <Form.Control placeholder="Vd: 8..." />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Tư liệu</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Link ảnh</Form.Label>
              <Form.Control placeholder="ad@..." />
            </Form.Group>

            <Form.Group className="md-3" controlId="eventID">
              <Form.Label>ID</Form.Label>
              <Form.Control placeholder="Khác với ID đã có" />
            </Form.Group>

            <Button
              style={{ marginTop: "20px" }}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Thêm
          </Button>
        </Modal.Footer>
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
                  <td>{event.dynasty}</td>
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
