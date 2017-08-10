export const TOGGLE_SIDEBAR = 'appui-toggle_sidebar'

export default function reducer(state={
    sidebarOpen: false,
  }, action) {

  switch (action.type) {
    case TOGGLE_SIDEBAR: {
      const sidebarOpen = !state.sidebarOpen;
      return {...state, sidebarOpen }
    }
    default: {
      return state;
    }
  }
}

export const toggleSidebarAction = () => {
  return {
    type: TOGGLE_SIDEBAR
  }
}