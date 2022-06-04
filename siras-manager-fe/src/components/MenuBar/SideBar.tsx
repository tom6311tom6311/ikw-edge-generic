import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../../img/logo_h.png';

type MenuContentItem = {
  level: number;
  text: string;
  link?: string;
  onClick?: () => void;
}

type SideBarProps = {
  menuContent: MenuContentItem[];
}

const renderTextComponent = (level: number, text: string) => (
  <p className="sidebar_item_p" style={{ paddingLeft: `${level * 20}px` }}>{text}</p>
);

function SideBar(props: SideBarProps) {
  const { menuContent } = props;
  return (
    <div className="sidebar_wrapper">
      <div className="sidebar_container">
        <div className="sidebar_header">
          <img src={LogoImg} alt="logo" className="sidebar_logo" />
        </div>

        {menuContent.map(({
          level, text, link, onClick,
        }) => {
          if (onClick) {
            return (
              <button type="button" key={text} className="sidebar_item_container" onClick={onClick}>
                {renderTextComponent(level, text)}
              </button>
            );
          }
          return (
            <div key={text} className="sidebar_item_container">
              <Link to={link || '/'}>
                {renderTextComponent(level, text)}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
