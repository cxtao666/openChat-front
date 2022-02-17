import { GroupList } from "components/groupchat/groupLIst";
import { connect } from "react-redux";
import { State } from "store/state/singleChat";

const GroupChat = (props: State) => {
  const { friendList, user, skipMap } = props;
  return (
    <div style={{ width: "300px", height: "100%" }}>
      <GroupList id={user.id} friendList = {[...friendList.values()]}></GroupList>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupChat);
