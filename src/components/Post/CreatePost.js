import { useState, useContext, useEffect } from "react";
import { Input, Button, message, Modal } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import axios from "axios";
import EventContext from "../Event/EventContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
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
  const handleRefresh = () => {
    setRefresh(!refresh); // Toggle the state value to trigger re-render
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
      console.log("Received eventID:", eventID);
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
      console.log(response.data);
      message.success("Post successfully created");
      setDescription("");
      setRefresh(true); // Trigger component reload by updating the refresh state
      // window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
      message.error("Failed to create post");
    }
  };

  return (
    <div>
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

export default CreatePost;
