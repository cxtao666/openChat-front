import { pullChatFriendList } from "api/pullChatFriendList";
import { User } from "store/state/singleChat";
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

export function addFriend(data: User) {
  return (dispatch: any) => {
    dispatch({ type: singleChat.ADD_FRIEND, data: data });
  };
}

export const receiveMessage = (data: any) => {
  return (dispatch: any) => {
    dispatch({ type: singleChat.RECEIVE_MESSAGE, data: data });
  };
};

export const connection = (data: User) => {
  return (dispatch: any) => {
    window.CHAT_BASIC.connection(data.id);
    dispatch({ type: singleChat.SET_USER, data: data });
  };
};

// 将消息置为已读
export const setMessageListHasRead = (user:User) => {
  return (dispatch: any) => {
    dispatch({ type: singleChat.SET_MESSAGE_LIST_HAS_READ, data: user });
  };
}

// 去后端拉取用户的好友，并将好友信息写入reduce
export const pullFriendList = (id: string) => {
  return (dispatch: any) => {
    pullChatFriendList(id).then((data) => {
      for(let item of data){
          dispatch({ type: singleChat.ADD_FRIEND, data: item });
      }
    });
  };
};
