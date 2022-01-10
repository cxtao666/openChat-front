// 默认值
import { singleChat } from "store/const/singleChat";
import { Friend, Message, State, UserId , User } from "../state/singleChat";
import { deepCloneMap } from "../../util/index";

const sendMessage = (state: State, payload: Message) => {
  const newState = {
    ...state,
    friendList: deepCloneMap<UserId, Friend>(state?.friendList),
  };
  newState.friendList?.get(payload.targetUserId)?.messageList.push(payload);
  return newState;
};
const receiveMessage = (state: State, payload: Message) => {
  const newState = {
    ...state,
    friendList: deepCloneMap<UserId, Friend>(state?.friendList),
  };
  newState.friendList?.get(payload.userId)?.messageList.push(payload);
  return newState;
};

const addFriend = (state: State, payload: User) => {
  const newState = {
    ...state,
    friendList: deepCloneMap<UserId, Friend>(state?.friendList),
  };
  if (newState.friendList?.has(payload.id)) {
    return newState;
  } else {
    newState.friendList?.set(payload.id, {
      userId: payload.id,
      messageList: [],
      user:payload
    });
    return newState;
  }
};

const setMessageListHasRead = (state: State, payload: User) => {
  console.log(payload)
  const newState = {
    ...state,
    friendList: deepCloneMap<UserId, Friend>(state?.friendList),
  }
  newState.friendList?.get(payload.id)?.messageList.forEach((val)=>{
    val.isRead = true
  })
  return newState
}

const setUser = (state: State, payload: User) => {
  const newState = {
    ...state,
    friendList: new Map<UserId, Friend>(),
  };
  newState.userId = payload.id;
  newState.user = payload
  return newState;
};

// 一个reducer就是一个函数
export const singleChatReducers = (state: any, action: any) => {
  // 不同的action有不同的处理逻辑
  console.log(state, action);
  switch (action.type) {
    case singleChat.SET_MESSAGE_LIST_HAS_READ:
    return  setMessageListHasRead(state,action.data)
    case singleChat.RECEIVE_MESSAGE:
      return receiveMessage(state, action.data);
    case singleChat.SEND_MESSAGE:
      return sendMessage(state, action.data);
    case singleChat.ADD_FRIEND:
      return addFriend(state, action.data);
    case singleChat.SET_USER:
      return setUser(state, action.data);
    case singleChat.INIT_CHAT_STATE:
      return {
        friendList: new Map(),
        userId: "",
        user:{}
      };
  }
};
