import { Button, Form, Input } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import axios from "axios";

import "./Profile.css";
const storedSession = JSON.parse(sessionStorage.getItem("session"));
/* eslint-disable no-template-curly-in-string */
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
/* eslint-enable no-template-curly-in-string */

const upToMentor = () => {

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/request`,
        { cv: values.linkcv, userID : storedSession.userID },
      );
      
      if (response.status === 201) {
        console.log("CV link submitted successfully");
        // Handle success case, show a success message, or perform any other actions as needed.
      }
    } catch (error) {
      console.error("Error submitting CV link:", error);
      // Handle error case, show an error message, or perform any other actions as needed.
    }
  };
return (
  <>
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
            type="linkcv"
            placeholder="Link CV"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  </>
);
        };
export default upToMentor;
