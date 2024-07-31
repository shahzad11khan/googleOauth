import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";

const App = () => {
  const handleLoginSuccess = async (response) => {
    console.log("Login Success:", response);

    const token = response.credential;

    // Send the token to your backend
    const res = await fetch("http://localhost:5000/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    console.log("User data saved:", data);
  };

  const handleLoginFailure = () => {
    console.log("Login Failed");
  };

  return (
    <div className="App">
      <h1>React Google OAuth</h1>
      <GoogleLoginButton
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
      />
    </div>
  );
};

export default App;
