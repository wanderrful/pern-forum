import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import store from './store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css'
import App from './containers/App'
import Login from './components/Login'
import Signup from './components/Signup'
import Thread from './containers/Thread'
import ThreadForm from './components/ThreadForm'
import UserControlPanel from './components/UserControlPanel'
import EditPostModal from './components/EditPostModal';

const theme = {
  primary: '#00a8ff',
  secondary: '#C5E7E2',
  largeShadow: `
    0 15px 30px 0 rgba(0,0,0,0.11),
    0 5px 15px 0 rgba(0,0,0,0.08)
  `,
  mediumShadow: `
    0 4px 8px 0 rgba(0,0,0,0.12),
    0 2px 4px 0 rgba(0,0,0,0.08)
  `
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/thread/:id/page/:page" component={Thread} />
          <Route exact path="/editpost" component={EditPostModal}/>
          <Route exact path="/newthread" component={ThreadForm} />
          <Route exact path="/usercontrolpanel" component={UserControlPanel} />
          <Route path="/threads/:page" component={App} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)
