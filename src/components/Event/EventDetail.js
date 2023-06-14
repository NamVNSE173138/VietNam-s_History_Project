import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import "./Event.css";
const EventDetail = () => (
  <Result
    icon={<SmileOutlined />}
    title="Không có gì mà nhòm!"
    // extra={<Button>Next</Button>}
  />
);
export default EventDetail;
