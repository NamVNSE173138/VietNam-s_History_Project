
import { Box } from "@mui/material";
import Header from "../../../components/admin/Header";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const Team = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    await fetch(
      `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user/${id}`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      if (response.status === 200) {
        setUsers(
          users.filter((user) => {
            return user.id !== id;
          })
        );
      } else {
        return;
      }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Logic for pagination
  const indexOfLastUser = currentPage * pageSize;
  const indexOfFirstUser = indexOfLastUser - pageSize;
  const displayedUsers = users
    .filter((user) => {
      return (
        search.toLowerCase() === "" ||
        user.userName.toLowerCase().includes(search)
      );
    })
    .slice(indexOfFirstUser, indexOfLastUser);

  // Calculate the total number of pages
  const totalPages = Math.ceil(users.length / pageSize);

  return (
    <Box m="20px">
      <Header title="USER" subtitle="Managing the users" />
      <Box>
        <Form>
          <InputGroup className="my-3 ">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search User"
            />
          </InputGroup>
        </Form>

        <Table striped bordered hover>
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="d-flex justify-content-around">
                  {user.role === "admin" ? null : (
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  )}

                  <button
                    onClick={handleShow}
                    className="nextButton btn btn-outline-info"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Table>

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

export default Team;