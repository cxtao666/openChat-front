import { updateMessageIsReadStatus } from "api/updateMessageIsReadStatus";
import sockjs from "socket.io-client";
import { singleChat } from "../../store/const/singleChat";
import { receiveRTCConnection, setAnswer, receiveCandidate, receiveClose } from "./videoCall";
import {createEvent} from '../event.ts'

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
     createEvent().emit('refreshList')
  
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
    console.log('已经获取到好友的在线状态',data)
    store.dispatch({
      type: singleChat.SET_FRIEND_IS_ONLINE,
      data,
    });
  });

  // 更新好友的在线状态
  socket.on('updateFriendOnlineStatus',(data)=>{
    store.dispatch({
      type:singleChat.UPDATE_FRIEND_ONLINE_STATUS,
      data
    })
  })

  const requestFriendIsOnine = (friendList) => {
    socket.emit("friendIsOnline", {
      friendList,
    });
  };

  // 发送聊天消息
  const sendMessage = (data) => {
    socket.emit("singleChat", data);
  };

  // 发送视频聊天的offer
  // 需要带上 userId 和 targetUserId
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
    socket.emit('closeVideoChat',data)
  }

  socket.on('receiveCloseVideoChat',()=>{
    receiveClose()
  })

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
    sendClose
  };
  return CHAT_BASIC;
};
