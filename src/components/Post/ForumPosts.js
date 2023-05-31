import React, { useState } from 'react';

function ForumPosts() {
  const posts = [
    { id: 1, title: 'Bài viết 0', content: 'Nội dung bài viết 1' },
    { id: 2, title: 'Bài viết 2', content: 'Nội dung bài viết 2' },
    { id: 3, title: 'Bài viết 3', content: 'Nội dung bài viết 3' },
    // Thêm các bài viết khác vào đây
  ];

  const [currentPost, setCurrentPost] = useState(null);

  const handleViewDetail = (post) => {
    setCurrentPost(post);
  };

  const handleCloseDetail = () => {
    setCurrentPost(null);
  };

  return (
    <div>
      <h1>Danh sách bài viết</h1>
      {currentPost ? (
        <div>
          <h2>{currentPost.title}</h2>
          <p>{currentPost.content}</p>
          <button onClick={handleCloseDetail}>Đóng</button>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>
            <button onClick={() => handleViewDetail(post)}>Xem chi tiết</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ForumPosts;
