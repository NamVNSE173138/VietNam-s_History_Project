import "./Post.css";
import { Avatar, List, Space, Button, message, Popconfirm } from "antd";
import { LikeOutlined, MessageOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Post.css";
import { Link } from "react-router-dom";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Post = () => {
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

  console.log(likeState, posts);

  const [isReported, setIsReported] = useState(false);

  const confirm = (e) => {
    console.log(e);
    message.success('Thanks');
    setIsReported(true);
  };

  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  const updatedPost = {};
  
  useEffect(() => {
    axios.post("https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post", updatedPost)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, posts.map((item) => {
    return item;
  }));

  // useEffect(() => {
  //   const postData = async () => {
  //     try {
  //       const response = await axios.post(
  //         "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post",updatedPost);
  //       console.log("post updated", response.data);
  //     } catch (error) {
  //       console.error("Error updating post:", error);
  //     }
  //   }
  //   postData();
  // }, posts);

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      }}
      dataSource={posts}
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
            title={<a href="">{post.authorID}</a>}
            description={
              <p>posted on {post.createdAt}</p>
            }
          />
          {post.description}
        </List.Item>
      )}
    />
  );
};
export default Post;
