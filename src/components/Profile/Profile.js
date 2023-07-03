import { Button, Checkbox, Form, Input } from "antd";
import "./Profile.css";
import { Link } from "react-router-dom";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const storedSession = JSON.parse(sessionStorage.getItem("session"));
const App = () => (
  <>
    <div className="profile">
      <h4>Username: {storedSession.username}</h4>

      <p>role: {storedSession.role}</p>
      <p>id: {storedSession.id}</p>
      <p>email: {storedSession.email}</p>
      <Link to={"/changePassUser"}>Change Password</Link>
    </div>
  </>
);
export default App;
