import React from 'react';
import NitriteSampleImg from '../../img/nitrite_sample.png';

function SamplingSection() {
  return (
    <div className="sitemanage_body_subcontainer">
      <div className="sitemanage_body_item_header">
        <p className="sitemanage_body_title">亞硝酸採樣</p>
        <p className="sitemanage_body_option">＋新增採樣</p>
      </div>
      <div>
        <div
          className="row sitemanage_body_basicitem sitemanage_body_sampling_container"
          style={{
            width: 'calc(100% - 10px)',
            height: 'fit-content',
            padding: '5px',
            alignItems: 'center',
          }}
        >
          <img
            src={NitriteSampleImg}
            alt="nitrite_sample"
            className="col-6 sitemanage_body_sampling_img"
            style={{ padding: '0' }}
          />
          <div
            className="col-6 sitemanage_body_sampling_info"
            style={{ padding: '0' }}
          >
            <p className="sitemanage_body_item_descr">採樣時間</p>
            <p className="sitemanage_body_item_sampletime">
              10:00 am 111年1月26日
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SamplingSection;
