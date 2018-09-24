import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import capitaliseWord from '../../utilities/capitaliseWord'

const Container = styled.div`
  input[type='text'],
  input[type='password'] {
    max-width: 300px;
    height: 30px;
  }
`

const TextInput = props => {
  const { handleInputChange, label, password, required, value } = props

  return (
    <Container className="flex-col mt-1">
      <label>{capitaliseWord(label)}</label>
      <input
        required={required}
        onChange={e => handleInputChange(label, e)}
        type={password ? 'password' : 'text'}
        value={value}
      />
    </Container>
  )
}

TextInput.propTypes = {
  handleInputChange: PropTypes.func,
  label: PropTypes.string,
  password: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string
}

export default TextInput
