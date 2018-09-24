import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../styles/styleVariables'

const ButtonContainer = styled.button`
  background-color: ${props =>
    props.secondary ? 'white' : colors.backgroundDarkBlue};
  color: ${props => (props.secondary ? colors.backgroundDarkBlue : 'white')};
  border: ${props =>
    props.secondary ? `2px solid ${colors.backgroundDarkBlue}` : 'none'};
  width: 100px;
  height: ${props => (props.small ? '25px' : '40px')};
  font-size: 15px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

const Button = props => {
  const { children, submit } = props
  return (
    <ButtonContainer type={submit && submit} {...props}>
      {children}
    </ButtonContainer>
  )
}

Button.defaultProps = {
  children: 'Button'
}

Button.propTypes = {
  user: PropTypes.object
}

export default Button
