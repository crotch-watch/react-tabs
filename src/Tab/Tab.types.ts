export type Tab = {
  uid: number
  name: string
  data: string
}

export type TabStore = Array<Tab>

export type ActiveTabId = Tab["uid"]

export type Mode = "idle" | "dragging" | "user_input"

export type TabState = {
  data: TabStore
  view: ActiveTabId
  mode: Mode
}

export type TabActions =
  | {
      type: "ENTRY_REQUEST"
    }
  | {
      type: "DATA_ENTERED"
      payload: Tab
    }
  | {
      type: "CHANGE_ACTIVE_TAB"
      payload: Tab["uid"]
    }
  | {
      type: "DELETE_TAB"
      payload: Tab["uid"]
    }
