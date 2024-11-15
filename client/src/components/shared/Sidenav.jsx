import React, { useState } from "react";
import { FaPowerOff } from "react-icons/fa6";
const SidebarButton = ({ id, active, onClick, label }) => {
  return (
    <div className="linemanager" style={{
      backgroundColor: active ? "rgb(200, 223, 208)" : "",
      color: active ? "#22c55e" : "rgb(159 156 156 )",
    }}>

      <button
        onClick={() => onClick(id)}
        style={{
          width: '100%',
          cursor: "pointer",
        }}
      >
        <h1>

          {label}
        </h1>
      </button>
    </div>
  );
};





const Sidenav = ({ activeForm, setActiveForm }) => {
  // const SidebarButton = ({ id, label }) => (
  //   <div className="linemanager" style={{
  //     // backgroundColor: activeForm ? "rgb(200, 223, 208)" : "#000",
  //     color: activeForm ? "#22c55e" : "rgb(159 156 156 )",
  //   }}> 
  //   <button
  //     onClick={() => setActiveForm(id)}
  //     style={{
  //       width: '100%',
  //       cursor: "pointer",
  //     }}
  //   >
  //     {label}
  //   </button>
  //   </div>
  // );
  const SidebarButton = ({ id, active, onClick, label }) => {
    return (
      <div className="linemanager" style={{
        backgroundColor: active ? "rgb(200, 223, 208)" : "",
        color: active ? "#22c55e" : "rgb(159 156 156 )",
      }}>
  
        <button
          onClick={() => setActiveForm(id)}
          style={{
            width: '100%',
            cursor: "pointer",
          }}
        >
          <h1>
  
            {label}
          </h1>
        </button>
      </div>
    );
  };
  // const [activeForm, setActiveForm] = useState(1);
  return (
    <div className="innersidenav">
      <div className="uppernav">
      <SidebarButton id={1} active={activeForm === 1} label="Create Line Manager" />
      <SidebarButton id={2} active={activeForm === 2}label="Create Topic" />
      <SidebarButton id={3} active={activeForm === 3}label="Generate Link" />
        {/* <SidebarButton id={1} active={activeForm === 1} onClick={setActiveForm} label="Create Line Manager" /> */}
        {/* <SidebarButton id={2} active={activeForm === 2} onClick={setActiveForm} label= />
        <SidebarButton id={3} active={activeForm === 3} onClick={setActiveForm} label= /> */}

      </div>
      <div className="lowernav">
        <div className="cover">
          <div className="logoutsection">
            <FaPowerOff />
            <h1>Logout</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
