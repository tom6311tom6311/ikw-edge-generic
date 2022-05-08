import React from 'react';
import { Link, useParams } from 'react-router-dom';
// import nextPageIcon from '../../img/nextPage.png';
// import lastPageIcon from '../../img/lastPage.png';
import TabHeader from '../../components/TabHeader/TabHeader';
import { useGetSirasesQuery } from './GetSirasesQuery.graphql.generated';
import { useGetSirasIdsQuery } from './GetSirasIdsQuery.graphql.generated';
import { SirasStatus } from '../../types';

function SirasListPage() {
  const { siteId } = useParams();

  const { loading: isGetSirasIdsLoading, error: getSirasIdsError, data: getSirasIdsData } = useGetSirasIdsQuery({ variables: { siteId: siteId || '' } });
  const isGetSirasIdsReady = !(
    isGetSirasIdsLoading || getSirasIdsError || !getSirasIdsData?.site?.sirasIds
  );
  const { data: getSirasesData } = useGetSirasesQuery({
    skip: !isGetSirasIdsReady,
    variables: { sirasIds: getSirasIdsData?.site?.sirasIds || [] },
  });

  return (
    <div className="sitemanage_container">
      <TabHeader
        title={siteId || '/'}
        currActiveIdx={1}
        elements={[
          { text: '案場狀態', link: `/site/${siteId || ''}` },
          { text: 'SiRAS列表', link: `/site/${siteId || ''}/sirases` },
        ]}
      />
      <div className="sitemanage_divider" />
      <div className='sitemanage_body_container"'>
        <div className="container sitemanage_siras_table_container">
          <div className="row sitemanage_siras_table_header">
            <p className="col-4 sitemanage_siras_table_header_txt">{`SiRAS(${getSirasIdsData?.site?.sirasIds.length})`}</p>
            <p className="col-3 sitemanage_siras_table_header_txt">魚種</p>
            <p className="col-3 sitemanage_siras_table_header_txt">數量</p>
            <p className="col-2 sitemanage_siras_table_header_txt">養殖狀況</p>
          </div>
          <div style={{
            border: 'solid #D9D7D4', borderWidth: '1px 0 0 0', width: '100%', minWidth: '496px', height: '1px',
          }}
          />
          {
            getSirasesData?.sirases.map(({
              sirasId, status, capacity, speciesList,
            }, index) => (
              <div key={sirasId} className="row sitemanage_siras_table_bodyrow" style={index % 2 === 0 ? { background: 'rgba(46, 48, 51, 0.05)' } : {}}>
                <p className="col-4 sitemanage_siras_table_bodyrow_siras"><Link to={`/site/${siteId || ''}/siras/${sirasId}`}>{sirasId}</Link></p>
                <p className="col-3 sitemanage_siras_table_bodyrow_info">{speciesList.join(', ')}</p>
                <p className="col-3 sitemanage_siras_table_bodyrow_info">{capacity ? `${capacity}尾` : ''}</p>
                <p className="col-2 sitemanage_siras_table_bodyrow_info">{status === SirasStatus.Active ? '養殖中' : '換池中'}</p>
              </div>
            ))
          }
        </div>
        {/* <div className="sitemanage_siras_pagelist_container">
          <div className="sitemanage_siras_page_container">
            <div className="sitemanage_siras_nextpage_button" style={{ marginRight: '20px' }}>
              <img
                src={lastPageIcon}
                alt="nextPage"
                style={{ width: '11px', margin: '8px 13px 8px 16px' }} />
            </div>
            {Array.from(Array(3).keys()).map((pageIdx) => (
              <button key={pageIdx} type="button" onClick={() => { setCurrPageIdx(pageIdx); }}>
                <p
                  className={
                    currPageIdx === pageIdx
                      ? 'sitemanage_siras_page_on'
                      : 'sitemanage_siras_page_off'
                  }
                >
                  {pageIdx + 1}
                </p>
              </button>
            ))}
            <div className="sitemanage_siras_nextpage_button" style={{ marginLeft: '20px' }}>
              <img
                src={nextPageIcon}
                alt="nextPage"
                style={{ width: '11px', margin: '8px 13px 8px 16px' }}
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default SirasListPage;
