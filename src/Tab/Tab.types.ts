export type Tab = {
  uid: string
  name: string
  data: string
}

export type TabStore = Array<Tab>

export type ActiveTabId = Tab["uid"]
export type DraggingTabId = Tab["uid"]
export type ViewState = {
  activeTabId: ActiveTabId
  draggingTabId: DraggingTabId
}

export type Mode = "idle" | "dragging" | "user_input"

export type TabState = {
  data: TabStore
  view: ViewState
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
  | {
      type: "DRAGGING_ELEMENT"
      payload: Tab["uid"]
    }
  | {
      type: "ENDING_DRAG"
      payload: Tab["uid"]
    }
