import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../styles/styleVariables'

const Container = styled.div`
  img {
    height: auto;
    width: 50px;
  }
  &:hover {
    background-color: ${colors.logoPeach};
  }
`

const AppUserCard = props => {
  const { name, email, avatar } = props.user
  return (
    <Container className="p-1 mr-2 mb-1 flex-row align-center">
      <img src={avatar} alt="avatar" />
      <div className="flex-col pl-1 justify-center">
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
    </Container>
  )
}

AppUserCard.propTypes = {
  user: PropTypes.object
}

export default AppUserCard
