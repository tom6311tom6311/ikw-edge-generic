import React from 'react';
import {
  MapContainer, TileLayer, LayersControl, Marker, Popup,
} from 'react-leaflet';
import L from 'leaflet';
import FishMarketData from './data/FishMarket.json';
import sirasSite from './data/SirasSiteTest.json';
import sirasSiteLogo from './Static/Icon/SirasSite.png';
// import Modal from '../../components/Modal/Modal';

const sirassiteIcon = new L.Icon({
  iconUrl: sirasSiteLogo,
  iconRetinaUrl: sirasSiteLogo,
  iconSize: [30, 30],
  shadowSize: [50, 64],
  iconAnchor: [0, 0],
  shadowAnchor: [4, 62],
  popupAnchor: [0, 0],
});

const { BaseLayer } = LayersControl;

function MapPage() {
  // const [openModal, setOpenModal] = useState(false);
  return (
    <div className="market-map">
      {/* 測試Modal Button */}
      {/* <div className="testClass">
        <button
          className="openModalBtn"
          type="button"
          onClick={() => { setOpenModal(true); }}
        >
          Submit
        </button>
      </div>
      {openModal && <Modal closeModal={setOpenModal} />} */}
      <MapContainer
        center={[23.949294025268994, 121.07844297210907]}
        zoom={7}
        scrollWheelZoom
      >
        {FishMarketData.map((FM) => (
          <Marker
            key={FM.市場名稱}
            position={[FM.lat, FM.lon]}
          >
            <Popup
              position={[FM.lat, FM.lon]}
            >
              <div>
                <h5>
                  <span>漁市場: </span>
                  {FM.市場名稱}
                </h5>
                <p>
                  <span>地址: </span>
                  {FM.地址}
                </p>
                <p>
                  <span>電話: </span>
                  {FM.電話}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
        {sirasSite.map((SS) => (
          <Marker
            key={SS.案場名稱}
            position={[SS.lat, SS.lon]}
            icon={sirassiteIcon}
          >
            <Popup
              position={[SS.lat, SS.lon]}
            >
              <div>
                <h5>
                  <span>案場名稱: </span>
                  {SS.案場名稱}
                </h5>
                <p>
                  <span>地址: </span>
                  {SS.地址}
                </p>
                <p>
                  <span>電話: </span>
                  {SS.電話}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
        <LayersControl position="bottomright">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="正射影像">
            <TileLayer
              url="https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}"
            />
          </BaseLayer>
          <BaseLayer name="台灣通用電子地圖">
            <TileLayer
              url="https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}"
            />
          </BaseLayer>
          <BaseLayer name="NASA Gibs Blue Marble">
            <TileLayer
              url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
              attribution="&copy; NASA Blue Marble, image service by OpenGeo"
              maxNativeZoom={8}
            />
          </BaseLayer>
        </LayersControl>
      </MapContainer>
    </div>
  );
}

export default MapPage;
