/* eslint-disable react/prop-types */
export const Square = ({ children, isSelected, updateBoard }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    const handleClick = () => {
      updateBoard()
    }
  
    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    )
  }