import React from "react";
import { NavBar, HamburgerMenu, ModalBackground } from "./HamburgerStyles";

export default function Hamburger({toggleSidebar,  sidebarOpen}) {

  return (
    <>
      {sidebarOpen && (
        <ModalBackground onClick={toggleSidebar}/>
      )}
      <NavBar>
        <HamburgerMenu onClick={toggleSidebar}/>
      </NavBar>
    </>
  );
}
