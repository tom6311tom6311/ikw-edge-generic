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
    <div className="sitemanage_body_subcontainer">
      <div className="sitemanage_body_item_header">
        <p className="sitemanage_body_title">基本資料</p>
        <p className="sitemanage_body_option">看更多</p>
      </div>
      <div className="container" style={{ padding: '0', margin: '0' }}>
        <div className="row" style={{ width: '100%', margin: '0' }}>
          <div className="col-sm-6 col-xl-4" style={{ padding: '0' }}>
            <div className="sitemanage_body_basicitem">
              <p className="sitemanage_body_item_name">魚種</p>
              <div className="sitemanage_body_item_container">
                <p className="sitemanage_body_item_company">
                  {speciesList.join(', ')}
                </p>
                <p
                  className="sitemanage_body_item_unit"
                  style={{ borderColor: 'white' }}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-4" style={{ padding: '0' }}>
            <div className="sitemanage_body_basicitem">
              <p className="sitemanage_body_item_name">數量</p>
              <div className="sitemanage_body_item_container">
                <p className="sitemanage_body_item_info">
                  {capacity}
                </p>
                <p className="sitemanage_body_item_unit">尾</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-4" style={{ padding: '0' }}>
            <div className="sitemanage_body_basicitem">
              <p className="sitemanage_body_item_name">狀態</p>
              <div className="sitemanage_body_item_container">
                <p className="sitemanage_body_item_company">
                  {status}
                </p>
                <p
                  className="sitemanage_body_item_unit"
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
