import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { List, Avatar, Space, Button, message, Popconfirm } from "antd";
import { LikeOutlined, MessageOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Post = () => {
  const session = JSON.parse(sessionStorage.getItem("session"));
  const userID = session.id;

  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLike = useCallback(async (postId) => {
    try {
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          const isLikedByUser = post.likedBy.includes(String(userID));
  
          return {
            ...post,
            like: isLikedByUser ? post.like - 1 : post.like + 1,
            likedBy: isLikedByUser
              ? post.likedBy.filter((id) => id !== String(userID))
              : [...post.likedBy, String(userID)],
          };
        }
  
        return post;
      });
  
      setPosts(updatedPosts);

      const updatedPost = updatedPosts.find((post) => post.id === postId);

      await axios.put(
        `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post/${postId}`,
        updatedPost
      );
  
      const userResponse = await axios.get(
        `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user/${userID}`
      );
      const user = userResponse.data;
  
      const updatedLikedPostIDs = user.likedPost.includes(postId)
        ? user.likedPost.filter((id) => id !== postId)
        : [...user.likedPost, postId];
  
      const updatedUser = {
        ...user,
        likedPost: updatedLikedPostIDs,
      };
  
      await axios.put(
        `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user/${userID}`,
        updatedUser
      );
    } catch (error) {
      console.error("Error updating user object in the API:", error);
    }
  }, [posts, userID]);
  
  const confirm = (e) => {
    console.log(e);
    message.success("Thanks");
    // handle confirm action
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
    // handle cancel action
  };
  
  const handleCommentSubmit = useCallback((postId) => {
    // Handle comment submission for a specific post
    // You can use the commentInput state value to send the comment to the server
    console.log("Comment submitted for post with ID:", postId);
  }, []);

  return (
    <div className="Post List">
      <h1 className="text-center mt-4">Post List</h1>
      <Form>
        <InputGroup className="my-3">
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Post"
          />
        </InputGroup>
      </Form>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={search === ""
          ? posts
          : posts.filter((post) => post.description.toLowerCase().includes(search.toLowerCase()))
        }
        renderItem={(post) => {
          const { id, authorID, description } = post;

          return (
            <List.Item
              key={id}
              actions={[
                <Button
                  type={post.likedBy.includes(userID) ? "primary" : "default"}
                  onClick={() => handleLike(id)}
                  size="large"
                >
                  <IconText icon={LikeOutlined} text={post.like} key="list-vertical-like-o" />
                </Button>,

                <Button type="default" size="large" onClick={() => handleCommentSubmit(id)}>
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
                <Avatar src="https://cartoonavatar.com/wp-content/uploads/2022/01/Business-Avatar-On-Circle-Background.png" />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                title={<Link to={`/user/${authorID}`}>{authorID}</Link>}
                description={<p>posted on {post.createdAt}</p>}
              />
              {description}
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default Post;