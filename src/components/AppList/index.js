import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { CHECK_ACCESS_TOKEN_VALID_FREQ_SECONDS } from '../../config/constants'
import AppCard from '../AppCard'
import { fetchAllApps, checkAccessTokenValid } from '../../actions'

const Container = styled.div`
  max-width: 600px;
`

class AppsList extends Component {
  componentDidMount() {
    this.checkAccessTokenValid
    this.props.fetchAllApps()
  }

  componentWillUnmount() {
    clearInterval(this.checkAccessTokenValid)
  }

  checkAccessTokenValid = setInterval(
    this.props.checkAccessTokenValid,
    CHECK_ACCESS_TOKEN_VALID_FREQ_SECONDS
  )

  clearCheckAccessTokenValid = () => clearInterval(this.checkAccessTokenValid)

  render() {
    const { apps } = this.props
    return (
      <Container className="p-2">
        <h2 className="ml-2">Your Apps</h2>
        {apps.map(app => (
          <AppCard key={app.id} app={app} />
        ))}
      </Container>
    )
  }
}

AppsList.propTypes = {
  apps: PropTypes.array,
  fetchAllApps: PropTypes.func
}

export default connect(
  ({ apps }) => ({ apps }),
  { checkAccessTokenValid, fetchAllApps }
)(AppsList)
