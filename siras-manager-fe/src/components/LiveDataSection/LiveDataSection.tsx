import React from 'react';
import { Op } from '../../types';

type LiveDataSectionProps = {
  ops: Op[],
  values: number[],
};

function LiveDataSection({ ops, values }: LiveDataSectionProps) {
  return (
    <div
      className="sitemanage_body_subcontainer"
      style={{ height: 'fit-content' }}
    >
      <div className="sitemanage_body_item_header">
        <p className="sitemanage_body_title">中央系統數據</p>
        {/* <p className='sitemanage_body_option'>設定</p> */}
      </div>
      <div className="container" style={{ padding: '0', margin: '0' }}>
        <div className="row" style={{ width: '100%', margin: '0' }}>
          {ops.map((op, opIdx) => (
            <div
              key={`${op.name}-live-value`}
              className="col-sm-6 col-xl-4"
              style={{ padding: '0' }}
            >
              <div key={op.name} className="sitemanage_body_basicitem">
                <div
                  style={{
                    width: 'calc(100% - 40px)',
                    display: 'flex',
                    margin: '10px 20px',
                  }}
                >
                  <div className="sitemanage_paralight_blue" />
                  <p
                    className="sitemanage_body_item_name"
                    style={{
                      margin: '3.5px 0',
                      padding: '0',
                    }}
                  >
                    {op.name}
                  </p>
                </div>
                <div className="sitemanage_body_item_systemdata_container">
                  <p className="sitemanage_body_item_systemdata">
                    {values[opIdx]}
                    {' '}
                    {op.unit}
                  </p>
                  <p className="sitemanage_body_item_systeminfo">
                    即時數據
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiveDataSection;
