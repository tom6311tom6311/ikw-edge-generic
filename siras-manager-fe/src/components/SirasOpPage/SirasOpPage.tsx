import * as React from 'react';
import { useParams } from 'react-router-dom';
import TabHeader from '../TabHeader/TabHeader';

const sampleProps = {
  title: '污水系統',
  isOpRunning: true,
};

export default function SirasOpPage() {
  const { siteId } = useParams();
  return (
    <div className="o-page-container">
      <TabHeader
        title={sampleProps.title}
        currActiveIdx={0}
        elements={[
          { text: '運作狀態', link: `/site/${siteId || ''}/op/opId` },
          { text: '預約定時', link: `/site/${siteId || ''}/op/opId` },
        ]}
      />
      <div className="c-page-divider" />
      <div className="o-page-container__body">
        <div className="o-op-item-container">
          <div className="o-page-subcontainer-basicitem">
            <p className="c-page-basicitem-name o-op-item-info" style={{ height: '30px' }}>運作狀態</p>
            <div className="sitemanage_body_item_container o-op-item-info" style={{ height: '40px', margin: '20px 30px 15px 30px' }}>
              <p className="o-op-item-status">
                {sampleProps.isOpRunning ? '裝置運作中' : '裝置未運作'}
              </p>
              <div className={sampleProps.isOpRunning ? 'c-op-item-button isOpRunning' : 'c-op-item-button'}>
                <p className="c-op-item-button__text">{sampleProps.isOpRunning ? '關閉裝置' : '啟動裝置'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
