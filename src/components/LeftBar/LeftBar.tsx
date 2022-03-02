import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./leftBar.scss";
import { ImUsers } from "react-icons/im";
import { AiFillHome } from "react-icons/ai";
import { useAppDispatch } from "../../app/hooks";
import { getDepartment, getEmployee } from "../../features";

export const LeftBar = () => {
  const { pathname } = useLocation();

  const GroupLink = [
    {
      path: "/",
      name: "Home",
      active: pathname === "/",
      // active: true,
      icon: <AiFillHome />,
    },
    {
      path: "/dash-board",
      name: "Dashboard",
      active: pathname === "/dash-board",
      // active: false,
      icon: <ImUsers />,
    },
  ];
  const [groupLink, setGroupLink] = useState(GroupLink);

  const dispatch = useAppDispatch();
  const handleActiveLink = (index: number) => {
    if (index === 1) {
      dispatch(getDepartment());
      dispatch(getEmployee());
    }
    setGroupLink((prev) =>
      prev.map((l, i) => ({
        ...l,
        active: i === index,
      }))
    );
  };

  const renderLinkByGroup = [...groupLink].map((link, index) => (
    <Link
      to={link.path}
      key={index}
      className={`link-item ${link.active ? "active" : ""}`}
      onClick={() => handleActiveLink(index)}
    >
      {link.icon}
      <p>{link.name}</p>
    </Link>
  ));
  return (
    <div className="left-bar">
      <div className="left-bar-container">
        <div className="left-bar-container-group">{renderLinkByGroup}</div>
      </div>
    </div>
  );
};
