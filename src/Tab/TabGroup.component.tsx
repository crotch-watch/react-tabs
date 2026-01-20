import { useRef } from "react"
import { TabC } from "./Tab.component"
import { useTabs } from "./Tab.hooks"

export const TabGroup = () => {
  const {
    state: {
      data,
      view: { activeTabId },
      mode
    },
    enterData,
    requestDataEntry,
    changeActiveTab,
    deleteTab,
    drag,
    end,
    drop
  } = useTabs()

  const nameRef = useRef<HTMLInputElement | null>(null)
  const dataRef = useRef<HTMLInputElement | null>(null)

  const handleFormSubmit = (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault()

    if (!nameRef.current || !dataRef.current) return
    if (!nameRef.current.value.trim().length) return

    enterData({
      uid: Math.random().toString(),
      name: nameRef.current.value.trim(),
      data: dataRef.current.value.trim()
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
          onDragEnd={(event) => {
            const { clientX, clientY } = event

            const droppable = document.getElementById("droppable")

            if (!droppable) return
            const elementAtDropCoords = document.elementFromPoint(
              clientX,
              clientY
            )

            const droppedInDroppable = droppable.contains(elementAtDropCoords)
            if (!elementAtDropCoords || !droppedInDroppable) {
              end(tab.uid)
              return
            }

            // tab is dropped in droppable
            function calc2d({
              x1,
              x2,
              y1,
              y2
            }: {
              x1: number
              x2: number
              y1: number
              y2: number
            }) {
              const greaterX = x2 - x1 > 0 ? x2 : x1
              const greaterY = y2 - y1 > 0 ? y2 : y1

              return Math.sqrt(
                Math.pow(greaterX - (greaterX === x2 ? x1 : x2), 2) +
                  Math.pow(greaterY - (greaterY === y2 ? y1 : y2), 2)
              )
            }

            function calcBoxCenter(box: DOMRect) {
              return {
                x: box.width / 2 + box.left,
                y: box.height / 2 + box.top
              }
            }

            let closetDraggable: Element
            let min: number = Infinity
            let droppedTowards: "left" | "right" = "left"

            const droppables = [...droppable.children]
            droppables.forEach((droppable) => {
              const droppableCoords = droppable.getBoundingClientRect()
              const droppableCenter = calcBoxCenter(droppableCoords)

              const distance = calc2d({
                x2: clientX,
                x1: droppableCenter.x,
                y2: clientY,
                y1: droppableCenter.y
              })

              if (distance > min) return

              min = distance
              closetDraggable = droppable
            })

            if (
              clientX >
              calcBoxCenter(closetDraggable!?.getBoundingClientRect()).x
            ) {
              droppedTowards = "right"
            }

            const closestElementIndex = data.findIndex(
              (tab) => tab.uid === closetDraggable.id
            )

            const target = event.target as Element

            const droppedAtSameIndex = +target.id === +closetDraggable!.id
            if (droppedAtSameIndex) {
              end(elementAtDropCoords.id)
              return
            }

            const isLeftMostDropoff =
              closestElementIndex === 0 && droppedTowards === "left"

            if (isLeftMostDropoff) {
              drop({ index: 0, uid: tab.uid })
              return
            }

            const isRightMostDropoff =
              closestElementIndex === data.length - 1 &&
              droppedTowards === "right"

            if (isRightMostDropoff) {
              drop({ index: data.length - 1, uid: tab.uid })
            }

            const dropoffIndex =
              droppedTowards === "left"
                ? closestElementIndex - 1
                : closestElementIndex + 1

            drop({ index: dropoffIndex, uid: target.id })
          }}
        >
          <TabC
            name={tab.name}
            onClose={() => {
              deleteTab(tab.uid)
            }}
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
              <input ref={nameRef} id="input--create-tab" />
            </label>

            <label htmlFor="textarea--add-tab-desc">
              data
              <input ref={dataRef} id="textarea--add-tab-desc" />
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
