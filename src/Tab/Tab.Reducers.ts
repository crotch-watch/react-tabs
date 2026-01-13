import { DEFAULT_TAB_STATE, DEFAULT_VIEW_STATE } from "./Tab.constants"
import type { TabActions, TabState } from "./Tab.types"

export const tabStoreReducer = (
  state: TabState,
  action: TabActions
): TabState => {
  const { data, mode, view } = state

  switch (action.type) {
    case "ENTRY_REQUEST": {
      if (mode !== "idle") return state

      return {
        ...state,
        mode: "user_input",
      }
    }

    case "DATA_ENTERED": {
      if (mode !== "user_input") return state

      const uidExists = data.some((tab) => tab.uid === action.payload.uid)
      if (uidExists) return state

      return {
        ...state,
        data: [...data, action.payload],
        view: { ...view, activeTabId: action.payload.uid },
      }
    }

    case "CHANGE_ACTIVE_TAB": {
      if (mode === "dragging") return state

      const uidPresent = data.some((tab) => tab.uid === action.payload)
      if (!uidPresent) return state

      return { ...state, view: { ...view, activeTabId: action.payload } }
    }

    // can delete in user_input
    case "DELETE_TAB": {
      if (mode === "dragging") return state

      const idElementRemove = action.payload

      const indexToDelete = data.findIndex((tab) => tab.uid === idElementRemove)
      const indexAbsent = indexToDelete === -1

      if (indexAbsent) return state

      const newTabs = data.filter((tab) => tab.uid !== idElementRemove)

      // if deleted tab isn't currently active tab
      if (idElementRemove !== state.view.activeTabId)
        return { ...state, data: newTabs }

      // if no tabs left
      if (newTabs.length === 0)
        return {
          ...state,
          data: newTabs,
          view: { ...view, activeTabId: DEFAULT_VIEW_STATE.activeTabId },
        }

      const previousElementIndex = indexToDelete - 1

      // if current tab was deleted
      const previousElement = newTabs[previousElementIndex]
      const newActiveTabId = previousElement.uid

      return {
        ...state,
        data: newTabs,
        view: { ...view, activeTabId: newActiveTabId },
      }
    }
    case "DRAGGING_ELEMENT": {
      if (mode === "dragging") return state

      const exists = data.some((tab) => tab.uid === action.payload)
      if (!exists) return state

      return {
        ...state,
        mode: "dragging",
        view: { ...view, draggingTabId: action.payload },
      }
    }

    case "ENDING_DRAG": {
      if (mode === "idle") return state
      const exists = data.some((tab) => tab.uid === action.payload)
      if (!exists) return state

      return {
        ...state,
        mode: "idle",
        view: { ...view, draggingTabId: DEFAULT_VIEW_STATE.draggingTabId },
      }
    }

    default:
      return DEFAULT_TAB_STATE
  }
}
