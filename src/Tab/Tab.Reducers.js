import { DEFAULT_TAB_STORE } from "./Tab.constants"

export const tabStoreReducer = (state, action) => {
  switch (action.type) {
    case "create":
      return [...state, action.payload]

    case "delete":
      return state.filter((tab) => tab.uid !== action.payload)

    default:
      return DEFAULT_TAB_STORE
  }
}
