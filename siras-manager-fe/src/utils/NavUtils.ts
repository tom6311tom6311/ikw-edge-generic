import { Params } from 'react-router-dom';
import { GetNavHierarchyQuery } from '../commonApis/GetNavHierarchyQuery.graphql.generated';

const renderMenuContent = (
  urlParams: Params<string>,
  navHierarchy: GetNavHierarchyQuery['sites'],
  logout: () => void,
) => {
  const { siteId, sirasId } = urlParams;
  if (sirasId && siteId) {
    const sirasIds = navHierarchy.find(({ siteId: stId }) => (stId === siteId))?.sirasIds || [];
    const sirasItems = sirasIds
      .map((srId) => ({
        level: 1,
        text: srId,
        link: `/site/${siteId}/sirases/${srId}/`,
      }));
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
      ...sirasItems,
      {
        level: 0,
        text: '登出',
        onClick: logout,
      },
    ];
  }

  if (siteId) {
    const siteIds = navHierarchy.map(({ siteId: stId }) => stId) || [];
    const siteItems = siteIds
      .map((stId) => ({
        level: 1,
        text: stId,
        link: `/site/${stId}/`,
      }));
    return [
      {
        level: 0,
        text: '案場',
        link: '/',
      },
      ...siteItems,
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
