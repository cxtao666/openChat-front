import { groupChat } from "store/const/groupChat";
import {
  Friend,
  Group,
  State,
  UserId,
  RoomId,
  GroupMessage,
  User,
} from "store/state/singleChat";
import { deepCloneMap } from "../../util/index";

const addGroup = (state: State, payload: Group) => {
  console.log(payload);
  const newState = {
    ...state,
    friendList: deepCloneMap<UserId, Friend>(state?.friendList),
    groupList: deepCloneMap<RoomId, Group>(state.groupList),
  };
  if (!newState.groupList?.has(payload.room.id)) {
    newState.groupList?.set(payload.room.id, payload);

    // 记住获取的消息的起始id，为后面分页准备
    if (payload.groupMessageList.length > 0) {
      newState.messageIdMap.set(
        payload.room.id as string,
        payload.groupMessageList[payload.groupMessageList.length - 1].id
      );
    } else {
      newState.messageIdMap.set(payload.room.id as string, 0);
    }
  }
  return newState;
};

const updateMessageIsRead = (
  state: State,
  payload: { roomId: string; id: number }
) => {
  const newState = {
    ...state,
    friendList: deepCloneMap<UserId, Friend>(state?.friendList),
    groupList: deepCloneMap<RoomId, Group>(state.groupList),
  };

  if (newState.groupList?.has(payload.roomId)) {
    const room = newState.groupList.get(payload.roomId);
    if (room) {
      room.newMessageId = payload.id;
    }
  }
  return newState;
};

const receiveGroupMessage = (state: State, payload: GroupMessage) => {
  const newState = {
    ...state,
    friendList: deepCloneMap<UserId, Friend>(state?.friendList),
    groupList: deepCloneMap<RoomId, Group>(state.groupList),
  };
  if (newState.groupList?.has(payload.roomId)) {
    newState.groupList.get(payload.roomId)?.groupMessageList.push(payload);
  }
  return newState;
};

const groupAddMember = (state: State, payload: User & { roomId: string }) => {
  const newState = {
    ...state,
    friendList: deepCloneMap<UserId, Friend>(state?.friendList),
    groupList: deepCloneMap<RoomId, Group>(state.groupList),
  };
  if (newState.groupList?.has(payload.roomId)) {
    newState.groupList
      .get(payload.roomId)
      ?.room.joinGroupUserList.push(payload);
  }
  return newState;
};

const removeGroup = (state: State, payload: RoomId) => {
  const newState = {
    ...state,
    friendList: deepCloneMap<UserId, Friend>(state?.friendList),
    groupList: deepCloneMap<RoomId, Group>(state.groupList),
  };
  if (newState.groupList?.has(payload)) {
    newState.groupList.delete(payload);
  }
  return newState;
};

const groupRemoveMember = (
  state: State,
  payload: { roomId: RoomId; userId: UserId }
) => {
  const newState = {
    ...state,
    friendList: deepCloneMap<UserId, Friend>(state?.friendList),
    groupList: deepCloneMap<RoomId, Group>(state.groupList),
  };
  if (newState.groupList?.has(payload.roomId)) {
    const room = newState.groupList.get(payload.roomId)?.room;
    if (room) {
      const list = room.joinGroupUserList || [];
      const newList = list?.filter((item) => {
        if (item.id === payload.userId) {
          return false;
        }
        return true;
      });
      room.joinGroupUserList = newList;
    }
  }
  return newState;
};

const pullGroupMessage = (
  state: State,
  payload: { messageList: GroupMessage[]; roomId: string }
) => {
  const newState = {
    ...state,
    friendList: deepCloneMap<UserId, Friend>(state?.friendList),
    groupList: deepCloneMap<RoomId, Group>(state.groupList),
  };
  if (newState.groupList?.has(payload.roomId)) {
    const room = newState.groupList.get(payload.roomId);
    if (room) {
      room.groupMessageList = payload.messageList.concat(room.groupMessageList);
    }
  }
  return newState;
};

// 一个reducer就是一个函数
export const groupChatReducers = (state: any, action: any) => {
  // 不同的action有不同的处理逻辑
  //console.log(state, action);
  switch (action.type) {
    case groupChat.ADD_GROUP:
      return addGroup(state, action.data);
    case groupChat.RECEIVE_GROUP_MESSAGE:
      return receiveGroupMessage(state, action.data);
    case groupChat.GROUP_ADD_MEMBER:
      return groupAddMember(state, action.data);
    case groupChat.REMOVE_GROUP:
      return removeGroup(state, action.data);
    case groupChat.GROUP_REMOVE_MEMBER:
      return groupRemoveMember(state, action.data);
    case groupChat.UPDATE_MESSAGE_ISREAD:
      return updateMessageIsRead(state, action.data);
    case groupChat.PULL_GROUP_MESSAGE:
      return pullGroupMessage(state, action.data);
  }
  return null;
};
