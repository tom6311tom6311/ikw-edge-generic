import React from 'react';
import { Op } from '../../types';
import Tile from '../Tile/Tile';

type LiveDataSectionProps = {
  title: string,
  ops: Op[],
  values: number[],
};

function LiveDataSection({ title, ops, values }: LiveDataSectionProps) {
  return (
    <div
      className="o-page-subcontainer"
      style={{ height: 'fit-content' }}
    >
      <div className="o-page-subcontainer__header">
        <p className="c-page-subcontainer-title">{title}</p>
        {/* <p className='c-page-subcontainer-option'>設定</p> */}
      </div>
      <div className="container" style={{ padding: '0', margin: '0' }}>
        <div className="row" style={{ width: '100%', margin: '0' }}>
          {ops.map((op, opIdx) => (
            <Tile
              key={op.name}
              title={op.name}
              value={`${values[opIdx] || ''} ${op.unit || ''}`}
              metaText="即時數據"
              liveTileStatus="normal"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiveDataSection;
