import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactUI from "./ReactUI.jsx";
import initGame from "./initGame.js";

import "./index.css";

const ui = document.getElementById("ui");

new ResizeObserver(() => {
  document.documentElement.style.setProperty(
    "--scale",
    Math.min(
      ui.parentElement.offsetWidth / ui.offsetWidth,
      ui.parentElement.offsetHeight / ui.offsetHeight
    )
  );
}).observe(ui.parentElement);

createRoot(document.getElementById("ui")).render(
  <StrictMode>
    <ReactUI />
  </StrictMode>
);

initGame();
