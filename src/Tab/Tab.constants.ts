import type { TabStore, Mode, TabState, ViewState } from "./Tab.types"

export const DEFAULT_TAB_STORE: TabStore = []
Object.freeze(DEFAULT_TAB_STORE)

export const DEFAULT_VIEW_STATE: ViewState = {
  activeTabId: "",
  draggingTabId: "",
} as const
Object.freeze(DEFAULT_VIEW_STATE)

export const DEFAULT_MODE: Mode = "idle"

export const DEFAULT_TAB_STATE: TabState = {
  data: DEFAULT_TAB_STORE,
  view: DEFAULT_VIEW_STATE,
  mode: DEFAULT_MODE,
}

Object.freeze(DEFAULT_TAB_STATE)

export const TAB_STORE_OPS = {
  create: "create",
  delete: "delete",
}

Object.freeze(TAB_STORE_OPS)
