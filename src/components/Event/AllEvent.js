// import { Avatar, List, Space } from "antd";

// import axios from 'axios';




// import {
//   StarOutlined,
//   LikeOutlined,
//   MessageOutlined,
//   FlagOutlined,
// } from "@ant-design/icons";
// import React, { useEffect, useState } from 'react';
// import Icon from "@ant-design/icons/lib/components/Icon";

// function Component(){
// const [events, setEvents] = useState([]);


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event');
//       setEvents(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchData();
// }, []); 
// const eventData = events.map(event => ({
//   title: event.eventName,
//   description: event.description
// }));

// return eventData;
// }

// const data = Array.from({
//   length: 23,
// }, () => Component());

// const IconText = ({ icon, text }) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );
// const AllEvent = () => (
//   <List
//     itemLayout="vertical"
//     size="large"
//     pagination={{
//       onChange: (page) => {
//         console.log(page);
//       },
//       pageSize: 5,
//     }}
//     dataSource={data}
//     renderItem={(item) => (
//       <List.Item
//         key={item.title}
//         actions={[
//           // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
//           <IconText icon={LikeOutlined} text="69" key="list-vertical-like-o" />,
//           <IconText
//             icon={MessageOutlined}
//             text="69"
//             key="list-vertical-message"
//           />,
//           <IconText icon={FlagOutlined} text="6" key="list-vertical-report" />,
//         ]}
//         extra={
//           <img
//             width={272}
//             alt="logo"
//             src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
//           />
//         }
//       >
//         <List.Item.Meta
//           // avatar={<Avatar src={item.avatar} />}
//           title={<a href={item.href}>{item.title}</a>}
//           description={item.description}
//         />
        
//       </List.Item>
//     )}
//   />
// );
// export default AllEvent;


import { Avatar, List, Space } from "antd";
import axios from 'axios';
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from 'react';
import Icon from "@ant-design/icons/lib/components/Icon";

const AllEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={events}
      renderItem={(event) => (
        <List.Item
          key={event.eventID}
          actions={[
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
            title={<a href={event.href}>{event.eventName}</a>}
            description={event.description}
          />
        </List.Item>
      )}
    />
  );
};

export default AllEvent;
