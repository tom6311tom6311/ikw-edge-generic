import * as React from 'react';
import Tile, { TileProps } from '../Tile/Tile';

type TileSectionProps = {
  title: String;
  topRightTrigger?: React.ReactNode;
  tiles: TileProps[];
}

export default function TileSection(props: TileSectionProps) {
  const {
    title,
    topRightTrigger,
    tiles,
  } = props;
  return (
    <div className="container o-siteinfo-section">
      <p>{title}</p>
      {topRightTrigger}
      <div className="row">
        {
          tiles.map(({
            title: tileTitle, value, metaText, liveTileStatus,
          }) => (
            <Tile
              key={tileTitle}
              title={tileTitle}
              value={value}
              metaText={metaText}
              liveTileStatus={liveTileStatus}
            />
          ))
        }
      </div>
    </div>
  );
}

TileSection.defaultProps = {
  topRightTrigger: '',
};
