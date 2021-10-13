// 工具函数，用于组织多个reducer，并返回reducer集合
import { combineReducers } from "redux";
import { singleChatReducers } from "./singleChat";

// 导出所有reducer
export default combineReducers({
  singleChatReducers,
});
