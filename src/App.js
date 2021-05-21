import React, {Component} from 'react'
import Layout from './hoc/layout'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Auth from './containers/auth'
import ContactList from './containers/contact-list'
import MainPage from './containers/main-page'
import { connect } from 'react-redux'
import Logout from './containers/logout'
import { autoLogin } from './store/actions/auth'



class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={MainPage} />
        <Redirect to={'/'}  />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/contact-list' component={ContactList} />
          <Route path='/logout' component={Logout}/>
          <Route path='/' exact component={MainPage} />
          <Redirect to={'/'}  />
        </Switch>
      )
    }
    return (
      <Layout>
        { routes }
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
