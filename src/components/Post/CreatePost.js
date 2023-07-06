import { useState, useContext, useEffect } from "react";
import { Input, Button, message } from "antd";
import axios from "axios";
import EventContext from "../Event/EventContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const session = JSON.parse(sessionStorage.getItem("session"));
  const [description, setDescription] = useState("");
  const eventID = useContext(EventContext);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

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
      const createAt = `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`;
      const response = await axios.post(
        "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post",
        {
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
    } catch (error) {
      console.error("Error creating post:", error);
      message.error("Failed to create post");
    }
  };

  return (
    <div>
      <Input.TextArea
        rows={4}
        placeholder="Enter post description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="primary" onClick={handleCreatePost}>
        Create Post
      </Button>
    </div>
  );
};

export default CreatePost;
