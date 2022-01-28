const SEND_MESSAGE = "sendMessage"; // 向某个用户发送消息
const RECEIVE_MESSAGE = "receiveMessage"; // 接收用户的消息
const ADD_FRIEND = "addFriend";  // 添加好友用户
const REMOVE_FRiEND = "removeFriend"; //删除好友用户
const SET_USER = 'setUser'; // 设置自己的用户id
const INIT_CHAT_STATE = 'initChatState' // 初始化状态
const SET_MESSAGE_LIST_HAS_READ = 'setMessageListHasRead' // 设置消息自己已读
const SET_TARGET_MESSAGE_HAS_READ = 'setTargetMessageHasRead' // 设置对方消息已读
const PULL_MESSAGE = 'pullMessage' // 拉取好友的聊天记录
const SET_FRIEND_IS_ONLINE = 'setFriendIsOnline' // 用户上线设置好友的在线状态
const UPDATE_FRIEND_ONLINE_STATUS = 'updateFriendOnlineStatus' // 更新好友的在线状态

export const singleChat = {
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  ADD_FRIEND,
  REMOVE_FRiEND,
  SET_USER,
  INIT_CHAT_STATE,
  SET_MESSAGE_LIST_HAS_READ,
  SET_TARGET_MESSAGE_HAS_READ,
  PULL_MESSAGE,
  SET_FRIEND_IS_ONLINE,
  UPDATE_FRIEND_ONLINE_STATUS
};
