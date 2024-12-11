// Form.js
import { faL } from "@fortawesome/free-solid-svg-icons";
import { GoPlus } from "react-icons/go";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Form = ({ id }) => {
  const [selectedManager, setSelectedManager] = useState();
  const [workSpaceId, setWorkSpaceId] = useState(
    "6759da36d100db607b01bf5e"
  );
  const [selectedTopic, setSelectedTopic] = useState("");
  const [userNameCount, setUserNameCount] = useState([]);
  const [linkNumber, setLinkNumber] = useState(0);
  const [availableLink, setAvailableLink] = useState(4);
  const [productDistribution, setProductDistribution] = useState({
    product1: 5,
    product2: 5,
    product3: 5,
    product4: 5,
  })
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewLine, setViewLine] = useState(false);
  const [viewTopic, setViewTopic] = useState(false);
  const [viewLink, setViewLink] = useState(false);
  const [team, setTeam] = useState([]);
  const [linkData, setLinkData] = useState([])
  const [lineManagersData, setLineManagersData] = useState([])
  const [topicsData, setTopicsData] = useState([])
  const [linkUsernames, setLinkUsernames] = useState([])


  const [isSecondInputEnabled, setIsSecondInputEnabled] = useState(false); // Enable/disable second input
  const [isThirdInputEnabled, setIsThirdInputEnabled] = useState(false);

  const notify = () => toast("Wow so easy!");

  const handleSelectedManager = (event) => {
    setSelectedManager(event.target.value);

  };
  const handleSelectedTopic = (event) => {
    setSelectedTopic(event.target.value);
  };
  const handleUserNameCountChange = (event) => {
    setUserNameCount(event.target.value);
  };
  // const handleLinkNumberChange = (event) => {
  //   setLinkNumber(event.target.value);
  // };
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
              console.log(response)
              setLoading(true);
              setTeam(response.data.members.team_member);
              setLinkUsernames(response.data.otherorg_list)
              console.log(response)
            }
          })

          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
    // async function getllinermanagers(){
    //   try {
    //     axios
    //     .get("http://localhost:5000/api/v1/lineManagers/get-all-lineManagers", 
    //     )
    //     .then(function (response) {
    //       if (response.status === 200) {
    //         console.log(response)
    //         setLineManagersData(response.data.data)
    //         // setLoading(true);
    //         // setTeam(response.data.members.team_member);
    //       }
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    getter();

  }, []);

  useEffect(() => {
    async function getllinermanagers() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/lineManagers/get-all-lineManagers"
        );
        if (response.status === 200) {
          // console.log(response);
          setLineManagersData(response.data.data);

        }
      } catch (error) {
        console.log(error);
      }
    }

    getllinermanagers(); // Run initially

    // Set up interval to run the function every 5 seconds
    const interval = setInterval(() => {
      getllinermanagers();
    }, 5000); // 5000ms = 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    async function gettopics() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/topics/${workSpaceId}`
        );
        if (response.status === 200) {
          setTopicsData(response.data.data)
        }
      } catch (error) {
        console.log(error);
      }
    }

    gettopics(); // Run initially

    // Set up interval to run the function every 5 seconds
    const interval = setInterval(() => {
      gettopics();
    }, 5000); // 5000ms = 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // const LinemanagerSubmit = async (e) => {
  //   e.preventDefault(); 

  //   try {
  //     const response = axios
  //     .post("http://localhost:5000/api/v1/lineManagers/create-lineManager", {
  //       user_id:selectedManager,
  //     })
  //     .then((response) => {
  //       console.log(response.data); // Access the resolved data here
  //       // alert("Form submitted successfully!");
  //     })

  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("An error occurred while submitting the form");
  //   }


  // };


  const LinemanagerSubmit = async (e) => {
    e.preventDefault();

    // Function to generate a random 24-character hex string
    const generateRandomHex = () => {
      return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    };

    // Generate a random string for the `user_id`
    const randomUserId = generateRandomHex();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/lineManagers/create-lineManager",
        {
          user_id: "b84bad325949d2e4cfd32f24", // Pass the generated string here
          user_name: selectedManager
        }
      );
      const lineId = "linemanagerSuccess"
      if (response.status == 201) {
        toast.success("Line managers succefully created!", {

          toastId: lineId

        });
      }
      console.log(response); // Access the resolved data here

    } catch (error) {
      console.error("Error:", error.response.data.message);
      const errorId = "Error"
      toast.error(error.response.data.message, {
        toastId: errorId
      })
    }
  };


  const TopicSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = axios
        .post("http://localhost:5000/api/v1/topics",

          {
            room_name: selectedTopic,
            workspace_id: workSpaceId
          }
        )
        .then((response) => {
          console.log(response.data); // Access the resolved data here
          const lineId = "linemanagerSuccess"
          if (response.status == 201) {
            toast.success("Topic created successfully!", {

              toastId: lineId

            });
          }
        })
        .catch((error) => {
          console.error(error);
          const errorId = "Error"
          toast.error(error.response.data.message, {
            toastId: errorId
          })
        });


    } catch (error) {
      console.error("Error:", error);
      const errorId = "Error"
      toast.error(error.response.data.message, {
        toastId: errorId
      })
    }


  };
  //   const GenerateLinkSubmit = async (e) => {
  //     e.preventDefault(); 

  //     try {
  //       const response = axios
  //       .post("http://localhost:5000/api/v1/generate-masterlink",

  //         {
  //           workspace_id: "feedcafedead12345678beef",
  //           api_key: "54f46273-2933-4501-9b96-04081ae2218d",
  //         number_of_links: linkNumber,
  //           available_links: 10,
  //           product_distribution: {
  //             product1: 5,
  //             product2: 5
  //           },
  //           usernames: ["user1", "user2", "user3"],
  //           is_active: true
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response.data); // Access the resolved data here
  //         setLinkData(response.data)
  //         console.log(linkData.data.master_link)
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });


  //     } catch (error) {
  //       console.error("Error:", error);
  //       alert("An error occurred while submitting the form");
  //     }
  // console.log(linkData.master_link)

  //   };




















  // Filtered options (to exclude already selected usernames)
  const availableOptions = linkUsernames.filter(
    (member) => !userNameCount.includes(member.org_name)
  );

  // Handle changes for the first input (Link Number)
  const handleLinkNumberChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (!isNaN(value) && value > 0 && value <= linkUsernames.length) {
      setLinkNumber(value);
      setUserNameCount([]); // Reset the selected usernames
      setIsSecondInputEnabled(true); // Enable the second input
      setIsThirdInputEnabled(false); // Disable the third input until conditions are met
    } else {
      toast(`Please enter a number between 1 and ${availableLink}.`, {
        toastId: availableLink
      });
      setLinkNumber("");
      setIsSecondInputEnabled(false); // Disable the second input
      setIsThirdInputEnabled(false); // Disable the third input
    }
  };

  // Handle changes for the second input (Username Selection)
  const handleUserNameSelection = (e) => {
    const selectedUsername = e.target.value;

    // Add the selected username to the array
    if (selectedUsername && !userNameCount.includes(selectedUsername)) {
      setUserNameCount((prev) => [...prev, selectedUsername]);
    }

    // Check if the required number of usernames has been selected
    if (userNameCount.length + 1 === linkNumber) {
      setIsThirdInputEnabled(true); // Enable the third input
    } else {
      setIsThirdInputEnabled(false); // Ensure third input stays disabled if conditions aren't met
    }
  };

  // Handle changes for the third input (URL)
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  // Form submission
  const GenerateLinkSubmit = (e) => {
    e.preventDefault();

    // Validation to ensure all fields are filled
    if (!linkNumber || userNameCount.length !== linkNumber) {

      toast("Please fill all fields correctly.", {
        toastId: linkNumber
      });
      return;
    }

    try {
      const response = axios
        .post("http://localhost:5000/api/v1/generate-masterlink",

          {
            workspace_id: "6759daccd100db607b01bfb2",
            api_key: "54f46273-2933-4501-9b96-04081ae2218d",
            number_of_links: linkNumber,
            available_links: availableLink,
            product_distribution: productDistribution,
            usernames: userNameCount,
            is_active: true
          }
        )
        .then((response) => {
          console.log(response.data); // Access the resolved data here
          setLinkData(response.data)
          const lineId = "linemanagerSuccess"
          if (response.data.statusCode == 200) {
            toast.success("Masterlink created successfully!", {

              toastId: lineId

            });
          }
        })
        .catch((error) => {
          console.error(error);
          const errorId = "Error"
          toast.error(error.response.data.message, {
            toastId: errorId
          })
        });


    } catch (error) {
      console.error("Error:", error);
      const errorId = "Error"
      toast.error(error.response.data.message, {
        toastId: errorId
      })
    }
    console.log(linkData.master_link)

  };

  return (
    <>
      <ToastContainer limit={3} />
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
                                    User Id
                                  </th>
                                  <th
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    Ticket Count
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  lineManagersData.map((data, index) => {
                                    return (
                                      <>
                                        <tr key={index}>
                                          <td
                                            style={{
                                              border: "1px solid #ddd",
                                              padding: "8px",
                                            }}
                                          >
                                            {index + 1}
                                          </td>
                                          <td
                                            style={{
                                              border: "1px solid #ddd",
                                              padding: "8px",
                                            }}
                                          >
                                            {data.user_name}
                                          </td>
                                          <td
                                            style={{
                                              border: "1px solid #ddd",
                                              padding: "8px",
                                            }}
                                          >
                                            {data.user_id}
                                          </td>
                                          <td
                                            style={{
                                              border: "1px solid #ddd",
                                              padding: "8px",
                                            }}
                                          >
                                            {data.ticket_count}
                                          </td>
                                        </tr>
                                      </>
                                    )
                                  })
                                }

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
                            value={selectedManager}
                            onChange={handleSelectedManager}
                          >
                            <option value="">Choose Members</option>
                            {team
                              .filter((members) => members.alias) // Filter out members without 'alias'
                              .map((members, index) => {
                                return (
                                  <>
                                    <option
                                      key={index}
                                      value={members.first_name}
                                    >
                                      {members.alias}
                                    </option>
                                  </>
                                );
                              })}


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
                                    Topic Name
                                  </th>
                                  <th
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    Created
                                  </th>
                                  <th
                                    style={{
                                      border: "1px solid #ddd",
                                      padding: "8px",
                                    }}
                                  >
                                    Last Updated
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  topicsData.map((data, index) => {
                                    const creationTime = data.createdAt;
                                    const UpdateTime = data.updatedAt;

                                    // Convert to local time
                                    const Createdate = new Date(creationTime);
                                    const Updatedate = new Date(UpdateTime);
                                    const CreatelocalTimeString = Createdate.toLocaleString();
                                    const UpdatelocalTimeString = Updatedate.toLocaleString();
                                    return (
                                      <>
                                        <tr key={index}>
                                          <td
                                            style={{
                                              border: "1px solid #ddd",
                                              padding: "8px",
                                            }}
                                          >
                                            {index + 1}
                                          </td>
                                          <td
                                            style={{
                                              border: "1px solid #ddd",
                                              padding: "8px",
                                            }}
                                          >
                                            {data.room_name}
                                          </td>
                                          <td
                                            style={{
                                              border: "1px solid #ddd",
                                              padding: "8px",
                                            }}
                                          >
                                            {CreatelocalTimeString}
                                          </td>
                                          <td
                                            style={{
                                              border: "1px solid #ddd",
                                              padding: "8px",
                                            }}
                                          >
                                            {UpdatelocalTimeString}
                                          </td>
                                        </tr>
                                      </>
                                    )
                                  })
                                }
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
                      <form onSubmit={TopicSubmit}>
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
                            <button type="submit">Create Topic</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>

          ) : (<><Loader /></>)}
        </>
      )}
      {id === 3 && (
        <>
          {
            loading ? (

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
                              <h1>View Links</h1>
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
                            <label>
                              <h1>Fill Link Information</h1>
                            </label>
                          </div>

                          {/* First Input - Link Number */}
                          <div className="thirdform">
                            <div className="divide">
                              <label className="splitter">
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
                                    required
                                    value={linkNumber}
                                    onChange={handleLinkNumberChange}
                                    placeholder={`Enter a number between 1 and ${availableLink}`}
                                  />
                                </div>
                              </label>
                            </div>

                            {/* Second Input - User Name Selection */}
                            <div className="divide">
                              <label className="splitter">
                                <span>
                                  <h2>User Name Selection</h2>
                                  <p>
                                    {userNameCount.length} of {linkNumber || 0} usernames selected.
                                  </p>
                                </span>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "10px",
                                  }}
                                >
                                  <select
                                    required
                                    disabled={!isSecondInputEnabled || availableOptions.length === 0} // Disable if no more options are available
                                    onChange={handleUserNameSelection}
                                  >
                                    <option value="">Choose a username</option>
                                    {availableOptions.map((member, index) => (
                                      <option key={index} value={member.org_name}>
                                        {member.org_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </label>
                            </div>


                          </div>

                          {/* Submit Button */}
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
            ) : (
              <>
                <Loader />
              </>
            )
          }
        </>
      )}
    </>
  );
};

export default Form;
