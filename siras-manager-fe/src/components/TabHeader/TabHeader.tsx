import React from 'react';
import { Link } from 'react-router-dom';
import SearchImg from '../../img/search.png';
import MoreInfoImg from '../../img/moreInfo_black.png';

type TabHeaderElement = {
  text: string;
  link: string;
}

type TabHeaderProps = {
  title: string;
  currActiveIdx: number;
  elements: TabHeaderElement[];
};

function TabHeader({ title, currActiveIdx, elements }:TabHeaderProps) {
  return (
    <div className="siteManage_Header_container">
      <div>
        <p className="siteManage_Header_siteId">{title}</p>
        <img className="siteManage_Header_search_icon" src={SearchImg} alt="searching" />
      </div>
      <div>
        {elements.map(({ text, link }, idx) => (
          <Link
            to={link}
            key={text}
            className={`siteManage_bookmark ${idx === currActiveIdx ? 'siteManage_bookmark_on' : ''}`}
          >
            {text}
          </Link>
        ))}
        <img className="siteManage_Header_moreInfo_icon" src={MoreInfoImg} alt="more info" />
      </div>
    </div>
  );
}

export default TabHeader;
