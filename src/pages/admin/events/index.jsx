import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Table } from "react-bootstrap";
import { Form, InputGroup, Button, Modal } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Header from "../../../components/admin/Header";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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

  const [showEditModal, setShowEditModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [objectId, setObjectId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

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
          `The event "${eventName}" already exists. Please create a different event.`
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
      eventName,
      location,
      description,
      timeline,
      dysnaty,
      image,
      grade,
      eventID,
    };

    try {
      const response = await axios.post(
        "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event",
        newEvent
      );
      console.log("Event created successfully:", response.data);
      // alert(`The event "${eventName}" was created successfully!`);
      const MySwal = withReactContent(Swal)
        MySwal.fire({
          title: <strong>Done!</strong>,
          html: <i>You created new event successfully!</i>,
          icon: 'success'
        })
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

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

  useEffect(() => {
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

  const openModal = (id) => {
    axios
      .get(`https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event/${id}`)
      .then((response) => {
        setModalData(response.data);
        setObjectId(id);
        setEditedData(response.data);
        setShowEditModal(true);
      })
      .catch((error) => {
        console.error("Error fetching object data:", error);
      });
  };

  const handleSave = () => {
    axios
      .put(
        `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event/${objectId}`,
        editedData
      )
      .then((response) => {
        setModalData(editedData);
        setShowEditModal(false);
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          title: <strong>Done!</strong>,
          html: <i>You edited event successfully!</i>,
          icon: 'success'
        })
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating object data:", error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

   // Logic for pagination
   const indexOfLastEvent = currentPage * pageSize;
   const indexOfFirstEvent = indexOfLastEvent - pageSize;
   const displayedEvents = events
     .filter((event) => {
      return search.toLowerCase() === ""
      ? event
      : event.eventName.toLowerCase().includes(search);
     })
     .slice(indexOfFirstEvent, indexOfLastEvent);
 
   // Calculate the total number of pages
   const totalPages = Math.ceil(events.length / pageSize);

  return (
    <Box m="20px">
      <Header title="Event" subtitle="Managing Events" />
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
            {/* {events
              .filter((event) => {
                return search.toLowerCase() === ""
                  ? event
                  : event.eventName.toLowerCase().includes(search);
              }) */}
              {displayedEvents.map((event) => (
                <tr key={event.eventID}>
                  <td>{event.eventID}</td>
                  <td>{event.eventName}</td>
                  <td>{event.location}</td>
                  <td>{event.grade}</td>
                  <td>{event.dysnaty}</td>
                  <td>{event.timeline}</td>
                  <td className="d-flex justify-content-around">
                    <button
                      onClick={() => openModal(event.eventID)}
                      className="nextButton btn btn-outline-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event.eventID)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Modal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Thông tin đối tượng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalData && (
              <Form>
                <Form.Group controlId="eventName">
                  <Form.Label>Tên sự kiện</Form.Label>
                  <Form.Control
                    value={editedData.eventName || ""}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        eventName: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="location">
                    <Form.Label>Địa điểm</Form.Label>
                    <Form.Control
                      value={editedData.location || ""}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          location: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="dysnaty">
                    <Form.Label>Thời kỳ</Form.Label>
                    <Form.Control
                      value={editedData.dysnaty || ""}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          dysnaty: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="timeline">
                    <Form.Label>Thời gian</Form.Label>
                    <Form.Control
                      value={editedData.timeline || ""}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          timeline: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="grade">
                    <Form.Label>Lớp</Form.Label>
                    <Form.Control
                      value={editedData.grade || ""}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          grade: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Tư liệu</Form.Label>
                  <Form.Control
                    value={editedData.description || ""}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        description: e.target.value,
                      })
                    }
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Link ảnh</Form.Label>
                  <Form.Control
                    value={editedData.image || ""}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        image: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="md-3" controlId="eventID">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    value={editedData.eventID || ""}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        eventID: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSave}>
              Cập nhật
            </Button>
          </Modal.Footer>
        </Modal>
         {/* Pagination */}
         <nav>
          <ul className="pagination justify-content-center">
            {Array.from(Array(totalPages).keys()).map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </Box>
    </Box>
  );
};

export default Events;
