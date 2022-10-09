import React, { useEffect, useState } from 'react';
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
  const [salt, setSalt] = useState(0);

  let refreshInterval: number = -1;
  useEffect(() => {
    refreshInterval = window.setInterval(() => {
      setSalt(salt + 1);
    }, AppConfig.TIMING.IMG_REFRESH_PERIOD);

    return () => {
      clearInterval(refreshInterval);
      refreshInterval = -1;
    };
  }, []);
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
            height: 'fit-content',
            borderWidth: '0',
          }}
        >
          <div className="row" style={{ margin: 'auto', width: '100%' }}>
            {cameras.map(({ cameraName, imageUrl }) => (
              <div key={cameraName} className="col-6 col-xl-4" style={{ padding: '0' }}>
                <div className="c-basicitem-cctvbackground">
                  <img
                    src={`${AppConfig.BACKEND.URL}${imageUrl}`}
                    alt="CCTV Camera"
                    className="c-basicitem-cctvimg"
                  />
                </div>
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
