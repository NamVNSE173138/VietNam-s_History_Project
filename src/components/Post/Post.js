import { Avatar, List, Space } from "antd";

import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import React from "react";
import Icon from "@ant-design/icons/lib/components/Icon";
const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: "",
  title: `demo ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const Post = () => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data}
    // footer={
    //   <div>
    //     <b>ant design</b> footer part
    //   </div>
    // }
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="69" key="list-vertical-like-o" />,
          <IconText
            icon={MessageOutlined}
            text="69"
            key="list-vertical-message"
          />,
          <IconText icon={FlagOutlined} text="6" key="list-vertical-report" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
);
export default Post;
