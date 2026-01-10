import { useRef } from "react"
import { TabC } from "./Tab.component"
import { useTabs } from "./Tab.hooks"
import type { Tab } from "./Tab.types"

export const TabGroup = () => {
  const { state, enterData, requestDataEntry, changeActiveTab, deleteTab } =
    useTabs()

  const nameRef = useRef<HTMLInputElement | null>(null)
  const dataRef = useRef<HTMLInputElement | null>(null)

  const createTab = (tab: Tab) => {
    if (!nameRef.current || !dataRef.current) return
    if (!nameRef.current.value.trim().length) return

    enterData(tab)
    nameRef.current.value = dataRef.current.value = ""
  }

  const activeTabData = state.data.find((tab) => tab.uid === state.view)?.data

  const Tabs = state.data.length
    ? state.data.map((tab) => (
        <div key={tab.uid}>
          <TabC
            id={tab.uid}
            name={tab.name}
            onClose={() => deleteTab(tab.uid)}
            handleTabClick={() => changeActiveTab(tab.uid)}
            onDragStart={console.log}
          />
        </div>
      ))
    : null

  return (
    <section>
      {Tabs}

      <section>
        {state.mode === "user_input" ? (
          <form
            onSubmit={(formEvent) => {
              formEvent.preventDefault()

              if (!nameRef.current || !dataRef.current) return

              createTab({
                uid: Math.random(),
                name: nameRef.current.value.trim(),
                data: dataRef.current.value.trim(),
              })
            }}
          >
            <label htmlFor="input--create-tab">
              name
              <input
                ref={nameRef}
                id="input--create-tab"
              />
            </label>

            <label htmlFor="textarea--add-tab-desc">
              data
              <input
                ref={dataRef}
                id="textarea--add-tab-desc"
              />
            </label>

            <button>add</button>
          </form>
        ) : (
          <button onClick={requestDataEntry}>form</button>
        )}
      </section>

      {activeTabData ? <h2>{activeTabData}</h2> : null}
    </section>
  )
}
