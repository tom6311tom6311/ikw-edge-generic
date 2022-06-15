import React from 'react';
import { Op } from '../../types';

type LiveDataSectionProps = {
  ops: Op[],
  values: number[],
};

function LiveDataSection({ ops, values }: LiveDataSectionProps) {
  return (
    <div
      className="o-page-subcontainer"
      style={{ height: 'fit-content' }}
    >
      <div className="o-page-subcontainer__header">
        <p className="c-page-subcontainer-title">中央系統數據</p>
        {/* <p className='c-page-subcontainer-option'>設定</p> */}
      </div>
      <div className="container" style={{ padding: '0', margin: '0' }}>
        <div className="row" style={{ width: '100%', margin: '0' }}>
          {ops.map((op, opIdx) => (
            <div
              key={`${op.name}-live-value`}
              className="col-sm-6 col-xl-4"
              style={{ padding: '0' }}
            >
              <div key={op.name} className="o-page-subcontainer-basicitem">
                <div
                  style={{
                    width: 'calc(100% - 40px)',
                    display: 'flex',
                    margin: '10px 20px',
                  }}
                >
                  <div className="c-page-paralight--blue" />
                  <p
                    className="c-page-basicitem-name"
                    style={{
                      margin: '3.5px 0',
                      padding: '0',
                    }}
                  >
                    {op.name}
                  </p>
                </div>
                <div className="o-basicitem__livedata">
                  <p className="c-livedata__text">
                    {values[opIdx]}
                    {' '}
                    {op.unit}
                  </p>
                  <p className="c-livedata__info">
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
