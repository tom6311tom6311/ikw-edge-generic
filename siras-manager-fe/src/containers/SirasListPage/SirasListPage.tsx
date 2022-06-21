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
    <div className="o-page-container">
      <TabHeader
        title={siteId || '/'}
        currActiveIdx={1}
        elements={[
          { text: '案場狀態', link: `/site/${siteId || ''}` },
          { text: 'SiRAS列表', link: `/site/${siteId || ''}/sirases` },
        ]}
      />
      <div className="c-page-divider" />
      <div className="o-page-container__body">
        <div className="container o-siras-table">
          <div className="row o-siras-table__header">
            <p className="col-4 o-siras-table__header__text">{`SiRAS(${getSirasIdsData?.site?.sirasIds.length})`}</p>
            <p className="col-3 o-siras-table__header__text">魚種</p>
            <p className="col-3 o-siras-table__header__text">數量</p>
            <p className="col-2 o-siras-table__header__text">養殖狀況</p>
          </div>
          <div style={{
            border: 'solid #D9D7D4', borderWidth: '1px 0 0 0', width: '100%', minWidth: '496px', height: '1px',
          }}
          />
          {
            getSirasesData?.sirases.map(({
              sirasId, status, capacity, speciesList,
            }, index) => (
              <div key={sirasId} className="row o-siras-table-bodyrow" style={index % 2 === 0 ? { background: 'rgba(46, 48, 51, 0.05)' } : {}}>
                <p className="col-4 o-siras-table-bodyrow__siras"><Link to={`/site/${siteId || ''}/siras/${sirasId}`}>{sirasId}</Link></p>
                <p className="col-3 o-siras-table-bodyrow__info">{speciesList.join(', ')}</p>
                <p className="col-3 o-siras-table-bodyrow__info">{capacity ? `${capacity}尾` : ''}</p>
                <p className="col-2 o-siras-table-bodyrow__info">{status === SirasStatus.Active ? '養殖中' : '換池中'}</p>
              </div>
            ))
          }
        </div>
        {/* <div className="o-siras-pagelist">
          <div className="o-siras-pagelist__container">
            <div className="c-pagelist-nextpage-button" style={{ marginRight: '20px' }}>
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
                      ? 'is-siras-page-on'
                      : 'is-siras-page-off'
                  }
                >
                  {pageIdx + 1}
                </p>
              </button>
            ))}
            <div className="c-pagelist-nextpage-button" style={{ marginLeft: '20px' }}>
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
