import Menu from "./components/Menu";
import { IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

import "./App.css";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const tooltipLabel =
    colorMode === "light"
      ? "ダークモードへ切り替えます"
      : "ライトモードへ切り替えます";
  return (
    <>
      <Tooltip label={tooltipLabel}>
        <IconButton
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
        />
      </Tooltip>
      <Menu></Menu>
    </>
  );
}

export default App;
