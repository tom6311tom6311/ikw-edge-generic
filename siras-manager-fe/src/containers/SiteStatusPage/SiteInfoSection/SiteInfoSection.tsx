import React from 'react';
import Tile from '../../../components/Tile/Tile';

type SiteInfoSectionProps = {
  companyNameChin: string,
  sirasIds: string[],
  capacity: number,
  area: number,
};

function SiteInfoSection({
  companyNameChin, sirasIds, capacity, area,
}: SiteInfoSectionProps) {
  return (
    <div className="o-page-subcontainer">
      <div className="o-page-subcontainer__header">
        <p className="c-page-subcontainer-title">基本資料</p>
        <p className="c-page-subcontainer-option">看更多</p>
      </div>
      <div className="container" style={{ padding: '0', margin: '0' }}>
        <div className="row" style={{ width: '100%', margin: '0' }}>
          <Tile
            title="公司"
            value={companyNameChin}
          />
          <Tile
            title="SiRAS"
            value={sirasIds.length}
            metaText="U"
          />
          <Tile
            title="數量"
            value={capacity}
            metaText="尾"
          />
          <Tile
            title="面積"
            value={area}
            metaText="公頃"
          />
        </div>
      </div>
    </div>
  );
}

export default SiteInfoSection;
