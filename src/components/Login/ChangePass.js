import React from "react";
import { CodeOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePass = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userName = searchParams.get("userName");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { code, password } = values;

    // You should implement the logic to verify the code against the stored randomCode.
    // For simplicity, we are assuming the code is correct if it matches the randomCode.
    const randomCode = searchParams.get("code");
    if (code !== randomCode) {
      console.error("Invalid verification code!");
      return;
    }

    try {
      // Fetch user data based on the provided userName (assuming the API endpoint supports fetching users by their username)
      const response = await axios.get(
        `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user?userName=${userName}`
      );

      const user = response.data[0];
      if (!user) {
        console.error("User not found!");
        return;
      }

      // Update the user's password
      const updatedUser = { ...user, password };
      await axios.put(
        `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user/${user.id}`,
        updatedUser
      );

      console.log("Password change successful!");
      navigate("/"); // Redirect to the home page after successful password change.
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <h1>Change Password</h1>
          <Form
            name="change_password"
            className="login-form"
            onFinish={onFinish}
          >
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input the verification code!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                prefix={<CodeOutlined className="site-form-item-icon" />}
                placeholder="Verification Code"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="New Password"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm New Password"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Change Password
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChangePass;
