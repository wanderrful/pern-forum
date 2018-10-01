import React from 'react'
import { connect } from 'react-redux'
import { Container, Input, Button } from '../styled/index'
import axios from 'axios'
import styled from 'styled-components'
import NavBar from './NavBar'

import { editAvatar } from '../utils/userHelpers'

const Card = styled.section`
  display: flex;
  justify-content: center;
  justify-self: center;
  flex-direction: column;
  background-color: #fff;
  box-shadow: ${props => props.theme.largeShadow};
  margin: 1em 25% 0 25%;
`
const AvatarEdit = styled.div`
  margin: 0 3em 0 3em;
`

export class UserControlPanel extends React.Component {
  state = {
    avatarUrl: '',
    message: ''
  }

  componentDidMount = () => {
    this.getUserAvatarUrl(this.props.user.userId)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getUserAvatarUrl = async userId => {
    const user = await axios.get(`/api/users/${userId}`)
    await this.setState({ avatarUrl: user.data.avatarUrl })
  }

  render() {
    return (
      <Container>
        <NavBar />
        <Card>
          <h1>Welcome, {this.props.user.username}</h1>
          <h1>Change avatar: </h1>
          {this.state.message !== '' ? <h1>{this.state.message}</h1> : null}
          <AvatarEdit>
            <Input
              id="avatar-url-input"
              name="avatarUrl"
              value={this.state.avatarUrl}
              onChange={this.handleChange}
            />
            <form>
              <Button
                onClick={() =>
                  editAvatar(this.props.user.userId, this.state.avatarUrl)
                }
              >
                Edit Avatar
              </Button>
            </form>
          </AvatarEdit>
        </Card>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth
})

export default connect(mapStateToProps)(UserControlPanel)
