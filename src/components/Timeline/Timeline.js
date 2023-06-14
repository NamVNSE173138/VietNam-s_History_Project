import React, { useState } from "react";
import "./Timeline.css";

const Timeline = () => {
  const [marginFirst, setMarginFirst] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleItemClick = (index, event) => {
    event.preventDefault();
    setSelectedIndex(index);
    const change = marginFirst - (index - selectedIndex) * 150;
    setMarginFirst(change);
  };

  return (
    <>
      <div>
        <h3 className="my-heading">Timeline</h3>
      </div>
      <div className="container">
        <ul className="change" style={{ marginLeft: `${marginFirst}px` }}>
          <li className="detail">
            <a
              href="/#one"
              className={selectedIndex === 0 ? "selected" : ""}
              style={{ paddingLeft: "170px" }}
              onClick={(event) => handleItemClick(0, event)}
            >
              Cundeptrai1
            </a>
          </li>
          <li className="detail">
            <a
              href="/#two"
              className={selectedIndex === 1 ? "selected" : ""}
              onClick={(event) => handleItemClick(1, event)}
            >
              Cundeptrai2
            </a>
          </li>
          <li className="detail">
            <a
              href="/#"
              className={selectedIndex === 2 ? "selected" : ""}
              onClick={(event) => handleItemClick(2, event)}
            >
              Cundeptrai3
            </a>
          </li>
          <li className="detail">
            <a
              href="/#"
              className={selectedIndex === 3 ? "selected" : ""}
              onClick={(event) => handleItemClick(3, event)}
            >
              Cundeptrai4
            </a>
          </li>
          <li className="detail">
            <a
              href="/#"
              className={selectedIndex === 4 ? "selected" : ""}
              onClick={(event) => handleItemClick(4, event)}
            >
              Cundeptrai5
            </a>
          </li>
          <li className="detail">
            <a
              href="/#"
              className={selectedIndex === 5 ? "selected" : ""}
              onClick={(event) => handleItemClick(5, event)}
            >
              Cundeptrai6
            </a>
          </li>
          <li className="detail">
            <a
              href="/#"
              className={selectedIndex === 6 ? "selected" : ""}
              onClick={(event) => handleItemClick(6, event)}
            >
              Cundeptrai7
            </a>
          </li>
          <li className="detail">
            <a
              href="/#"
              className={selectedIndex === 7 ? "selected" : ""}
              onClick={(event) => handleItemClick(7, event)}
            >
              Cundeptrai8
            </a>
          </li>
          <li className="detail">
            <a
              href="/#"
              className={selectedIndex === 8 ? "selected" : ""}
              onClick={(event) => handleItemClick(8, event)}
            >
              Cundeptrai9
            </a>
          </li>
          <li className="detail">
            <a
              href="/#"
              className={selectedIndex === 9 ? "selected" : ""}
              onClick={(event) => handleItemClick(9, event)}
            >
              Cundeptrai10
            </a>
          </li>
          <li className="detail">
            <a
              href="/#"
              className={selectedIndex === 10 ? "selected" : ""}
              onClick={(event) => handleItemClick(10, event)}
            >
              Cundeptrai11
            </a>
          </li>
          <li className="detail">
            <a
              href="/#"
              className={selectedIndex === 11 ? "selected" : ""}
              onClick={(event) => handleItemClick(11, event)}
            >
              Cundeptrai12
            </a>
          </li>

          {/* Rest of the list items */}
        </ul>
      </div>
    </>
  );
};

export default Timeline;
