import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Modal,
} from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
const { Option } = Select;
const residences = [
  {
    value: "mentor",
    label: "Mentor",
  },
  {
    value: "member",
    label: "Member",
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
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
const Signup = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <>
      <h1>Sign up</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
        labelAlign="left"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
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
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="role"
          label="Sign up as "
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select your role!",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>

        <Form.Item name="linkcv" label="Link CV">
          <AutoComplete
            options={websiteOptions}
            onChange={onWebsiteChange}
            placeholder="website"
          >
            <Input />
          </AutoComplete>
        </Form.Item>

        <Form.Item
          label="Captcha"
          extra="We must make sure that your are a human."
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the{" "}
            <Link onClick={() => setModal2Open(true)}>agreement</Link>
            <Modal
              title=""
              centered
              open={modal2Open}
              onOk={() => setModal2Open(false)}
              onCancel={() => setModal2Open(false)}
            >
              <p>
                1. Acceptance of Terms: Users are required to acknowledge that
                they have read, understood, and agreed to the terms and
                conditions of the website.
              </p>
              <p>
                2. User Obligations: Users agree to use the website and its
                content in a lawful manner, respect intellectual property
                rights, and not engage in activities that may harm the website
                or other users.
              </p>
              <p>
                3. Privacy Policy: The agreement often includes information
                about how the website collects, uses, and protects user data. It
                outlines the types of information collected, such as personal
                details or browsing habits, and how that information is handled.
              </p>
              <p>
                4. Content Ownership: The agreement specifies the ownership
                rights of the website's content, such as articles, images,
                videos, or any other materials provided on the platform. It may
                also outline the permitted use of the content by users.
              </p>
              <p>
                5. Limitations of Liability: The agreement typically includes
                disclaimers that limit the website's liability for any damages
                or losses incurred by users. It may specify that the website
                cannot guarantee the accuracy, completeness, or reliability of
                the information provided.
              </p>
            </Modal>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          Or <Link to={"/login"}>I have already account</Link>
        </Form.Item>
      </Form>
    </>
  );
};
export default Signup;
