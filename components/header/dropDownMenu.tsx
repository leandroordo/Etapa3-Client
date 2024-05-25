import React, { useState } from "react";
import Link from "next/link";

import { MenuItem } from "./menuItem";

interface Props {
  item: MenuItem;
}

export default function Dropdown(props: Props) {
  const { item } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuItems = item?.children ? item.children : [];

  const toggle = () => {
    setIsOpen((old) => !old);
  };

  const transClass = isOpen ? "show" : "";

  return (
    <>
      <div className="navbar__item">
        <button
          className="navitem__link dropdown__arrow dropdown"
          onClick={toggle}
        >
          {item.title}
        </button>
        <div className={`dropdown__menu ${transClass}`}>
          {menuItems.map((item) => (
            <Link
              key={item.route}
              className="dropdown__item navitem__link"
              href={item?.route || ""}
              onClick={toggle}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      {isOpen ? <div id="backgroundOverlay" onClick={toggle}></div> : <></>}
    </>
  );
}
