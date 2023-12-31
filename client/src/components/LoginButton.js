import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/contact-list",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <button onClick={handleLogin}>
      Log In
    </button>
  );
};