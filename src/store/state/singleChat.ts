export interface UserId {}

export interface RoomId {}

export interface Room {
  id: RoomId;
  masterId: string;
  roomName: string;
  roomUsername: string;
  notice: string;
  avator: string;
  joinGroupUserList: User[];
}

export interface Group {
  newMessageId: number;
  room: Room;
  groupMessageList: GroupMessage[];
}

export interface GroupMessage {
  user: User;
  createTime: string;
  message: string;
  userId: UserId;
  roomId: RoomId;
  id: number;
  msgId: string; //消息类型
}

export interface User {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
}

// 消息时间可以用时间戳
export interface Message {
  createTime: string;
  message: string;
  userId: UserId;
  targetUserId: UserId;
  isRead: Boolean | number;
  id: number;
  msgId: string;
}

export interface Friend {
  isOnline: boolean;
  userId: UserId;
  user: User;
  messageList: Message[];
}

export interface State {
  userId: UserId;
  user: User;
  friendList: Map<UserId, Friend>;
  skipMap: Map<string, number>;
  groupList: Map<RoomId, Group>;
  messageIdMap: Map<string, number>;
}
