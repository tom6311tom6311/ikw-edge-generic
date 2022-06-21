import * as React from 'react';
import { useParams } from 'react-router-dom';
import TabHeader from '../TabHeader/TabHeader';
import cameraSample from '../../img/camera_sample.png';

export interface ICameraOverviewProps {
}

export default function CameraOverview() {
  const { siteId } = useParams();

  return (
    <div className="o-sitecamera">
      <TabHeader
        title={'cameraID/location' || '/'}
        currActiveIdx={0}
        elements={[
          { text: '即時畫面', link: `/site/${siteId || ''}/camera/cameraId` },
        ]}
      />
      <div className="c-page-divider" />
      <div className="o-sitecamera__view">
        <img src={cameraSample} alt="realtime camera view" className="c-sitecamera-img" />
      </div>
    </div>
  );
}
