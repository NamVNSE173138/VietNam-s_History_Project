import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import ReportIcon from "@mui/icons-material/Report";
import ArticleIcon from "@mui/icons-material/Article";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PersonIcon from "@mui/icons-material/Person";
import CommentIcon from "@mui/icons-material/Comment";
import Header from "../../../components/admin/Header";
import StatBox from "../../../components/admin/StatBox";
import "./Dashboard.css";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPost, setTotalPost] = useState(0);
  const [totalEvent, setTotalEvent] = useState(0);
  const [totalCV, setTotalCV] = useState(0);
  const [totalReport, setTotalReport] = useState(0);

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(
        "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user"
      );
      const users = response.data;
      setTotalUsers(users.length);
    } catch (error) {
      console.log("Error fetching total users:", error);
    }
  };
  useEffect(() => {
    fetchTotalPost();
    fetchTotalEvent();
    fetchTotalCV();

    fetchTotalUsers();
  }, []);
  const fetchTotalPost = async () => {
    try {
      const response = await axios.get(
        "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post"
      );
      const post = response.data;
      setTotalPost(post.length);
    } catch (error) {
      console.log("Error fetching total post:", error);
    }
  };

  const fetchTotalEvent = async () => {
    try {
      const response = await axios.get(
        "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event"
      );
      const event = response.data;
      setTotalEvent(event.length);
    } catch (error) {
      console.log("Error fetching total event:", error);
    }
  };

  const fetchTotalCV = async () => {
    try {
      const response = await axios.get(
        "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/request"
      );
      const CV = response.data;
      setTotalCV(CV.length);
    } catch (error) {
      console.log("Error fetching total CV:", error);
    }
  };
  const fetchTotalReport = async () => {
    try {
      const response = await axios.get(
        "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/report"
      );
      const report = response.data;
      setTotalCV(report.length);
    } catch (error) {
      console.log("Error fetching total CV:", error);
    }
  };
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        // display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Row style={{ display: "flex" }}>
          <Link
            style={{
              textDecoration: "none",
              background: "#f2f0f0",
              display: "inline-block",
            }}
            to={"./events"}
          >
            <Box
              gridColumn="span 3"
              bgcolor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              margin="10px"
            >
              <StatBox
                title={totalEvent.toLocaleString()}
                subtitle="Event"
                icon={
                  <ArticleIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Link>
          <Link
            style={{
              textDecoration: "none",
              background: "#f2f0f0",
              display: "inline-block",
              marginTop: "10px",
            }}
            to={"./linkCV"}
          >
            <Box
              gridColumn="span 3"
              bgcolor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              margin="10px"
            >
              <StatBox
                title={totalCV.toLocaleString()}
                subtitle="CV up to mentor"
                // increase="+21%"
                icon={
                  <AttachFileIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Link>
        </Row>
        <Row>
          <Link
            style={{
              textDecoration: "none",
              background: "#f2f0f0",
              display: "inline-block",
              marginTop: "10px",
            }}
            to={"./user"}
          >
            <Box
              gridColumn="span 3"
              bgcolor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              margin="10px"
            >
              <StatBox
                title={totalUsers.toLocaleString()}
                subtitle="User"
                // increase="+5%"
                icon={
                  <PersonIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Link>
          <Link
            style={{
              textDecoration: "none",
              background: "#f2f0f0",
              display: "inline-block",
              marginTop: "10px",
            }}
            to={"./post"}
          >
            <Box
              gridColumn="span 3"
              bgcolor={colors.primary[400]}
              display="flex"
              alignItems="center"
              margin="10px"
              justifyContent="center"
            >
              <StatBox
                title={totalPost.toLocaleString()}
                subtitle="Post"
                icon={
                  <CommentIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Link>
          <Link
            style={{
              textDecoration: "none",
              background: "#f2f0f0",
              marginTop: "10px",
              display: "inline-block",
            }}
            to={"./reportComment"}
          >
            <Box
              gridColumn="span 3"
              bgcolor={colors.primary[400]}
              display="flex"
              alignItems="center"
              margin="10px"
              justifyContent="center"
            >
              <StatBox
                title={totalReport.toLocaleString()}
                subtitle="Report"
                icon={
                  <ReportIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Link>
        </Row>
      </Box>
    </Box>
  );
};

export default Dashboard;
