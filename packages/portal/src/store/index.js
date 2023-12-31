import { initGlobalState } from 'qiankun';

const actions = initGlobalState({});

actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});


export default actions