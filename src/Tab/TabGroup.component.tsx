import { useRef } from "react"
import { TabC } from "./Tab.component"
import { useDragDropEffects, useTabs } from "./Tab.hooks"

export const TabGroup = () => {
  const {
    state: {
      data,
      view: { activeTabId, draggingTabId },
      mode,
    },
    enterData,
    requestDataEntry,
    changeActiveTab,
    deleteTab,
    drag,
    end,
  } = useTabs()

  useDragDropEffects(draggingTabId, mode)

  const nameRef = useRef<HTMLInputElement | null>(null)
  const dataRef = useRef<HTMLInputElement | null>(null)

  const handleFormSubmit = (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault()

    if (!nameRef.current || !dataRef.current) return
    if (!nameRef.current.value.trim().length) return

    enterData({
      uid: Math.random().toString(),
      name: nameRef.current.value.trim(),
      data: dataRef.current.value.trim(),
    })

    nameRef.current.value = dataRef.current.value = ""
  }

  const activeTabData = data.find((tab) => tab.uid === activeTabId)?.data

  const Tabs = data.length
    ? data.map((tab) => (
        <div
          key={tab.uid}
          id={tab.uid}
          draggable={true}
          onDragStart={() => drag(tab.uid)}
          onDragEnd={({ clientX, clientY }) => {
            const droppable = document.getElementById("droppable")

            if (!droppable) return
            const dropped = document.elementFromPoint(clientX, clientY)

            if (!dropped) return

            if (droppable.contains(dropped)) {
              // equivalent to on onDrop

              function calc2d({
                x1,
                x2,
                y1,
                y2,
              }: {
                x1: number
                x2: number
                y1: number
                y2: number
              }) {
                const greaterX = x2 - x1 > 0 ? x2 : x1
                const greaterY = y2 - y1 > 0 ? y2 : y1

                return Math.pow(
                  Math.pow(greaterX - (greaterX === x2 ? x1 : x2), 2) +
                    Math.pow(greaterY - (greaterY === y2 ? y1 : y2), 2),
                  0.5
                )
              }

              function calcBoxCenter(box: DOMRect) {
                return {
                  x: box.width / 2 + box.left,
                  y: box.height / 2 + box.top,
                }
              }

              let closetDroppable: Element
              let min: number = Infinity

              const droppables = [...droppable.children]
              droppables.forEach((droppable) => {
                const droppableCoords = droppable.getBoundingClientRect()
                const droppableCenter = calcBoxCenter(droppableCoords)
                const distance = calc2d({
                  x2: clientX,
                  x1: droppableCenter.x,
                  y2: clientY,
                  y1: droppableCenter.y,
                })

                if (distance > min) return

                min = distance
                closetDroppable = droppable
              })

              return
            }

            end(tab.uid)
          }}
        >
          <TabC
            name={tab.name}
            onClose={() => {
              deleteTab(tab.uid)
            }}
            onDragStart={() => drag(tab.uid)}
            onDragEnd={() => end(tab.uid)}
            handleTabClick={() => changeActiveTab(tab.uid)}
          />
        </div>
      ))
    : null

  return (
    <section>
      <div
        id="droppable"
        style={{ display: "flex", gap: "1rem" }}
        onDragOver={(e) => e.preventDefault()}
      >
        {Tabs}
      </div>

      <section>
        {mode === "user_input" ? (
          <form onSubmit={handleFormSubmit}>
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
