import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { TextArea } = Input;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const formatDate = () => {
  const locale = "en";
  const today = new Date();

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: "long",
  })}\n\n`;

  const hour = today.getHours();
  const wish = `Good ${
    (hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
  }, `;

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  return {
    date,
    time,
    wish,
  };
};

const FormDisabledDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [description, setDescription] = useState("");
  const storedSession = JSON.parse(sessionStorage.getItem("session"));
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const { description } = values;

    const newPost = {
      authorID: storedSession.username,
      like: 0,
      description,
      reportCounter: 0,
      commentCounter: 0,
      commentID: null,
      createAt: formatDate().date,
      id: 0,
    };

    try {
      const response = await axios.post(
        "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post",
        newPost
      );
      console.log("Post created successfully:", response.data);

      Modal.success({
        title: "Post created successfully",
        onOk: () => {
          navigate("/posts");
        },
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <div className="post">
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
        >
          <Form.Item name="description" label="Description">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please accept the agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the{" "}
              <Link onClick={() => setModal2Open(true)}>agreement</Link>
            </Checkbox>
          </Form.Item>

          <Modal
            title="User Agreement"
            visible={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
          >
            <p>This is the user agreement.</p>
            <p>
              By clicking "I have read the agreement", you agree to the terms.
            </p>
          </Modal>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default FormDisabledDemo;
