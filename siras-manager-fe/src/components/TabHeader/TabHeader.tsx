import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

type TabHeaderElement = {
  text: string;
  link: string;
}

type TabHeaderProps = {
  title: string;
  breadcrumbText?: React.ReactNode;
  currActiveIdx: number;
  elements: TabHeaderElement[];
  topRightTrigger?: React.ReactNode;
};

function TabHeader({
  title, breadcrumbText, currActiveIdx, elements, topRightTrigger,
}:TabHeaderProps) {
  return (
    <div className="o-tabheader">
      <div>
        <Breadcrumb>
          {breadcrumbText}
        </Breadcrumb>
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
        {topRightTrigger}
      </div>
    </div>
  );
}

TabHeader.defaultProps = {
  breadcrumbText: '',
  topRightTrigger: '',
};

export default TabHeader;
