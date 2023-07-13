import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "../../utils/osm-providers";
import markerIcon from "./Daco_1014210.png";
import "./Map.css";
import { Link } from "react-router-dom";

const BasicMap = () => {
  const [center, setCenter] = useState({ lat: 16.7451, lng: 107.1852 });
  const ZOOM_LEVEL = 5.5;
  const mapRef = useRef();

  const customMarkerIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [45, 45],
  });

  return (
    <>
      <div page="leafletBasic" />
      <div className="row">
        <div className="col text-center">
          <h2 style={{ marginTop: "10px" }}>Địa điểm sự kiện nổi bật</h2>
          <div className="col">
            <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />
              <Marker position={[16.0678, 108.2208]} icon={customMarkerIcon}>
                <Popup>
                  <Link
                    to={"./events/eventDetail/81"}
                    style={{ textDecoration: "none" }}
                  >
                    <strong>Chiến sự ở Đà Nẵng</strong>
                  </Link>
                </Popup>
              </Marker>
              <Marker position={[10.7629, 106.682]} icon={customMarkerIcon}>
                <Popup>
                  <Link
                    to={"./events/eventDetail/82"}
                    style={{ textDecoration: "none" }}
                  >
                    <strong>Chiến sự ở Gia Định</strong>
                  </Link>
                </Popup>
              </Marker>
              <Marker position={[21.3858, 103.0188]} icon={customMarkerIcon}>
                <Popup>
                  <Link
                    to={"/events/eventDetail/20"}
                    style={{ textDecoration: "none" }}
                  >
                    <strong>Điện Biên Phủ trên không</strong>
                  </Link>
                </Popup>
              </Marker>
              <Marker position={[16.4637, 107.5909]} icon={customMarkerIcon}>
                <Popup>
                  <Link
                    to={"./events/eventDetail/52"}
                    style={{ textDecoration: "none" }}
                  >
                    <strong>Cuộc phản công ở kinh thành Huế</strong>
                  </Link>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicMap;
