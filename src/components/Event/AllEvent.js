import { Button, List, Space } from "antd";
import "./Event.css";
import React from "react";
import { Link } from "react-router-dom";
const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: "",
  title: `demo ${i}`,
  // avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const AllEvent = () => (
  <>
    <div className="all-event">
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <Link to="/eventDetail">
                <Button size="large">Read more</Button>,
              </Link>,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://i.pinimg.com/564x/8e/81/53/8e8153f8bd9eecfc9939f49202742464.jpg"
                style={{ height: "200px" }}
              />
            }
          >
            <List.Item.Meta
              // avatar={<Avatar src={item.avatar} />}
              title={
                <a href={item.href} style={{ textDecoration: "none" }}>
                  {item.title}
                </a>
              }

              // description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  </>
);
export default AllEvent;
