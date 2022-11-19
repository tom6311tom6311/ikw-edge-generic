/* eslint-disable react/no-array-index-key */
import React from 'react';

type DropdownProps = {
  isOpen: boolean;
  trigger: React.ReactNode;
  menu: React.ReactNode[];
};

function Dropdown({ isOpen, trigger, menu }: DropdownProps) {
  return (
    <div className="dropdown">
      {trigger}
      {isOpen ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">{menuItem}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default Dropdown;
