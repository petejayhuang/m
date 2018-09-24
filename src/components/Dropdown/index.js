import React from 'react'
import PropTypes from 'prop-types'

const Dropdown = props => {
  const handleSelectChange = e => props.changeCallbackFromParent(e.target.value)

  const { options } = props
  return (
    <select onChange={handleSelectChange}>
      {options.map(option => (
        <option key={option} value={option}>
          {option} users
        </option>
      ))}
    </select>
  )
}

Dropdown.propTypes = {
  options: PropTypes.array
}
export default Dropdown
