import React from 'react';
import NitriteSampleImg from '../../img/nitrite_sample.png';

function SamplingSection() {
  return (
    <div className="o-page-subcontainer">
      <div className="o-page-subcontainer__header">
        <p className="c-page-subcontainer-title">亞硝酸採樣</p>
        <p className="c-page-subcontainer-option">＋新增採樣</p>
      </div>
      <div>
        <div
          className="row o-page-subcontainer-basicitem u-flex-direction--row"
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
            className="col-6 c-basicitem-sampling-img"
            style={{ padding: '0' }}
          />
          <div
            className="col-6 sitemanage_body_sampling_info"
            style={{ padding: '0' }}
          >
            <p className="c-basicitem-sampling-descr">採樣時間</p>
            <p className="c-basicitem-sampling-time">
              10:00 am 111年1月26日
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SamplingSection;
