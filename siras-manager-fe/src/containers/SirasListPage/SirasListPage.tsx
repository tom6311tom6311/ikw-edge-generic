import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import nextPageIcon from '../../img/nextPage.png';
import lastPageIcon from '../../img/lastPage.png';
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
    <div className="sitemanage_container">
      <TabHeader
        title={siteId || '/'}
        currActiveIdx={1}
        elements={[
          { text: '案場狀態', link: `/site/${siteId || ''}` },
          { text: 'SiRAS列表', link: `/site/${siteId || ''}/siras` },
        ]}
      />
      <div className="sitemanage_divider" />
      <div className='sitemanage_body_container"'>
        <div className="container sitemanage_siras_table_container">
          <div className="row sitemanage_siras_table_header">
            <p className="col-4 sitemanage_siras_table_header_txt">SiRAS(30)</p>
            <p className="col-3 sitemanage_siras_table_header_txt">魚種</p>
            <p className="col-3 sitemanage_siras_table_header_txt">數量</p>
            <p className="col-2 sitemanage_siras_table_header_txt">養殖狀況</p>
          </div>
          <div style={{
            border: 'solid #D9D7D4', borderWidth: '1px 0 0 0', width: '100%', minWidth: '496px', height: '1px',
          }}
          />
          {
            SAMPLE_SIRAS_LIST.map(({
              sirasId, species, amount, status,
            }, index) => (
              <div key={sirasId} className="row sitemanage_siras_table_bodyrow" style={index % 2 === 0 ? { background: 'rgba(46, 48, 51, 0.05)' } : {}}>
                <p className="col-4 sitemanage_siras_table_bodyrow_siras">{sirasId}</p>
                <p className="col-3 sitemanage_siras_table_bodyrow_info">{species}</p>
                <p className="col-3 sitemanage_siras_table_bodyrow_info">{amount !== null ? `${amount}尾` : ''}</p>
                <p className="col-2 sitemanage_siras_table_bodyrow_info">{status}</p>
              </div>
            ))
          }
        </div>
        <div className="sitemanage_siras_pagelist_container">
          <div className="sitemanage_siras_page_container">
            <div className="sitemanage_siras_nextpage_button" style={{ marginRight: '20px' }}><img style={{ width: '11px', margin: '8px 13px 8px 16px' }} src={lastPageIcon} alt="nextPage" /></div>
            {Array.from(Array(3).keys()).map((pageIdx) => (
              <button key={pageIdx} type="button" onClick={() => { setCurrPageIdx(pageIdx); }}>
                <p className={currPageIdx === pageIdx ? 'sitemanage_siras_page_on' : 'sitemanage_siras_page_off'}>{pageIdx + 1}</p>
              </button>
            ))}
            <div className="sitemanage_siras_nextpage_button" style={{ marginLeft: '20px' }}><img style={{ width: '11px', margin: '8px 13px 8px 16px' }} src={nextPageIcon} alt="nextPage" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiteManagementPage;
