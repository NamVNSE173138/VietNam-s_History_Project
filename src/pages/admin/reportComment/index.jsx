import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "../../../components/admin/Header";
import { Table, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ReportCmt = () => {
  const [search, setSearch] = useState("");
  const [reportCmt, setReportCmt] = useState([]);
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
            "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/report"
          );
          setReportCmt(requestResponse.data);
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

  const deniedCmt = async (id) => {
    try {
      const response = await axios.delete(
        `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/report/${id}`
      );
      if (response.status === 200) {
        setReportCmt(reportCmt.filter((request) => request.id !== id));
      } else {
        console.error("Error denying cv:", response);
      }
    } catch (error) {
      console.error("Error denying cv:", error);
    }
  };

  const acceptCmt = async (id, userId, idremove) => {
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
          setReportCmt(reportCmt.filter((request) => request.userId !== userId));
          toggleSuccessModal();
          deniedCmt(idremove);
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

  
  const indexOfLastReportCmt = currentPage * pageSize;
  const indexOfFirstReportCmt = indexOfLastReportCmt - pageSize;
  const displayedLinkCV = reportCmt
    .filter((linkCv) => {
      return (
        search.toLowerCase() === "" ||
        linkCv.userName.toLowerCase().includes(search.toLowerCase())
      );
    })
    .slice(indexOfFirstReportCmt, indexOfLastReportCmt);

  // Calculate the total number of pages
  const totalPages = Math.ceil(reportCmt.length / pageSize);

  return (
    <Box m="20px">
      <Header title="Report Comments" subtitle="Managing report" />
      <Form>
        <InputGroup className="my-3">
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Report"
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
                <th>User Name</th>
                <th>Comment</th>
                <th>Reported By</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedLinkCV.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.authorID}</td>
                  <td>{report.description}</td>
                  <td>{report.reportedBy}</td>
                  <td>{report.reason}</td>
                  <td className="d-flex justify-content-around">
                    <button
                      onClick={() =>
                        acceptCmt(report.userID, report.userID, report.id)
                      }
                      className="btn btn-outline-success"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => deniedCmt(report.id)}
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

export default ReportCmt;


