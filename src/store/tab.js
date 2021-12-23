
export default {
  state: {
    isCollapse: true,
    currentMenu: null
  },
  mutations: {
    collapseMenu(state) { //侧边栏收缩
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state) {
      val.name === 'home' ? (state.currentMenu = null) : state.currentMenu = val
    }
  }
}
