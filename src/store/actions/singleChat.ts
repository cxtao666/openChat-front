import { UserId } from "store/state/singleChat";
import { singleChat } from "../const/singleChat";

export function sendMessage(data: any) {
  return (dispatch: any) => {
    const createTime = Date.now();
    const isRead = false;
    window.CHAT_BASIC.sendMessage({ ...data, createTime, isRead });
    dispatch({
      type: singleChat.SEND_MESSAGE,
      data: { ...data, createTime, isRead: true },
    });
  };
}

export function addFriend(data: UserId) {
  return (dispatch: any) => {
    dispatch({ type: singleChat.ADD_FRIEND, data: data });
  };
}

export const receiveMessage = (data: any) => {
  return (dispatch: any) => {
    dispatch({ type: singleChat.RECEIVE_MESSAGE, data: data });
  };
};

export const connection = (data: UserId) => {
  return (dispatch: any) => {
    window.CHAT_BASIC.connection(data);
    dispatch({ type: singleChat.SET_USER, data: data });
  };
};
