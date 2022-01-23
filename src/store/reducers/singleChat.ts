// 默认值
import { singleChat } from "store/const/singleChat";
import { Friend, Message, State, UserId, User } from "../state/singleChat";
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
  console.log('消息列表',newState.friendList?.get(payload.userId));
  newState.friendList?.get(payload.userId)?.messageList.push(payload); 
  console.log("状态",  newState);
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
      user: payload,
    });
    return newState;
  }
};

const setMessageListHasRead = (state: State, payload: User) => {
  const newState = {
    ...state,
    friendList: deepCloneMap<UserId, Friend>(state?.friendList),
  };
  newState.friendList?.get(payload.id)?.messageList.forEach((val) => {
    if(val.userId === payload.id){
      val.isRead = true;
    }
  });
  return newState;
};

const setUser = (state: State, payload: User) => {
  const newState = {
    ...state,
    friendList: new Map<UserId, Friend>(),
  };
  newState.userId = payload.id;
  newState.user = payload;
  return newState;
};

const setTargetMessageHasRead = (state: State, payload: {userId:string;targetId:string}) => {
  console.log('信息', payload.userId);
  const newState = {
    ...state,
    friendList: deepCloneMap<UserId, Friend>(state?.friendList),
  };
  newState.friendList?.get(payload.userId)?.messageList.forEach((val) => {
    console.log(val)
    if(val.userId === payload.targetId){
      val.isRead = true;
    }
  });
  return newState;
}

// 一个reducer就是一个函数
export const singleChatReducers = (state: any, action: any) => {
  // 不同的action有不同的处理逻辑
  //console.log(state, action);
  switch (action.type) {
    case singleChat.SET_TARGET_MESSAGE_HAS_READ:
      return setTargetMessageHasRead(state,action.data);
    case singleChat.SET_MESSAGE_LIST_HAS_READ:
      return setMessageListHasRead(state, action.data);
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
        user: {},
      };
  }
};
