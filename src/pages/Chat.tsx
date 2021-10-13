import { connect } from "react-redux";
import { Message, State, UserId } from "store/state/singleChat";
import { useState } from "react";
import {
  sendMessage,
  addFriend,
  connection,
} from "store/actions/singleChat";

const Chat = (props: any) => {
  const { sendMessage, addFriend, connection } = props;
  const { friendList } = props;

  const [targetId, setTargetId] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

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
      <button onClick={() => {addFriend(targetId)}}>联系用户id</button>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
