import { pullChatFriendList } from "api/pullChatFriendList";
import { pullChatMessage } from "api/pullChatMessage";
import { updateMessageIsReadStatus } from "api/updateMessageIsReadStatus";
import { Message, User } from "store/state/singleChat";
import { singleChat } from "../const/singleChat";

export function sendMessage(data: any) {
  return (dispatch: any) => {
    const createTime = Date.now();
    const isRead = false;
    window.CHAT_BASIC.sendMessage({ ...data, createTime, isRead });
    dispatch({
      type: singleChat.SEND_MESSAGE,
      data: { ...data, createTime, isRead },
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

// 告诉后端接收了哪些消息
export const setMessageListHasRead = (user: User, targetUser: User) => {
  return (dispatch: any) => {
    updateMessageIsReadStatus(user.id, targetUser.id); //更新后端数据库
    window.CHAT_BASIC.sendMessageHasRead(user.id, targetUser.id); //通知目标用户消息已读
    dispatch({ type: singleChat.SET_MESSAGE_LIST_HAS_READ, data: targetUser });
  };
};

// 去后端拉取用户的好友，并将好友信息写入reduce
export const pullFriendList = (id: string) => {
  return (dispatch: any) => {
    pullChatFriendList(id)
      .then((data) => {
        const friendIdList: string[] = [];
        for (let item of data) {
          friendIdList.push(item.data.id);
          // 添加用户到redux
          dispatch({ type: singleChat.ADD_FRIEND, data: item.data });

          // 初始化拉取的消息id，为后面分页做准备
          if (!item.message || item.message.length === 0) {
            dispatch({
              type: singleChat.SET_MESSAGE_START_ID,
              data: { id: item.data.id, startMessageId: 0 },
            });
          }

          if (item.message) {
            for (let val of item.message.reverse()) {
              if (val.userId === id) {
                dispatch({ type: singleChat.SEND_MESSAGE, data: val });
              }
              dispatch({ type: singleChat.RECEIVE_MESSAGE, data: val });
            }
            dispatch({
              type: singleChat.SET_MESSAGE_START_ID,
              data: { id: item.data.id, startMessageId: item.message[0].id },
            });
          }
        }
        return friendIdList;
      })
      .then((friendIdList) => {
        console.log(friendIdList);
        window.CHAT_BASIC.requestFriendIsOnine(friendIdList);
      });
  };
};

//去后端拉取用户与好友的聊天记录，并将聊天信息写入reduce
export const pullConcatMessage = (
  id: string,
  targetUserId: string,
  skip: number,
  take: number,
  startId:number
) => {
  return (dispatch: any) => {
    pullChatMessage(id, targetUserId, skip, take,startId).then((data: Message[]) => {
      data.forEach((val) => {
        dispatch({
          type: singleChat.PULL_MESSAGE,
          data: { message: val, targetUserId },
        });
      });
    });
  };
};
