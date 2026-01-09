import { useRef } from "react"
import { Tab } from "./Tab.component"
import { useActiveTab, useTabStore } from "./Tab.hooks"

export const TabGroup = () => {
  const { tabStore, create, remove } = useTabStore()
  const { activeTabId, setActiveTabId } = useActiveTab()

  const nameRef = useRef(null)
  const dataRef = useRef(null)

  const createTab = (tab) => {
    if (!nameRef.current && !dataRef.current) return
    if (
      !nameRef.current.value.trim().length ||
      !dataRef.current.value.trim().length
    )
      return

    create(tab)

    setActiveTabId((prevActiveTabId) => {
      const empty = prevActiveTabId === Infinity
      if (empty) return 0
      return prevActiveTabId + 1
    })

    nameRef.current.value = dataRef.current.value = ""
  }

  const deleteTab = (uid) => {
    remove(uid)

    // reset to default if all tabs are empty
    const onlyElement = activeTabId === 0
    if (onlyElement) return setActiveTabId(Infinity)

    // if deleted tab is first tab set active tab to next.
    const firstTab = activeTabId === 1
    if (firstTab) setActiveTabId((prevActiveTab) => prevActiveTab + 1)
    else setActiveTabId((prevActiveTab) => prevActiveTab - 1)
  }

  const activeTabData = tabStore[activeTabId]?.data

  const Tabs = tabStore.length
    ? tabStore.map((tab, index) => (
        <Tab
          id={tab.uid}
          name={tab.name}
          onClose={() => deleteTab(tab.uid)}
          handleTabClick={() => setActiveTabId(index)}
        />
      ))
    : null

  return (
    <section>
      {Tabs}

      <section>
        <form
          onSubmit={(formEvent) => {
            formEvent.preventDefault()

            createTab({
              uid: Math.random(),
              name: nameRef.current.value,
              data: dataRef.current.value
            })
          }}
        >
          <label htmlFor="input--create-tab">
            name
            <input ref={nameRef} id="input--create-tab" />
          </label>

          <label htmlFor="textarea--add-tab-desc">
            data
            <input ref={dataRef} id="textarea--add-tab-desc" />
          </label>

          <button>add</button>
        </form>
      </section>

      {activeTabData ? <h2>{activeTabData}</h2> : null}
    </section>
  )
}
