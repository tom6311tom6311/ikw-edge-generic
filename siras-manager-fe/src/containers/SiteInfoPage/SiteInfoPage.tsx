import React from 'react';
import { useParams } from 'react-router-dom';
import TabHeader from '../../components/TabHeader/TabHeader';
import TileSection from '../../components/TileSection/TileSection';

export default function SiteInfoPage() {
  const { siteId } = useParams();

  return (
    <div className="o-page-container">
      <TabHeader
        title="養殖場基本資料表"
        breadcrumbText=""
        currActiveIdx={0}
        elements={[
          { text: '詳細資訊', link: `/site/${siteId || ''}/info` },
        ]}
      />
      <div className="c-page-divider" />
      <div className="o-page-container__body">
        <TileSection
          title="養殖場/公司名稱"
          tiles={[
            {
              title: '中文',
              value: '愛諾華特科技股份有限公司',
            },
            {
              title: '英文',
              value: 'I Know Water Tech. Ltd,Co.',
            },
            {
              title: '養殖漁業登記證／漁業權編號',
              value: 'ABCDE1234567890',
            },
          ]}
        />
        <TileSection
          title="負責人姓名"
          tiles={[
            {
              title: '中文',
              value: '愛諾華特科技股份有限公司',
            },
            {
              title: '英文',
              value: 'I Know Water Tech. Ltd,Co.',
            },
          ]}
        />
        <TileSection
          title="場址"
          tiles={[
            {
              title: '中文',
              value: '新北市三重區重新路四段89號7F',
            },
            {
              title: '英文',
              value: '7F., No. 89, Sec. 4, Chongxin Rd., Sanchong Dist., New Taipei City , Taiwan (R.O.C.)',
            },
          ]}
        />
      </div>
    </div>
  );
}
