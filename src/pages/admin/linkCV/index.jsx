import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "../../../components/admin/Header";
import { Table, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const LinkCv = () => {
  const [search, setSearch] = useState("");
  const [linkCvs, setLinkCvs] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const toggleSuccessModal = () => {
    setShowSuccessModal(!showSuccessModal);
  };
  const pageSize = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user"
        );

        if (userResponse.data.length > 0) {
          const user = userResponse.data[0];
          setUserId(user.id);

          const requestResponse = await axios.get(
            "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/request"
          );
          setLinkCvs(requestResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching the data.");
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const deniedCV = async (id) => {
    try {
      const response = await axios.delete(
        `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/request/${id}`
      );
      if (response.status === 200) {
        setLinkCvs(linkCvs.filter((request) => request.id !== id));
      } else {
        console.error("Error denying cv:", response);
      }
    } catch (error) {
      console.error("Error denying cv:", error);
    }
  };

  const acceptCV = async (id, userId) => {
    try {
      const userResponse = await axios.get(
        `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user/${id}`
      );
      const user = userResponse.data;

      if (userId === user.id) {
        const updateUserResponse = await axios.put(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user/${id}`,
          { ...user, role: "Mentor" }
        );

        if (updateUserResponse.status === 200) {
          setLinkCvs(linkCvs.filter((request) => request.userId !== userId));
          toggleSuccessModal();
        } else {
          console.error("Error accepting cv:", updateUserResponse);
        }
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          title: <strong>Done!</strong>,
          html: <i>You accepted Member become Mentor!</i>,
          icon: 'success'
        })
      } else {
        console.error("User not found");
      }

    } catch (error) {
      console.error("Error accepting cv:", error);
    }
  };

  
  const indexOfLastLinkCV = currentPage * pageSize;
  const indexOfFirstLinkCV = indexOfLastLinkCV - pageSize;
  const displayedLinkCV = linkCvs
    .filter((linkCv) => {
      return (
        search.toLowerCase() === "" ||
        linkCv.userName.toLowerCase().includes(search.toLowerCase())
      );
    })
    .slice(indexOfFirstLinkCV, indexOfLastLinkCV);

  // Calculate the total number of pages
  const totalPages = Math.ceil(linkCvs.length / pageSize);

  return (
    <Box m="20px">
      <Header title="CV" subtitle="Managing CV" />
      <Form>
        <InputGroup className="my-3">
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search CVs"
          />
        </InputGroup>
      </Form>
      <Box>
        {error ? (
          <p>{error}</p>
        ) : (
          <Table striped bordered hover>
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Link CV</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedLinkCV.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.userID}</td>
                  <td>{request.cv}</td>
                  <td className="d-flex justify-content-around">
                    <button
                      onClick={() => acceptCV(request.userID, request.userID)}
                      className="btn btn-outline-success"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => deniedCV(request.id)}
                      className="btn btn-outline-danger"
                    >
                      Denied
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from(Array(totalPages).keys()).map((page) => (
              <li
                key={page}
                className={`page-item ${
                  currentPage === page + 1 ? "active" : ""
                }`}
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

export default LinkCv;


