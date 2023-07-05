// import React from "react";

// const EventDetailPage = () => {
//   const event = {
//     title: "Event Title",
//     time: "December 22, 1999",
//     images: [
//       "https://i.pinimg.com/564x/8e/81/53/8e8153f8bd9eecfc9939f49202742464.jpg",
//       "https://i.pinimg.com/564x/8e/81/53/8e8153f8bd9eecfc9939f49202742464.jpg",
//     ],
//     description: "Event description ở đây nha",
//   };

//   return (
//     <div>
//       <h1>{event.title}</h1>
//       <p>Time: {event.time}</p>
//       <div>
//         {event.images.map((image, index) => (
//           <img key={index} src={image} alt={`Event Image ${index}`} />
//         ))}
//       </div>
//       <p>{event.description}</p>
//     </div>
//   );
// };

// export default EventDetailPage;

import axios from "axios";
import { useParams } from "react-router-dom"; // Import the useParams hook from react-router-dom
import { useState, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
// ...

const EventDetail = () => {
  const { eventID } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event/${eventID}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEvent();
  }, [eventID]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event">
      <h2>Event Detail</h2>
      <p>Event ID: {event.eventID}</p>
      <p>Event Name: {event.eventName}</p>
      <p>Description: {event.description}</p>
      {/* Display other event details */}
    </div>
  );
};

export default EventDetail;




// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Avatar, List, Space, Button, message } from "antd";
// import { LikeOutlined, MessageOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
// import { Popconfirm } from "antd";
// import CreatePost from "../../pages/CreatePost";

// const EventDetail = () => {
//   const { eventID } = useParams();
//   const [event, setEvent] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [isReported, setIsReported] = useState(false);


//   const PostItem = ({ post }) => (
//     <List.Item
//       key={post.id}
//       actions={[
//         <Button type={post.isLiked ? "primary" : "default"} onClick={() => handleLike(post)}>
//           <Space>
//             {post.isLiked ? (
//               <>
//                 <LikeOutlined />
//                 Liked {post.like}
//               </>
//             ) : (
//               <>
//                 <LikeOutlined />
//                 Like {post.like}
//               </>
//             )}
//           </Space>
//         </Button>,
//         <Button type="default">
//           <Space>
//             <MessageOutlined />
//             {post.commentCounter}
//           </Space>
//         </Button>,
//         <Popconfirm
//         title="Report"
//         description="Are you sure to report this post?"
//         onConfirm={handleReportConfirm}
//         onCancel={handleReportCancel}
//         okText="Yes"
//         cancelText="No"
//       >
//         <Button type="default">
//           <ExclamationCircleOutlined /> Report
//         </Button>
//       </Popconfirm>
//       ,
//       ]}
//       extra={
//         <img
//           width={272}
//           alt="logo"
//           src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
//         />
//       }
//     >
//       <List.Item.Meta
//         avatar={<Avatar src="https://cartoonavatar.com/wp-content/uploads/2022/01/Business-Avatar-On-Circle-Background.png" />}
//         title={<a href="">{post.authorID}</a>}
//         description={<p>posted on {post.createdAt}</p>}
//       />
//       {post.description}
//     </List.Item>
//   );
//   const handleLike = (post) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((item) => {
//         if (item.id === post.id) {
//           return {
//             ...item,
//             isLiked: !item.isLiked,
//             like: item.isLiked ? item.like - 1 : item.like + 1,
//           };
//         }
//         return item;
//       })
//     );
//   };
//   const handleReportCancel = (e) => {
//     console.log(e);
//     message.error('Click on No');
//   };
//   const handleReportConfirm = (e) => {
//     console.log(e);
//     message.success('Thanks');
//     setIsReported(true);
//   };

// useEffect(() => {
//   const fetchEvent = async () => {
//     try {
//       const response = await axios.get(`https://64890c550e2469c038fe9625.mockapi.io/VN_HS/event/${eventID}`);
//       setEvent(response.data);
//     } catch (error) {
//       console.error("Error fetching event details:", error);
//     }
//   };

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get("https://64890c550e2469c038fe9625.mockapi.io/VN_HS/post");
//       const filteredPosts = response.data.filter((post) => post.eventID === eventID);
//       setPosts(filteredPosts);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   fetchEvent();
//   fetchPosts();
// }, [eventID]);

//   if (!event) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="event">
//       <h2>Event Detail</h2>
//       <p>Event ID: {event.eventID}</p>
//       <p>Event Name: {event.eventName}</p>
//       <p>Description: {event.description}</p>

//       <h2>Posts</h2>
//       <div className="create-post">
//       <CreatePost />
//     </div>
//     <List
//       itemLayout="vertical"
//       size="large"
//       pagination={{
//         onChange: (page) => {
//           console.log(page);
//         },
//         pageSize: 10,
//       }}
//       dataSource={posts}
//       renderItem={(post) => <PostItem post={post} />}
//     />
//     </div>
//   );
// };

// export default EventDetail;
