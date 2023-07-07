import { MailOutlined, CodeOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col, message, Modal } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePass = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem("session"));
    if (session) {
      console.log(session);
    }
  }, []);

  const handleModalOk = () => {
    setIsModalVisible(false); // Hide the modal
  };

  const ChangePassword = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
      const session = JSON.parse(sessionStorage.getItem("session"));
      if (!session) {
        message.error("User session not found");
        return;
      }

      const { username, role } = session;

      try {
        const response = await axios.get(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user?userName=${username}&role=${role}`
        );
        const user = response.data[0];
        if (!user) {
          message.error("User not found");
          return;
        }

        // Perform checks and update password
        if (values.oldpassword !== user.password) {
          message.error("Old password is incorrect");
          return;
        }

        if (values.password !== values.confirm) {
          message.error("New password and confirm password do not match");
          return;
        }

        // Update the password
        const updatedUser = { ...user, password: values.password };
        await axios.put(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user/${user.id}`,
          updatedUser
        );

        setIsModalVisible(true);
        navigate("/profile");
        // Display the modal
      } catch (error) {
        console.error("Error updating password:", error);
        message.error("Failed to update password");
      }
    };

    return onFinish;
  };

  return (
    <>
      <div className="profile">
        <Row>
          <Col span={12}>
            <h2
              style={{
                textAlign: "center",
                marginTop: "20px",
                marginBottom: "30px",
                color: "#1677ff",
              }}
            >
              Đổi mật khẩu
            </h2>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={ChangePassword()}
            >
              <Form.Item
                name="oldpassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu cũ!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mật khẩu cũ"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu mới!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mật khẩu mới"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Hai mật khẩu không trùng khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Lưu thay đổi
              </Button>
            </Form>
          </Col>
        </Row>
      </div>

      <Modal
        title="Password Updated"
        visible={isModalVisible}
        onOk={handleModalOk}

        // onCancel={handleModalOk}
      >
        <p>Thay đổi mật khẩu thành công.</p>
      </Modal>
    </>
  );
};

export default ChangePass;
