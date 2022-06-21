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
    <div className="o-tabheader">
      <div>
        <Breadcrumb />
        <p className="c-tabheader-title">{title}</p>
        {/* <img className="c-tabheader-icon" src={SearchImg} alt="searching" /> */}
      </div>
      <div>
        {elements.map(({ text, link }, idx) => (
          <Link
            to={link}
            key={text}
            className={`${idx === currActiveIdx ? 'is-bookmark-on' : ''} o-page-bookmark`}
          >
            {text}
          </Link>
        ))}
        <img className="c-moreinfo-icon" src={MoreInfoImg} alt="more info" />
      </div>
    </div>
  );
}

export default TabHeader;
