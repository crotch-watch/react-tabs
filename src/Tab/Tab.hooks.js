import { useReducer } from "react"
import { useState } from "react"
import { tabStoreReducer } from "./Tab.Reducers"
import { DEFAULT_TAB_STORE, TAB_STORE_OPS } from "./Tab.constants"

export const useActiveTab = (id = Infinity) => {
  const [activeTabId, setActiveTabId] = useState(id)

  return { activeTabId, setActiveTabId }
}

export const useTabStore = () => {
  const [tabStore, dispatch] = useReducer(tabStoreReducer, DEFAULT_TAB_STORE)

  const remove = (id) => dispatch({ type: TAB_STORE_OPS.delete, payload: id })

  const create = (tab) => {
    dispatch({ type: TAB_STORE_OPS.create, payload: tab })
  }

  return { tabStore, remove, create }
}
