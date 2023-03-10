import React from "react"
import ReactDOM from "react-dom/client"
import "./render.css"

export default (App) =>
  ReactDOM.createRoot(document.getElementById("root")).render(<App />)
