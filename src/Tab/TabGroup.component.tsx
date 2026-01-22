import { useRef } from "react"
import { TabC } from "./Tab.component"
import { useTabControllers } from "./Tab.controllers"

export const TabGroup = () => {
  const {
    state: {
      data,
      view: { activeTabId },
      mode,
    },
    handlers,
  } = useTabControllers()

  const droppableRef = useRef<HTMLDivElement | null>(null)

  const activeTabData = data.find((tab) => tab.uid === activeTabId)?.data

  const Tabs = data.length
    ? data.map((tab) => (
        <button
          key={tab.uid}
          id={`tab-${tab.uid}`}
          //
          role="tab"
          tabIndex={activeTabId === tab.uid ? 0 : -1}
          aria-selected={activeTabId === tab.uid ? "true" : "false"}
          aria-controls={`panel-${tab.uid}`}
          //
          draggable={true}
          onDragStart={() => handlers.drag(tab.uid)}
          onDragEnd={(e) => {
            const droppable = droppableRef.current
            if (!droppable) {
              handlers.end(tab.uid)
              return
            }

            const draggable = e.target as HTMLButtonElement
            const dropCoords = { x: e.clientX, y: e.clientY }

            handlers.dragEnd(draggable, droppable, dropCoords)
          }}
        >
          <TabC
            name={tab.name}
            onClose={() => handlers.deleteTab(tab.uid)}
            handleTabClick={() => handlers.changeActiveTab(tab.uid)}
          />
        </button>
      ))
    : null

  return (
    <section>
      <div
        role="tablist"
        aria-label="User Created Tabs"
        aria-describedby=""
        ref={droppableRef}
        style={{ display: "flex", gap: "1rem" }}
        onDragOver={(e) => e.preventDefault()}
      >
        {Tabs}
      </div>

      <section>
        {mode === "user_input" ? (
          <form onSubmit={handlers.formSubmit}>
            <label htmlFor="input--create-tab">
              name
              <input
                name="todoName"
                id="input--create-tab"
              />
            </label>

            <label htmlFor="textarea--add-tab-desc">
              data
              <input
                name="todoData"
                id="textarea--add-tab-desc"
              />
            </label>

            <button>add</button>
          </form>
        ) : (
          <button onClick={handlers.requestDataEntry}>form</button>
        )}
      </section>

      {activeTabData ? (
        <div
          id={`panel-${activeTabId}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTabId}`}
          tabIndex={1}
        >
          {activeTabData}
        </div>
      ) : null}
    </section>
  )
}
