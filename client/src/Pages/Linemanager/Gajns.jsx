// Form.js
import React, { useState } from "react";

const Form = ({ id }) => {
    const [selectedManager, setSelectedManager] = useState("")
    const [selectedTopic, setSelectedTopic] = useState("")
    const [userNameCount, setUserNameCount] = useState(0)
    const [linkNumber, setLinkNumber] = useState(0)
    const [url, setUrl] = useState("")

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
  return (
    <>
      {id === 1 && (
        <div className="formcontainer">
          <div className="formlowersection">
            <form action="">
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
                <select className="" name="choose" id="" required
                value={selectedManager}
                onChange={handleSelectedManager}
                >
                  <option value="">Choose Members</option>
                  <option value="first">ssss</option>
                  <option value="second">ssss</option>
                  <option value="thrid">ssss</option>
                  <option value="fouth">ssss</option>
                  <option value="fifith">ssss</option>
                  <option value="sixth">ssss</option>
                </select>
              </div>
              <div className="formmbuttonsection">
                <div className="buttonholder">
                  <button>Create Manager</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {id === 2 && (
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
                <select className="" name="choose" id="" required 
                   value={selectedTopic}
                   onChange={handleSelectedTopic}
                >
                  <option value="">Choose Members</option>
                  <option value="qq">ssss</option>
                  <option value="ww">ssss</option>
                  <option value="ee">ssss</option>
                  <option value="sd">ssss</option>
                  <option value="aw">ssss</option>
                  <option value="sa">ssss</option>
                </select>
              </div>
              <div className="formmbuttonsection">
                <div className="buttonholder">
                  <button>Create Topic</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {id === 3 && (
        <div className="formcontainer">
          <div className="formlowersection">
            <form action="">
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
                      <input type="number" name="" id="" required    value={linkNumber}
                        onChange={handleLinkNumberChange}/>
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
                      <input type="url" name="" id="" required    value={url}
                        onChange={hanldeUrlChange}/>
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
                  <button>Generate Link</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
