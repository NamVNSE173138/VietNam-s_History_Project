import { Button, Checkbox, Form, Input } from "antd";
import "./Profile.css";
import { Link } from "react-router-dom";
const onFinish = (values) => {
  const storedSession = JSON.parse(sessionStorage.getItem("session"));
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const App = () => {
  const storedSession = JSON.parse(sessionStorage.getItem("session"));

  return (
    <>
      <div className="profile">
        <h4>Username: {storedSession.username}</h4>
        <p>role</p>
        <p>id</p>
        <p>email</p>
        <Link to={"/changePassUser"}>Change Password</Link>
      </div>
    </>
  );
};
export default App;
