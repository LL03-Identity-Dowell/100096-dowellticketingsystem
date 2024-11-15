import React, { useState } from "react";
import { RiMessage2Fill } from "react-icons/ri";
import {
  MdNotifications,
  MdNotificationsActive,
  MdOutlineLogout,
} from "react-icons/md";
import logo from "../../assets/logo.jpg"
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle, FaUser, FaUserTie } from "react-icons/fa";
const Navbar = () => {
  const [unreadNotifications, setUnreadNotifications] = useState(false);
  const [hoverState, setHoverState] = useState(0);


  return (
    <section>
      <div className="navbarsection">
        <div className="logobox">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="titlebox">
          <div className="title">
            <span>
              <h1>Customer suport</h1>
            </span>
          </div>
        </div>
        <div className="profilebox">
          <div className="profileicons">
            <div className="icons">
              <span>
                <RiMessage2Fill onMouseEnter={() => setHoverState(1)} />
              </span>
              <span>
                {unreadNotifications ? (
                  <>
                    <MdNotificationsActive
                      onMouseEnter={() => setHoverState(2)}
                    />
                  </>
                ) : (
                  <>
                    <MdNotifications onMouseEnter={() => setHoverState(2)} />
                  </>
                )}
              </span>
              <span>
                <FaRegUserCircle onMouseEnter={() => setHoverState(3)} />
              </span>
            </div>
          </div>
          {hoverState === 1 && (
            <>
              <div
                className="messageDropdown"
                onMouseEnter={() => setHoverState(1)}
                onMouseLeave={() => setHoverState(0)}
              >
                <div className="table">
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr className="topTable">
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Ticket ID
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Topic
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Message
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          id
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          topic
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          .message
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          {hoverState === 2 && (
            <div
              className="notificationsDropdown"
              onMouseEnter={() => setHoverState(2)}
              onMouseLeave={() => setHoverState(0)}
            >
              <div className="notificationTop">
                <span className="textgray">Notifications</span>
                <span className="textgreen">Mark as read</span>
              </div>
              <div className="notificationtextbox"></div>
              <div className="notificationBottom">
                <span className="textgreen hver">Show all notifications</span>
              </div>
              <div></div>
            </div>
          )}
          {hoverState === 3 && (
            <div
              className="profileDropdown"
              onMouseEnter={() => setHoverState(3)}
              onMouseLeave={() => setHoverState(0)}
            >
              <ul className="gapRow">
                <li>
                  <div>
                    <FaUser className="textgreen" />
                  </div>
                  <span>Profile</span>{" "}
                </li>
                <li>
                  <div>
                    <IoSettingsOutline className="textgreen" />
                  </div>
                  <span>Settings</span>
                </li>
                <li>
                  <div>
                    <FaUserTie className="textgreen" />
                  </div>
                  <span>Line Managers</span>
                </li>
                <li>
                  <div>
                    <MdOutlineLogout className="textgreen" />
                  </div>
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
