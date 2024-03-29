import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReportImg from '../../img/report.png';
import TabHeader from '../../components/TabHeader/TabHeader';

function SirasFeedingReportListPage() {
  const { siteId, sirasId } = useParams();

  return (
    <div className="o-page-container">
      <TabHeader
        title={sirasId || '/'}
        breadcrumbText={`案場 ${siteId} /`}
        currActiveIdx={1}
        elements={[
          { text: 'SiRAS狀態', link: `/site/${siteId || ''}/siras/${sirasId || ''}` },
          { text: '餵食紀錄', link: `/site/${siteId || ''}/siras/${sirasId || ''}/reports/feeding` },
          { text: '魚病檢測', link: `/site/${siteId || ''}/siras/${sirasId || ''}/reports/health` },
        ]}
      />
      <div className="c-page-divider" />
      <div className="o-page-container__body">
        <div className="o-page-subcontainer">
          <div>
            <div className="o-page-subcontainer-basicitem report-list-empty">
              <div className="report-list-empty-note">
                <img src={ReportImg} alt="no report" />
                <div className="report-list-empty-note-text">今日尚無餵食紀錄</div>
                <Link to={`/site/${siteId || ''}/siras/${sirasId || ''}/reports/feeding/create`}><button className="button-primary" type="button">開始投餵</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SirasFeedingReportListPage;
