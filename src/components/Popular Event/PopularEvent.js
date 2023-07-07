import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import "./PopularEvent.css";
const popEvent = () => {
  return (
    <>
      <div className="destination">
        <Link to={"/events"} style={{ textDecoration: "none" }}>
          <h3 className="popPost">Sự kiện nổi bật</h3>
        </Link>

        <div className="first-des">
          <div className="des-text">
            <Link
              to={"/events/eventDetail/16"}
              style={{ textDecoration: "none" }}
            >
              <h4 className="popPost">Chiến tranh thế giới lần thứ nhất</h4>
            </Link>
            <i>
              Trong bốn năm, từ năm 1914 đến 1918, Thế chiến thứ nhất đã nổi
              giận Mặt trận phía Tây và Đông của Châu Âu sau khi căng thẳng và
              Sau đó, vụ ám sát Archduke Franz Ferdinand của Áo đốt cháy cuộc
              chiến. Chiến tranh chiến hào và sử dụng sớm các xe tăng, tàu ngầm
              và máy bay có nghĩa là các trận chiến chiến tranh là tàn khốc đẫm
              máu, tuyên bố ước tính khoảng 40 triệu quân đội và thương vong dân
              sự, bao gồm 20 triệu trường hợp tử vong. Chiến đấu Trong điều kiện
              tàn khốc, Thế chiến I chiến đấu trên cả đất và tại biển đã thấy
              tàn sát hàng loạt, nhưng một vài chiến thắng quyết định, với một
              số Xung đột tiến triển trong nhiều tháng.
            </i>
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

        <div className="first-des">
          <div className="image-pop">
            <img
              alt=""
              src="https://assets.editorial.aetnd.com/uploads/2021/05/wwii-battles-gettyimages-538297253.jpg?width=1920&height=960&crop=1920%3A960%2Csmart&quality=75"
            />
            <img
              style={{ top: "10%" }}
              alt=""
              src="https://assets.editorial.aetnd.com/uploads/2021/05/battle-of-the-bulge-gettyimages-50659716.jpg?width=828&amp%3Bheight=400&amp%3Bcrop=2%3A1&quality=75"
            />
          </div>
          <div className="des-text">
            <Link
              to={"/events/eventDetail/17"}
              style={{ textDecoration: "none" }}
            >
              <h4 className="popPost">Chiến tranh thế giới lần thứ hai</h4>
            </Link>
            <i>
              Với Adolf Hitler dẫn đầu cuộc xâm lược Ba Lan của Đức vào năm
              1939, Thế chiến II đã được ra mắt, một cuộc xung đột toàn cầu chết
              người được tiến hành Châu Âu và Thái Bình Dương cho đến năm 1945.
              Trận chiến đẫm máu hoành hành giữa các cường quốc đồng minh, bao
              gồm Anh, Pháp, Liên Xô Liên minh và Hoa Kỳ, cùng với các quốc gia
              khác và Trục, đáng chú ý là Đức và Nhật Bản. Khi trục cuối cùng
              đầu hàng, khoảng 20 triệu binh sĩ đã chết, cùng với một Ước tính
              40 triệu thường dân. Dưới đây là dòng thời gian của cuộc chiến Các
              trận chiến quan trọng nhất.
            </i>
          </div>
        </div>
      </div>
    </>
  );
};
export default popEvent;
