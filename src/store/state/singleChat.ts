export interface UserId {}

// 消息时间可以用时间戳
export interface Message {
  createTime: string;
  message: string;
  userId: UserId;
  targetUserId: UserId;
  isRead: Boolean;
}

export interface Friend {
  userId: UserId;
  messageList: Message[];
}

export interface State {
  userId: UserId;
  friendList: Map<UserId, Friend>;
}

const state: State = {
  userId: "",
  friendList: new Map(),
};

export default state;
