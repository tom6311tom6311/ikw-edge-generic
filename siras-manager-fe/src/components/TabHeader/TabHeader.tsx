import React from 'react';
import { Link } from 'react-router-dom';
// import SearchImg from '../../img/search.png';
import MoreInfoImg from '../../img/moreInfo_black.png';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

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
    <div className="tabheader_container">
      <div>
        <Breadcrumb />
        <p className="tabheader_title">{title}</p>
        {/* <img className="sitemanage_header_search_icon" src={SearchImg} alt="searching" /> */}
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
