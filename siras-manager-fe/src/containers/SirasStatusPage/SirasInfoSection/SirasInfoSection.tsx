import React from 'react';
import Tile from '../../../components/Tile/Tile';

const STATUS_MAP: { [key: string]: string; } = {
  ACTIVE: '養殖中',
  INACTIVE: '未養殖',
};

type SirasInfoSectionProps = {
  speciesList: string[],
  capacity: number,
  status: string,
};

function SirasInfoSection({
  speciesList, capacity, status,
}: SirasInfoSectionProps) {
  return (
    <div className="o-page-subcontainer">
      <div className="o-page-subcontainer__header">
        <p className="c-page-subcontainer-title">基本資料</p>
        <p className="c-page-subcontainer-option">看更多</p>
      </div>
      <div className="container" style={{ padding: '0', margin: '0' }}>
        <div className="row" style={{ width: '100%', margin: '0' }}>
          <Tile
            title="魚種"
            value={speciesList.join(', ')}
          />
          <Tile
            title="魚隻數量"
            value={capacity}
            metaText="尾"
          />
          <Tile
            title="狀態"
            value={STATUS_MAP[status] ?? status}
          />
        </div>
      </div>
    </div>
  );
}

export default SirasInfoSection;
