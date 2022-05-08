import React from 'react';
import CctvSampleImg from '../../img/CCTV_1.png';

function CctvSection() {
  return (
    <div className="sitemanage_body_subcontainer">
      <div className="sitemanage_body_item_header">
        <p className="sitemanage_body_title">現場監控影像</p>
      </div>
      <div>
        <div
          className="container sitemanage_body_basicitem"
          style={{
            width: 'calc(100% - 10px)',
            height: '384px',
            borderWidth: '0',
          }}
        >
          <div className="row" style={{ width: 'calc(100% + 12px)' }}>
            <div className="col-6 col-xl-4" style={{ padding: '0' }}>
              <img
                src={CctvSampleImg}
                alt="CCTV"
                className="sitemanage_body_cctvimg"
              />
              <div className="sitemanage_body_cctvtxt">鏡頭名稱/位置</div>
            </div>
            <div className="col-6 col-xl-4" style={{ padding: '0' }}>
              <img
                src={CctvSampleImg}
                alt="CCTV"
                className="sitemanage_body_cctvimg"
              />
              <div className="sitemanage_body_cctvtxt">鏡頭名稱/位置</div>
            </div>
            <div className="col-6 col-xl-4" style={{ padding: '0' }}>
              <img
                src={CctvSampleImg}
                alt="CCTV"
                className="sitemanage_body_cctvimg"
              />
              <div className="sitemanage_body_cctvtxt">鏡頭名稱/位置</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CctvSection;
