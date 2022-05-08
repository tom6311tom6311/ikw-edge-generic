import React from 'react';

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
    <div className="sitemanage_body_subcontainer">
      <div className="sitemanage_body_item_header">
        <p className="sitemanage_body_title">基本資料</p>
        <p className="sitemanage_body_option">看更多</p>
      </div>
      <div className="container" style={{ padding: '0', margin: '0' }}>
        <div className="row" style={{ width: '100%', margin: '0' }}>
          <div className="col-sm-6 col-xl-4" style={{ padding: '0' }}>
            <div className="sitemanage_body_basicitem">
              <p className="sitemanage_body_item_name">公司</p>
              <div className="sitemanage_body_item_container">
                <p className="sitemanage_body_item_company">
                  {companyNameChin}
                </p>
                <p
                  className="sitemanage_body_item_unit"
                  style={{ borderColor: 'white' }}
                />
              </div>
            </div>
          </div>
          <div
            className="col-sm-6 col-xl-4"
            style={{ padding: '0', margin: '0' }}
          >
            <div className="sitemanage_body_basicitem">
              <p className="sitemanage_body_item_name">SiRAS</p>
              <div className="sitemanage_body_item_container">
                <p className="sitemanage_body_item_info">{sirasIds.length}</p>
                <p className="sitemanage_body_item_unit">U</p>
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
              <p className="sitemanage_body_item_name">面積</p>
              <div className="sitemanage_body_item_container">
                <p className="sitemanage_body_item_info">
                  {area}
                </p>
                <p className="sitemanage_body_item_unit">公頃</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiteInfoSection;
