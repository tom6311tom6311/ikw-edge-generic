import React from 'react';
import { useParams } from 'react-router-dom';
import TabHeader from '../../components/TabHeader/TabHeader';
import TileGroup from '../../components/TileGroup/TileGroup';

const sampleData = {
  '養殖場/公司名稱': {
    中文: '艾諾華特',
    英文: 'I know water',
    '養殖漁業登記證/漁業權編號': 'ABCDE123456',
  },
  負責人姓名: {
    中文: '艾諾華特',
    英文: 'I know water',
  },
  場址: {
    中文: '新北市三重區',
    英文: 'New Taipei City',
  },
};

export default function SiteInfoPage() {
  const { siteId } = useParams();

  return (
    <div className="o-page-container">
      <TabHeader
        title="養殖場基本資料表"
        currActiveIdx={0}
        elements={[
          { text: '詳細資訊', link: `/site/${siteId || ''}/info` },
        ]}
      />
      <div className="c-page-divider" />
      <div className="o-page-container__body">
        {
          Object.entries(sampleData).map(([key, value]) => (
            <TileGroup title={key} sectionData={value} />
          ))
        }
      </div>
    </div>
  );
}
