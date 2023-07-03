import { Button } from "antd";
import { Link } from "react-router-dom";
import "./Event.css";
const Event = () => {
  return (
    <>
      <div className="event">
        <div className="pop-event">
          <h3>Vietnam's Events</h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <Link to={"/eventDetail"} className="pop-event-card">
              <div className="col">
                <div className="card h-100">
                  <div className="card-img-top">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/7b/C%C3%A1ch_m%E1%BA%A1ng_th%C3%A1ng_8_b.jpg"
                      className="card-img-top"
                      alt="Skyscrapers"
                      style={{ height: "301px" }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Cách mạng tháng Tám</h5>
                    <p className="card-text">1945</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to={"/eventDetail"} className="pop-event-card">
              <div className="col">
                <div className="card h-100">
                  <div className="card-img-top">
                    <img
                      src="https://danviet.mediacdn.vn/zoom/700_438/296231569849192448/2023/2/8/703-16758417948641164394536-0-0-799-1279-crop-1675842067945553871136.jpg"
                      className="card-img-top"
                      alt="Los Angeles Skyscrapers"
                      style={{ height: "301px" }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Chiến tranh Việt Nam</h5>
                    <p className="card-text">1955-1975</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to={"/eventDetail"} className="pop-event-card">
              <div className="col">
                <div className="card h-100">
                  <div className="card-img-top">
                    <img
                      src="https://media.vov.vn/sites/default/files/styles/large/public/2023-05/images1139304_6810aa9d609525dimages941103_media_thumb1382169701.jpg"
                      className="card-img-top"
                      alt="Palm Springs Road"
                      style={{ height: "301px" }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Chiến thắng Điện Biên Phủ</h5>
                    <p className="card-text">March 13 - May 7, 1954</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="button">
            <Link to={"/searchList"}>
              <Button size="large">SEE MORE</Button>
            </Link>
          </div>
        </div>

        {/* Poppular Event */}
        <div id="pop-event" className="pop-event">
          <h3>Popular Events</h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <Link to={"/eventDetail"} className="pop-event-card">
              <div className="col">
                <div className="card h-100">
                  <div className="card-img-top">
                    <img
                      src="https://assets.editorial.aetnd.com/uploads/2009/11/battle-of-the-somme-gettyimages-50615151.jpg?width=392&quality=75"
                      className="card-img-top"
                      alt="Skyscrapers"
                      style={{ height: "301px" }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">World War I</h5>
                    <p className="card-text">
                      July 28, 1914 - November 11, 1918
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to={"/eventDetail"} className="pop-event-card">
              <div className="col">
                <div className="card h-100">
                  <div className="card-img-top">
                    <img
                      src="https://assets.editorial.aetnd.com/uploads/2009/11/hitler-salutes-during-condor-legion-parade.jpg?width=392&quality=75"
                      className="card-img-top"
                      alt="Los Angeles Skyscrapers"
                      style={{ height: "301px" }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">World War II</h5>
                    <p className="card-text">
                      September 1, 1939 - September 2, 1945
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to={"/eventDetail"} className="pop-event-card">
              <div className="col">
                <div className="card h-100">
                  <div className="card-img-top">
                    <img
                      src="https://assets.editorial.aetnd.com/uploads/2017/09/khmer-rouge-gettyimages-956549736.jpg?width=392&quality=75"
                      className="card-img-top"
                      alt="Palm Springs Road"
                      style={{ height: "301px" }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Cold War</h5>
                    <p className="card-text">
                      After the end of World War II in 1945 and ended in 1991
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="button">
            <Link to={"/searchList"}>
              <Button size="large">SEE MORE</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Event;
