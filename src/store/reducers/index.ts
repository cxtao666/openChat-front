// 工具函数，用于组织多个reducer，并返回reducer集合
//import { combineReducers } from "redux";
import { singleChatReducers } from "./singleChat";
import { groupChatReducers } from "./groupChat";

// 导出所有reducer
export const reducers = (state: any, action: any) => {
  const newState = singleChatReducers(state, action);
  if (newState) {
    return newState;
  }
  return groupChatReducers(state, action);
};
