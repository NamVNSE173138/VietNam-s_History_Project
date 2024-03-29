import ChangePass from "./ChangePass";
import ToMentor from "./UpToMentor";
import "./Profile.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Card,
  List,
  Typography,
  Button,
  Skeleton,
  Col,
  Row,
  Popover,
  Popconfirm,
  message,
} from "antd";
import {
  MailOutlined,
  KeyOutlined,
  SolutionOutlined,
  LockOutlined,
  UploadOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";

const confirm = (e) => {
  console.log(e);
  message.success("Click on Yes");
};

const cancel = (e) => {
  console.log(e);
  message.error("Click on No");
};

const count = 3;
const postUrl = `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post`;

const { Meta } = Card;
const { Title, Text } = Typography;

const ProfilePage = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [posted, setPosted] = useState([]);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenn, setIsOpenn] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [postDeleted, setPostDeleted] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(postUrl);
      setPosted(response.data);
      setInitLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setInitLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    const nextPage = posted.slice(posted.length, posted.length + count);
    setTimeout(() => {
      setPosted([...posted, ...nextPage]);
      setLoading(false);
    }, 1000);
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>Load More</Button>
      </div>
    ) : null;

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenn = () => {
    setIsOpenn(true);
  };

  const handleClosen = () => {
    setIsOpenn(false);
  };

  const [postLoading, setPostLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(postUrl);
      setPosts(response.data);
      setPostLoading(false);
    } catch (error) {
      console.log("Error fetching posts:", error);
      setPostLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event"
        );
        setEvents(response.data);
      } catch (error) {
        console.log("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const storedSession = JSON.parse(sessionStorage.getItem("session"));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (storedSession?.username) {
          const response = await axios.get(
            "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user"
          );

          const currentUser = response.data.find(
            (user) => user.userName === storedSession.username
          );

          if (currentUser) {
            setUserEmail(currentUser.email);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [storedSession?.username]);

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(
        `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post/${id}`
      );
      if (response.status === 200) {
        message.success("Post deleted successfully!");
        // Set the trigger to refetch posts after deletion
        setPostDeleted(true);
        fetchData();
        // window.location.reload();
      } else {
        message.error("Failed to delete post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      message.error("An error occurred while deleting the post.");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }} className="profile">
      <Card style={{ marginBottom: "24px", fontSize: "18px" }}>
        <Meta
          avatar={
            <Avatar
              size={100}
              src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
            />
          }
          title={<Title level={2}>{storedSession.username}</Title>}
        />
        <div style={{ marginLeft: "116px" }}>
          <Title style={{ marginTop: "20px" }} level={3}>
            THÔNG TIN CÁ NHÂN
          </Title>
          <Row style={{ marginLeft: "15px" }}>
            <Col span={12}>
              <div className="infor">
                <Text style={{ fontSize: "18px" }} strong>
                  <SolutionOutlined className="profiles" />
                  Chức vụ:
                </Text>{" "}
                {storedSession.role}
              </div>
              <div className="infor">
                <Text style={{ fontSize: "18px" }} strong>
                  <KeyOutlined className="profiles" />
                  ID:
                </Text>{" "}
                {storedSession.id}
              </div>
              <div className="infor">
                <Text style={{ fontSize: "18px" }} strong>
                  <MailOutlined className="profiles" />
                  Email:
                </Text>{" "}
                {userEmail}
              </div>
            </Col>
            <Col span={12}>
              <ul className="list-unstyled mb-1-9">
                <li
                  className="h4 mb-2 mb-xl-3 display-28"
                  style={{ fontFamily: "Archivo Narrow" }}
                >
                  <div>
                    {!isOpen && (
                      <Button
                        onClick={handleOpen}
                        size="large"
                        style={{ width: "205px" }}
                      >
                        <LockOutlined className="profiles" /> Đổi mật khẩu
                      </Button>
                    )}
                    {isOpen && (
                      <div>
                        <Button onClick={handleClose} size="large">
                          Hủy
                        </Button>
                        <ChangePass />
                      </div>
                    )}
                  </div>
                </li>
                {!isOpenn && storedSession.role !== "Mentor" && (
                  <li
                    className="h4 mb-2 mb-xl-3 display-28"
                    style={{ fontFamily: "Archivo Narrow" }}
                  >
                    <div>
                      <Button onClick={handleOpenn} size="large">
                        <UploadOutlined className="profiles" /> Đăng ký làm
                        Mentor
                      </Button>
                    </div>
                  </li>
                )}
                {isOpenn && (
                  <li
                    className="h4 mb-2 mb-xl-3 display-28"
                    style={{ fontFamily: "Archivo Narrow" }}
                  >
                    <div>
                      <Button onClick={handleClosen} size="large">
                        Hủy
                      </Button>
                      <ToMentor />
                    </div>
                  </li>
                )}
              </ul>
            </Col>
          </Row>
        </div>
      </Card>

      <Card style={{ marginBottom: "24px" }}>
        <Title level={4}>Post history</Title>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={posted}
          renderItem={(posted) =>
            posted.authorID === storedSession.username ? (
              <>
                <List.Item
                  actions={[
                    <Popover
                      placement="left"
                      content={
                        <Popconfirm
                          title="Xóa bình luận"
                          description="Bạn có chắc không?"
                          onConfirm={() => deletePost(posted.id)} // Call deletePost with the post ID
                          onCancel={cancel}
                          okText="Có"
                          cancelText="Không"
                        >
                          <Button type="primary" danger>
                            Xóa
                          </Button>
                        </Popconfirm>
                      }
                      trigger="click"
                    >
                      <MoreOutlined />
                    </Popover>,
                  ]}
                >
                  <Skeleton
                    avatar
                    title={false}
                    loading={posted.loading}
                    active
                  >
                    <List.Item.Meta
                      title={(() => {
                        const event = events.find(
                          (event) => posted.eventID === event.eventID
                        );
                        if (!event) return null;

                        return (
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/events/eventDetail/${event.eventID}`}
                          >
                            {posted.authorID} đã bình luận về bài viết "
                            {event.eventName}"
                          </Link>
                        );
                      })()}
                      description={posted.createAt}
                    />
                  </Skeleton>
                </List.Item>
              </>
            ) : null
          }
        />
      </Card>
    </div>
  );
};

export default ProfilePage;
