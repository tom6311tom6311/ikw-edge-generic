import React from 'react';
import { useParams } from 'react-router-dom';
import TabHeader from '../../components/TabHeader/TabHeader';

function SirasFeedingReportCreatePage() {
  const { siteId, sirasId } = useParams();

  return (
    <div className="o-page-container">
      <TabHeader
        title="新增報表"
        breadcrumbText="飼料投餵記錄表 /"
        currActiveIdx={0}
        elements={[
          { text: '投餵資訊', link: `/site/${siteId || ''}/siras/${sirasId || ''}/reports/feeding/create` },
          { text: '投餵紀錄', link: '#' },
        ]}
      />
      <div className="c-page-divider" />
      <div className="o-page-container__body">
        <div className="o-page-subcontainer">
          <form className="report-create-form">
            <div className="report-create-form-section">
              <p className="report-create-form-section-title">
                投餵日期
                <span className="form-input-required">*</span>
              </p>
              <p>
                <input type="date" />
              </p>
            </div>
            <div className="report-create-form-section">
              <p className="report-create-form-section-title">
                魚塭序號
                <span className="form-input-required">*</span>
              </p>
              <p>
                <input type="text" disabled value={sirasId} />
              </p>
            </div>
            <div className="report-create-form-section">
              <p className="report-create-form-section-title">
                飼料種類代碼
                <span className="form-input-required">*</span>
              </p>
              <p>
                <select>
                  <option>選擇飼料種類</option>
                </select>
              </p>
            </div>
            <div className="report-create-form-section">
              <p className="report-create-form-section-title">
                飼料進貨日期
                <span className="form-input-required">*</span>
              </p>
              <p>
                <input type="date" />
              </p>
            </div>
            <div className="report-create-form-section">
              <p className="report-create-form-section-title">
                添加物代碼
                <span className="form-input-required">*</span>
              </p>
              <p>
                <input type="text" disabled value="系統帶入" />
              </p>
            </div>
            <div className="report-create-form-section">
              <p className="report-create-form-section-title">
                添加物批號
                <span className="form-input-required">*</span>
              </p>
              <p>
                <input type="text" disabled value="系統帶入" />
              </p>
            </div>
            <div className="report-create-form-section">
              <p className="report-create-form-section-title">
                添加物進貨日期
                <span className="form-input-required">*</span>
              </p>
              <p>
                <input type="text" disabled value="系統帶入" />
              </p>
            </div>
            <div className="report-create-form-section">
              <p className="report-create-form-section-title">
                備註
              </p>
              <p>
                <input type="text" />
              </p>
            </div>
            <div className="report-create-form-section align-right">
              <button className="button-primary" type="button">儲存</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SirasFeedingReportCreatePage;
