import { Button, Form, Input } from "antd";
import { LinkOutlined } from "@ant-design/icons";

import "./Profile.css";

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

const onFinish = (values) => {
  console.log(values);
};
const upToMentor = () => (
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
export default upToMentor;
