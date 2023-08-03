import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spin, Button } from "antd";
import "./dynasty.css";
const DynastyDetail = () => {
  const [loading, setLoading] = useState(true);
  const [king, setKing] = useState({});
  const [dynasty, setDynasty] = useState({}); // Change timelineData to dynasty since we're fetching data for a specific dynasty
  const { dysnatyID } = useParams();
  // Create an array of Axios requests
  useEffect(() => {
    const requests = [
      axios.get(`http://localhost:5000/api/dynasty/${dysnatyID}/charactors`),
      axios.get(`http://localhost:5000/api/king/${dysnatyID}`),
    ];
    axios
      .all(requests)
      .then(
        axios.spread((dynastyResponse, kingResponse) => {
          setLoading(false);
          setDynasty(dynastyResponse.data); // Store the fetched dynasty data in the state
          setKing(kingResponse.data); // Store the fetched character data in the state
        })
      )
      .catch((error) => {
        setLoading(false); // Set loading to false even in case of error to avoid infinite loop
        console.log(error);
      });
  }, [dysnatyID]);
  // Fetch data for a specific dynasty based on the dynastyID
  if (loading) {
    return (
      <div className="loading">
        <Spin />
      </div>
    );
  }
  return (
    <>
      <div className="dynasty-container">
        <p className="dynasty-title">{dynasty[0].dysnatyName}</p>
        <i className="dynasty-timeline">
          Thời gian: {dynasty[0].timeFrom} - {dynasty[0].timeTo}
        </i>
        <p className="dynasty-description">{dynasty[0].description}</p>
        <div className="dynasty-list">
          <p className="dynasty-title2">Các nhân vật lịch sử:</p>
          {dynasty.map((dynastys) => (
            <div key={dynastys.charactorID} className="character-item">
              {dynastys.characterName}
              <br />
              <Link to={`/dynasty/charactor/${dynastys.charactorID}`}>
                <Button style={{ margin: "8px" }} size="large">
                  Xem thêm...
                </Button>
              </Link>
            </div>
          ))}
        </div>
        {king.length !== 0 ? (
          <>
            <div className="dynasty-list">
              <p className="dynasty-title2">Các vị vua ngự trị:</p>
              {king.map((kings) => (
                <div key={kings.kingID} className="character-item">
                  {kings.kingName}
                  <br />

                  <Link to={`/dynasty/king/${kings.kingID}`}>
                    <Button style={{ margin: "8px" }} size="large">
                      Xem thêm...
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
export default DynastyDetail;
