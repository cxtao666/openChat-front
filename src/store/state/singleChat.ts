export interface UserId {}

export interface User {
  id:string,
  username:string,
  nickname:string,
  avatar:string
}

// 消息时间可以用时间戳
export interface Message {
  createTime: string;
  message: string;
  userId: UserId;
  targetUserId: UserId;
  isRead: Boolean | number;
  id:number;
  msgId:string
}

export interface Friend {
  userId: UserId;
  user:User
  messageList: Message[];
}

export interface State {
  userId: UserId;
  user:User
  friendList: Map<UserId, Friend>;
  skipMap : Map<string,number>
}
