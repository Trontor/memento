import React from "react";
import { NavBar, HamburgerMenu, ModalBackground } from "./HamburgerStyles";

/**
 * The Hamburger toggles the visibility of the sidebar onClick.
 */
export default function Hamburger({ toggleSidebar, sidebarOpen }) {
  return (
    <>
      {sidebarOpen && (
        //A modal background appears when the sidebar is visible
        //The user can click on the modal to collapse the sidebar
        <ModalBackground onClick={toggleSidebar} />
      )}
      <NavBar>
        <HamburgerMenu onClick={toggleSidebar} />
      </NavBar>
    </>
  );
}
