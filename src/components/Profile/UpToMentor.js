import { Button, Form, Input, Modal } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";

const storedSession = JSON.parse(sessionStorage.getItem("session"));

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const UpToMentor = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/request",
        { cv: values.linkcv, userID: storedSession.id }
      );

      if (response.status === 201) {
        Modal.success({
          title: "CV đã gửi thành công",
          content: "Vui lòng chờ để quản trị viên phê duyệt.",
        });
        navigate("/");
      }
    } catch (error) {
      // Modal.error({
      //   title: "CV gửi không thành công",
      // });
    }
  };

  return (
    <div style={{ marginLeft: 0 }}>
      <Form
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          marginLeft: 0,
          marginTop: "10px",
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="linkcv"
          rules={[
            {
              required: true,
              message: "Vui lòng điền link CV!",
            },
          ]}
        >
          <Input
            prefix={<LinkOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Link CV"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="login-form-button">
          Gửi
        </Button>
      </Form>
    </div>
  );
};

export default UpToMentor;
