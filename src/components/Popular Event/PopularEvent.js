import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import "./PopularEvent.css";
const popEvent = () => {
  return (
    <>
      <div className="destination">
        <Link to={"/events"}>
          <h3>Popular Events</h3>
        </Link>

        <div className="first-des">
          <div className="des-text">
            <h4>World War I</h4>
            <p>
              For four years, from 1914 to 1918, World War I raged across
              Europe's western and eastern fronts after growing tensions and
              then the assassination of Archduke Franz Ferdinand of Austria
              ignited the war. Trench warfare and the early use of tanks,
              submarines and airplanes meant the war’s battles were
              devastatingly bloody, claiming an estimated 40 million military
              and civilian casualties, including 20 million deaths. Fighting
              under brutal conditions, World War I battles on both land and at
              sea saw mass carnage, but few decisive victories, with some
              conflicts waging for months on end.
            </p>
          </div>
          <div className="image-pop">
            <img
              alt=""
              src="https://assets.editorial.aetnd.com/uploads/2021/04/world-war-i-battles-gettyimages-154423536.jpg?width=1920&height=960&crop=1920%3A960%2Csmart&quality=75"
            />
            <img
              alt=""
              src="https://assets.editorial.aetnd.com/uploads/2009/10/3-battle-of-the-somme.jpg?width=828&amp%3Bheight=400&amp%3Bcrop=2%3A1&quality=75"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default popEvent;
