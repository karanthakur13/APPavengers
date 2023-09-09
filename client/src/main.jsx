import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";
import App from "./App";
import "./index.css";
import { StateContextProvider } from "./context";
import { UserAuthProvider } from "./context/Userauth";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <UserAuthProvider>
      <ThirdwebProvider activeChain={Mumbai}>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </ThirdwebProvider>
    </UserAuthProvider>
  </Router>
);
