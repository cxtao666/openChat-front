import React from "react";
import { SearchList } from "./pages/searchLIst";
import "./App.css";

// 组件必须以大写字母开头，否则TypeScript会大喊大叫
function App() {
  return (
    <div>
      <SearchList />
    </div>
  );
}

export default App;
