import React, { Component } from 'react'
import { userLogin, userLogout } from '../actions/authActions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import NavBar from './NavBar'

import { Container, Button } from '../styled/index'
import { Card } from './UserControlPanel'
import Form from '../styled/Form'
import {
  FadeIn,
  SlideLeft,
  SlideRight,
  SlideBottom,
  SlideTop
} from '../styled/animations'

export const H1 = styled.h1`
  color: ${props => props.theme.primary};
`

export class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: ''
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async e => {
    e.preventDefault()

    try {
      await this.props.userLogin(
        this.state.usernameInput,
        this.state.passwordInput
      )
      this.props.history.push('/subforums')
    } catch (e) {
      alert(e.message)
    }
  }

  render() {
    return (
      <Container>
        <NavBar />
        <FadeIn>
          <Card>
            <SlideTop>
              <H1 style={{ padding: '0 1em' }}>
                Please enter your username and password.
              </H1>
            </SlideTop>

            {!this.props.auth.isLoggedIn ? (
              <Form style={{ width: 'auto' }}>
                <form onSubmit={this.handleSubmit}>
                  <SlideLeft>
                    <Form.Input
                      name="usernameInput"
                      type="text"
                      value={this.state.usernameInput}
                      onChange={this.changeHandler}
                      placeholder="enter your username"
                      data-testid="username-input"
                    />
                  </SlideLeft>
                  <SlideRight>
                    <Form.Input
                      name="passwordInput"
                      type="password"
                      value={this.state.passwordInput}
                      onChange={this.changeHandler}
                      placeholder="enter your password"
                      data-testid="password-input"
                    />
                  </SlideRight>
                  <SlideBottom>
                    <Button
                      type="submit"
                      style={{ margin: '8px 16px 16px 16px' }}
                    >
                      Login
                    </Button>
                  </SlideBottom>
                </form>
              </Form>
            ) : null}
          </Card>
        </FadeIn>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { userLogin, userLogout }
)(Login)
