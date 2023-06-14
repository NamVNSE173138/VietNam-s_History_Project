import React, { useState } from "react";

// import marker from "../../assets/image/—Pngtree—location marker_5990782.png"
import {  TileLayer } from "react-leaflet";
import  osm from "../../utils/osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";
import "./Map.css"
// import L, { Marker, Popup } from "leaflet";
// const makerIcon = new L.Icon({
//     iconUrl: require({marker}),
//     iconSize: [35,45],
// });

const BasicMap = () => {
    const [center, setCenter] = useState({ lat: 16.7451, lng: 107.1852 });


    const ZOOM_LEVEL = 5.5;
    const mapRef = useRef();
    console.log(osm.maptiler.url    )
    return (
        <>
            <div page="leafletBasic" />

            <div className="row">
                <div className="col text-center">
                    <h2>React-leaflet - Basic Openstreet Maps</h2>
                    <p>Loading basic map using layer from maptiler</p>
                    <div className="col">
                        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                            <TileLayer
                                url={osm.maptiler.url}
                                 attribution={osm.maptiler.attribution}
                            />

                            {/* <Marker position = {[16.7451 , 107.1852 ]} 
                            icon = {makerIcon}
                            />
                            <Popup>
                                <b>hello</b>
                            </Popup> */}

                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasicMap;