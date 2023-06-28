import { Avatar, List, Space, Button, Modal } from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  FlagOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Post.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  function showModal() {
    setIsModalOpen(true);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  const [likeState, setLikeState] = useState(false);

  // const postData = posts.map((post) => ({
  //   id: post.id,
  //   name: post.name,
  //   authorName: post.authorID,
  //   like: post.like,
  //   description: post.description,
  //   reportCounter: post.reportCounter,
  //   commentCounter: post.commentCounter,
  //   isLiked: false,
  // }));

  const handleLike = (post) => {
    setLikeState(post.id);
  };

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

  console.log(likeState, posts);

  return (
    <>
      <div className="post">
      <h1 className="text-center mt-4">Post List</h1>
        <Form>
          <InputGroup className="my-3">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Post"
            />
          </InputGroup>
        </Form>
        <Link to={"/events/createPost"}>
          <Button icon={<PlusOutlined />}>New Post</Button>
        </Link>
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
                >
                  <IconText
                    icon={LikeOutlined}
                    text={post.isLiked ? post.like + 1 : post.like}
                    key="list-vertical-like-o"
                  />
                </Button>,

                <Button type="default" onClick={showModal}>
                  <IconText
                    icon={MessageOutlined}
                    text={post.commentCounter}
                    key="list-vertical-message"
                  />
                </Button>,
                <Modal
                  title="Basic Modal"
                  centered
                  open={isModalOpen}
                  footer=""
                  onCancel={handleCancel}
                >
                  Comments being shown here...
                </Modal>,

                <IconText
                  icon={FlagOutlined}
                  text={post.reportCounter}
                  key="list-vertical-report"
                />,
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
                title={post.name}
                description={
                  <p>
                    <i>post by </i>
                    <a href="">{post.authorID}</a>
                  </p>
                }
              />
              {post.description}
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
export default Post;
