import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleOAuthProvider clientId="817961121235-i0cr46ngedeifrm9f23vaul8pt2jlspq.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          onSuccess(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
          onFailure();
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
