import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/admin/Header";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
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

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Members" />
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
              <th>CV</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => {
                return search.toLowerCase() === ""
                  ? user
                  : user.userName.toLowerCase().includes(search);
              })
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.cv}</td>
                  <td>{user.role}</td>
                  <td className="d-flex justify-content-around">
                    {/* <button className="btn btn-outline-warning">Edit</button> */}
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                    <button onClick={handleShow} className="nextButton btn btn-outline-info">Detail</button>
                  </td>
                </tr>
              ))}
          </tbody>
          <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
        
      </Box>
    </Box>
  );
};

export default Team;
