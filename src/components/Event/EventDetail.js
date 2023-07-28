import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Avatar, List, Space, Button, message, Spin } from "antd";
import { LikeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import CreatePost from "../Post/CreatePost";
import EventContext from "./EventContext";
import "./Event.css";
import { ModalBody, ModalFooter, ModalHeader, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";

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

  useEffect(() => {
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

    fetchUserData();
  }, []);

  const [isPostLiked, setIsPostLiked] = useState(false);

  const checkPostLiked = async (postId) => {
    try {
      if (session && userID) {
        const postResponse = await axios.get(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post/${postId}`
        );
        const postData = postResponse.data;
        setIsPostLiked(postData.likedBy.includes(userID));
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
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

        // If the current post ID already exists, remove all instances from likedPost array on user
        if (postIndex !== -1) {
          const updatedLikedPost = userData.likedPost.filter(
            (likedPostId) => likedPostId !== postId
          );
          await axios.put(
            `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user/${userID}`,
            { likedPost: updatedLikedPost }
          );
        }

        // If the current user ID or post ID doesn't exist, add them to the arrays
        if (userIndex === -1) {
          const updatedLikedBy = [...postData.likedBy, userID];
          await axios.put(
            `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post/${postId}`,
            { likedBy: updatedLikedBy }
          );
        }
        if (postIndex === -1) {
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

  const handleReportCancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleReportConfirm = (e) => {
    console.log(e);
    message.success("Thanks");
    setIsReported(true);
  };

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
          // <Popconfirm
          //   title="Report"
          //   description="Are you sure to report this post?"
          //   onConfirm={handleReportConfirm}
          //   onCancel={handleReportCancel}
          //   okText="Yes"
          //   cancelText="No"
          // >
          //   <Button type="default">
          //     <ExclamationCircleOutlined /> Báo cáo
          //   </Button>
          // </Popconfirm>,
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
          >
            <ModalHeader closeButton>
              <Modal.Title>Lý do báo cáo</Modal.Title>
            </ModalHeader>
            <ModalBody>
              <Form>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check // prettier-ignore
                      type={type}
                      id={`default-${type}`}
                      label={`Ngôn từ mất kiểm soát`}
                    />
                  </div>
                ))}
              </Form>
              <Form>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                      type={type}
                      id={`default-${type}`}
                      label={`Tục tĩu`}
                    />
                  </div>
                ))}
              </Form>
              <Form>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check // prettier-ignore
                      type={type}
                      id={`default-${type}`}
                      label={`Câu từ có hành vi lăng mạ`}
                    />
                  </div>
                ))}
              </Form>
              <Form>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check // prettier-ignore
                      type={type}
                      id={`default-${type}`}
                      label={`Tục tĩu`}
                    />
                  </div>
                ))}
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
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
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={posts}
        renderItem={(post) => <PostItem post={post} />}
      />
      <EventContext.Provider value={event.eventID}>
        <CreatePost />
      </EventContext.Provider>
    </div>
  );
};

export default EventDetail;
