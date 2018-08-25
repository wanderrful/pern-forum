import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchThreads, fetchData, fetchPosts } from '../actions/threadActions'

import styled from 'styled-components'
import { Container } from '../components/Login'
import NavBar from '../components/NavBar'
import PostForm from '../components/PostForm'

const ThreadWrapper = styled.section`
  background-color: #dff4ff;
  color: #564154;
  padding: 2em;
`
const StyledThread = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #32343b;
  background-color: white;
  border: 2px solid ${props => props.theme.primary};
`
const ThreadHeader = styled.h2`
  margin-left: 1em;
  border-bottom: 2px solid ${props => props.theme.secondary}
  text-align: left;
`
const ThreadContent = styled.p`
  padding-left: 10px;
  padding-right: 10px;
`

class Thread extends Component {
  state = {
    posts: []
  }

  componentDidMount = () => {
    const {
      match: { params }
    } = this.props
    this.props.fetchPosts(this.props.match.params.id)
    this.props.fetchData()
    this.props.fetchThreads()
    this.setState({
      posts: this.props.posts
    })
  }


  render() {
    if (this.props.threads.length && this.props.users.length) {
      const thread = this.props.threads.find(
        thread => thread.id == this.props.match.params.id
      )
      const author = this.props.users.find(user => user.id == thread.userId)
      const posts = this.props.posts.map(post => {
        return (
          <div key={post.id}>
            <h1>{post.author}</h1>
            <p>{post.content}</p>
          </div>
        )
      })
      return (
        <Container>
          <NavBar />
          <ThreadWrapper>
            <StyledThread>
              <ThreadHeader>
                {thread.title}, posted by {author.username}
              </ThreadHeader>
              <ThreadContent>{thread.content}</ThreadContent>
            </StyledThread>
            {posts}
          </ThreadWrapper>
          <PostForm threadId={this.props.match.params.id} />
        </Container>
      )
    } else {
      return (
        <Container>
          <NavBar />
          <h1>Loading thread...</h1>
        </Container>
      )
    }
  }
}

const mapStateToProps = state => ({
  threads: state.threadData.threads,
  users: state.threadData.users,
  posts: state.threadData.posts
})

export default connect(
  mapStateToProps,
  { fetchThreads, fetchData, fetchPosts }
)(Thread)
