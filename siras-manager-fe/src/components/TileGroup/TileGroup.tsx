import * as React from 'react';

type ITileGroupProps = {
  title: String;
  sectionData: {[key: string]: string};
}

export default function TileGroup(props: ITileGroupProps) {
  const {
    title,
    sectionData,
  } = props;
  return (
    <div className="container o-siteinfo-section">
      <p>{title}</p>
      <div className="row">
        {
          Object.entries(sectionData).map(([key, value]) => (
            <div className="col-lg-6" style={{ padding: '0' }}>
              <div className="o-siteinfo-section-item">
                <p className="o-siteinfo-section-key">{key}</p>
                <p className="o-siteinfo-section-value">{value}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
