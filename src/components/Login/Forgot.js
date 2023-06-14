import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, Row, Col } from "antd";
import { Link } from "react-router-dom";
const forgotPass = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <Row>
        <Col span={12}>
          <h1>Forgot Password</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            {/* <Form.Item label="Select">
          <Select>
            <Select.Option value="Mentor">Mentor</Select.Option>
            <Select.Option value="Member">Member</Select.Option>
          </Select>
        </Form.Item> */}
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="Email"
              />
            </Form.Item>
            {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item> */}

            <Form.Item>
              <Link to={"/changePass"}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Sent code
                </Button>
              </Link>
              Or <Link to={"/signup"}>I don't have account</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default forgotPass;
