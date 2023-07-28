import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useContext } from "react";
import { Avatar, List, Space, Button, message, Spin, Input } from "antd";
import {
  LikeOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { ModalBody, ModalFooter, ModalHeader, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import EventContext from "./EventContext";
import "./Event.css";

const EventDetail = () => {
  const session = JSON.parse(sessionStorage.getItem("session"));
  const userID = session?.id;

  const { eventID } = useParams();
  const [event, setEvent] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isReported, setIsReported] = useState(false);
  const isLogin = sessionStorage.getItem("session");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();
  const [modalReport, setModalReport] = useState(false);
  const handleClose = () => setModalReport(false);
  const handleShow = () => setModalReport(true);

  const showReport = () => {
    handleShow();
  };

  

  const [checkedValues, setCheckedValues] = useState({});

  const handleChange = (event) => {
    const { id, checked, value } = event.target;
    setCheckedValues((prevCheckedValues) => ({
      ...prevCheckedValues,
      [id]: checked ? value : undefined,
    }));
  };
  

  const handleSaveChanges = () => {
    // Use the `checkedValues` state to access the selected checkboxes
    console.log(checkedValues);

    // Prepare the data to be sent to the API
    const dataWithReason = {
      reason: Object.values(checkedValues).filter(Boolean).join(", "), // Filter out undefined values
    };

    // Send the data to the mock API
    fetch("https://64890c550e2469c038fe9625.mockapi.io/VN_HS/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataWithReason),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the API response if needed
        console.log(responseData);
      })
      .catch((error) => {
        // Handle any errors that occurred during the API request
        console.error("Error:", error);
      });

    // Close the modal after saving changes
    handleClose();
  };
  const fetchData = async () => {
    try {
      const [eventResponse, postsResponse] = await Promise.all([
        axios.get(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event/${eventID}`
        ),
        axios.get("https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post"),
      ]);

      const eventDetails = eventResponse.data;
      setEvent(eventDetails);

      const filteredPosts = postsResponse.data.filter(
        (post) => post.eventID === eventID
      );

      // Check if the current user has liked each post and set the initial like status
      const updatedPosts = filteredPosts.map((post) => {
        const isLikedByUser = post.likedBy.includes(userID);
        return { ...post, isLiked: isLikedByUser };
      });

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [eventID]);

  const updatePostLikeStatus = (postId, isLiked) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, isLiked };
        }
        return post;
      })
    );
  };

  const fetchUserData = async () => {
    if (session && userID) {
      try {
        const userResponse = await axios.get(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user/${userID}`
        );
        const userData = userResponse.data;
        setLikedPosts(userData.likedPost);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {}, [posts]);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLike = useCallback(
    async (post) => {
      const postId = post.id;
      const hasLiked = likedPosts.includes(postId);
      try {
        const postResponse = await axios.get(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post/${postId}`
        );
        const postData = postResponse.data;

        // Check if the current user ID already exists in likedBy array
        const userIndex = postData.likedBy.findIndex(
          (likedByUserId) => likedByUserId === userID
        );

        // Check if the current post ID already exists in likedPost array of the user
        const userResponse = await axios.get(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user/${userID}`
        );
        const userData = userResponse.data;
        const postIndex = userData.likedPost.findIndex(
          (likedPostId) => likedPostId === postId
        );

        // If the current user ID already exists, remove all instances from likedBy array
        if (userIndex !== -1) {
          const updatedLikedBy = postData.likedBy.filter(
            (likedByUserId) => likedByUserId !== userID
          );
          await axios.put(
            `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post/${postId}`,
            { likedBy: updatedLikedBy }
          );
        }
        // If the current user ID or post ID doesn't exist, add them to the arrays
        else {
          const updatedLikedBy = [...postData.likedBy, userID];
          await axios.put(
            `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post/${postId}`,
            { likedBy: updatedLikedBy }
          );
        }

        // If the current post ID already exists, remove all instances from likedPost array on user
        if (postIndex !== -1) {
          const updatedLikedPost = userData.likedPost.filter(
            (likedPostId) => likedPostId !== postId
          );
          await axios.put(
            `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user/${userID}`,
            { likedPost: updatedLikedPost }
          );
        } else {
          const updatedLikedPost = [...userData.likedPost, postId];
          await axios.put(
            `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user/${userID}`,
            { likedPost: updatedLikedPost }
          );
        }

        setIsPostLiked(!isPostLiked);
        updatePostLikeStatus(postId, !hasLiked);
      } catch (error) {
        console.error(
          "Error updating user and post objects in the API:",
          error
        );
      }
      fetchData();
    },
    [likedPosts, userID, isPostLiked]
  );

  // const handleReportCancel = (e) => {
  //   console.log(e);
  //   message.error("Click on No");
  // };

  // const handleReportConfirm = (e) => {
  //   console.log(e);
  //   message.success("Thanks");
  //   setIsReported(true);
  // };

  const PostItem = ({ post }) => {
    return (
      <List.Item
        key={post.id}
        actions={[
          <Button
            type={post.isLiked ? "primary" : "default"}
            onClick={!isLogin ? showModal : () => handleLike(post)}
          >
            <Space>
              {isPostLiked ? (
                <>
                  <LikeOutlined />
                  Thích {post.likedBy.length}
                </>
              ) : (
                <>
                  <LikeOutlined />
                  Thích {post.likedBy.length}
                </>
              )}
            </Space>
          </Button>,
          <Button
            onClick={() => {
              showReport();
            }}
          >
            <ExclamationCircleOutlined /> Báo cáo
          </Button>,
          //  modal report
          <Modal
            show={modalReport}
            onHide={handleClose}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
          >
            <ModalHeader closeButton>
              <Modal.Title>Lý do báo cáo</Modal.Title>
            </ModalHeader>
            <ModalBody>
            <Form>
            <div key={`default-report1`} className="mb-3">
              <Form.Check
                type="checkbox"
                id="report1"
                label="Ngôn từ mất kiểm soát"
                value="Ngôn từ mất kiểm soát"
                checked={checkedValues["report1"] || false}
                onChange={handleChange}
              />
            </div>
          </Form>
          <Form>
            <div key={`default-report2`} className="mb-3">
              <Form.Check
                type="checkbox"
                id="report2"
                label="Lăng mạ"
                value="Lăng mạ"
                checked={checkedValues["report2"] || false}
                onChange={handleChange}
              />
            </div>
          </Form>
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </ModalFooter>
          </Modal>,

          <Modal
            title={
              <span>
                <ExclamationCircleOutlined
                  style={{ color: "#ff4d4f", fontSize: "30px" }}
                />{" "}
                Cảnh báo
              </span>
            }
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <h4 style={{ textAlign: "center" }}>Bạn cần đăng nhập trước</h4>
          </Modal>,
        ]}
      >
        <List.Item.Meta
          avatar={
            <Avatar src="https://cartoonavatar.com/wp-content/uploads/2022/01/Business-Avatar-On-Circle-Background.png" />
          }
          title={
            <div>
              <p className="inline">{post.authorID} </p>{" "}
              <i className="inline" style={{ fontWeight: "inherit" }}>
                ({post.roleOfAuthor})
              </i>
            </div>
          }
          description={<p> {post.createAt}</p>}
        />
        {post.description}
      </List.Item>
    );
  };

  if (!event) {
    return (
      <div className="loading">
        <Spin size="large"></Spin>
      </div>
    );
  }

  return (
    <div
      className="event"
      style={{
        fontFamily: "Archivo Narrow",
        width: "700px",
        alignItems: "center",
        margin: "100px auto",
      }}
    >
      <p
        style={{
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        {" "}
        {event.eventName}
      </p>

      <Modal
        title={
          <span>
            <ExclamationCircleOutlined
              style={{ color: "#ff4d4f", fontSize: "30px" }}
            />{" "}
            Cảnh báo
          </span>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h4 style={{ textAlign: "center" }}>Bạn cần đăng nhập trước</h4>
      </Modal>

      <p style={{ marginBottom: "0" }}>Lớp: {event.grade}</p>
      <i>Thời gian: {event.timeline}</i>
      <p>Thời kỳ: {event.dysnaty}</p>
      <div style={{ textAlign: "center" }}>
        <img
          src={event.image}
          alt=""
          aria-hidden="true"
          style={{ height: "400px", width: "auto", borderRadius: "7px" }}
        />
      </div>

      <p style={{ marginTop: "20px", fontSize: "20px", marginBottom: "50px" }}>
        {event.description}
      </p>

      <h4>Bình luận</h4>
      <List
        style={{ marginTop: 0 }}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            // console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={posts}
        renderItem={(post) => <PostItem post={post} />}
      />
      <EventContext.Provider value={event.eventID}>
        <CreatePost onPostCreated={addNewPost} />
      </EventContext.Provider>
    </div>
  );
};
const CreatePost = ({ onPostCreated }) => {
  const session = JSON.parse(sessionStorage.getItem("session"));
  const [description, setDescription] = useState("");
  const eventID = useContext(EventContext);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const isLogin = sessionStorage.getItem("session");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (refresh) {
      // Perform any necessary actions or API calls after the component reloads
      setRefresh(false); // Reset the refresh state
    }
  }, [refresh]);
  const handleCreatePost = async () => {
    if (description.trim().length === 0) {
      message.error("Post description cannot be empty");
      return;
    }

    try {
      // console.log("Received eventID:", eventID);
      const currentDate = new Date();
      const like = 0;
      const authorID = session.username;
      const roleOfAuthor = session.role;
      const createAt = `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`;
      const response = await axios.post(
        "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post",
        {
          roleOfAuthor,
          authorID,
          like,
          description,
          createAt,
          eventID,
        }
      );
      // console.log(response.data);
      message.success("Post successfully created");
      onPostCreated(response.data);
      setDescription("");
      setRefresh(true);
      // window.location.reload(); // Trigger component reload by updating the refresh state
    } catch (error) {
      console.error("Error creating post:", error);
      message.error("Failed to create post");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Input.TextArea
        rows={4}
        placeholder="Viết bình luận..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {!isLogin ? (
        <>
          <Button
            type="primary"
            onClick={showModal}
            style={{ width: "100%", marginTop: "10px" }}
          >
            Đăng
          </Button>
          <Modal
            title={
              <span>
                <WarningOutlined
                  style={{ color: "#ff4d4f", fontSize: "30px" }}
                />{" "}
                Lưu ý
              </span>
            }
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <h4 style={{ textAlign: "center" }}>Bạn cần đăng nhập trước</h4>
          </Modal>
        </>
      ) : (
        <>
          <Button
            type="primary"
            onClick={handleCreatePost}
            style={{ width: "100%", marginTop: "10px" }}
          >
            Đăng
          </Button>
        </>
      )}
    </div>
  );
};
export { EventDetail, CreatePost };
