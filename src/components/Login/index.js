import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Button from '../Button'
import { loginUser } from '../../actions'
import TextInput from '../TextInput'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleInputChange = (inputName, e) =>
    this.setState({ ...this.state, [inputName]: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
    this.props.loginUser({ ...this.state })
  }

  render() {
    const { email, password } = this.state
    console.log('<Login /> render')
    return (
      <div className="p-2">
        <h3>Please login to continue</h3>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            required
            handleInputChange={this.handleInputChange}
            label="email"
            value={email}
          />
          <TextInput
            handleInputChange={this.handleInputChange}
            required
            password
            label="password"
            value={password}
          />
          <Button secondary className="mt-1" type="submit">
            Sign in
          </Button>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func
}

export default connect(
  null,
  { loginUser }
)(Login)
