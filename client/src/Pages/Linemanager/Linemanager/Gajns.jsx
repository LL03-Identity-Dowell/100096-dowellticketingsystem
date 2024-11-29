// Form.js
import { faL } from "@fortawesome/free-solid-svg-icons";
import { GoPlus } from "react-icons/go";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader/Loader";

const Form = ({ id }) => {
  const [selectedManager, setSelectedManager] = useState(
   "beefcafe1234dead5678face"
);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [userNameCount, setUserNameCount] = useState(0);
  const [linkNumber, setLinkNumber] = useState(0);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewLine, setViewLine] = useState(false);
  const [viewTopic, setViewTopic] = useState(false);
  const [viewLink, setViewLink] = useState(false);
  const [team, setTeam] = useState([]);
  const [linkData, setLinkData] = useState([])

  const handleSelectedManager = (event) => {
    setSelectedManager(event.target.value);
  };
  const handleSelectedTopic = (event) => {
    setSelectedTopic(event.target.value);
  };
  const handleUserNameCountChange = (event) => {
    setUserNameCount(event.target.value);
  };
  const handleLinkNumberChange = (event) => {
    setLinkNumber(event.target.value);
  };
  const hanldeUrlChange = (event) => {
    setUrl(event.target.value);
  };

  useEffect(() => {
    async function getter() {
      try {
        setLoading(false);
        axios
          .post("https://100014.pythonanywhere.com/api/userinfo/", {
            session_id: "wlkbp073e3ly3qy6tjr4d4p4kfkz5bci",
          })
          .then(function (response) {
            if (response.status === 200) {
              setLoading(true);
              setTeam(response.data.members.team_member);
            }
          })

          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
    async function getllinermanagers(){
      try {
        axios
        .get("http://localhost:5000/api/v1/lineManagers/get-all-lineManagers", 
        )
        .then(function (response) {
          if (response.status === 200) {
            console.log(response)
            // setLoading(true);
            // setTeam(response.data.members.team_member);
          }
        })
      } catch (error) {
        
      }
    }
    getter();
    getllinermanagers()
  }, []);

  const LinemanagerSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = axios
      .post("http://localhost:5000/api/v1/lineManagers/create-lineManager", {
        user_id:selectedManager
      })
      .then((response) => {
        console.log(response.data); // Access the resolved data here
        // alert("Form submitted successfully!");
      })

    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form");
    }


  };

 
  const GenerateLinkSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = axios
      .post("http://localhost:5000/api/v1/generate-masterlink",

        {
          workspace_id: "feedcafedead12345678beef",
          api_key: "54f46273-2933-4501-9b96-04081ae2218d",
        number_of_links: linkNumber,
          available_links: 10,
          product_distribution: {
            product1: 5,
            product2: 5
          },
          usernames: ["user1", "user2", "user3"],
          is_active: true
        }
      )
      .then((response) => {
        console.log(response.data); // Access the resolved data here
        setLinkData(response.data)
        console.log(linkData.data.master_link)
      })
      .catch((error) => {
        console.error(error);
      });


    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form");
    }
