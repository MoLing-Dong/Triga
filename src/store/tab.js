export default {
  state: {
    isCollapse: true
  },
  mutations: {
    collapseMenu (state) {  //侧边栏收缩
      state.isCollapse = !state.isCollapse
    },
  }
}
