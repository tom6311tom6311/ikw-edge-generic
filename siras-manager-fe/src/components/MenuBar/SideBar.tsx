import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../../img/logo_h.png';

export type MenuContentItem = {
  level: number;
  text: string;
  link?: string;
  onClick?: () => void;
}

type SideBarProps = {
  menuContent: MenuContentItem[];
}

const renderTextComponent = (level: number, text: string) => (
  <p className="o-sidebar-item__text" style={{ paddingLeft: `${level * 20}px` }}>{text}</p>
);

function SideBar(props: SideBarProps) {
  const { menuContent } = props;
  return (
    <div className="o-sidebar">
      <div className="o-sidebar__container">
        <div className="o-sidebar-header">
          <img src={LogoImg} alt="logo" className="c-sidebar-header__logo" />
        </div>

        {menuContent.map(({
          level, text, link, onClick,
        }) => {
          if (onClick) {
            return (
              <button type="button" key={text} className="o-sidebar-item" onClick={onClick}>
                {renderTextComponent(level, text)}
              </button>
            );
          }
          return (
            <div key={text} className="o-sidebar-item">
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
