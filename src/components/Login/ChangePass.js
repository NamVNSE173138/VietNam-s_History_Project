import React from "react";
import { CodeOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col } from "antd";
import { useLocation } from "react-router-dom";

const ChangePass = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userName = searchParams.get("userName");

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <h1>Change Password</h1>
          {/* <h1>:{userName}</h1> */}
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input code!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                prefix={<CodeOutlined className="site-form-item-icon" />}
                type="InputNumber"
                placeholder="Code"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your new Password!",
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
                  message: "Please confirm your password!",
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
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Change Pass
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChangePass;
