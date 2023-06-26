import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const Login = () => {
  const [form] = Form.useForm();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (values) => {
    setProfileData(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      initialValues={profileData}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          { required: true, message: "Please enter your phone number" },
          {
            pattern: /^\d{10}$/,
            message: "Please enter a valid 10-digit phone number",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
