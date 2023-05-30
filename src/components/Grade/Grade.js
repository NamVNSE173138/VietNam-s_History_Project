import React, { useState } from 'react';
// import './App.css';

const App = () => {
  const [hoveredClass, setHoveredClass] = useState(null);

  const handleHover = (className) => {
    setHoveredClass(className);
  };

  return (
    <div className="app">
      <h1>Trang web bài học</h1>
      <div className="class-list">
        <div
          className={`class ${hoveredClass === 'class4' ? 'hovered' : ''}`}
          onMouseEnter={() => handleHover('class4')}
          onMouseLeave={() => handleHover(null)}
        >
          <h2>Lớp 4</h2>
          <ul className="lesson-list">
            <li>Bài học 1</li>
            <li>Bài học 2</li>
            <li>Bài học 3</li>
          </ul>
        </div>
        <div
          className={`class ${hoveredClass === 'class5' ? 'hovered' : ''}`}
          onMouseEnter={() => handleHover('class5')}
          onMouseLeave={() => handleHover(null)}
        >
          <h2>Lớp 5</h2>
          <ul className="lesson-list">
            <li>Bài học 1</li>
            <li>Bài học 2</li>
            <li>Bài học 3</li>
          </ul>
        </div>
        {/* Thêm các lớp khác tương tự */}
      </div>
    </div>
  );
};

export default App;
