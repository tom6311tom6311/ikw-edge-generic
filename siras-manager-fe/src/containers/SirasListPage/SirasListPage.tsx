import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import nextPageIcon from '../../img/nextPage.png';
import TabHeader from '../../components/TabHeader/TabHeader';

const SAMPLE_SIRAS_LIST = [
  {
    sirasId: 'B123456781',
    species: '赤鰭笛鯛',
    amount: 999,
    status: '養殖中',
  },
  {
    sirasId: 'B123456782',
    species: '斑點石鯛',
    amount: 999,
    status: '養殖中',
  },
  {
    sirasId: 'B123456783',
    species: '赤鰭笛鯛',
    amount: 999,
    status: '養殖中',
  },
  {
    sirasId: 'B123456784',
    species: '斑點石鯛',
    amount: 999,
    status: '養殖中',
  },
  {
    sirasId: 'B123456785',
    species: null,
    amount: null,
    status: null,
  },
  {
    sirasId: 'B123456786',
    species: '黑毛',
    amount: 999,
    status: '換池中',
  },
  {
    sirasId: 'B123456787',
    species: '赤鰭笛鯛',
    amount: 999,
    status: '養殖中',
  },
  {
    sirasId: 'B123456788',
    species: '赤鰭笛鯛',
    amount: 999,
    status: '養殖中',
  },
  {
    sirasId: 'B123456789',
    species: '赤鰭笛鯛',
    amount: 999,
    status: '養殖中',
  },
  {
    sirasId: 'B123456790',
    species: '赤鰭笛鯛',
    amount: 999,
    status: '養殖中',
  },
];

function SiteManagementPage() {
  const { siteId } = useParams();
  const [currPageIdx, setCurrPageIdx] = useState<Number>(0);

  return (
    <div className="siteManage_container">
      <TabHeader
        title={siteId || '/'}
        currActiveIdx={1}
        elements={[
          { text: '案場狀態', link: `/site/${siteId || ''}` },
          { text: 'SiRAS列表', link: `/site/${siteId || ''}/siras` },
        ]}
      />
      <div className="siteManage_divider" />
      <div className='siteManage_body_container"'>
        <div className="siteManage_SiRAS_table_container">
          <div className="siteManage_SiRAS_table_header">
            <p className="siteManage_SiRAS_table_header_txt" style={{ marginLeft: '15px' }}>SiRAS(30)</p>
            <p className="siteManage_SiRAS_table_header_txt">魚種</p>
            <p className="siteManage_SiRAS_table_header_txt" style={{ flex: 0.7 }}>數量</p>
            <p className="siteManage_SiRAS_table_header_txt">養殖狀況</p>
          </div>
          {
            SAMPLE_SIRAS_LIST.map(({
              sirasId, species, amount, status,
            }) => (
              <div key={sirasId} className="siteManage_SiRAS_table_bodyrow">
                <p className="siteManage_SiRAS_table_bodyrow_SiRAS" style={{ marginLeft: '15px' }}>{sirasId}</p>
                <p className="siteManage_SiRAS_table_bodyrow_info">{species}</p>
                <p className="siteManage_SiRAS_table_bodyrow_info" style={{ flex: 0.7 }}>{amount !== null ? `${amount}尾` : ''}</p>
                <p className="siteManage_SiRAS_table_bodyrow_info">{status}</p>
              </div>
            ))
          }
        </div>
        <div className="siteManage_SiRAS_PageList_container">
          <div className="siteManage_SiRAS_page_container">
            {Array.from(Array(3).keys()).map((pageIdx) => (
              <button key={pageIdx} type="button" onClick={() => { setCurrPageIdx(pageIdx); }}>
                <p className={currPageIdx === pageIdx ? 'siteManage_SiRAS_page_on' : 'siteManage_SiRAS_page_off'}>{pageIdx + 1}</p>
              </button>
            ))}
            <div className="siteManage_SiRAS_Nextpage_button"><img style={{ width: '11px', margin: '8px 13px 8px 16px' }} src={nextPageIcon} alt="nextPage" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiteManagementPage;