console.log(linkData.master_link)

  };
  return (
    <>
      {id === 1 && (
        <>
          {loading ? (
            <div className="cflex centering fullpage">
              <div className="formNav rflex ">
                <div className="searchbar centering">
                  <div className="search">
                    <input
                      placeholder="Search"
                      className="search__input"
                      type="text"
                    />
                    <button className="search__button">
                      <svg
                        viewBox="0 0 16 16"
                        className="bi bi-search"
                        fill="currentColor"
                        height="16"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="firstbutton centering">
                  <div className="restrictor centering">
                    <button
                      style={{
                        backgroundColor: viewLine ? "#22c55e" : "#fff",
                        border: viewLine ? "" : "1px solid #22c55e",
                        color: viewLine ? "#fff" : "#000",
                      }}
                      onClick={() => setViewLine(!viewLine)}
                    >
                      View Line Manager
                    </button>
                  </div>
                </div>
                <div className="secondbutton centering">
                  <div className="restrictor centering">
                    <button
                      className="centering"
                      style={{
                        backgroundColor: viewLine ? "#fff" : "#22c55e",
                        border: viewLine ? "1px solid #22c55e" : "",
                        color: viewLine ? "#000" : "#fff",
                      }}
                      onClick={() => setViewLine(!viewLine)}
                    >
                      <span style={{ fontSize: "20px" }}>
                        <GoPlus />
                      </span>
                      <span>Add Line Manager</span>
                    </button>
                  </div>
                </div>
              </div>

              {viewLine ? (
                <>
                  <div className="formcontainer">
                    <div className="formlowersection">
                      <form action="">
                        <div className="formuppersection">
                          <label htmlFor="">
                            <h1>Line Managers</h1>
                          </label>
                        </div>

                        <div className="tablebody centering">
                          <div className=" table">
                            <table
                              style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                textAlign: "left",
                              }}
                            >
                              <thead>
                                <tr>
                                  <th
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    N/O
                                  </th>
                                  <th
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    Name
                                  </th>
                                  <th
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    Email
                                  </th>
                                  <th
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    Address
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    1
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    John Doe
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    john.doe@example.com
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    123 Main St, Cityville
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    2
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    Jane Smith
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    jane.smith@example.com
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    456 Maple Rd, Townsville
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    3
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    Bob Johnson
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    bob.johnson@example.com
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    789 Oak Ln, Hamlet
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    4
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    Alice Brown
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    alice.brown@example.com
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    321 Pine Ave, Metropolis
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="formcontainer">
                    <div className="formlowersection">
                      <form onSubmit={LinemanagerSubmit}>
                        <div className="formuppersection">
                          <label htmlFor="">
                            <h1>Fill Line Manager Information</h1>
                          </label>
                        </div>
                        <div className="formmiddlesection">
                          <label htmlFor="">
                            <h2>Line Manager</h2>
                          </label>
                        </div>
                        <div className="formmidlowsection">
                          <select
                            className=""
                            name="choose"
                            id=""
                            required
                            // value={selectedManager}
                            // onChange={handleSelectedManager}
                          >
                            <option value="">Choose Members</option>
                            {team
                              .filter((members) => members.alias) // Filter out members without 'alias'
                              .map((members, index) => {
                                return (
                                  <>
                                    <option
                                      key={index}
                                      value={members.member_code}
                                    >
                                      {members.alias}
                                    </option>
                                  </>
                                );
                              })}

                            {/* <option value="second">ssss</option>
                        <option value="thrid">ssss</option>
                        <option value="fouth">ssss</option>
                        <option value="fifith">ssss</option>
                        <option value="sixth">ssss</option> */}
                          </select>
                        </div>
                        <div className="formmbuttonsection">
                          <div className="buttonholder">
                            <button type="submit">Create Manager</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Loader />
            </>
          )}
        </>
      )}
      {id === 2 && (
        <>
          <div className="cflex centering fullpage">
            <div className="formNav rflex ">
              <div className="searchbar centering">
                <div className="search">
                  <input
                    placeholder="Search"
                    className="search__input"
                    type="text"
                  />
                  <button className="search__button">
                    <svg
                      viewBox="0 0 16 16"
                      className="bi bi-search"
                      fill="currentColor"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="firstbutton centering">
                <div className="restrictor centering">
                  <button
                    style={{
                      backgroundColor: viewTopic ? "#22c55e" : "#fff",
                      border: viewTopic ? "" : "1px solid #22c55e",
                      color: viewTopic ? "#fff" : "#000",
                    }}
                    onClick={() => setViewTopic(!viewTopic)}
                  >
                    View Topics
                  </button>
                </div>
              </div>
              <div className="secondbutton centering">
                <div className="restrictor centering">
                  <button
                    className="centering"
                    style={{
                      backgroundColor: viewTopic ? "#fff" : "#22c55e",
                      border: viewTopic ? "1px solid #22c55e" : "",
                      color: viewTopic ? "#000" : "#fff",
                    }}
                    onClick={() => setViewTopic(!viewTopic)}
                  >
                    <span style={{ fontSize: "20px" }}>
                      <GoPlus />
                    </span>
                    <span>Add Topic</span>
                  </button>
                </div>
              </div>
            </div>
            {viewTopic ? (
              <>
                <div className="formcontainer">
                  <div className="formlowersection">
                    <form action="">
                      <div className="formuppersection">
                        <label htmlFor="">
                          <h1>View Topics</h1>
                        </label>
                      </div>

                      <div className="tablebody centering">
                        <div className=" table">
                          <table
                            style={{
                              borderCollapse: "collapse",
                              width: "100%",
                              textAlign: "left",
                            }}
                          >
                            <thead>
                              <tr>
                                <th
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  N/O
                                </th>
                                <th
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  Name
                                </th>
                                <th
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  Email
                                </th>
                                <th
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  Address
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  1
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  John Doe
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  john.doe@example.com
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  123 Main St, Cityville
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  2
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  Jane Smith
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  jane.smith@example.com
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  456 Maple Rd, Townsville
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  3
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  Bob Johnson
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  bob.johnson@example.com
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  789 Oak Ln, Hamlet
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  4
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  Alice Brown
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  alice.brown@example.com
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  321 Pine Ave, Metropolis
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="formcontainer">
                  <div className="formlowersection">
                    <form action="">
                      <div className="formuppersection">
                        <label htmlFor="">
                          <h1>Fill Topic Information</h1>
                        </label>
                      </div>
                      <div className="formmiddlesection">
                        <label htmlFor="">
                          <h2>Topic Name</h2>
                        </label>
                      </div>
                      <div className="formmidlowsection">
                    
                              <input
                                type="text"
                                name=""
                                id=""
                                required
                          
                            value={selectedTopic}
                            onChange={handleSelectedTopic}
                              />
                       
                        
                      </div>
                      <div className="formmbuttonsection">
                        <div className="buttonholder">
                          <button>Create Topic</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {id === 3 && (
        <>
          <div className="cflex centering fullpage">
            <div className="formNav rflex ">
              <div className="searchbar centering">
                <div className="search">
                  <input
                    placeholder="Search"
                    className="search__input"
                    type="text"
                  />
                  <button className="search__button">
                    <svg
                      viewBox="0 0 16 16"
                      className="bi bi-search"
                      fill="currentColor"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="firstbutton centering">
                <div className="restrictor centering">
                  <button
                    style={{
                      backgroundColor: viewLink ? "#22c55e" : "#fff",
                      border: viewLink ? "" : "1px solid #22c55e",
                      color: viewLink ? "#fff" : "#000",
                    }}
                    onClick={() => setViewLink(!viewLink)}
                  >
                    View Links
                  </button>
                </div>
              </div>
              <div className="secondbutton centering">
                <div className="restrictor centering">
                  <button
                    className="centering"
                    style={{
                      backgroundColor: viewLink ? "#fff" : "#22c55e",
                      border: viewLink ? "1px solid #22c55e" : "",
                      color: viewLink ? "#000" : "#fff",
                    }}
                    onClick={() => setViewLink(!viewLink)}
                  >
                    <span style={{ fontSize: "20px" }}>
                      <GoPlus />
                    </span>
                    <span>Add Link</span>
                  </button>
                </div>
              </div>
            </div>
            {viewLink ? (
              <>
                {" "}
                <div className="formcontainer">
                  <div className="formlowersection">
                    <form action="">
                      <div className="formuppersection">
                        <label htmlFor="">
                          <h1>View Topics</h1>
                        </label>
                      </div>

                      <div className="tablebody centering">
                        <div className=" table">
                          <table
                            style={{
                              borderCollapse: "collapse",
                              width: "100%",
                              textAlign: "left",
                            }}
                          >
                            <thead>
                              <tr>
                                <th
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  N/O
                                </th>
                                <th
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  Name
                                </th>
                                <th
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  Email
                                </th>
                                <th
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  Address
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  1
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  John Doe
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  john.doe@example.com
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  123 Main St, Cityville
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  2
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  Jane Smith
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  jane.smith@example.com
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  456 Maple Rd, Townsville
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  3
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  Bob Johnson
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  bob.johnson@example.com
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  789 Oak Ln, Hamlet
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  4
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  Alice Brown
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  alice.brown@example.com
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                  }}
                                >
                                  321 Pine Ave, Metropolis
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="formcontainer">
                  <div className="formlowersection">
                    <form onSubmit={GenerateLinkSubmit}>
                      <div className="formuppersection">
                        <label htmlFor="">
                          <h1>Fill Link Information</h1>
                        </label>
                      </div>
                      <div className="thirdform">
                        <div className="divide">
                          <label htmlFor="" className="splitter">
                            <span>
                              <h2>User Name Count</h2>
                            </span>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "10px",
                              }}
                            >
                              <input
                                type="number"
                                placeholder="0"
                                name=""
                                id=""
                                value={userNameCount}
                                onChange={handleUserNameCountChange}
                                required
                              />
                            </div>
                          </label>
                        </div>
                        <div className="divide">
                          <label htmlFor="" className="splitter">
                            <span>
                              <h2>Link Number</h2>
                            </span>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "10px",
                              }}
                            >
                              <input
                                type="number"
                                name=""
                                id=""
                                required
                                value={linkNumber}
                                onChange={handleLinkNumberChange}
                              />
                            </div>
                          </label>
                        </div>
                        <div className="divide">
                          <label htmlFor="" className="splitter">
                            <span>
                              <h2>URL</h2>
                            </span>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "10px",
                              }}
                            >
                              <input
                                type="url"
                                name=""
                                id=""
                                required
                                value={url}
                                onChange={hanldeUrlChange}
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                      {/* <div className="formmiddlesection">
               <label htmlFor="">
                 <h2>User Name Count</h2>
               </label>
               <input type="number" name="" id="" placeholder="input number" />
             </div>
             <div className="formmidlowsection">
               <select className="" name="choose" id="">
                 <option value="">Choose Members</option>
                 <option value="">ssss</option>
                 <option value="">ssss</option>
                 <option value="">ssss</option>
                 <option value="">ssss</option>
                 <option value="">ssss</option>
                 <option value="">ssss</option>
               </select>
             </div> */}
                      <div className="formmbuttonsection">
                        <div className="buttonholder">
                          <button type="submit">Generate Link</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Form;
