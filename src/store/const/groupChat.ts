const ADD_GROUP = "addGroup"; //添加群聊
const REMOVE_GROUP = 'removeGroup'; // 解散群聊
const GROUP_ADD_MEMBER = "groupAddMember" ; // 群聊添加成员
const GROUP_REMOVE_MEMBER = "groupRemoveMember"; // 群聊删除成员
const RECEIVE_GROUP_MESSAGE = "receiveGroupMessage"; //接收群聊消息
const UPDATE_MESSAGE_ISREAD = "updateMessageIsRead"; // 更新群聊消息已读
const PULL_GROUP_MESSAGE = "pullGroupMessage" ; // 拉取群聊消息

export const groupChat = {
  ADD_GROUP,
  RECEIVE_GROUP_MESSAGE,
  REMOVE_GROUP,
  GROUP_ADD_MEMBER,
  GROUP_REMOVE_MEMBER,
  UPDATE_MESSAGE_ISREAD,
  PULL_GROUP_MESSAGE
};
