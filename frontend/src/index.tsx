import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { TextsContextsProvider } from "./Provider/TextContextsProvider";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AuthContextProvider } from "./Provider/authContextsProvider";

const scrollbarStyle = css`
  &::-webkit-scrollbar {
    background: rgb(240, 240, 242);
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TextsContextsProvider>
        <App css={scrollbarStyle} />
      </TextsContextsProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
