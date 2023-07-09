import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Avatar, List, Space, Button, message, Modal } from "antd";
import { LikeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import CreatePost from "../Post/CreatePost";
import EventContext from "./EventContext";
import "./Event.css";

const EventDetail = () => {
  const { eventID } = useParams();
  const [event, setEvent] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isReported, setIsReported] = useState(false);
  const isLogin = sessionStorage.getItem("session");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
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
  const PostItem = ({ post }) => (
    <List.Item
      key={post.id}
      actions={[
        <Button
          type={post.isLiked ? "primary" : "default"}
          onClick={!isLogin ? showModal : () => handleLike(post)}
        >
          <Space>
            {post.isLiked ? (
              <>
                <LikeOutlined />
                Thích {post.like}
              </>
            ) : (
              <>
                <LikeOutlined />
                Thích {post.like}
              </>
            )}
          </Space>
        </Button>,

        <Popconfirm
          title="Report"
          description="Are you sure to report this post?"
          onConfirm={handleReportConfirm}
          onCancel={handleReportCancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="default">
            <ExclamationCircleOutlined /> Báo cáo
          </Button>
        </Popconfirm>,
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

  const handleLike = (post) => {
    setPosts((prevPosts) =>
      prevPosts.map((item) => {
        if (item.id === post.id) {
          return {
            ...item,
            isLiked: !item.isLiked,
            like: item.isLiked ? item.like - 1 : item.like + 1,
          };
        }
        return item;
      })
    );
  };

  const handleReportCancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleReportConfirm = (e) => {
    console.log(e);
    message.success("Thanks");
    setIsReported(true);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event/${eventID}`
        );
        console.log("Fetched eventID:", response.data.eventID);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post"
        );
        const filteredPosts = response.data.filter(
          (post) => post.eventID === eventID
        );
        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchEvent();
    fetchPosts();
  }, [eventID]);

  if (!event) {
    return <div>Loading...</div>;
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
      <p style={{ marginBottom: "0" }}>Lớp: {event.grade}</p>
      <i>Thời gian: {event.timeline}</i>
      <p>Thời kỳ: {event.dysnaty}</p>
      <div style={{ textAlign: "center" }}>
        <img
          src={event.image}
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
