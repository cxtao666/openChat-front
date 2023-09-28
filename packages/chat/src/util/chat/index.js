import { updateMessageIsReadStatus } from "api/updateMessageIsReadStatus";
import sockjs from "socket.io-client";
import { singleChat } from "../../store/const/singleChat";
import {
  receiveRTCConnection,
  setAnswer,
  receiveCandidate,
  receiveClose,
  receiveStart,
  isTargetUserReceiveVideoCall,
} from "./videoCall";
import { createEvent } from "../event.ts";
import { groupChat } from "store/const/groupChat";
import { updateNewMessageId } from "api/updateNewMessageId";

// 这里记得要把transports 加上去,告诉socket.io连上去的是webSocket服务器,网上很多文档都不写这个的
const connectSocket = () => {
  const socket = sockjs("ws://localhost:5001", {
    transports: ["websocket"],
  });
  socket.on("reconnect_attempt", () => {
    console.log("reconnect");
    socket.transports = ["websocket", "polling", "flashsocket"];
  });
  // 重连接时出错
  socket.on("error", (attemptNumber) => {
    console.log(attemptNumber);
  });
  //连接成功走这个方法
  socket.on("connect", () => {
    console.log(socket.connected);
  });
  //报错时走这个方法
  socket.on("connect_error", (error) => {
    console.log(error);
  });
  socket.on("ping", (error) => {
    console.log("ping_include");
  });

  // 接受消息状态
  socket.on("receiveStatus", (data) => {
    console.log(data);
  });

  return socket;
};

