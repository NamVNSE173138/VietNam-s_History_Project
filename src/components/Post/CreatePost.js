import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Modal,
} from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
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

const FormDisabledDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
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
  // console.log(localStorage.getItem(username));
  const onFinish = async (values) => {
    const {
      authorID,
      like,
      description,
      reportCounter,
      commentCounter,
      commentID,
      createAt,
      id,
    } = values;

    const newPost = {
      authorID: localStorage.getItem("username"),
      like: 0,
      description: TextArea,
      reportCounter: 0,
      commentCounter: 0,
      commentID: null,
      createAt: 123123123,
      id: 0,
    };

    try {
      const response = await axios.post(
        "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post",
        newPost
      );
      console.log("Post created successfully:", response.data);
      Modal.success({
        title: "User created successfully",
        // content: `The user "${username}" was created successfully!`,
        onOk: () => {
          navigate("/post");
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
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
          <Form.Item label="TextArea" name="textarea">
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default FormDisabledDemo;
