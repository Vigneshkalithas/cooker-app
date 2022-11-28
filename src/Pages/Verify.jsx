import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/verify.css";
import { Config } from "../Config/Config";
import { toast } from "react-toastify";

function Verify() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const { id } = useParams();

  const verification = async (e) => {
    e.preventDefault();
    // e.stopPropagation();
    const result = await fetch(`${Config.api}/user/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token }),
    });
    console.log(result);
    if (result.status == 200) {
      setVerified(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch(`${Config.api}/user/changepassword/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (result.status == 200) {
      toast.success("password changed successfully");
      navigate("/login");
    } else {
      toast.error("sorry something went wrong please try after some time.");
    }
  };
  return (
    <>
      {!verified ? (
        <div className="verify-head">
          <div className="verify">
            <h5>Verify Security Code</h5>
            <div className="fieldBox">
              <label>Key : </label>
              <input
                type="text"
                placeholder="Enter Key"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <div className="btn-head-verify">
                <button type="submit" onClick={verification}>
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="verify-head">
          <div className="verify">
            <h5>Confirm Password</h5>
            <div className="fieldBox">
              <label>Password</label>
              <input
                type="Password"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div className="fieldBox">
              <label>Confirm Password</label>
              <input
                type="Password"
                placeholder="Enter Confirm Password"
                required
                // value={verifyToken}
                // onChange={(e) => setVerifyToken(e.target.value)}
              />
            </div> */}
            <div className="btn-head-verify">
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Verify;
