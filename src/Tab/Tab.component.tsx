export const TabC = ({ id, name, onClose, handleTabClick, ...props }) => {
  return (
    <header
      key={id}
      onClick={() => {
        console.log("click")
        handleTabClick()
      }}
      draggable={true}
    >
      {name}
      <span
        onClick={() => {
          console.log("close")
          onClose()
        }}
      >
        x
      </span>
    </header>
  )
}
