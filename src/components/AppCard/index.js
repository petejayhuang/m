// libs & constants
import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import configuredAxios from '../../config/axios'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { URLS, USER_LIST_DROPDOWN_LIMITS } from '../../config/constants'

// components
import AppUserCard from '../AppUserCard'
import Button from '../Button'
import Dropdown from '../Dropdown'
import TextInput from '../TextInput'

// helpers & actions
import { buildQueryStringFromObject } from '../../utilities/buildQueryStringFromObject'
import { updateApp } from '../../actions'
import {
  FETCH_APP_USERS_REQUEST,
  FETCH_APP_USERS_SUCCESS,
  FETCH_APP_USERS_FAILURE
} from '../../actions/types'

const Container = styled.div`
  background-color: white;
  border-radius: 5px;
  img {
    height: 75px;
    width: 75px;
  }
  p {
    display: inline;
  }
`

class AppCard extends Component {
  state = {
    limit: 25,
    offset: 0,
    showLoadingSpinner: false,
    showUserTable: false,
    showEditApp: false,
    users: [],
    logo: this.props.app.logo,
    name: this.props.app.name
  }

  // Logic and markup for: updating app
  renderEditApp = () => {
    const { name, logo } = this.state
    return (
      <div className="mb-2">
        <TextInput
          handleInputChange={this.handleInputChange}
          label="name"
          value={name}
        />
        <TextInput
          handleInputChange={this.handleInputChange}
          label="image"
          value={logo}
        />
        <Button className="mt-1" onClick={this.handleUpdate}>
          Update app
        </Button>
      </div>
    )
  }

  handleEditApp = () =>
    this.setState({
      ...this.state,
      showEditApp: !this.state.showEditApp
    })

  handleUpdate = async () => {
    const { logo, name } = this.state
    const { id } = this.props.app
    await this.props.updateApp({
      id,
      logo,
      name
    })
    this.setState({ showEditApp: false })
  }

  handleInputChange = (inputName, e) => {
    this.setState({ [inputName]: e.target.value })
  }

  // Logic and markup for: View users, paginate
  fetchAppUsers = async (offset = 0) => {
    const {
      dispatch,
      app: { id }
    } = this.props

    const { limit } = this.state

    dispatch({ type: FETCH_APP_USERS_REQUEST })
    this.setState({ ...this.state, showLoadingSpinner: true })

    const queryString = buildQueryStringFromObject({ limit, offset })
    const url = `${URLS.api}/apps/${id}/users?${queryString}`

    try {
      const { data } = await configuredAxios().get(url)
      dispatch({ type: FETCH_APP_USERS_SUCCESS })

      this.setState({
        users: data.users,
        showLoadingSpinner: true
      })
    } catch (error) {
      dispatch({
        type: FETCH_APP_USERS_FAILURE,
        error
      })
    }
  }

  handleLimitChange = value => {
    this.setState({ limit: value }, () => this.fetchAppUsers())
  }

  handleViewUsers = () => {
    this.fetchAppUsers(1)
    this.setState({
      showUserTable: !this.state.showUserTable,
      offset: this.state.offset + 1
    })
  }

  paginate = offset => {
    const newOffset = this.state.offset + offset

    this.setState({ ...this.state, offset: newOffset }, () =>
      this.fetchAppUsers(newOffset)
    )
  }

  hideUsers = () => {
    this.setState({
      showUserTable: false,
      offset: 0
    })
  }

  renderAppUsers = () => (
    <Fragment>
      <div className="pt-2 mt-2 flex-row justify-between align-center">
        <div>
          Show{' '}
          <Dropdown
            options={USER_LIST_DROPDOWN_LIMITS}
            selected
            changeCallbackFromParent={this.handleLimitChange}
          />{' '}
          per page
          <div className="mt-1">
            {this.state.offset > 0 && (
              <Button className="mr-2" small onClick={() => this.paginate(-1)}>
                Previous
              </Button>
            )}
            <Button small onClick={() => this.paginate(1)}>
              Next
            </Button>
          </div>
        </div>
        <Button secondary onClick={this.hideUsers} className="mt-2 mb-2">
          Close
        </Button>
      </div>

      {this.state.users.map(user => (
        <AppUserCard key={user.id} user={user} />
      ))}
    </Fragment>
  )

  render() {
    const { id, name, logo, created } = this.props.app
    const dateCreatedString = moment(created).format('D MMMM YY H:MM')
    const { showUserTable, showEditApp } = this.state

    return (
      <Container className="p-2 mt-2 mb-2 ml-2" key={id}>
        <div className="flex-row align-center">
          <img src={logo} alt={name} />

          <div className="flex-col ml-2">
            {showEditApp ? (
              this.renderEditApp()
            ) : (
              <Fragment>
                <p>{name}</p>
                <p>
                  <strong>Created at:</strong> {dateCreatedString}
                </p>
              </Fragment>
            )}
          </div>
        </div>

        <div className="flex-row mt-2">
          <Button onClick={this.handleEditApp}>
            {showEditApp ? 'Cancel edits' : 'Edit app'}
          </Button>
          {!showUserTable && (
            <Button secondary className="ml-1" onClick={this.handleViewUsers}>
              View users
            </Button>
          )}
        </div>
        {showUserTable && this.renderAppUsers()}
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({ updateApp }, dispatch)
})

AppCard.propTypes = {
  app: PropTypes.object,
  dispatch: PropTypes.func,
  updateApp: PropTypes.func
}

export default connect(
  null,
  mapDispatchToProps
)(AppCard)
