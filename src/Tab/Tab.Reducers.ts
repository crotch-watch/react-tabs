import { DEFAULT_TAB_STATE } from "./Tab.constants"
import type { TabActions, TabState } from "./Tab.types"

export const tabStoreReducer = (
  state: TabState,
  action: TabActions
): TabState => {
  const { data, mode } = state

  switch (action.type) {
    case "ENTRY_REQUEST":
      if (state.mode !== "idle") return state

      return {
        ...state,
        mode: "user_input",
      }

    case "DATA_ENTERED":
      if (mode !== "user_input") return state

      return {
        ...state,
        data: [...data, action.payload],
        view: action.payload.uid,
      }

    case "CHANGE_ACTIVE_TAB":
      if (mode === "dragging") return state

      return { ...state, view: action.payload }

    // can delete in user_input
    case "DELETE_TAB":
      const idElementRemove = action.payload

      if (mode === "dragging") return state

      const indexToDelete = data.findIndex((tab) => tab.uid === idElementRemove)

      let newTabs = [...data]
      if (indexToDelete > -1) {
        newTabs = data.filter((tab) => tab.uid !== idElementRemove)
      }

      // if deleted tab isn't currently active tab
      if (idElementRemove !== state.view) return { ...state, data: newTabs }

      // if no tabs left
      if (newTabs.length === 0) return { ...state, view: Infinity }

      // if current tab was deleted
      const previousElementIndex = indexToDelete - 1
      const previousElement = newTabs[previousElementIndex]
      const newActiveTabId = previousElement.uid

      return {
        ...state,
        data: newTabs,
        view: newActiveTabId,
      }

    default:
      return DEFAULT_TAB_STATE
  }
}
