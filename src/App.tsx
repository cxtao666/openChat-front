import React from "react";
import Index from "./pages/Index";
import { Route } from "react-router-dom";

// 组件必须以大写字母开头，否则TypeScript会大喊大叫
function App() {
  return (
    <div>
      <Route path="/index" component={Index} />
    </div>
  );
}

export default App;