export const createSocket = (store) => {
  const socket = connectSocket();

  // 初始化 state
  store.dispatch({ type: singleChat.INIT_CHAT_STATE });

  // 以下的socket连接用于单聊
  // 接受聊天消息
  socket.on("receiveSingleMessage", (data) => {
    console.log(data);
    const message = JSON.parse(data);
    console.log(window.TATGET_USER);
    if (
      window.TATGET_USER != null &&
      window.TATGET_USER.userId === message.userId
    ) {
      message.isRead = true;
      //todo 告诉后端，消息已经是已读的了
      updateMessageIsReadStatus(message.targetUserId, message.userId); //更新后端数据库
      window.CHAT_BASIC.sendMessageHasRead(
        message.targetUserId,
        message.userId
      ); //通知目标用户消息已读
    }
    store.dispatch({
      type: singleChat.RECEIVE_MESSAGE,
      data: message,
    });
    // 更新列表
    createEvent().emit("refreshList");
  });

  // 上线
  const connection = (userId) => {
    socket.emit("connection", {
      userId,
    });
  };

  // 发送消息确认接受
  const sendMessageHasRead = (userId, targetId) => {
    socket.emit("sendMessageHasRead", {
      userId,
      targetId,
    });
  };

  // 处理对方已读消息 todo
  socket.on("receiveMessageHasRed", (data) => {
    console.log("对方消息已读", data);
    store.dispatch({
      type: singleChat.SET_TARGET_MESSAGE_HAS_READ,
      data,
    });
  });

  // 接收朋友是否在线的信息
  socket.on("receiveFriendIsOnline", (data) => {
    console.log("已经获取到好友的在线状态", data);
    store.dispatch({
      type: singleChat.SET_FRIEND_IS_ONLINE,
      data,
    });
  });

  // 更新好友的在线状态
  socket.on("updateFriendOnlineStatus", (data) => {
    store.dispatch({
      type: singleChat.UPDATE_FRIEND_ONLINE_STATUS,
      data,
    });
  });

  const requestFriendIsOnine = (friendList) => {
    socket.emit("friendIsOnline", {
      friendList,
    });
  };

  // 发送聊天消息
  const sendMessage = (data) => {
    socket.emit("singleChat", data);
  };

  // 下面的socket连接用于群聊
  // 加群
  const joinRoomChat = (data) => {
    socket.emit("joinRoomChat", {
      roomId: data.room.id,
      userId: data.user.id,
      message: {
        nickname: data.user.nickname,
        username: data.user.username,
        avatar: data.user.avatar,
        id: data.user.id,
        roomId: data.room.id,
      },
    });
  };

  // 退群
  const leaveRoomChat = (data) => {
    socket.emit("leaveRoomChat", data);
  };

  //解散群聊
  const dissolutionRoomChat = (data) => {
    socket.emit("dissolutionRoomChat", data);
  };

  // 建群
  const createRoomChat = (data) => {
    socket.emit("createRoomChat", data);
  };

  // 发送消息到群聊
  const sendRoomChat = (data) => {
    socket.emit("sendRoomChat", {
      roomId: data.roomId,
      userId: data.userId,
      message: data,
    });
  };
  // 接受群聊消息
  socket.on("receiveRoomMessage", (data) => {
    store.dispatch({
      type: groupChat.RECEIVE_GROUP_MESSAGE,
      data,
    });

    if (window.TARGET_ROOM && window.TARGET_ROOM.room.id === data.roomId) {
      createEvent().emit("refreshGroupList", {
        flag: store.getState().userId === data.userId,
      });
      updateNewMessageId({
        roomId: data.roomId,
        id: data.id,
        userId: store.getState().userId,
      });
      store.dispatch({
        type: groupChat.UPDATE_MESSAGE_ISREAD,
        data: { roomId: data.roomId, id: data.id },
      });
    }
  });

  socket.on("receiveMemberAddGroup", (data) => {
    console.log("新用户入群资料", data);
    // 有新用户入群
    store.dispatch({
      type: groupChat.GROUP_ADD_MEMBER,
      data,
    });
  });

  socket.on("receiveAddGroup", (data) => {
    // 进了新群
    store.dispatch({
      type: groupChat.ADD_GROUP,
      data,
    });
  });

  socket.on("receiveMemberSignOutGroup", (data) => {
    // 用户退出群聊
    store.dispatch({
      type: groupChat.GROUP_REMOVE_MEMBER,
      data,
    });
  });

  socket.on("receiveSignOutGroup", (data) => {
    // 退群
    store.dispatch({
      type: groupChat.REMOVE_GROUP,
      data,
    });
  });

  // 发送视频聊天的offer
  // 需要带上 userId 和 targetUserId
  // 下面的socket连接用于音视频通话
  const sendOffer = ({ offer, userId, targetUserId }) => {
    socket.emit("OfferToVideoChat", { offer, userId, targetUserId });
  };
  socket.on("ReceiveVideoChatOffer", async (message) => {
    const { offer, targetUserId, userId } = JSON.parse(message);
    await receiveRTCConnection(targetUserId, userId, offer);
  });

  const sendAnswer = ({ answer, userId, targetUserId }) => {
    socket.emit("answerToVideoChat", { answer, userId, targetUserId });
  };

  const sendCandidate = (data) => {
    socket.emit("candidateToVideoChat", data);
  };

  const sendClose = (data) => {
    socket.emit("closeVideoChat", data);
  };

  const sendStart = (data) => {
    console.log("call某人");
    socket.emit("startVideoChat", data);
  };

  const callIsReceiveVideoCall = (data) => {
    socket.emit("isReceiveVideoCall", data);
  };

  socket.on("receiveStartVideoChat", (data) => {
    console.log("接收到某人的视频请求", data);
    receiveStart(data);
  });

  socket.on("ReceiveVideoCall", (data) => {
    isTargetUserReceiveVideoCall(data);
  });

  socket.on("receiveCloseVideoChat", () => {
    receiveClose();
  });

  socket.on("ReceiveVideoChatAnswer", (message) => {
    const { answer } = JSON.parse(message);
    setAnswer(answer);
  });

  socket.on("ReceiveVideoChatCandidate", (data) => {
    receiveCandidate(JSON.parse(data));
  });

  const CHAT_BASIC = {
    connection,
    sendMessage,
    socket,
    sendOffer,
    sendAnswer,
    sendCandidate,
    sendMessageHasRead,
    requestFriendIsOnine,
    sendClose,
    sendStart,
    callIsReceiveVideoCall,
    joinRoomChat,
    leaveRoomChat,
    sendRoomChat,
    createRoomChat,
    dissolutionRoomChat,
  };
  return CHAT_BASIC;
};
