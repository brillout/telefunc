import React from "react";
import "./Header.css";
import iconTelefunc from "../../icons/telefunc.svg";

export { Header };

function Header() {
  return (
    <div
      style={{
        //*
        display: "flex",
        alignItems: "center",
        //*/
      }}
    >
      <div id="header">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
}

function LeftSide() {
  return (
    <div id="header-left-side">
      <div
        id="header-logo"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={iconTelefunc} />
        <h1>Telefunc</h1>
      </div>
    </div>
  );
}

function RightSide() {
  return (
    <div id="header-right-side" style={{ marginLeft: 60, fontSize: "2em" }}>
      Remote Functions.
      <br />
      Instead of API.
    </div>
  );
}
