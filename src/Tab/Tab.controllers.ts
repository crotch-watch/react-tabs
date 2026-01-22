import { distFromRectCenter, findMin, getRectCenter } from "./Tab.helpers"
import { useTabs } from "./Tab.hooks"
import type { Coords } from "./Tab.types"

export const useTabControllers = () => {
  const {
    state: { data, view, mode },
    enterData,
    requestDataEntry,
    drag,
    end,
    drop,
    deleteTab,
    changeActiveTab,
  } = useTabs()

  const formSubmit = function (formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault()

    const form = formEvent.target as HTMLFormElement
    const formData = new FormData(form)

    const [name, data] = [...formData.values()]

    enterData({
      uid: Math.random().toString(),
      name: name.toString().trim(),
      data: data.toString().trim(),
    })

    form.reset()
  }

  const dragEnd = function (
    draggable: Element,
    droppable: Element,
    dropCoords: Coords,
  ) {
    const elementAtDropCoords = document.elementFromPoint(
      dropCoords.x,
      dropCoords.y,
    )

    const droppedInDroppable = droppable.contains(elementAtDropCoords)

    if (!elementAtDropCoords || !droppedInDroppable) {
      end(view.draggingTabId)
      return
    }

    const draggables = [...droppable.children]

    const closetDraggable = findMin(draggables, (el) => {
      const rect = el.getBoundingClientRect()
      return distFromRectCenter(rect, dropCoords)
    })

    const droppedAtSameIndex = +draggable.id === +closetDraggable!.id

    if (droppedAtSameIndex) {
      end(draggable.id)
      return
    }

    const closestRect = closetDraggable!.getBoundingClientRect()
    const closestCenter = getRectCenter(closestRect)

    const droppedTowards = dropCoords.x > closestCenter.x ? "left" : "right"

    const indexOfClosestDraggable = data.findIndex(
      (tab) => tab.uid === closetDraggable!.id,
    )

    const isLeftMostDropoff =
      indexOfClosestDraggable === 0 && droppedTowards === "left"

    if (isLeftMostDropoff) {
      drop({ index: 0, uid: view.draggingTabId })
      return
    }

    const isRightMostDropoff =
      indexOfClosestDraggable === data.length - 1 && droppedTowards === "right"

    if (isRightMostDropoff) {
      drop({ index: data.length - 1, uid: view.draggingTabId })
      return
    }

    const dropoffIndex =
      droppedTowards === "left"
        ? indexOfClosestDraggable - 1
        : indexOfClosestDraggable + 1

    drop({ index: dropoffIndex, uid: draggable.id })
  }

  return {
    state: { data, view, mode },
    handlers: {
      formSubmit,
      requestDataEntry,
      drag,
      dragEnd,
      deleteTab,
      changeActiveTab,
      end,
    },
  }
}
