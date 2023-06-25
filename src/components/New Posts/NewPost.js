import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import "../New Posts/NewPost.css";
const newPost = () => (
  <>
    <div className="newPost">
      <h3>New Posts</h3>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  </>
);
export default newPost;
