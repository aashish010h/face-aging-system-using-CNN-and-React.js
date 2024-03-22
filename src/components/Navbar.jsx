import React from "react";
import { Menubar } from "primereact/menubar";
const Navbar = () => {
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      url: "/",
    },
    {
      label: "Examples",
      icon: "pi pi-star",
      to: "/examples",
    },
    {
      label: "Contact",
      icon: "pi pi-envelope",
    },
  ];
  return (
    <>
      <div className="container">
        <Menubar model={items} />
      </div>
    </>
  );
};

export default Navbar;
