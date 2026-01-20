import { useReducer } from "react"
import { tabStoreReducer } from "./Tab.Reducers"
import { DEFAULT_TAB_STATE } from "./Tab.constants.ts"
import type { Tab } from "./Tab.types.ts"

export const useTabs = () => {
  const [state, dispatch] = useReducer(tabStoreReducer, DEFAULT_TAB_STATE)

  const requestDataEntry = () => {
    dispatch({ type: "ENTRY_REQUEST" })
  }

  const enterData = (tab: Tab) => {
    dispatch({ type: "DATA_ENTERED", payload: tab })
  }

  const changeActiveTab = (uid: Tab["uid"]) => {
    dispatch({ type: "CHANGE_ACTIVE_TAB", payload: uid })
  }

  const deleteTab = (uid: Tab["uid"]) => {
    dispatch({ type: "DELETE_TAB", payload: uid })
  }

  const drag = (uid: Tab["uid"]) => {
    dispatch({ type: "DRAGGING_ELEMENT", payload: uid })
  }

  const end = (uid: Tab["uid"]) => {
    dispatch({ type: "ENDING_DRAG", payload: uid })
  }

  const drop = (payload: { index: number; uid: Tab["uid"] }) => {
    dispatch({ type: "DROPPED", payload })
  }

  return {
    state,
    requestDataEntry,
    enterData,
    changeActiveTab,
    deleteTab,
    drag,
    end,
    drop,
  }
}
