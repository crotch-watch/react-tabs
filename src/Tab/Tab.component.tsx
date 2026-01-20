export const TabC = ({ name, onClose, handleTabClick }) => {
  return (
    <header
      onClick={() => {
        handleTabClick()
      }}
    >
      {name}
      <span
        onClick={() => {
          onClose()
        }}
      >
        x
      </span>
    </header>
  )
}
