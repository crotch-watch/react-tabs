import { useReducer } from "react"
import { useState } from "react"
import { tabStoreReducer } from "./Tab.Reducers"
import { DEFAULT_TAB_STATE } from "./Tab.constants.ts"
import type { Tab } from "./Tab.types.ts"

export const useActiveTab = (id = Infinity) => {
  const [activeTabId, setActiveTabId] = useState(id)

  return { activeTabId, setActiveTabId }
}

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

  return {
    state,
    requestDataEntry,
    enterData,
    changeActiveTab,
    deleteTab,
  }
}

// export const useTabStore = () => {
//   const [tabStore, dispatch] = useReducer(tabStoreReducer, DEFAULT_TAB_STORE)

//   const remove = (id: Tab["uid"]) => {
//     dispatch({ type: TAB_STORE_OPS.delete, payload: id })
//   }

//   const create = (tab: Tab) => {
//     dispatch({ type: TAB_STORE_OPS.create, payload: tab })
//   }

//   return { tabStore, remove, create }
// }

// export const useDragDrop = () => {
//   const { tabStore, remove, create } = useTabStore()
//   const { activeTabId, setActiveTabId } = useActiveTab()

//   const [mode, setMode] = useState("idle")

//   useEffect(() => {
//     switch (mode) {
//       case "idle":
//         return null

//       // state has changed to dragging mode
//       // idle -> dragging
//       case "dragging": {
//         // reset to default if all tabs are empty
//         const onlyElement = activeTabId === 0
//         if (onlyElement) return setActiveTabId(Infinity)

//         // if deleted tab is first tab set active tab to next.
//         const firstTab = activeTabId === 1
//         if (firstTab) setActiveTabId((prevActiveTab) => prevActiveTab + 1)
//         else setActiveTabId((prevActiveTab) => prevActiveTab - 1)
//       }
//     }
//   }, [mode])

//   return {}
// }
