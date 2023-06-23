// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Checkbox, Form, Input, Select, Row, Col } from "antd";
// import { Link } from "react-router-dom";
// import "./Login.css";
// const login = () => {
//   const onFinish = (values) => {
//     console.log("Received values of form: ", values);
//   };
//   return (
//     <>
//       {/* <Row> */}
//       {/* <Col span={12}> */}
//       <h1>Login</h1>
//       <Form
//         name="normal_login"
//         className="login-form"
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//       >
//         <Form.Item label="Select">
//           <Select>
//             <Select.Option value="Mentor">Mentor</Select.Option>
//             <Select.Option value="Member">Member</Select.Option>
//           </Select>
//         </Form.Item>
//         <Form.Item
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: "Please input your Username!",
//             },
//           ]}
//         >
//           <Input
//             prefix={<UserOutlined className="site-form-item-icon" />}
//             placeholder="Username"
//           />
//         </Form.Item>
//         <Form.Item
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Please input your Password!",
//             },
//           ]}
//         >
//           <Input
//             prefix={<LockOutlined className="site-form-item-icon" />}
//             type="password"
//             placeholder="Password"
//           />
//         </Form.Item>
//         <Form.Item>
//           <Form.Item name="remember" valuePropName="checked" noStyle>
//             <Checkbox>Remember me</Checkbox>
//           </Form.Item>
//           <Link className="login-form-forgot" to={"/forgot"}>
//             Forgot Password
//           </Link>
//         </Form.Item>

//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="login-form-button"
//           >
//             Log in
//           </Button>
//           Or <Link to={"/signup"}>Sign up</Link>
//         </Form.Item>
//       </Form>
//       {/* </Col> */}
//       {/* </Row> */}
//     </>
//   );
// };
// export default login;


import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { username, password, role } = values;

    fetch("https://64890c550e2469c038fe9625.mockapi.io/VN_HS/user")
      .then((response) => response.json())
      .then((data) => {
        const user = data.find(
          (user) =>
            user.userName === username &&
            user.password === password &&
            (user.role === role || user.role === "admin")
        );

        if (user) {
          if (user.role === "admin") {
            navigate("/admin"); // Redirect to "/admin" route for admin user
          } else {
            // Handle successful login for member or mentor
            console.log("Login successful");
            navigate("/"); // Redirect to "/events" route for non-admin users
          }
        } else {
          // Handle wrong role or incorrect credentials
          console.log("Wrong role or incorrect credentials");
        }
      })
      .catch((error) => {
        // Handle API fetch error
        console.log("API fetch error:", error);
      });
  };

  return (
    <>
      <h1>Login</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item label="Select" name="role">
          <Select>
            <Select.Option value="Mentor">Mentor</Select.Option>
            <Select.Option value="Member">Member</Select.Option>
          </Select>
        </Form.Item>
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
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link className="login-form-forgot" to={"/forgot"}>
            Forgot Password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to={"/signup"}>Sign up</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
