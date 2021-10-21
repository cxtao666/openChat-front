import { connect } from "react-redux";
import { Message, State, UserId } from "store/state/singleChat";
import { useRef, useState } from "react";
import { sendMessage, addFriend, connection } from "store/actions/singleChat";
import {
  createRTCConnection,
  setVideoCache,
  setUserCache,
} from "../util/chat/videoCall";

const Chat = (props: any) => {
  const { sendMessage, addFriend, connection } = props;
  const { friendList } = props;

  const [targetId, setTargetId] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  let remoteVideo = useRef(null);
  let localVideo = useRef(null);

  return (
    <div>
      <input
        value={userId}
        onChange={(e) => {
          setUserId(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          connection(userId);
        }}
      >
        确定当前用户id
      </button>
      <input
        value={targetId}
        onChange={(e) => {
          setTargetId(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          addFriend(targetId);
        }}
      >
        联系用户id
      </button>
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          sendMessage({ userId, targetUserId: targetId, message });
        }}
      >
        发送消息
      </button>
      <ul>
        {friendList?.get(targetId)?.messageList.map((item: Message) => {
          return <li key={item.createTime}>{item.message}</li>;
        })}
      </ul>
      <button
        onClick={async () => {
          await createRTCConnection(userId, targetId, localVideo, remoteVideo);
        }}
      >
        建立webRtc连接
      </button>
      <button
        onClick={() => {
          setVideoCache({
            remoteVideo: remoteVideo.current,
            localVideo: localVideo.current,
          });
        }}
      >
        传入视频id
      </button>
      <button
        onClick={() => {
          setUserCache({
            userId,
            targetUserId:targetId,
          });
        }}
      >
        传入用户id
      </button>
      <video ref={remoteVideo} height="200" width="200"></video>
      <video ref={localVideo} height="200" width="200"></video>
    </div>
  );
};

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state: State) => {
  return {
    ...state,
  };
};

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch: any) => {
  return {
    sendMessage(data: any) {
      // 如果不懂这里的逻辑可查看前面对redux-thunk的介绍
      dispatch(sendMessage(data));
      // 执行setPageTitle会返回一个函数
      // 这正是redux-thunk的所用之处:异步action
      // 上行代码相当于
      /*dispatch((dispatch, getState) => {
            dispatch({ type: 'SET_PAGE_TITLE', data: data })
        )*/
    },
    addFriend(data: UserId) {
      dispatch(addFriend(data));
    },
    connection(data: UserId) {
      dispatch(connection(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
