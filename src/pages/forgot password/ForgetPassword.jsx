import React, { useState } from "react";
import "./forgetpassword.scss";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        setEmail("");

        setTimeout(() => {
          navigate(-1);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        // ..
      });
  };

  return (
    <>
      <div className="forget-password">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
