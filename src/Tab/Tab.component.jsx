export const Tab = ({ id, name, onClose, handleTabClick }) => {
  return (
    <header key={id} onClick={handleTabClick}>
      {name}
      <span onClick={onClose}>x</span>
    </header>
  )
}
