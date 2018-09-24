// libs
import React, { Component, createContext } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { checkAccessTokenValid } from '../actions/auth'

// components & styles
import AppList from './AppList'
import Login from './Login'
import '../styles/global.css'
import { colors } from '../styles/styleVariables'

const AppStyles = styled.div`
  background-color: ${colors.backgroundLightGrey};
  min-height: 100vh;
`

class App extends Component {
  componentDidMount() {
    this.props.checkAccessTokenValid()
  }

  render() {
    const {
      auth: { loggedIn, tokenValid }
    } = this.props

    return (
      <AppStyles>{loggedIn && tokenValid ? <AppList /> : <Login />}</AppStyles>
    )
  }
}

export default connect(
  ({ auth }) => ({ auth }),
  { checkAccessTokenValid }
)(App)
