import React from 'react';
import AppConfig from '../../const/AppConfig';

type CameraConfig = {
  cameraName: string;
  imageUrl: string;
}

type CctvSectionProps = {
  title: string;
  cameras: CameraConfig[];
};

function CctvSection({ title, cameras }: CctvSectionProps) {
  return (
    <div className="o-page-subcontainer">
      <div className="o-page-subcontainer__header">
        <p className="c-page-subcontainer-title">{title}</p>
      </div>
      <div>
        <div
          className="container o-page-subcontainer-basicitem"
          style={{
            width: 'calc(100% - 10px)',
            height: '384px',
            borderWidth: '0',
          }}
        >
          <div className="row" style={{ width: 'calc(100% + 12px)' }}>
            {cameras.map(({ cameraName, imageUrl }) => (
              <div className="col-6 col-xl-4" style={{ padding: '0' }}>
                <img
                  src={`${AppConfig.BACKEND.URL}${imageUrl}`}
                  alt="CCTV Camera"
                  className="c-basicitem-cctvimg"
                />
                <div className="c-basicitem-cctvtxt">{cameraName}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CctvSection;
