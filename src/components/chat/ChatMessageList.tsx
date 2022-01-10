import { Message, User } from "store/state/singleChat";
import { Avatar } from 'antd';

interface ChatMessageListProps {
  messageList: Message[];
  user: User;
  targetUser: User;
  setMessageListHasRead(data: User) :void;
}

export const ChatMessageList = ({
  messageList,
  user,
  targetUser,
  setMessageListHasRead
}: ChatMessageListProps) => {
  setMessageListHasRead(targetUser)
  return (
    <div style={{height:"546px",overflowY:"auto"}}>
      {messageList.map((item) => {
        return (
          <div>
            {item.targetUserId === user.id ? (
              <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center",margin:"20px"}}>
                <Avatar src={targetUser.avatar} alt="" size="large" style={{marginRight:"20px"}}></Avatar>
                <div style={{marginRight:"20px",textAlign:"center",padding:"10px",backgroundColor:"#1890ff",borderRadius:"20%",fontWeight:"bold"}}>{item.message}</div>
              </div>
            ) : (
              <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",alignItems:"center",margin:"20px"}}>
                <div style={{marginRight:"20px",textAlign:"center",padding:"10px",backgroundColor:"#1890ff",borderRadius:"20%",fontWeight:"bold"}}>{item.message}</div>
                <Avatar src={user.avatar} alt="" size="large" ></Avatar>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
