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
    <div className="sitemanage_header_container">
      <div>
        <p className="sitemanage_header_siteid">{title}</p>
        <img className="sitemanage_header_search_icon" src={SearchImg} alt="searching" />
      </div>
      <div>
        {elements.map(({ text, link }, idx) => (
          <Link
            to={link}
            key={text}
            className={`sitemanage_bookmark ${idx === currActiveIdx ? 'sitemanage_bookmark_on' : ''}`}
          >
            {text}
          </Link>
        ))}
        <img className="sitemanage_header_moreinfo_icon" src={MoreInfoImg} alt="more info" />
      </div>
    </div>
  );
}

export default TabHeader;
