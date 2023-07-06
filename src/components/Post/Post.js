import "./Post.css";
import { Avatar, List, Space, Button, message, Popconfirm } from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Post.css";
import { Link } from "react-router-dom";
// import { Form } from "react-bootstrap";
// import { InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Post = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [likeCounter, setLikeCounter] = useState(0);
  const handleLike = (post) => {
    setLikeState(post.id);
    setLikeCounter(post.like);
  };

  const [likeState, setLikeState] = useState(false);

  useEffect(() => {
    setPosts(
      posts.map((item) => {
        if (item.id === likeState) {
          return { ...item, isLiked: !item.isLiked };
        }
        return item;
      })
    );
  }, [likeState]);

  const [isReported, setIsReported] = useState(false);

  const confirm = (e) => {
    console.log(e);
    message.success("Thanks");
    setIsReported(true);
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  // const updatedPost = {};

  return (
    <div className="post">
      <Link to={"/posts/createPost"}>
        <Button icon={<PlusOutlined />}>New Post</Button>{" "}
      </Link>
      <h1 className="text-center mt-4">Post List</h1>
      {/* <Form>
        <InputGroup className="my-3">
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Post"
          />
        </InputGroup>
      </Form> */}
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={posts.filter((post) => {
          return search.toLowerCase() === ""
            ? post
            : post.description.toLowerCase().includes(search);
        })}
        renderItem={(post) => (
          <List.Item
            key={post.id}
            actions={[
              <Button
                type={post.isLiked ? "primary" : "default"}
                onClick={() => handleLike(post)}
                size="large"
              >
                <IconText
                  icon={LikeOutlined}
                  text={post.isLiked ? post.like + 1 : post.like}
                  key="list-vertical-like-o"
                />
              </Button>,

              <Button type="default" size="large">
                <IconText
                  icon={MessageOutlined}
                  text={post.commentCounter}
                  key="list-vertical-message"
                />
              </Button>,

              <Popconfirm
                title="Report"
                description="Are you sure to report this post ?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="default" size="large">
                  <IconText
                    icon={ExclamationCircleOutlined}
                    key="list-vertical-report"
                  />
                </Button>
              </Popconfirm>,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://cartoonavatar.com/wp-content/uploads/2022/01/Business-Avatar-On-Circle-Background.png" />
              }
              title={<p>{post.authorID}</p>}
              description={<p>posted on {post.createAt}</p>}
            />
            {post.description}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Post;
