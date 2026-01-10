import type { TabStore, ActiveTabId, Mode, TabState } from "./Tab.types"

const DEFAULT_TAB_STORE: TabStore = []
const DEFAULT_ACTIVE_TAB_ID: ActiveTabId = Infinity
const DEFAULT_MODE: Mode = "idle"

export const DEFAULT_TAB_STATE: TabState = {
  data: DEFAULT_TAB_STORE,
  view: DEFAULT_ACTIVE_TAB_ID,
  mode: DEFAULT_MODE,
}

Object.freeze(DEFAULT_TAB_STATE)

export const TAB_STORE_OPS = {
  create: "create",
  delete: "delete",
}

Object.freeze(TAB_STORE_OPS)
