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
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
const { Option } = Select;
const residences = [
  {
    value: "Mentor",
    label: "Mentor",
  },
  {
    value: "Member",
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
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { username, password, email, role, linkcv, age, phon_number } =
      values;

    try {
      const [usernameResponse, emailResponse] = await Promise.all([
        axios.get(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user?userName=${username}`
        ),
        axios.get(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user?email=${email}`
        ),
      ]);

      if (usernameResponse.data.some((user) => user.userName === username)) {
        Modal.error({
          title: "Username already exists",
          content: `The username "${username}" already exists. Please choose a different username.`,
        });
        return;
      }

      if (emailResponse.data.some((user) => user.email === email)) {
        Modal.error({
          title: "Email already exists",
          content: `The email "${email}" already exists. Please choose a different email.`,
        });

        return;
      }
    } catch (error) {
      console.error("Error checking fields:", error);
    }

    const newUser = {
      userName: username,
      password,
      email,
      role: "Member",
      cv: linkcv,
      age,
      phon_number,
    };

    try {
      const response = await axios.post(
        "https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user",
        newUser
      );
      console.log("User created successfully:", response.data);
      Modal.success({
        title: "User created successfully",
        content: `The user "${username}" was created successfully!`,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
    }
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
  const [verfied, setVerfied] = useState(false);
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerfied(true);
  }
  return (
    <>
      <h1>Đăng ký</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
        labelAlign="left"
      >
        <Form.Item
          name="username"
          label="Tên người dùng"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên người dùng!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Xác nhận mật khẩu"
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
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Sai định dạng e-mail!",
            },
            {
              required: true,
              message: "Vui lòng nhập E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          name="role"
          label="Chức vụ "
          rules={[
            {
              type: "array",
              required: true,
              message: "Chọn chức vụ!",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item> */}

        {/* <Form.Item name="linkcv" label="CV">
          <AutoComplete
            options={websiteOptions}
            onChange={onWebsiteChange}
            placeholder="website"
          >
            <Input />
          </AutoComplete>
        </Form.Item> */}

        {/* <Form.Item
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
        </Form.Item> */}

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
            Tôi đồng ý với tất cả các{" "}
            <Link onClick={() => setModal2Open(true)}>điều khoản</Link>
            <Modal
              title=""
              centered
              open={modal2Open}
              onOk={() => setModal2Open(false)}
              // onCancel={() => setModal2Open(false)}
            >
              <p>
                1. Điều khoản sử dụng: Trang web học lịch sử sẽ có một bộ quy
                định và điều khoản sử dụng mà bạn cần đồng ý khi đăng ký. Điều
                khoản này có thể bao gồm những quyền và trách nhiệm của người
                dùng, quyền sở hữu trí tuệ, chính sách bảo mật và các hạn chế sử
                dụng dịch vụ.
              </p>
              <p>
                2. Chính sách bảo mật: Bạn nên đọc và hiểu chính sách bảo mật
                của trang web. Chính sách này sẽ giải thích cách thông tin cá
                nhân của bạn được thu thập, sử dụng và bảo vệ. Đảm bảo rằng
                trang web tuân thủ các quy định bảo mật và đảm bảo an toàn thông
                tin của bạn.
              </p>
              <p>
                3. Quyền sở hữu trí tuệ: Trang web học lịch sử có thể có nội
                dung bản quyền hoặc tư liệu được bảo vệ bởi quyền sở hữu trí
                tuệ. Bạn cần xác định rõ quyền sở hữu trí tuệ của trang web và
                ràng buộc khi sử dụng nội dung từ trang web đó. Tránh việc vi
                phạm bản quyền hoặc sử dụng sai mục đích.
              </p>
              <p>
                4. Quyền và trách nhiệm của người dùng: Điều khoản đăng ký
                thường sẽ nêu rõ quyền và trách nhiệm của người dùng trên trang
                web. Ví dụ, quyền truy cập vào nội dung, quyền tải lên tài liệu,
                và trách nhiệm tuân thủ các quy định và chính sách.
              </p>
              <p>
                5. Chính sách thanh toán (nếu có): Nếu trang web yêu cầu thanh
                toán phí để truy cập nội dung hoặc dịch vụ, bạn nên tìm hiểu
                chính sách thanh toán. Điều này bao gồm các chi phí, phương thức
                thanh toán được chấp nhận, chính sách hoàn trả và các điều khoản
                liên quan đến giao dịch tài chính.
              </p>
            </Modal>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <ReCAPTCHA
            sitekey="6LdaZwQnAAAAAKhL7i9G_wPUilCjDry-oXErGuMY"
            onChange={onChange}
          />
          <Button type="primary" htmlType="submit" disabled={!verfied}>
            Register
          </Button>
          Or <Link to={"/login"}>I already have an account</Link>
        </Form.Item>
      </Form>
    </>
  );
};
export default Signup;
