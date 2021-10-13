import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { singleChatReducers } from "./reducers/singleChat";

const store = createStore(singleChatReducers, applyMiddleware(thunk));

export default store;
