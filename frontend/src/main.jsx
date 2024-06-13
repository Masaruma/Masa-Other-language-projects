import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const initial = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      "html, body": {
        // backgroundColor: "black",
        // color: "white",
        fontFamily: `-apple-system, BlinkMacSystemFont, 
        "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, 
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
      },
    },
  },
};

const theme = extendTheme(initial);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
