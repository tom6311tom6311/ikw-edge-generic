import * as React from 'react';

export type TileProps = {
  title: string;
  value: string|number;
  metaText?: string;
  liveTileStatus?: string;
}

export default function Tile({
  title, value, metaText, liveTileStatus,
}: TileProps) {
  return (
    <div
      key={title}
      className="col-sm-6 col-xl-4 o-page-subcontainer-basicitem-wrapper"
    >
      <div className="o-page-subcontainer-basicitem">
        <div
          style={{
            width: 'calc(100% - 40px)',
            display: 'flex',
            margin: '10px 20px',
          }}
        >
          {liveTileStatus ? '' : (
            <div className={`c-page-paralight--${liveTileStatus}`} />
          )}
          <p className="c-page-basicitem-name">
            {title}
          </p>
        </div>
        <div className="o-basicitem__livedata">
          <p className="c-livedata__text">
            {value}
          </p>
          {metaText ? (
            <p className="c-livedata__info">
              {metaText}
            </p>
          ) : ''}
        </div>
      </div>
    </div>
  );
}

Tile.defaultProps = {
  metaText: '',
  liveTileStatus: '',
};
