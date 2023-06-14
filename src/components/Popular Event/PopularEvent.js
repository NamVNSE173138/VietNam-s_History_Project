import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
const popEvent = () => {
  return (
    <>
      <Link to={"/events"}>Popular Events</Link>
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
    </>
  );
};
export default popEvent;
