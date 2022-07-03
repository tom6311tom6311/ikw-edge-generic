import * as React from 'react';
import { useParams } from 'react-router-dom';
import TabHeader from '../TabHeader/TabHeader';
import NitriteSampleImg from '../../img/nitrite_sample.png';

export interface ISamplingOverviewProps {
}

export default function SamplingOverview() {
  const { siteId } = useParams();

  return (
    <div className="o-sitecamera">
      <TabHeader
        title={'亞硝酸採樣' || '/'}
        currActiveIdx={0}
        elements={[
          { text: '採樣照片', link: `/site/${siteId || ''}/sampling` },
        ]}
      />
      <div className="c-page-divider" />
      <div className="o-page-container__body">
        <div className="o-page-subcontainer">
          <div className="o-page-subcontainer__header">
            <p className="c-page-subcontainer-option">＋新增採樣</p>
          </div>
          <div>
            <div
              className="row o-page-subcontainer-basicitem u-flex-direction--column"
              style={{
                width: 'calc(100% - 10px)',
                height: 'fit-content',
                padding: '5px',
                alignItems: 'center',
              }}
            >
              <div style={{ backgroundColor: 'black', textAlign: 'center', marginBottom: '10px' }}>
                <img
                  src={NitriteSampleImg}
                  alt="nitrite_sample"
                  className="c-basicitem-sampling-img"
                  style={{ padding: '0', height: '180px' }}
                />
              </div>
              <div
                className="sitemanage_body_sampling_info"
                style={{ padding: '10px 20px', marginBottom: '20px' }}
              >
                <p className="c-basicitem-sampling-descr" style={{ margin: '0 0 10px 0' }}>採樣時間</p>
                <p className="c-basicitem-sampling-time" style={{ margin: '0' }}>
                  10:00 am 111年1月26日
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
