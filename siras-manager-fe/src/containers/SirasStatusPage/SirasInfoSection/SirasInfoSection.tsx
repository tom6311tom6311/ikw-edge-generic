import React from 'react';

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
          <div className="col-sm-6 col-xl-4" style={{ padding: '0' }}>
            <div className="o-page-subcontainer-basicitem">
              <p className="c-page-basicitem-name">魚種</p>
              <div className="sitemanage_body_item_container">
                <p className="c-page-basicitem-company">
                  {speciesList.join(', ')}
                </p>
                <p
                  className="c-page-basicitem-unit"
                  style={{ borderColor: 'white' }}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-4" style={{ padding: '0' }}>
            <div className="o-page-subcontainer-basicitem">
              <p className="c-page-basicitem-name">數量</p>
              <div className="sitemanage_body_item_container">
                <p className="c-page-basicitem-info">
                  {capacity}
                </p>
                <p className="c-page-basicitem-unit">尾</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-4" style={{ padding: '0' }}>
            <div className="o-page-subcontainer-basicitem">
              <p className="c-page-basicitem-name">狀態</p>
              <div className="sitemanage_body_item_container">
                <p className="c-page-basicitem-company">
                  {status}
                </p>
                <p
                  className="c-page-basicitem-unit"
                  style={{ borderColor: 'white' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SirasInfoSection;
