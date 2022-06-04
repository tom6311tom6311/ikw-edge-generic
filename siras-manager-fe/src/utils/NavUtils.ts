import { Params } from 'react-router-dom';

const renderMenuContent = (urlParams: Params<string>, logout: () => void) => {
  const { siteId, sirasId } = urlParams;
  if (sirasId && siteId) {
    return [
      {
        level: 0,
        text: '回到案場',
        link: `/site/${siteId}/`,
      },
      {
        level: 0,
        text: 'SiRAS列表',
        link: `/site/${siteId}/sirases`,
      },
      {
        level: 1,
        text: sirasId,
        link: `/site/${siteId}/sirases/${sirasId}`,
      },
      {
        level: 0,
        text: '登出',
        onClick: logout,
      },
    ];
  }

  if (siteId) {
    return [
      {
        level: 0,
        text: '案場',
        link: '/',
      },
      {
        level: 1,
        text: siteId,
        link: `/site/${siteId}/`,
      },
      {
        level: 0,
        text: '登出',
        onClick: logout,
      },
    ];
  }

  return [
    {
      level: 0,
      text: '案場',
      link: '/',
    },
    {
      level: 0,
      text: '登出',
      onClick: logout,
    },
  ];
};

export default {
  renderMenuContent,
};
